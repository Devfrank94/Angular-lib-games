import { Injectable, inject, signal, computed } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import {
    GameResponse,
    PlatformResponse,
    CreatorResponse,
    DeveloperResponse,
    Game,
    Platform,
    Creator,
    Developer,
    GameDetail,
    Screenshot,
    ScreenshotResponse,
    GameMovie,
    MoviesResponse,
    AchievementsResponse,
    GameAchievement,
    GameRelease,
} from "../models/game.interface";

// Generic state interface per async data
interface AsyncState<T> {
    data: T;
    loading: boolean;
    error: boolean;
}

// Extended state per le new releases con tracking del mese
interface NewReleasesState extends AsyncState<GameRelease[] | null> {
  currentMonth: number | null;
  currentYear: number | null;
}

// Helper per creare async state iniziale
const createAsyncState = <T>(initial: T): AsyncState<T> => ({
    data: initial,
    loading: false,
    error: false,
});

// Helper specifico per new releases
const createNewReleasesState = (): NewReleasesState => ({
  ...createAsyncState<GameRelease[] | null>(null),
  currentMonth: null,
  currentYear: null,
});

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = "https://api.rawg.io/api";
    private readonly apiKey = environment.apiKey;

    // ========== GAMES ==========
    private readonly _gamesState = signal(createAsyncState<Game[] | null>(null));
    readonly games = computed(() => this._gamesState().data);
    readonly gamesLoading = computed(() => this._gamesState().loading);
    readonly gamesError = computed(() => this._gamesState().error);

    // ========== GAME DETAIL ==========
    private readonly _gameDetailState = signal(createAsyncState<GameDetail | null>(null));
    private readonly _currentGameId = signal<number | null>(null);
    readonly gameDetail = computed(() => this._gameDetailState().data);
    readonly gameDetailLoading = computed(() => this._gameDetailState().loading);
    readonly gameDetailError = computed(() => this._gameDetailState().error);

    resetGameDetail(): void {
        this._gameDetailState.set(createAsyncState<GameDetail | null>(null));
        this._currentGameId.set(null);
    }

    // ========== SCREENSHOTS ==========
    private readonly _screenshotsState = signal(createAsyncState<Screenshot[] | null>(null));
    private readonly _screenshotsGameId = signal<number | null>(null);
    private readonly _screenshotsResponse = signal<ScreenshotResponse | null>(null);
    readonly screenshots = computed(() => this._screenshotsState().data);
    readonly screenshotsLoading = computed(() => this._screenshotsState().loading);
    readonly screenshotsError = computed(() => this._screenshotsState().error);
    readonly screenshotsResponse = computed(() => this._screenshotsResponse());

    // ========== MOVIES ==========
    private readonly _moviesState = signal(createAsyncState<GameMovie[] | null>(null));
    private readonly _moviesGameId = signal<number | null>(null);
    readonly movies = computed(() => this._moviesState().data);
    readonly moviesLoading = computed(() => this._moviesState().loading);
    readonly moviesError = computed(() => this._moviesState().error);

    // ========== ACHIEVEMENTS ==========
    private readonly _achievementsState = signal(createAsyncState<GameAchievement[] | null>(null));
    private readonly _achievementsGameId = signal<number | null>(null);
    private readonly _achievementsNextUrl = signal<string | null>(null);
    private readonly _achievementsPreviousUrl = signal<string | null>(null);
    private readonly _achievementsResponse = signal<AchievementsResponse | null>(null);
    private readonly _achievementsPageCache = new Map<string, AchievementsResponse>();
    readonly gameAchievements = computed(() => this._achievementsState().data);
    readonly gameAchievementsLoading = computed(() => this._achievementsState().loading);
    readonly gameAchievementsError = computed(() => this._achievementsState().error);
    readonly achievementsNextUrl = computed(() => this._achievementsNextUrl());
    readonly achievementsPreviousUrl = computed(() => this._achievementsPreviousUrl());
    readonly achievementsResponse = computed(() => this._achievementsResponse());

    // ========== PLATFORMS ==========
    private readonly _platformsState = signal(createAsyncState<Platform[] | null>(null));
    readonly platforms = computed(() => this._platformsState().data);
    readonly platformsLoading = computed(() => this._platformsState().loading);
    readonly platformsError = computed(() => this._platformsState().error);

    // ========== CREATORS ==========
    private readonly _creatorsState = signal(createAsyncState<Creator[] | null>(null));
    readonly creators = computed(() => this._creatorsState().data);
    readonly creatorsLoading = computed(() => this._creatorsState().loading);
    readonly creatorsError = computed(() => this._creatorsState().error);

    // ========== DEVELOPERS ==========
    private readonly _developersState = signal(createAsyncState<Developer[] | null>(null));
    readonly developers = computed(() => this._developersState().data);
    readonly developersLoading = computed(() => this._developersState().loading);
    readonly developersError = computed(() => this._developersState().error);

    // ========== NEW RELEASES ==========
    private readonly _newReleasesState = signal<NewReleasesState>(createNewReleasesState());
    readonly newReleases = computed(() => this._newReleasesState().data);
    readonly newReleasesLoading = computed(() => this._newReleasesState().loading);
    readonly newReleasesError = computed(() => this._newReleasesState().error);
    // readonly newReleasesCurrentMonth = computed(() => this._newReleasesState().currentMonth);
    // readonly newReleasesCurrentYear = computed(() => this._newReleasesState().currentYear);

    // ========== TOP GAMES ==========
    private readonly _topGamesState = signal(createAsyncState<Game[] | null>(null));
    readonly topGames = computed(() => this._topGamesState().data);
    readonly topGamesLoading = computed(() => this._topGamesState().loading);
    readonly topGamesError = computed(() => this._topGamesState().error);

    // ========== API METHODS ==========

    getGames(page: number = 1, forceRefresh: boolean = false): void {
        if (page === 1 && this._gamesState().data !== null && !forceRefresh) {
            return;
        }

        this._gamesState.update(s => ({ ...s, loading: true, error: false }));

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("page", page.toString())
            .set("page_size", "40");

        this.http.get<GameResponse>(`${this.baseUrl}/games`, { params }).subscribe({
            next: (res) => {
                const results = res.results ?? [];
                this._gamesState.update(s => ({
                    data: page === 1 ? results : [...(s.data || []), ...results],
                    loading: false,
                    error: false,
                }));
            },
            error: () => {
                this._gamesState.set({ data: [], loading: false, error: true });
            },
        });
    }

    getGameDetail(gameId: number, forceRefresh: boolean = false): void {
        if (this._currentGameId() === gameId && this._gameDetailState().data !== null && !forceRefresh) {
            return;
        }

        this._currentGameId.set(gameId);
        this._gameDetailState.set({ data: null, loading: true, error: false });

        const params = new HttpParams().set("key", this.apiKey);

        this.http.get<GameDetail>(`${this.baseUrl}/games/${gameId}`, { params }).subscribe({
            next: (res) => {
                this._gameDetailState.set({ data: res ?? null, loading: false, error: false });
            },
            error: () => {
                this._gameDetailState.set({ data: null, loading: false, error: true });
            },
        });
    }

    getGameScreenshots(gameId: number, forceRefresh: boolean = false): void {
        if (this._screenshotsGameId() === gameId && this._screenshotsState().data !== null && !forceRefresh) {
            return;
        }

        this._screenshotsGameId.set(gameId);
        this._screenshotsState.update(s => ({ ...s, loading: true, error: false }));

        const params = new HttpParams().set("key", this.apiKey);

        this.http.get<ScreenshotResponse>(`${this.baseUrl}/games/${gameId}/screenshots`, { params }).subscribe({
            next: (res) => {
                this._screenshotsResponse.set(res);
                this._screenshotsState.set({ data: res.results ?? [], loading: false, error: false });
            },
            error: () => {
                this._screenshotsResponse.set(null);
                this._screenshotsState.set({ data: [], loading: false, error: true });
            },
        });
    }

    getGameMovies(gameId: number, forceRefresh: boolean = false): void {
        if (this._moviesGameId() === gameId && this._moviesState().data !== null && !forceRefresh) {
            return;
        }

        this._moviesGameId.set(gameId);
        this._moviesState.update(s => ({ ...s, loading: true, error: false }));

        const params = new HttpParams().set("key", this.apiKey);

        this.http.get<MoviesResponse>(`${this.baseUrl}/games/${gameId}/movies`, { params }).subscribe({
            next: (res) => {
                this._moviesState.set({ data: res.results ?? null, loading: false, error: false });
            },
            error: () => {
                this._moviesState.set({ data: null, loading: false, error: true });
            },
        });
    }

    getGameAchievements(gameId: number, forceRefresh: boolean = false): void {
        if (this._achievementsGameId() === gameId && this._achievementsState().data !== null && !forceRefresh) {
            return;
        }

        if (this._achievementsGameId() !== gameId) {
            this._achievementsPageCache.clear();
        }

        this._achievementsGameId.set(gameId);
        this._achievementsState.set({ data: null, loading: true, error: false });

        const url = `${this.baseUrl}/games/${gameId}/achievements?key=${this.apiKey}&page_size=20`;

        this.http.get<AchievementsResponse>(url).subscribe({
            next: (res) => {
                this._achievementsPageCache.set(url, res);
                this._setAchievementsFromResponse(res);
            },
            error: () => {
                this._achievementsResponse.set(null);
                this._achievementsState.set({ data: [], loading: false, error: true });
            },
        });
    }

    fetchAchievementsPage(url: string | null): void {
        if (!url) return;

        const cached = this._achievementsPageCache.get(url);
        if (cached) {
            this._setAchievementsFromResponse(cached);
            return;
        }

        this._achievementsState.update(s => ({ ...s, loading: true }));

        this.http.get<AchievementsResponse>(url).subscribe({
            next: (res) => {
                this._achievementsPageCache.set(url, res);
                this._setAchievementsFromResponse(res);
            },
            error: () => {
                this._achievementsState.update(s => ({ ...s, loading: false }));
            },
        });
    }

    private _setAchievementsFromResponse(res: AchievementsResponse): void {
        this._achievementsResponse.set(res);
        this._achievementsState.set({ data: res.results, loading: false, error: false });
        this._achievementsNextUrl.set(res.next);
        this._achievementsPreviousUrl.set(res.previous);
    }

    getPlatforms(page: number = 1, forceRefresh: boolean = false): void {
        if (page === 1 && this._platformsState().data !== null && !forceRefresh) {
            return;
        }

        this._platformsState.update(s => ({ ...s, loading: true, error: false }));

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("page", page.toString())
            .set("page_size", "20");

        this.http.get<PlatformResponse>(`${this.baseUrl}/platforms`, { params }).subscribe({
            next: (res) => {
                this._platformsState.update(s => ({
                    data: page === 1 ? res.results : [...(s.data || []), ...res.results],
                    loading: false,
                    error: false,
                }));
            },
            error: () => {
                this._platformsState.update(s => ({ ...s, loading: false, error: true }));
            },
        });
    }

    getCreators(page: number = 1, forceRefresh: boolean = false): void {
        if (page === 1 && this._creatorsState().data !== null && !forceRefresh) {
            return;
        }

        this._creatorsState.update(s => ({ ...s, loading: true, error: false }));

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("page", page.toString())
            .set("page_size", "20");

        this.http.get<CreatorResponse>(`${this.baseUrl}/creators`, { params }).subscribe({
            next: (res) => {
                this._creatorsState.update(s => ({
                    data: page === 1 ? res.results : [...(s.data || []), ...res.results],
                    loading: false,
                    error: false,
                }));
            },
            error: () => {
                this._creatorsState.update(s => ({ ...s, loading: false, error: true }));
            },
        });
    }

    getDevelopers(page: number = 1, forceRefresh: boolean = false): void {
        if (page === 1 && this._developersState().data !== null && !forceRefresh) {
            return;
        }

        this._developersState.update(s => ({ ...s, loading: true, error: false }));

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("page", page.toString())
            .set("page_size", "40");

        this.http.get<DeveloperResponse>(`${this.baseUrl}/developers`, { params }).subscribe({
            next: (res) => {
                this._developersState.update(s => ({
                    data: page === 1 ? res.results : [...(s.data || []), ...res.results],
                    loading: false,
                    error: false,
                }));
            },
            error: () => {
                this._developersState.update(s => ({ ...s, loading: false, error: true }));
            },
        });
    }

    getNewReleases(year: number, month: number, page: number = 1, forceRefresh: boolean = false): void {
      const state = this._newReleasesState();

      // Skip se abbiamo già i dati per questo mese
      if (page === 1 && !forceRefresh && state.data !== null && state.currentMonth === month && state.currentYear === year) {
        return;
      }

      this._newReleasesState.update(s => ({ ...s, loading: true, error: false }));

      // Range visibile della griglia calendario (42 celle = 6 settimane)
      const firstOfMonth = new Date(year, month, 1);
      const startPadding = firstOfMonth.getDay();
      const startDate = new Date(year, month, 1 - startPadding);
      const endDate = new Date(year, month, 42 - startPadding);

      const params = new HttpParams()
        .set("key", this.apiKey)
        .set("dates", `${this.formatDate(startDate)},${this.formatDate(endDate)}`)
        .set("ordering", "released")
        .set("page", page.toString())
        .set("page_size", "40");

      this.http.get<GameResponse>(`${this.baseUrl}/games`, { params }).subscribe({
        next: (res) => {
          const results = res.results ?? [];
          this._newReleasesState.update(s => ({
            data: (page === 1 || s.currentMonth !== month || s.currentYear !== year)
              ? results
              : [...(s.data || []), ...results],
            loading: false,
            error: false,
            currentMonth: month,
            currentYear: year
          }));
        },
        error: () => {
          this._newReleasesState.set({
            data: [],
            loading: false,
            error: true,
            currentMonth: month,
            currentYear: year
          });
        },
      });
    }

    private formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    getTopGames(page: number = 1, forceRefresh: boolean = false): void {
        if (page === 1 && this._topGamesState().data !== null && !forceRefresh) {
            return;
        }

        this._topGamesState.update(s => ({ ...s, loading: true, error: false }));

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("ordering", "-rating")
            .set("metacritic", "80,100")
            .set("page", page.toString())
            .set("page_size", "40");

        this.http.get<GameResponse>(`${this.baseUrl}/games`, { params }).subscribe({
            next: (res) => {
                const results = res.results ?? [];
                this._topGamesState.update(s => ({
                    data: page === 1 ? results : [...(s.data || []), ...results],
                    loading: false,
                    error: false,
                }));
            },
            error: () => {
                this._topGamesState.set({ data: [], loading: false, error: true });
            },
        });
    }

    searchGames(query: string): void {
        this._gamesState.update(s => ({ ...s, loading: true, error: false }));

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("search", query)
            .set("search_precise", "true")
            .set("page_size", "40");

        this.http.get<GameResponse>(`${this.baseUrl}/games`, { params }).subscribe({
            next: (res) => {
                this._gamesState.set({ data: res.results || [], loading: false, error: false });
            },
            error: () => {
                this._gamesState.set({ data: [], loading: false, error: true });
            },
        });
    }
}

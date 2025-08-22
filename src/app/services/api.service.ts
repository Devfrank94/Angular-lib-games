import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { signal } from "@angular/core";
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
    GameDetail
} from "../models/game.interface";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = "https://api.rawg.io/api";
    private readonly apiKey = environment.apiKey;

    // Games
    games = signal<Game[] | null>(null);
    gamesLoading = signal(false);
    gamesError = signal(false);

    // Game Detail
    gameDetail = signal<GameDetail | null>(null);
    gameDetailLoading = signal(false);
    gameDetailError = signal(false);

    // Platforms
    platforms = signal<Platform[] | null>(null);
    platformsLoading = signal(false);
    platformsError = signal(false);

    // Creators
    creators = signal<Creator[] | null>(null);
    creatorsLoading = signal(false);
    creatorsError = signal(false);

    // Developers
    developers = signal<Developer[] | null>(null);
    developersLoading = signal(false);
    developersError = signal(false);

    // New releases
    newReleases = signal<Game[] | null>(null);
    newReleasesLoading = signal(false);
    newReleasesError = signal(false);

    // Top games
    topGames = signal<Game[] | null>(null);
    topGamesLoading = signal(false);
    topGamesError = signal(false);

    getGames(page: number = 1): void {
        this.gamesLoading.set(true);
        this.gamesError.set(false);

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("page", page.toString())
            .set("page_size", "40");

        this.http
            .get<GameResponse>(`${this.baseUrl}/games`, { params })
            .subscribe({
                next: (res) => {
                    const results = res.results ?? [];
                    page === 1
                        ? this.games.set(results)
                        : this.games.update((current) => [
                              ...(current || []),
                              ...results,
                          ]);
                    this.gamesLoading.set(false);
                },
                error: () => {
                    this.games.set([]);
                    this.gamesError.set(true);
                    this.gamesLoading.set(false);
                },
            });
    }

    getGameDetail(gameId: number): void {
      this.gameDetail.set(null);
      this.gameDetailLoading.set(true);
      this.gameDetailError.set(false);

      const params = new HttpParams().set('key', this.apiKey);

      this.http.get<GameDetail>(`${this.baseUrl}/games/${gameId}`, { params })
        .subscribe({
          next: (res) => {
            this.gameDetail.set(res ?? null);
            this.gameDetailLoading.set(false);
            console.log('Gioco Caricato ---->:', res);
          },
          error: () => {
            this.gameDetail.set(null);
            this.gameDetailError.set(true);
            this.gameDetailLoading.set(false);
          }
        });
    }

    getPlatforms(page: number = 1): void {
        this.platformsLoading.set(true);
        this.platformsError.set(false);

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("page", page.toString())
            .set("page_size", "20");

        this.http
            .get<PlatformResponse>(`${this.baseUrl}/platforms`, { params })
            .subscribe({
                next: (res) => {
                    page === 1
                        ? this.platforms.set(res.results)
                        : this.platforms.update((current) =>
                              current
                                  ? [...current, ...res.results]
                                  : res.results
                          );
                    this.platformsLoading.set(false);
                },
                error: () => {
                    this.platformsError.set(true);
                    this.platformsLoading.set(false);
                },
            });
    }

    getCreators(page: number = 1): void {
        this.creatorsLoading.set(true);
        this.creatorsError.set(false);

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("page", page.toString())
            .set("page_size", "20");

        this.http
            .get<CreatorResponse>(`${this.baseUrl}/creators`, { params })
            .subscribe({
                next: (res) => {
                    page === 1
                        ? this.creators.set(res.results)
                        : this.creators.update((current) =>
                              current
                                  ? [...current, ...res.results]
                                  : res.results
                          );
                    this.creatorsLoading.set(false);
                },
                error: () => {
                    this.creatorsError.set(true);
                    this.creatorsLoading.set(false);
                },
            });
    }

    getDevelopers(page: number = 1): void {
        this.developersLoading.set(true);
        this.developersError.set(false);

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("page", page.toString())
            .set("page_size", "20");

        this.http
            .get<DeveloperResponse>(`${this.baseUrl}/developers`, { params })
            .subscribe({
                next: (res) => {
                    page === 1
                        ? this.developers.set(res.results)
                        : this.developers.update((current) =>
                              current
                                  ? [...current, ...res.results]
                                  : res.results
                          );
                    this.developersLoading.set(false);
                },
                error: () => {
                    this.developersError.set(true);
                    this.developersLoading.set(false);
                },
            });
    }

    getNewReleases(page: number = 1): void {
        this.newReleasesLoading.set(true);
        this.newReleasesError.set(false);

        const currentDate = new Date();
        const monthAgo = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
        );

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set(
                "dates",
                `${monthAgo.toISOString().split("T")[0]},${
                    currentDate.toISOString().split("T")[0]
                }`
            )
            .set("ordering", "-released")
            .set("page", page.toString())
            .set("page_size", "40");

        this.http
            .get<GameResponse>(`${this.baseUrl}/games`, { params })
            .subscribe({
                next: (res) => {
                    const results = res.results ?? [];
                    page === 1
                        ? this.newReleases.set(results)
                        : this.newReleases.update((current) => [
                              ...(current || []),
                              ...results,
                          ]);
                    this.newReleasesLoading.set(false);
                },
                error: () => {
                    this.newReleases.set([]);
                    this.newReleasesError.set(true);
                    this.newReleasesLoading.set(false);
                },
            });
    }

    getTopGames(page: number = 1): void {
        this.topGamesLoading.set(true);
        this.topGamesError.set(false);

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("ordering", "-rating")
            .set("metacritic", "80,100")
            .set("page", page.toString())
            .set("page_size", "40");

        this.http
            .get<GameResponse>(`${this.baseUrl}/games`, { params })
            .subscribe({
                next: (res) => {
                    const results = res.results ?? [];
                    page === 1
                        ? this.topGames.set(results)
                        : this.topGames.update((current) => [
                              ...(current || []),
                              ...results,
                          ]);
                    this.topGamesLoading.set(false);
                },
                error: () => {
                    this.topGames.set([]);
                    this.topGamesError.set(true);
                    this.topGamesLoading.set(false);
                },
            });
    }

    searchGames(query: string): void {
        this.gamesLoading.set(true);
        this.gamesError.set(false);

        const params = new HttpParams()
            .set("key", this.apiKey)
            .set("search", query)
            .set("search_precise", true)
            .set("page_size", "40");

        this.http
            .get<GameResponse>(`${this.baseUrl}/games`, { params })
            .subscribe({
                next: (res) => {
                    this.games.set(res.results || []);
                    this.gamesLoading.set(false);
                },
                error: () => {
                    this.games.set([]);
                    this.gamesError.set(true);
                    this.gamesLoading.set(false);
                },
            });
    }
}

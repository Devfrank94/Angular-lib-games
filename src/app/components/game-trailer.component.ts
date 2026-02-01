import { CommonModule } from "@angular/common";
import {
    Component,
    input,
    inject,
    computed,
    signal,
    OnInit,
} from "@angular/core";
import { GameMovie } from "../models/game.interface";
import { ApiService } from "../services/api.service";
import { LoadingComponent } from "./loading.component";

@Component({
  selector: 'app-game-trailer',
  imports: [CommonModule, LoadingComponent],
  template: `

  <!-- Loading State -->
      @if (gameDetail(); as game) {
        @if (moviesLoading()) {
          <div class="flex justify-center p-8">
            <app-loading />
          </div>
        }
       @else if (movies() && movies().length > 0) {
            <!-- Trailers Grid -->
            @if (movies(); as movieList) {
              <div class="rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                @for (movie of movieList; track movie.id) {
                  <div>
                    <figure class="aspect-video rounded-lg overflow-hidden">
                      <video
                        controls
                        class="w-full h-full object-cover"
                        [poster]="movie.preview"
                        (click)="selectedMovie.set(movie)"
                      >
                        <source [src]="getVideoUrl(movie)" type="video/mp4" />
                      </video>
                    </figure>
                    <div class="p-3">
                      <p class="text-sm font-medium truncate">{{ movie.name }}</p>
                    </div>
                  </div>
                }
              </div>
            }

            <!-- Error State -->
            @if (moviesError()) {
              <div class="alert alert-error flex-center-center">
                <div>
                  <p class="text-lg text-white">
                    Errore nel caricamento dei trailer
                  </p>
                </div>
                <button class="btn btn-sm" (click)="loadMovies()">
                  Riprova
                </button>
              </div>
            }
        }

      @else {
        <div class="alert alert-accent">Nessun trailer disponibile per questo gioco.</div>
      }
    }
  `,
  styles: ``
})
export class GameTrailerComponent implements OnInit {

  private apiService = inject(ApiService);

  gameId = input.required<number>();
  gameName = input('Game');

  movies = this.apiService.movies;
  moviesLoading = this.apiService.moviesLoading;
  moviesError = this.apiService.moviesError;
  gameDetail = this.apiService.gameDetail;

  selectedMovie = signal<GameMovie | null>(null);

  moviesLoaded = computed(() => this.movies() !== null);

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    const id = this.gameId();
    if (id) {
      this.apiService.getGameMovies(id);
    }
  }

  // Ottieni l'URL del video, preferendo la qualità massima.
  getVideoUrl(movie: GameMovie): string {
    return movie.data['max'] || Object.values(movie.data)[0] || '';
  }

}

import { Component, input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Game } from '../models/game.interface';
import { RatingStarComponent } from "./rating-star.component";
import { StatusStatsComponent } from "./status-stats.component";
import { GameScreenshotsComponent } from "./game-screenshots.component";
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GameTrailerComponent } from "./game-trailer.component";
import { AchievementsComponent } from './achievements.component';

@Component({
  selector: 'app-card-detail',
  imports: [CommonModule, RatingStarComponent, StatusStatsComponent, GameScreenshotsComponent, GameTrailerComponent, AchievementsComponent],
  template: `
    <div class="card bg-base-300 shadow-xl rounded-lg">
      <div>
        <figure>
          <img
            [src]="game().background_image"
            (error)="handleImageError($event)"
            [alt]="game().name"
            class="w-full object-cover rounded-t-lg max-h-300 mask-b-from-40% mask-b-to-90%"
            loading="lazy" />
        </figure>
      </div>
      <div class="card-body p-5 lg:p-8">
        <h1 class="card-title md:text-3xl">{{ game().name }}
        <span *ngIf="isNewGame()" data-theme="light" class="ms-2 badge badge-secondary">NEW</span>
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">Informazioni</h3>
            <ul class="space-y-3 text-md">
              <li><strong>Data rilascio:</strong> {{ game().released | date:'dd-MM-yyyy' }}</li>
              <li><strong>Data ultimo aggiornamento:</strong> {{ game()?.updated || 'N/A' | date:'dd-MM-yyyy' }}</li>
              <li><app-rating-star [rating]="game().rating" /></li>
              <li><strong>Metacritic:</strong><span class="ms-2 badge badge-warning badge-xs lg:badge-md">{{ game().metacritic || 'N/A' }}</span></li>
              <li><strong>Tempo di gioco:</strong> {{ game().playtime }} ore</li>
              <li><strong>Recensioni:</strong> {{ game().ratings_count }}</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Generi</h3>
            <div class="flex flex-wrap gap-2 mb-4">
              @for (genre of game().genres; track genre.id) {
                <span class="badge text-white sm:badge-lg badge-accent">{{ genre.name }}</span>
              }
            </div>

            <h3 class="text-lg font-semibold mb-2">Piattaforme</h3>
            <div class="flex flex-wrap gap-3 mb-3 w-fit bg-accent py-2 px-3 sm:py-2 sm:px-4 rounded-full">
              @for (parent of game().parent_platforms; track parent.platform.id) {
                <a class="tooltip tooltip-hover tooltip-bottom" [attr.data-tip]="parent.platform.name">
                    <img
                      [src]="platformIcon(parent.platform.name)"
                      [alt]="parent.platform.name"
                      class="w-4 h-4 sm:w-5 sm:h-5 invert"
                      loading="lazy"
                    />
                  </a>
                }
              </div>
              <div>
                @if (game()?.website) {
                  <h3 class="text-lg font-semibold mb-2">Sito web</h3>
                  <a [href]="game().website" target="_blank" class="link link-hover link-accent"><p class="truncate">{{ game().website }}</p></a>
                }
              </div>
            </div>
          </div>

          <!-- Statistiche -->
          <div class="flex justify-center my-4">
            <app-status-stats [game]="game()" />
          </div>

          <div class="my-4">
            <div tabindex="0" class="collapse collapse-arrow bg-base-200 border-base-300 border">
                <input type="checkbox" class="peer" (change)="showAchievements.set(true)" />
                <div class="flex items-center collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                  <h3 class="text-lg font-semibold ms-3">Obiettivi ({{ game()?.achievements_count ?? 0 }})</h3>
                </div>
                <div class="collapse-content">
                  @if (showAchievements()) {
                    <app-achievements [gameId]="game().id" />
                  }
                </div>
            </div>
          </div>

          <div class="my-2">
            <div tabindex="0" class="collapse collapse-arrow bg-base-200 border-base-300 border">
                <input type="checkbox" class="peer" (change)="showTrailers.set(true)" />
                <div class="flex items-center collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <h3 class="text-lg font-semibold ms-3">Trailers ({{ game()?.movies_count ?? 0 }})</h3>
                </div>
                <div class="collapse-content">
                  @if (showTrailers()) {
                    <app-game-trailer [gameId]="gameId()" />
                  }
                </div>
            </div>
          </div>

          <div class="my-2">
            <div tabindex="0" class="collapse collapse-arrow bg-base-200 border-base-300 border">
                <input type="checkbox" class="peer" (change)="showScreenshots.set(true)" />
                <div class="flex items-center collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                    <h3 class="text-lg font-semibold ms-3">Screenshots ({{ game()?.screenshots_count ?? 0 }})</h3>
                </div>
                <div class="collapse-content">
                  @if (showScreenshots()) {
                    <app-game-screenshots [gameId]="game().id" />
                  }
                </div>
            </div>
          </div>

        @if (game()?.description) {
          <div class="mt-6">
            <h3 class="text-lg font-semibold">Descrizione</h3>
            <p class="mb-2 text-xs truncate">(Le descrizioni potrebbero essere in lingua straniera)</p>
            <div
              class="text-md leading-relaxed prose prose-sm max-w-none"
              [innerHTML]="game().description"
            ></div>
          </div>
        }

        @if (game()?.developers && game()?.developers.length > 0) {
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Sviluppatori</h3>
            <div class="flex flex-wrap gap-2">
              @for (dev of game().developers; track dev.id) {
                <span class="badge text-white sm:badge-lg badge-accent">{{ dev.name }}</span>
              }
            </div>
          </div>
        }

        @if (game()?.publishers && game()?.publishers.length > 0) {
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Publisher</h3>
            <div class="flex flex-wrap gap-2">
              @for (pub of game().publishers; track pub.id) {
                <span class="badge text-white sm:badge-lg badge-accent">{{ pub.name }}</span>
              }
            </div>
          </div>
        }

      </div>
    </div>
  `,
  styles: ``
})
export class CardDetailComponent {
  readonly apiService = inject(ApiService);

  game = input.required<Game>();

  showAchievements = signal(false);
  showTrailers = signal(false);
  showScreenshots = signal(false);

  private readonly platformIconMap = new Map([

    ['PlayStation', 'assets/platforms/playstation.svg'],
    ['Xbox', 'assets/platforms/xbox.svg'],
    ['Nintendo', 'assets/platforms/nintendo.svg'],
    ['PC', 'assets/platforms/windows.svg'],
    ['Apple Macintosh', 'assets/platforms/mac.svg'],
    ['Linux', 'assets/platforms/linux.svg'],
    ['Steam', 'assets/platforms/steam.svg'],
    ['Epic Games Store', 'assets/platforms/epic.svg'],
    ['Web', 'assets/platforms/web.svg'],
    ['iOS', 'assets/platforms/ios.svg'],
    ['Android', 'assets/platforms/android.svg']
  ]);

  platformIcon = (platformName: string) => {
    return this.platformIconMap.get(platformName) || null;
  };

  isNewGame(): boolean {
    const game = this.apiService.gameDetail();
    if (!game?.released) return false;
    const releaseDate = new Date(game.released);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return releaseDate > threeMonthsAgo;
  }

  private route = inject(ActivatedRoute);
  gameId = toSignal(this.route.params.pipe(
    map(params => +params['id'])
  ));

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder-img-games.png';
  }

}

import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Game, GameDetail } from '../models/game.interface';
import { RatingStarComponent } from "./rating-star.component";
import { StatusStatsComponent } from "./status-stats.component";
import { GameScreenshotsComponent } from "./game-screenshots.component";
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-card-detail',
  imports: [CommonModule, RatingStarComponent, StatusStatsComponent, GameScreenshotsComponent],
  template: `
    <div class="card bg-base-300 shadow-xl rounded-lg">
      <!-- <div class="hidden lg:block p-5">
        <div class="flex-center-center min-h-[300px] shadow-xl rounded-lg ">
          <h1 class="text-[10rem] w-full font-extrabold text-center bg-no-repeat bg-center bg-clip-text text-transparent"
              [style.background-image]="'url(' + game().background_image + ')'">
            {{ game().name }}
          </h1>
        </div>
      </div> -->
      <div>
        <!-- TODO:fix background image -->
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
                      class="w-4 h-4 sm:w-5 sm:h-5"
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

          <div class="flex my-4">
            <!-- <pre><code>{{ game() | json }}</code></pre> -->
            <app-game-screenshots [gameId]="game().id" />
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
export class CardDetailComponent{

  game = input.required<Game>();

  readonly apiService = inject(ApiService);

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
selectedGameId: any;

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

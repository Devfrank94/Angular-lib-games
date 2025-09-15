import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Game, GameDetail } from '../models/game.interface';
import { RatingStarComponent } from "./rating-star.component";

@Component({
  selector: 'app-card-detail',
  imports: [CommonModule, RatingStarComponent],
  template: `
    <div class="card bg-base-300 shadow-xl">
      <figure>
        <img
          [src]="game().background_image"
          (error)="handleImageError($event)"
          [alt]="game().name"
          class="w-full object-cover"
          loading="lazy" />
      </figure>
      <div class="card-body">
        <h1 class="card-title text-3xl">{{ game().name }}
        <span *ngIf="isNewGame()" data-theme="light" class="ms-2 badge badge-secondary">NEW</span>
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">Informazioni</h3>
            <!-- <pre><code>{{ game().updated | json }}</code></pre> -->
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
                <span class="badge sm:badge-lg badge-accent">{{ genre.name }}</span>
              }
            </div>

            <h3 class="text-lg font-semibold mb-2">Piattaforme</h3>
            <div class="flex flex-wrap gap-3 w-fit bg-accent py-2 px-3 sm:py-2 sm:px-4 rounded-full">
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
                <!-- @for (parent of game().platforms ; track parent.platform.id) {
                <img [src]="parent.platform.image_background">
                } -->
            </div>
          </div>
        </div>

        @if (game()?.description) {
          <div class="mt-6">
            <h3 class="text-lg font-semibold mb-2">Descrizione</h3>
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
                <span class="badge sm:badge-lg badge-accent">{{ dev.name }}</span>
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

  isNewGame(): boolean {
    const game = this.apiService.gameDetail();
    if (!game?.released) return false;
    const releaseDate = new Date(game.released);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return releaseDate > threeMonthsAgo;
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder-img-games.png';
  }

}

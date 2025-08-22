import { Component,input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Game } from '../models/game.interface';
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
            <ul class="space-y-3 text-sm">
              <li><strong>Data rilascio:</strong> {{ game().released }}</li>
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
                <span class="badge badge-accent">{{ genre.name }}</span>
              }
            </div>

            <h3 class="text-lg font-semibold mb-2">Piattaforme</h3>
            <div class="flex flex-wrap gap-2">
              @for (platform of game().platforms.slice(0, 10); track platform.platform.id) {
                <span class="badge badge-outline">{{ platform.platform.name }}</span>
              }
            </div>
          </div>
        </div>

        @if (game()?.description) {
          <div class="mt-6">
            <h3 class="text-lg font-semibold mb-2">Descrizione</h3>
            <div 
              class="text-sm leading-relaxed prose prose-sm max-w-none"
              [innerHTML]="game().description"
            ></div>
          </div>
        }

        @if (game()?.developers && game()?.developers.length > 0) {
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Sviluppatori</h3>
            <div class="flex flex-wrap gap-2">
              @for (dev of game().developers; track dev.id) {
                <span class="badge badge-accent">{{ dev.name }}</span>
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

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

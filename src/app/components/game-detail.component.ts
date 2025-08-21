import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      @if (apiService.gameDetailLoading()) {
        <div class="flex justify-center items-center h-64">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      } @else if (apiService.gameDetailError()) {
        <div class="alert alert-error">
          <span>Errore nel caricamento del dettaglio gioco</span>
        </div>
      } @else if (apiService.gameDetail()) {
        @if (apiService.gameDetail(); as game) {
          <div class="mx-auto">
            <button class="btn btn-ghost mb-4" (click)="goBack()">
              ← Torna indietro
            </button>

            <div class="card bg-base-300 shadow-xl">
              <figure>
                <img 
                  [src]="game.background_image"
                  (error)="handleImageError($event)"
                  [alt]="game.name" 
                  class="w-full object-cover"
                  loading="lazy" />
              </figure>
              <div class="card-body">
                <h1 class="text-3xl font-bold">{{ game.name }}</h1>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 class="text-lg font-semibold mb-2">Informazioni</h3>
                    <ul class="space-y-2 text-sm">
                      <li><strong>Data rilascio:</strong> {{ game.released }}</li>
                      <li><strong>Rating:</strong> {{ game.rating }}/{{ game.rating_top }}</li>
                      <li><strong>Metacritic:</strong> {{ game.metacritic || 'N/A' }}</li>
                      <li><strong>Tempo di gioco:</strong> {{ game.playtime }} ore</li>
                      <li><strong>Recensioni:</strong> {{ game.ratings_count }}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold mb-2">Generi</h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                      @for (genre of game.genres; track genre.id) {
                        <span class="badge badge-primary">{{ genre.name }}</span>
                      }
                    </div>

                    <h3 class="text-lg font-semibold mb-2">Piattaforme</h3>
                    <div class="flex flex-wrap gap-2">
                      @for (platform of game.platforms.slice(0, 4); track platform.platform.id) {
                        <span class="badge badge-outline">{{ platform.platform.name }}</span>
                      }
                    </div>
                  </div>
                </div>

                @if (game.description_raw) {
                  <div class="mt-6">
                    <h3 class="text-lg font-semibold mb-2">Descrizione</h3>
                    <p class="text-sm leading-relaxed">{{ game.description_raw }}</p>
                  </div>
                }

                @if (game.developers && game.developers.length > 0) {
                  <div class="mt-4">
                    <h3 class="text-lg font-semibold mb-2">Sviluppatori</h3>
                    <div class="flex flex-wrap gap-2">
                      @for (dev of game.developers; track dev.id) {
                        <span class="badge badge-secondary">{{ dev.name }}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: ``
})
export class GameDetailComponent implements OnInit {
  readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const gameId = this.route.snapshot.params['id'];
    if (gameId) {
      this.apiService.getGameDetail(+gameId);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder-img-games.png';
  }
}

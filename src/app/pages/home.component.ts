import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CardComponent } from "../components/card.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { LoadingComponent } from "../components/loading.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent, LoadingComponent],
  template: `
  <div class="mx-auto sm:px-2">
      <h1 class="text-4xl font-bold text-center mb-3">Gaming Hub</h1>

      <div class="flex justify-center mb-6">
        <div class="tabs tabs-boxed">
          <button
            class="tab"
            [class.tab-active]="currentFilter() === 'all'"
            (click)="setFilter('all')"
          >
            Tutti i giochi
          </button>
          <button
            class="tab"
            [class.tab-active]="currentFilter() === 'popular'"
            (click)="setFilter('popular')"
          >
            Popolari
          </button>
        </div>
      </div>

      @if (apiService.gamesLoading()) {
        <div class="flex-center-center h-64">
          <app-loading />
        </div>
      } @else if (apiService.gamesError()) {
        <div class="alert alert-error">
          <span>Errore nel caricamento dei dati</span>
        </div>
      } @else if (filteredGames()) {
        <div class="glass grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 px-2 sm:py-2 rounded-xl shadow-xl">
          <app-card />
          <app-card />
          <app-card />
          <app-card />
        <!-- @for (game of filteredGames(); track game.id) {
            <app-card [game]="game" />
            <pre>{{ game | json }}</pre>
          } -->
        </div>

        @if (filteredGames()!.length === 0) {
          <div class="text-center py-12">
            <p class="text-lg text-base-content/70">Nessun gioco trovato</p>
          </div>
        }

        <div class="flex justify-center mt-8">
          <button
            class="btn btn-accent text-lg sm:text-md text-white mt-3 shadow-lg"
            [disabled]="apiService.gamesLoading()"
            (click)="loadMore()"
          >
            @if (apiService.gamesLoading()) {
              <app-loading />
            }
            Carica altri
          </button>
        </div>
      }
  </div>


  `,
  styles: ``
})
export default class HomeComponent implements OnInit {
   readonly apiService = inject(ApiService);

  private readonly currentPage = signal(1);
  readonly currentFilter = signal<'all' | 'popular'>('all');

  readonly filteredGames = computed(() => {
    const games = this.apiService.games();
    if (!games) return null;

    const filter = this.currentFilter();
    if (filter === 'popular') {
      return games.filter(game => game.rating >= 4.0);
    }

    return games;
  });

  ngOnInit(): void {
    this.apiService.getGames();
  }

  setFilter(filter: 'all' | 'popular'): void {
    this.currentFilter.set(filter);
  }

  loadMore(): void {
    this.currentPage.update(page => page + 1);
    this.apiService.getGames(this.currentPage());
  }

}

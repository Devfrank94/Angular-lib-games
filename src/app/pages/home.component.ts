import { Component, inject, signal, computed, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from "../components/card.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ErrorgenericComponent } from "../components/error-generic.component";
import { SkeletonComponent } from "../components/skeleton.component";


@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent, ErrorgenericComponent, SkeletonComponent],
  template: `
  <div class="mx-auto sm:px-2">
    <div class="flex justify-center mt-2 mb-6">
      <div role="tablist" class="font-bold tabs tabs-border bg-base-300 rounded-md shadow-md gap-3 tabs-md sm:tabs-xl">
        <button
          role="tab"
          class="tab"
          [class.tab-active]="currentFilter() === 'all'"
          (click)="setFilter('all')"
        >
          Tutti i giochi
        </button>
        <button
          role="tab"
          class="tab"
          [class.tab-active]="currentFilter() === 'popular'"
          (click)="setFilter('popular')"
        >
          Popolari
        </button>
      </div>
    </div>

    @if (apiService.gamesLoading()) {
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 glass p-2 rounded-xl shadow-xl">
        @for (skeleton of skeletonArray(); track $index) {
          <app-skeleton />
        }
      </div>
    } @else if (apiService.gamesError()) {
      <app-error-generic />

    } @else if ((filteredGames() || []).length > 0) {
        <div class="masonry-grid glass p-2 rounded-xl shadow-xl">
          @for (game of filteredGames() || []; track game.id) {
            <div class="masonry-item w-full">
              <app-card [game]="game" />
            </div>
          }
        </div>

      @if (filteredGames()!.length === 0) {
        <div class="text-center py-12">
          <p class="text-xl font-bold text-base-content">Nessun gioco trovato</p>
        </div>
      }

      <div *ngIf="filteredGames()!.length !== 0" class="flex justify-center my-5">
        @if (apiService.gamesLoading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 glass px-2 sm:py-2 rounded-xl shadow-xl">
            @for (skeleton of skeletonArray(); track $index) {
              <app-skeleton />
            }
          </div>
        }
        <div>
          <button class="btn btn-accent btn-lg text-lg sm:text-md text-white mt-3 shadow-lg"
            [disabled]="apiService.gamesLoading()"
            (click)="loadMore()"
            >
            Carica altri
          </button>
        </div>
      </div>
    }
  </div>


  `,
  styles: `
  `
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

  // Array Skeleton
  skeletonArray = computed(() => Array(15).fill(null));

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

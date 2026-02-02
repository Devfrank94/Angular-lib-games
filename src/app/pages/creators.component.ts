import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { ErrorgenericComponent } from '../components/error-generic.component';
import { LoadingComponent } from '../components/loading.component';

@Component({
  selector: 'app-creators',
  imports: [CommonModule, ErrorgenericComponent, LoadingComponent],
  template: `
    @if (creatorsLoading()) {
      <div class="flex-center-center p-8">
        <app-loading />
      </div>
    } @else if (creatorsError()) {
      <app-error-generic/>
    } @else {
      <div class="glass rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        @for (creator of creators(); track creator.id) {
          <div class="stats stats-vertical lg:stats-horizontal bg-base-200 shadow-md">

          <!-- Creator Profile -->
          <div class="stat">
            <div class="stat-figure text-secondary">
              <div class="avatar">
                <div class="w-16 rounded-full">
                  <img [src]="creator.image" [alt]="creator.name" />
                </div>
              </div>
            </div>
            <div class="stat-value text-xl">{{ creator.name }}</div>
            <div class="stat-title text-info">{{ primaryPosition(creator) }}</div>
            <div class="stat-desc text-secondary text-lg">{{'@'}}{{ creator.slug }}</div>
          </div>

          <!-- Total Games -->
          <div class="stat">
            <div class="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
              </svg>

            </div>
            <div class="stat-title">Giochi totali</div>
            <div class="stat-value text-accent">{{ creator.games_count }}</div>
            <div class="stat-desc">{{ creator.positions.length }} ruolo/i</div>
          </div>

          <!-- Top Game Popularity -->
          <div class="stat">
            <div class="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
              </svg>

            </div>
            <div class="stat-title">Agg. tra i Top Games</div>
            <div class="stat-value text-accent">{{ formatNumber(getTopGame(creator).added) }}</div>
            <div class="stat-desc">{{ getTopGame(creator).name }}</div>
          </div>

        </div>
        }
      </div>
    }
  `,
  styles: ``,
})
export default class CreatorsComponent implements OnInit {

  readonly apiService = inject(ApiService);

  creators = this.apiService.creators;
  creatorsLoading = this.apiService.creatorsLoading;
  creatorsError = this.apiService.creatorsError;

  getTopGame(creator: any) {
    if (!creator.games?.length) return { added: 0, name: 'N/A' };
    return creator.games.reduce((max: any, game: any) =>
      game.added > max.added ? game : max, creator.games[0]
    );
  }

  primaryPosition(creator: any): string {
    return creator.positions?.[0]?.name || 'Creator';
  }

  formatNumber(num: number): string {
    return num >= 1000000 ? `${(num / 1000000).toFixed(1)}M` :
           num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
  }

  ngOnInit(): void {
    this.apiService.getCreators();
  }

}

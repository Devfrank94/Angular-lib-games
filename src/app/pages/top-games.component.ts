import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorgenericComponent } from '../components/error-generic.component';
import { LoadingComponent } from '../components/loading.component';
import { ApiService } from '../services/api.service';
import { RatingStarComponent } from '../components/rating-star.component';

@Component({
  selector: 'app-top-games',
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorgenericComponent,
    RatingStarComponent,
  ],
  template: `
    @if (topGamesLoading()) {
      <div class="flex-center-center p-8">
        <app-loading />
      </div>
    } @else if (topGamesError()) {
      <app-error-generic />
    } @else {
      <div class="glass p-2 rounded-xl shadow-xl">
        <div
          class="overflow-x-auto rounded-box border border-base-content/5 bg-base-200"
        >
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Gioco</th>
                <th class="hidden sm:table-cell">Metacritic</th>
                <th class="hidden lg:table-cell">Rating</th>
                <th class="hidden lg:table-cell">Distribuzione</th>
                <th class="hidden md:table-cell">Piattaforme</th>
                <th></th>
              </tr>
            </thead>

            @for (game of topGames() ?? []; track game.id; let i = $index) {
              @if (game.rating > 0) {
                <tbody class="hover:bg-base-300">
                  <tr>
                    <!-- Rank -->
                    <th
                      class="font-black text-base w-10"
                      [class]="rankClass(i)"
                    >
                      #{{ i + 1 }}
                    </th>
                    <!-- Gioco: immagine + nome + generi -->
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="avatar">
                          <div class="mask mask-circle h-12 w-12">
                            <img
                              [src]="game.background_image"
                              [alt]="game.name"
                              (error)="handleImageError($event)"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div>
                          <div class="font-bold line-clamp-2 max-w-[12rem]">
                            {{ game.name }}
                          </div>
                          <div class="flex flex-wrap gap-1 mt-0.5">
                            @for (
                              genre of game.genres.slice(0, 2);
                              track genre.id
                            ) {
                              <span
                                class="badge badge-xs bg-accent text-white"
                                >{{ genre.name }}</span
                              >
                            }
                          </div>
                          <div
                            class="text-xs text-base-content/50 mt-0.5 sm:hidden"
                          >
                            {{ game.released | date: 'dd/MM/yyyy' }}
                          </div>
                        </div>
                      </div>
                    </td>

                    <!-- Metacritic + data -->
                    <td class="hidden sm:table-cell">
                      @if (game.metacritic) {
                        <span
                          class="badge badge-md font-bold"
                          [class.badge-success]="game.metacritic >= 75"
                          [class.badge-warning]="
                            game.metacritic >= 50 && game.metacritic < 75
                          "
                          [class.badge-error]="game.metacritic < 50"
                        >
                          {{ game.metacritic }}
                        </span>
                      }
                      <div class="text-xs text-base-content/50 mt-1">
                        {{ game.released | date: 'dd/MM/yyyy' }}
                      </div>
                    </td>
                    <!-- Rating stars -->
                    <td class="hidden lg:table-cell">
                      <app-rating-star [rating]="game.rating" />
                    </td>
                    <!-- Distribuzione rating -->
                    <td class="hidden lg:table-cell">
                      @if (game.ratings?.length) {
                        <div class="flex flex-col gap-0.5 w-36">
                          @for (r of game.ratings; track r.id) {
                            <div class="flex items-center gap-1.5 text-xs">
                              <span
                                class="w-14 shrink-0 truncate text-base-content/60 capitalize"
                                >{{ ratingLabel(r.title) }}</span
                              >
                              <div
                                class="flex-1 h-1.5 rounded-full bg-base-300 overflow-hidden"
                              >
                                <div
                                  class="h-full rounded-full transition-all"
                                  [class]="ratingBarClass(r.title)"
                                  [style.width.%]="r.percent"
                                ></div>
                              </div>
                              <span
                                class="text-base-content/40 w-7 text-right shrink-0"
                              >
                                {{ r.percent | number: '1.0-0' }}%
                              </span>
                            </div>
                          }
                        </div>
                      }
                    </td>
                    <!-- Piattaforme -->
                    <td class="hidden md:table-cell">
                      <div class="flex-center-center flex-wrap gap-1.5">
                        @for (p of game.platforms?.slice(0, 5);
                          track p.platform.id) {
                          @if (platformIcon(p.platform.name); as icon) {
                            <a
                              class="tooltip tooltip-hover tooltip-bottom"
                              [attr.data-tip]="p.platform.name">
                              <img
                              [src]="icon"
                              [alt]="p.platform.name"
                              class="w-4 h-4 invert opacity-60"
                              loading="lazy"
                              />
                            </a>
                          }
                        }
                      </div>
                    </td>
                    <!-- Azione -->
                    <td>
                      <a
                        role="button"
                        [routerLink]="['/game', game.id, game.slug]"
                        class="btn btn-xs bg-accent text-white shadow-md"
                      >
                        Dettagli
                      </a>
                    </td>
                  </tr>
                </tbody>
              }
            }
            <tfoot>
              <tr>
                <th>#</th>
                <th>Gioco</th>
                <th class="hidden sm:table-cell">Metacritic</th>
                <th class="hidden lg:table-cell">Rating</th>
                <th class="hidden lg:table-cell">Distribuzione</th>
                <th class="hidden md:table-cell">Piattaforme</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export default class TopGamesComponent implements OnInit {
  readonly apiService = inject(ApiService);

  topGames = this.apiService.topGames;
  topGamesLoading = this.apiService.topGamesLoading;
  topGamesError = this.apiService.topGamesError;

  private readonly platformIconMap = new Map<string, string>([
    ['PlayStation', 'assets/platforms/playstation.svg'],
    ['PlayStation 2', 'assets/platforms/playstation.svg'],
    ['PlayStation 3', 'assets/platforms/playstation.svg'],
    ['PlayStation 4', 'assets/platforms/playstation.svg'],
    ['PlayStation 5', 'assets/platforms/playstation.svg'],
    ['PS Vita', 'assets/platforms/playstation.svg'],
    ['PSP', 'assets/platforms/playstation.svg'],
    ['Xbox', 'assets/platforms/xbox.svg'],
    ['Xbox 360', 'assets/platforms/xbox.svg'],
    ['Xbox One', 'assets/platforms/xbox.svg'],
    ['Xbox Series S/X', 'assets/platforms/xbox.svg'],
    ['Nintendo Switch', 'assets/platforms/nintendo.svg'],
    ['Nintendo 3DS', 'assets/platforms/nintendo.svg'],
    ['Nintendo DS', 'assets/platforms/nintendo.svg'],
    ['Nintendo DSi', 'assets/platforms/nintendo.svg'],
    ['Steam', 'assets/platforms/steam.svg'],
    ['PC', 'assets/platforms/windows.svg'],
    ['macOS', 'assets/platforms/mac.svg'],
    ['Linux', 'assets/platforms/linux.svg'],
    ['iOS', 'assets/platforms/ios.svg'],
    ['Android', 'assets/platforms/android.svg'],
  ]);

  platformIcon(name: string): string | null {
    return this.platformIconMap.get(name) ?? null;
  }

  rankClass(i: number): string {
    if (i === 0) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    if (i === 1) return 'bg-slate-400/10 text-slate-400 border-slate-400/30';
    if (i === 2) return 'bg-orange-700/10 text-orange-700 border-orange-700/30';
    return 'bg-base-300 text-base-content/40 border-base-300';
  }

  private readonly RATING_LABELS: Record<string, string> = {
    exceptional: 'Eccezionale',
    recommended: 'Consigliato',
    meh: 'Nella media',
    skip: 'Saltato',
  };

  ratingBarClass(title: string): string {
    const map: Record<string, string> = {
      exceptional: 'bg-success',
      recommended: 'bg-info',
      meh: 'bg-warning',
      skip: 'bg-error',
    };
    return map[title] ?? 'bg-primary';
  }

  ratingLabel(title: string): string {
    return this.RATING_LABELS[title] ?? title;
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src =
      '/assets/placeholder-img-games.png';
  }

  ngOnInit(): void {
    this.apiService.getTopGames();
  }
}

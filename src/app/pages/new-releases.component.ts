import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ErrorgenericComponent } from '../components/error-generic.component';
import { LoadingComponent } from '../components/loading.component';
import { ApiService } from '../services/api.service';
import { RatingStarComponent } from '../components/rating-star.component';
import { GameRelease } from '../models/game.interface';

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  releases: GameRelease[];
}

@Component({
  selector: 'app-new-releases',
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorgenericComponent, RatingStarComponent],
  template: `
        @if (newReleasesLoading()) {
      <div class="flex-center-center p-8">
        <app-loading />
      </div>
    } @else if (newReleasesError()) {
      <app-error-generic/>
    } @else {
      <div class="bg-base-300 rounded-lg shadow-lg p-1 sm:p-4 py-5 md:py-9">
      <!-- Navigazione Mese -->
      <nav class="flex justify-between items-center max-w-4xl mx-auto mb-6 p-4 bg-base-100 rounded-box shadow">
        <button class="btn btn-ghost btn-md gap-2" (click)="previousMonth()">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </span>
          <span class="hidden sm:inline">Prev</span>
        </button>
        <div class="text-center">
          <span class="text-lg md:text-2xl font-bold">{{ currentMonthName() }}</span>
          <span class="text-primary ms-2">{{ currentYear() }}</span>
        </div>
        <button class="btn btn-ghost btn-md gap-2" (click)="nextMonth()">
          <span class="hidden sm:inline">Next</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </span>
        </button>
      </nav>

            <!-- Legenda -->
      <div class="flex justify-center gap-6 mb-6 text-sm text-base-content/60">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-primary/20 border border-primary"></div>
          <span>Data di rilascio</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-secondary/20 border border-secondary"></div>
          <span>Oggi</span>
        </div>
      </div>

      <!-- Calendario -->
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-7 gap-1 md:gap-2">
          <!-- Weekday Headers -->
          @for (day of weekdays; track day) {
            <div class="text-center py-2 md:py-3 text-xs md:text-sm font-semibold text-primary bg-base-100 rounded">
              {{ day }}
            </div>
          }
          <!-- Calendar Days -->
          @for (day of calendarDays(); track day.date.toISOString()) {
            <div
              class="aspect-square p-1 md:p-2 rounded-lg border transition-all duration-200"
              [class]="getDayClasses(day)"
              (click)="day.releases.length > 0 && openDayModal(day)"
            >
              <!-- Day Number -->
              <span
                class="text-sm md:text-lg font-bold"
                [class.text-base-info]="!day.isCurrentMonth"
                [class.text-secondary]="day.isToday"
                [class.text-primary]="day.releases.length > 0 && day.isCurrentMonth"
              >
                {{ day.dayNumber }}
              </span>

              <!-- Release Indicators -->
              @if (day.releases.length > 0) {
                <div class="my-1 flex flex-wrap gap-1">
                  @for (release of day.releases.slice(0, 3); track release.id) {
                    <div
                      class="w-6 h-6 md:w-12 md:h-12 avatar rounded-full border border-base-300 tooltip overflow-hidden"
                      [attr.data-tip]="release.name"
                    >
                      <img
                        [src]="release.background_image"
                        (error)="handleImageError($event)"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  }
                  @if (day.releases.length > 3) {
                    <div class="w-6 h-6 md:w-12 md:h-12 avatar rounded-full bg-base-300 flex items-center justify-center text-xs font-bold">
                      +{{ day.releases.length - 3 }}
                    </div>
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- Day Modal (lista release del giorno) -->
      <dialog class="modal" [class.modal-open]="selectedDay() !== null">
        <div class="modal-box max-w-2xl">
          @if (selectedDay(); as day) {
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" (click)="closeDayModal()">✕</button>

            <!-- Modal Header -->
            <div class="flex-center-center gap-4 mb-6">
              <div>
                <span class="text-5xl font-black text-primary">{{ day.dayNumber }}</span>
              </div>
              <div>
                <p class="text-base-content/80 text-sm">{{ currentMonthName() }} {{ currentYear() }}</p>
                <p class="font-semibold">{{ day.releases.length }} Rilasc{{ day.releases.length > 1 ? 'i' : 'io' }}</p>
              </div>
            </div>

            <!-- Games List -->
            <div class="space-y-3 max-h-100 overflow-y-auto">
              @for (game of day.releases; track game.id) {
                <article
                  class="card card-side bg-base-200 hover:bg-base-300 transition-colors"
                >
                  <figure class="w-1/3 sm:w-1/2 shrink-0">
                    <img [src]="game.background_image" [alt]="game.name" class="h-full object-contain sm:object-cover" (error)="handleImageError($event)" />
                  </figure>
                  <div class="card-body p-3 md:p-4">
                    <h3 class="card-title text-sm md:text-base line-clamp-1">{{ game.name }}</h3>

                    <!-- Platforms -->
                    @if (game.platforms) {
                      <div class="flex flex-wrap gap-1">
                        <div class="flex flex-wrap gap-3 mb-3 w-fit bg-accent py-2 px-3 sm:py-2 sm:px-4 rounded-full">
                        @for (p of game.platforms; track p.platform.id) {
                          <a class="tooltip tooltip-hover tooltip-bottom" [attr.data-tip]="p.platform.name">
                              <img
                                [src]="platformIcon(p.platform.name)"
                                [alt]="p.platform.name"
                                class="w-4 h-4 sm:w-5 sm:h-5 invert"
                                loading="lazy"
                              />
                            </a>
                          }
                        </div>
                      </div>
                    }
                    <!-- Rating -->
                    <div class="my-3">
                      <app-rating-star [rating]="game.rating" />
                    </div>

                    <!-- Metacritic -->
                    @if (game.metacritic) {
                      <div class="flex items-center gap-2 mt-auto">
                        <span class="text-xs text-base-content/80 font-bold">Metacritic</span>
                        <span
                          class="badge badge-md font-bold"
                          [class.badge-success]="game.metacritic >= 75"
                          [class.badge-warning]="game.metacritic >= 50 && game.metacritic < 75"
                          [class.badge-error]="game.metacritic < 50"
                        >
                          {{ game.metacritic  || 'N/A' }}
                        </span>
                      </div>
                    }
                    <div>
                      <a role="button" [routerLink]="['/game', game.id, game.slug]" class="btn text-lg sm:text-md bg-accent text-white mt-3 shadow-md">
                        Dettagli Gioco
                      </a>
                    </div>
                  </div>
                </article>
              }
            </div>
          }
        </div>
        <form method="dialog" class="modal-backdrop bg-black/50" (click)="closeDayModal()">
          <button>close</button>
        </form>
      </dialog>
    </div>
        <!-- <pre><code class="text-black">{{ this.apiService.newReleases() | json }}</code></pre> -->
    }
  `,
  styles: ``
})
export default class NewReleasesComponent {
  readonly apiService = inject(ApiService);

  newReleasesLoading = this.apiService.newReleasesLoading;
  newReleasesError = this.apiService.newReleasesError;

  constructor() {
    effect(() => {
      const date = this.currentDate();
      this.apiService.getNewReleases(
        date.getFullYear(),
        date.getMonth()
      );
    });
  }

  private readonly platformIconMap = new Map([

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
    ['Android', 'assets/platforms/android.svg']
  ]);

  platformIcon = (platformName: string) => {
    return this.platformIconMap.get(platformName) || null;
  };

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder-img-games.png';
  }

// State
  currentDate = signal(new Date());
  selectedDay = signal<CalendarDay | null>(null);
  weekdays = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];

  // Computed
  currentMonthName = computed(() =>
    this.currentDate().toLocaleDateString('it-IT', { month: 'long' }).toUpperCase()
  );

  currentYear = computed(() => this.currentDate().getFullYear());

  calendarDays = computed(() => {
    const date = this.currentDate();
    const releases = this.apiService.newReleases() ?? [];
    const year = date.getFullYear();
    const month = date.getMonth();

    // Organizza le release in una mappa per data
    const releasesByDate = new Map<string, GameRelease[]>();
    for (const release of releases) {
      if (!release.released) continue;
      const existing = releasesByDate.get(release.released);
      if (existing) {
        existing.push(release);
      } else {
        releasesByDate.set(release.released, [release]);
      }
    }

    const startPadding = new Date(year, month, 1).getDay();
    const today = new Date();
    const days: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const dayDate = new Date(year, month, 1 - startPadding + i);
      const dateStr = this.formatDate(dayDate);
      days.push({
        date: dayDate,
        dayNumber: dayDate.getDate(),
        isCurrentMonth: dayDate.getMonth() === month,
        isToday: this.isSameDay(dayDate, today),
        releases: releasesByDate.get(dateStr) ?? []
      });
    }

    return days;
  });

  // Helpers
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return d1.toDateString() === d2.toDateString();
  }

  getDayClasses(day: CalendarDay): string {
    const classes = ['bg-base-100'];

    if (!day.isCurrentMonth) {
      classes.push('opacity-40');
    }
    if (day.isToday) {
      classes.push('border-secondary', 'border-2');
      if (day.releases.length > 0) {
        classes.push('cursor-pointer', 'hover:shadow-lg', 'hover:scale-[1.02]');
      }
    } else if (day.releases.length > 0) {
      classes.push('border-primary', 'border-2', 'cursor-pointer', 'hover:shadow-lg', 'hover:scale-[1.02]');
    } else {
      classes.push('border-base-300');
    }
    return classes.join(' ');
  }

  // Navigation
  previousMonth(): void {
    const current = this.currentDate();
    this.currentDate.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const current = this.currentDate();
    this.currentDate.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  // Modals
  openDayModal(day: CalendarDay): void {
    this.selectedDay.set(day);
  }

  closeDayModal(): void {
    this.selectedDay.set(null);
  }
}

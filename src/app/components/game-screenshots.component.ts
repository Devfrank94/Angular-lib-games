import { CommonModule } from '@angular/common';
import { Component, input, inject, computed, effect, signal } from '@angular/core';
import { Screenshot } from '../models/game.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-game-screenshots',
  imports: [CommonModule],
  template: `
    @if (gameDetail(); as game) {
      @if (game.screenshots_count > 0) {
        <div class="mt-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold mb-2">Screenshots</h3>
            @if (!screenshotsLoaded()) {
              <button
                class="btn btn-primary"
                (click)="loadScreenshots()"
                [disabled]="screenshotsLoading()">
                @if (screenshotsLoading()) {
                  <span class="loading loading-spinner loading-sm"></span>
                  Loading...
                }
                @else {
                  Carica Screenshot
                }
              </button>
            }
          </div>

          <!-- Screenshots Grid -->
          @if (screenshots(); as screenList) {
            <div class="rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              @for (screenshot of screenList; track screenshot.id) {
                <div class="shadow-xl">
                  <figure>
                    <img
                      [src]="screenshot.image"
                      [alt]="'Screenshot ' + screenshot.id"
                      class="w-full rounded-lg object-contain hover:scale-110 transition-transform cursor-pointer"
                      (click)="openModal(screenshot)"
                      loading="lazy">
                  </figure>
                </div>
              }
            </div>
          }

          <!-- Error State -->
          @if (!screenshotsError()) {
            <div class="alert alert-error flex-center-center">
              <span>Errore nel caricamento degli screenshot</span>
              <button class="btn btn-sm" (click)="loadScreenshots()">
                Riprova
              </button>
            </div>
          }
        </div>
      }
    }

    <!-- Loading State -->
    @if (gameDetailLoading()) {
      <div class="flex justify-center p-8">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    }

    <!-- Modal per screenshot fullscreen -->
    @if (selectedScreenshot(); as screenshot) {
      <dialog class="modal modal-open">
        <div class="modal-box max-w-4xl">
          <button class="btn btn-sm btn-circle absolute right-2 top-2"
                  (click)="closeModal()">✕</button>
          <img [src]="screenshot.image"
               class="w-full h-auto"
               [alt]="'Screenshot ' + screenshot.id">
        </div>
        <form method="dialog" class="modal-backdrop" (click)="closeModal()">
          <button>close</button>
        </form>
      </dialog>
    }
  `,
})
export class GameScreenshotsComponent {

  private apiService = inject(ApiService);

  gameId = input.required<number>();

  // Signals dal service
  gameDetail = this.apiService.gameDetail;
  gameDetailLoading = this.apiService.gameDetailLoading;
  screenshots = this.apiService.screenshots;
  screenshotsLoading = this.apiService.screenshotsLoading;
  screenshotsError = this.apiService.screenshotsError;

  selectedScreenshot = signal<Screenshot | null>(null);

  screenshotsLoaded = computed(() => this.screenshots() !== null);

  constructor() {
    effect(() => {
      this.apiService.screenshots.set(null);
    });
  }

  loadScreenshots(): void {
    const id = this.gameId();
    if (id) {
      this.apiService.getGameScreenshots(id);
    }
  }

  openModal(screenshot: Screenshot): void {
    this.selectedScreenshot.set(screenshot);
  }

  closeModal(): void {
    this.selectedScreenshot.set(null);
  }
}

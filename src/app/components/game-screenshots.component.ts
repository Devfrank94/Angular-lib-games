import { CommonModule } from '@angular/common';
import { Component, input, inject, computed, effect, signal, OnInit } from '@angular/core';
import { Screenshot } from '../models/game.interface';
import { ApiService } from '../services/api.service';
import { LoadingComponent } from "./loading.component";

@Component({
  selector: 'app-game-screenshots',
  imports: [CommonModule, LoadingComponent],
  template: `
    @if (gameDetail(); as game) {
      @if (game.screenshots_count > 0) {
        <div class="mt-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold mb-2">Screenshots</h3>
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
          @if (screenshotsError()) {
            <div class="alert alert-error flex-center-center">
              <div><p class="text-lg text-white">Errore nel caricamento degli screenshot</p></div>
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
        <app-loading/>
      </div>
    }

    <!-- Modal per screenshot fullscreen -->
    @if (selectedScreenshot(); as screenshot) {
      <dialog class="modal modal-open">
        <div class="modal-box w-11/12 max-w-5xl">
          <button class="btn btn-sm btn-circle absolute right-1 top-1"
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
export class GameScreenshotsComponent implements OnInit {

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
  ngOnInit(): void {
    this.loadScreenshots();
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

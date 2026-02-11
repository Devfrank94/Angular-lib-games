import {
    Component,
    input,
    inject,
    signal,
    OnInit,
} from "@angular/core";
import { Screenshot } from "../models/game.interface";
import { ApiService } from "../services/api.service";
import { LoadingComponent } from "./loading.component";

@Component({
    selector: "app-game-screenshots",
    imports: [LoadingComponent],
    template: `
        @if (screenshotsLoading()) {
          <div class="flex justify-center p-8">
            <app-loading />
          </div>
        } @else if (screenshots()?.length) {
          <div>
            <div
                class="rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3"
            >
                @for (screenshot of screenshots(); track screenshot.id) {
                <div class="shadow-xl">
                    <figure>
                        <img
                            [src]="screenshot.image"
                            [alt]="'Screenshot ' + screenshot.id"
                            class="w-full rounded-lg object-contain hover:scale-105 transition-transform cursor-pointer"
                            (click)="openModal(screenshot)"
                            loading="lazy"
                        />
                    </figure>
                </div>
                }
            </div>
          </div>
        }

        @if (screenshotsError()) {
          <div class="alert alert-error flex-center-center">
            <div>
              <p class="text-lg text-white">
                  Errore nel caricamento degli screenshot
              </p>
            </div>
            <button class="btn btn-sm" (click)="loadScreenshots()">
                Riprova
            </button>
          </div>
        }

        <!-- Modal per screenshot fullscreen -->
        @if (selectedScreenshot(); as screenshot) {
        <dialog class="modal modal-open">
            <div class="modal-box w-11/12 max-w-5xl">
                <button
                    class="btn btn-sm btn-circle absolute right-1 top-1"
                    (click)="closeModal()"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
                <img
                    [src]="screenshot.image"
                    class="w-full h-auto"
                    [alt]="'Screenshot ' + screenshot.id"
                />
            </div>
            <form method="dialog" class="modal-backdrop" (click)="closeModal()">
                <button>close</button>
            </form>
        </dialog>
        }
    `,
})
export class GameScreenshotsComponent implements OnInit {
    private readonly apiService = inject(ApiService);

    gameId = input.required<number>();

    screenshots = this.apiService.screenshots;
    screenshotsLoading = this.apiService.screenshotsLoading;
    screenshotsError = this.apiService.screenshotsError;

    selectedScreenshot = signal<Screenshot | null>(null);

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

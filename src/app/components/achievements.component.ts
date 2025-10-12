import {
  Component,
  input,
  inject,
  computed,
  effect,
  signal,
  OnInit
} from "@angular/core";
import { ApiService } from "../services/api.service";
import { LoadingComponent } from "./loading.component";
import { GameAchievement } from "../models/game.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-achievements',
  imports: [CommonModule, LoadingComponent],
  template: `
    @if (gameDetail(); as game) {
      @if (game.achievements_count > 0) {
        <div>
          <!-- Achievements Grid -->
          @if (achievements(); as achievementList) {
            <div class="rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
              @for (achievement of achievementList; track achievement.id) {
                <div class="shadow-xl">
                  <figure class="px-4 pt-4">
                    <img
                      [src]="achievement.image"
                      [alt]="achievement.name"
                      class="w-full rounded-lg object-contain hover:scale-105 transition-transform cursor-pointer"
                      (click)="openModal(achievement)"
                      loading="lazy"
                    />
                  </figure>
                  <div class="card-body">
                    <h3 class="card-title text-sm">{{ achievement.name }}</h3>
                    <p class="text-xs text-base-content/70 line-clamp-2">{{ achievement.description }}</p>
                    <div class="flex justify-end">
                      <span class="badge badge-primary text-xs">{{ achievement.percent }}%</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          }

          <!-- Error State -->
          @if (achievementError()) {
            <div class="alert alert-error flex-center-center">
              <div>
                <p class="text-lg text-white">Errore nel caricamento degli achievement</p>
              </div>
              <button class="btn btn-sm" (click)="loadAchievements()">Riprova</button>
            </div>
          }
        </div>
      }
    }

    <!-- Loading State -->
    @if (achievementLoading()) {
      <div class="flex justify-center p-8">
        <app-loading />
      </div>
    }

    <!-- Modal per achievement fullscreen -->
    @if (selectedAchievement(); as achievement) {
      <dialog class="modal modal-open">
        <div class="modal-box w-11/12 max-w-5xl">
          <button class="btn btn-sm btn-circle absolute right-1 top-1" (click)="closeModal()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
          <img [src]="achievement.image" class="w-full h-auto" [alt]="achievement.name" />
          <div class="mt-4">
            <h2 class="text-xl font-bold">{{ achievement.name }}</h2>
            <p class="text-sm mt-2">{{ achievement.description }}</p>
            <span class="badge badge-primary mt-4">{{ achievement.percent }}%</span>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop" (click)="closeModal()">
          <button>close</button>
        </form>
      </dialog>
    }
    `,
  styles: ``
})
export class AchievementsComponent implements OnInit {

  private apiService = inject(ApiService);

  gameId = input.required<number>();
  gameDetail = this.apiService.gameDetail;
  gameDetailLoading = this.apiService.gameDetailLoading;

  selectedAchievement = signal<GameAchievement | null>(null);

  achievements = this.apiService.gameAchievements;
  achievementLoading = this.apiService.gameAchievementsLoading;
  achievementError = this.apiService.gameAchievementsError;

  ngOnInit() {
    this.apiService.getGameAchievements(this.gameId());
  }

  openModal(achievement: GameAchievement) {
    this.selectedAchievement.set(achievement);
  }
  closeModal() {
    this.selectedAchievement.set(null);
  }
}

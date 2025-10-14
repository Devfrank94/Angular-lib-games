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
            <div class="rounded-lg grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-3">
              @for (achievement of achievementList; track achievement.id) {
                <div>
                  <figure class="px-4 pt-4">
                    <img
                      [src]="achievement.image"
                      [alt]="achievement.name"
                      class="w-full rounded-lg object-contain"
                      loading="lazy"
                    />
                  </figure>
                  <div class="card-body">
                    <h3 class="card-title text-sm">{{ achievement.name }}</h3>
                    <p class="text-xs text-base-content/70 line-clamp-2">{{ achievement.description }}</p>
                    <div class="flex justify-end">
                      <span class="badge badge-accent text-xs">{{ achievement.percent }}%</span>
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
    this.loadAchievements();
  }

  loadAchievements(): void {
        const id = this.gameId();
        if (id) {
            this.apiService.getGameAchievements(id);
        }
    }
}

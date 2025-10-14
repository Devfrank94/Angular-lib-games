import {
  Component,
  input,
  inject,
  OnInit
} from "@angular/core";
import { ApiService } from "../services/api.service";
import { LoadingComponent } from "./loading.component";
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
                    <div class="flex justify-between items-center flex-wrap">
                      <div class="text-xs sm:text-sm">Rarità:</div>
                      <div class="badge badge-accent font-light text-xs sm:text-sm badge-xs sm:badge-md text-white">{{ achievement.percent }}%</div>
                    </div>
                  </div>
                </div>
              }
            </div>

            <div class="join flex justify-center my-4">
              <button class="join-item btn btn-lg" [disabled]="!apiService.achievementsPreviousUrl()" (click)="apiService.fetchAchievementsPage(apiService.achievementsPreviousUrl())">Indietro</button>
              <button class="join-item btn btn-lg" [disabled]="!apiService.achievementsNextUrl()" (click)="apiService.fetchAchievementsPage(apiService.achievementsNextUrl())">Avanti</button>
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

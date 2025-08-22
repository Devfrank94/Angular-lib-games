import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoadingComponent } from "../../components/loading.component";
import { CardDetailComponent } from '../../components/card-detail.component';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule, LoadingComponent, CardDetailComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      @if (apiService.gameDetailLoading()) {
        <div class="flex justify-center items-center h-100">
          <app-loading/>
        </div>
      } @else if (apiService.gameDetailError()) {
        <app-error-generic />
      } @else if (apiService.gameDetail()) {
          <div class="mx-auto">
            <button class="btn btn-ghost mb-4" (click)="goBack()">
              ← Torna indietro
            </button>

              <app-card-detail />

          </div>
        }
    </div>
  `,
  styles: ``
})
export class GameDetailComponent implements OnInit {

  readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const gameId = this.route.snapshot.params['id'];
    const slug = this.route.snapshot.params['slug'];
    if (gameId) {
      this.apiService.getGameDetail(+gameId);

    // Verifica slug dopo il caricamento
    setTimeout(() => {
      const actualSlug = this.apiService.gameDetail()?.slug;
        if (actualSlug && actualSlug !== slug) {
          this.router.navigate(['/game', gameId, slug], { replaceUrl: true });
        }
      }, 500);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoadingComponent } from "../../components/loading.component";
import { CardDetailComponent } from '../../components/card-detail.component';
import { ErrorgenericComponent } from '../../components/error-generic.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule, LoadingComponent, ErrorgenericComponent, CardDetailComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      @if (apiService.gameDetailLoading()) {
        <div class="flex justify-center items-center h-100">
          <app-loading/>
        </div>
      } @else if (apiService.gameDetailError()) {
        <app-error-generic />
      } @else if (apiService.gameDetail()) {
          <div class="">
            <button class="btn btn-ghost mb-4" (click)="goBack()">
              ← Torna indietro
            </button>

            @if (apiService.gameDetail(); as game) {
              <app-card-detail [game]="game" />
            }

          </div>
        }
    </div>
  `,
  styles: ``
})
export class GameDetailComponent implements OnInit, OnDestroy {

  readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private destroy$ = new Subject<void>();

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Pulisci anche il signal quando esci
    this.apiService.gameDetail.set(null);
  }
}

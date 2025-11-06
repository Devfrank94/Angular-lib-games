import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LoadingComponent } from "../../components/loading.component";
import { CardDetailComponent } from '../../components/card-detail.component';
import { ErrorgenericComponent } from '../../components/error-generic.component';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule, LoadingComponent, ErrorgenericComponent, CardDetailComponent],
  template: `
    <div class="mx-auto px-4 py-8">
      @if (apiService.gameDetailLoading()) {
        <div class="flex justify-center items-center h-80 sm:h-[50vh] 2xl:h-[70vh]">
          <app-loading/>
        </div>
      } @else if (apiService.gameDetailError()) {
        <app-error-generic />
      } @else if (apiService.gameDetail()) {
          <div class="p-2">
            <button
              class="btn btn-accent text-white text-md btn-md sm:btn-lg mb-3" (click)="goBack()">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Indietro
            </button>

            @if (apiService.gameDetail(); as game) {
              <div class="mx-auto">
                  <app-card-detail [game]="game" />
              </div>
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
  private readonly titleService = inject(Title);

  constructor (private location: Location) {
    effect(() => {
      const game = this.apiService.gameDetail();
      const loading = this.apiService.gameDetailLoading();

      if (loading) {
        this.titleService.setTitle('Caricamento... - Games Library');
      } else if (game?.name) {
        this.titleService.setTitle(`${game.name} - Games Library`);
      } else {
        this.titleService.setTitle('Gioco non trovato - Games Library');
      }
    });
  }


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
    // this.router.navigate(['/']);
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Pulisci anche il signal quando esci
    this.apiService.gameDetail.set(null);
  }
}

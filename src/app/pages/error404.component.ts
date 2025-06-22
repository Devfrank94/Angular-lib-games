import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-error404',
  imports: [RouterModule],
  template: `

    <div class="flex flex-col bg-base-300 rounded-lg shadow-md p-5">
      <div class="text-center flex-1">
        <!-- Error Icon -->
        <div class="my-2 sm:my-8">
          <div class=" w-16 h-16 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-6 bg-error/10 rounded-full flex-center-center">
            <svg class=" w-8 h-8 sm:w-16 sm:h-16 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>

          <h1 class="text-5xl sm:text-8xl font-bold text-error mb-4">404</h1>
          <h2 class="text-1xl sm:text-2xl font-bold text-base-content mb-2">
            Oops! Pagina non trovata
          </h2>
          <p class="text-base-content/70 text-sm sm:text-lg">
            La pagina che stai cercando non esiste.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            class="btn bg-accent text-white btn-md sm:btn-lg" routerLink="/home">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Torna alla Home
          </button>

          <button
            class="btn btn-outline btn-md sm:btn-lg" (click)="goBack()">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Indietro
          </button>
        </div>

        <!-- Quick Navigation -->
        <div class="mt-4 pt-3 sm:mt-8 sm:pt-6 border-t border-base-content/10">
          <p class="text-sm text-base-content/60 mb-2 sm:mb-4">Oppure vai direttamente a:</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <button class="btn btn-sm btn-ghost" (click)="navigateTo('/platforms')">Piattaforme</button>
            <button class="btn btn-sm btn-ghost" (click)="navigateTo('/creators')">Creatori</button>
            <button class="btn btn-sm btn-ghost" (click)="navigateTo('/developers')">Sviluppatori</button>
            <button class="btn btn-sm btn-ghost" (click)="navigateTo('/new-releases')">Nuove Uscite</button>
            <button class="btn btn-sm btn-ghost" (click)="navigateTo('/top-games')">Top Giochi</button>
          </div>
        </div>
      </div>
    </div>


  `,
  styles: ``
})
export default class Error404Component {

  private router = inject(Router);

  // goHome() {
  //   this.router.navigate(['/home']);
  // }

  goBack() {
    window.history.back();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

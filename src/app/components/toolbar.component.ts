import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SwitchModeComponent } from "./switch-mode.component";
import { SearchbarComponent } from "./searchbar.component";

@Component({
  selector: 'app-toolbar',
  imports: [SwitchModeComponent, SearchbarComponent],
  template: `
    <div class="p-4 w-full bg-base-300 flex items-center rounded-lg shadow-md gap-3 sm:gap-8">
      <div class="flex-auto">
        @if (!isGameDetailRoute()) {
        <app-searchbar />
        }
      </div>
      <div>
        <app-switch-mode />
      </div>
    </div>
  `,
  styles: ``
})
export class ToolbarComponent {

  private readonly router = inject(Router);
  
  isGameDetailRoute = signal(false);

  constructor() {
    // Controlla la rotta al caricamento iniziale
    this.checkRoute();
    
    // Ascolta i cambi di navigazione
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
  }

  private checkRoute(): void {
    const url = this.router.url;
    const isGameRoute = /^\/game\/\d+\/[^\/]+/.test(url);
    this.isGameDetailRoute.set(isGameRoute);
  }

}

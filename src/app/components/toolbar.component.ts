import { Component, inject, signal, DestroyRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { SwitchModeComponent } from "./switch-mode.component";
import { SearchbarComponent } from "./searchbar.component";

@Component({
  selector: 'app-toolbar',
  imports: [SwitchModeComponent, SearchbarComponent],
  template: `
    <div class="p-4 w-full bg-base-300 flex items-center rounded-lg shadow-md gap-3 sm:gap-8">
      <div class="flex-auto">
        @if (!hideSearchbar()) {
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
  private readonly destroyRef = inject(DestroyRef);

  hideSearchbar = signal(false);

  private readonly routesWithoutSearch = [
    '/game',
    '/platforms',
    '/creators',
    '/developers',
    '/new-releases',
    '/top-games'
  ];

  constructor() {
    this.checkRoute();

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.checkRoute();
      });
  }

  private checkRoute(): void {
    const url = this.router.url;
    const isExcludedRoute = this.routesWithoutSearch.some(route => url.startsWith(route));
    this.hideSearchbar.set(isExcludedRoute);
  }

}

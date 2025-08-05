import { Component, inject, signal, effect, computed } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

// Import componenti
import { GoToTopComponent } from "./components/go-to-top.component";
import { FooterComponent } from "./components/footer.component";
import { NavbarComponent } from "./components/navbar.component";
import { TopbarComponent } from "./components/topbar.component";
import { ToolbarComponent } from "./components/toolbar.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, GoToTopComponent, FooterComponent, NavbarComponent, TopbarComponent, ToolbarComponent],
  template: `

    <div class="flex flex-col">
      <div class="flex-1">
        <app-topbar />
        <div class="flex-center-center py-3 sm:py-1">
          <div class="my-container my-box p-3 sm:m-4 sm:p-4">
            <div class="flex gap-4 py-4 px-1 sm:px-4">
              @switch (navbarState()) {
                @case ('show') {
                  <div class="hidden sm:block min-w-fit">
                    <app-navbar />
                  </div>
                }
                @case ('hide') {}
                @default {}
              }
              <div class="w-full flex flex-col gap-4">
                <app-toolbar />
                <div class="py-3 sm:py-0 sm:px-1 w-full max-h-[54vh] sm:max-h-[59vh] md:max-h-[65vh] lg:max-h-[60vh] xl:max-h-[65vh] overflow-y-auto rounded-xl">
                  <router-outlet />
                </div>

              @switch (navbarState()) {
                @case ('show') {
                  <div class="block mt-5 sm:hidden">
                    <!-- Nav mobile -->
                    <app-navbar />
                  </div>
                }
                @case ('hide') {}
                @default {}
              }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <app-go-to-top />
        <app-footer />
      </div>
    </div>

  `,
  styles: `
    .my-box {
    backdrop-filter: blur(2px) saturate(200%);
    -webkit-backdrop-filter: blur(2px) saturate(200%);
    background-color: rgba(50, 50, 50, 0.125);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    }
`,
})

export class AppComponent {

  private router = inject(Router);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.routerState.snapshot.url)
    ),
    { initialValue: this.router.routerState.snapshot.url }
  );

  protected navbarState = computed(() => {
    const url = this.currentUrl();
    if (!url || url === '') return 'loading';
    return url === '/404' ? 'hide' : 'show';
  });


}

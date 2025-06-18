import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwitchModeComponent } from "./components/switch-mode.component";
import { GoToTopComponent } from "./components/go-to-top.component";
import { FooterComponent } from "./components/footer.component";
import { NavbarComponent } from "./components/navbar.component";
import { TopbarComponent } from "./components/topbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SwitchModeComponent, GoToTopComponent, FooterComponent, NavbarComponent, TopbarComponent],
  template: `

    <div>
      <app-topbar />
      <div class="flex-center-center py-3 sm:py-1">
        <div class="my-container bg-neutral/10 backdrop-blur-sm p-3 sm:m-4 sm:p-4 rounded-xl shadow-xl min-h-[86vh] max-h-[90vh]">
          <div class="flex gap-4 px-4 py-4">
            <div class="hidden sm:block min-w-fit">
              <!-- Nav desktop -->
              <app-navbar />
            </div>
            <div class="w-full flex flex-col gap-4">
              <div class="p-4 w-full test2 flex justify-end">
                <app-switch-mode />
              </div>
              <div class="p-4 w-full test3">
                <router-outlet />
              </div>
              <!-- Nav mobile -->
              <div class="block sm:hidden">
                <app-navbar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <app-go-to-top />
      <app-footer />
    </div>

  `,
  styles: [],
})
export class AppComponent {
  title = 'Angular-Games-Library';

}

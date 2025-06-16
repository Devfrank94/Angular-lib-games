import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwitchModeComponent } from "./components/switch-mode.component";
import { GoToTopComponent } from "./components/go-to-top.component";
import { FooterComponent } from "./components/footer.component";
import { NavbarComponent } from "./components/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SwitchModeComponent, GoToTopComponent, FooterComponent, NavbarComponent],
  template: `

    <div>
      <div class="flex-center-center h-screen">
        <div class="my-container bg-neutral/10 backdrop-blur-sm p-3 sm:m-4 sm:p-4 rounded-xl shadow-xl altezza-test">
        <h2 class="text-2xl font-bold text-center mb-4">Angular Library Games</h2>
          <div class="flex gap-4 px-4 py-4">
            <div class=" min-w-fit">
              <app-navbar />
            </div>
            <div class="w-full flex flex-col gap-4">
              <div class="p-4 w-full test2 flex justify-end">
                <app-switch-mode />
              </div>
              <div class="p-4 w-full test3">
                <router-outlet />
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

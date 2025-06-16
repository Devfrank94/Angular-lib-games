import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwitchModeComponent } from "./components/switch-mode.component";
import { GoToTopComponent } from "./components/go-to-top.component";
import { FooterComponent } from "./components/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SwitchModeComponent, GoToTopComponent, FooterComponent],
  template: `

    <div>
      <div class="flex-center-center h-screen">
        <div class="my-container p-3 sm:m-4 sm:p-4 rounded-xl shadow-xl altezza-test">
        <app-switch-mode />
          <h1>Ciao Come va</h1>

          <router-outlet />

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

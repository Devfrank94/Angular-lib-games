import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `

<div class="flex justify-center">
  <div class="my-container p-3 sm:m-4 sm:p-4 rounded-xl shadow-xl h-fit">
  <h1>Ciao Come va</h1>

      <router-outlet />

  </div>
</div>

  `,
  styles: `

  `,
})
export class AppComponent {
  title = 'Angular-lib-games';
}

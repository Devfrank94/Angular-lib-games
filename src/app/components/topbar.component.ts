import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  template: `
    <div class="bg-base-300 py-2 sm:py-3 shadow-md">
      <div class="my-container flex items-center justify-center md:justify-start gap-4">
        <img src="assets/logo.png" alt="logo" class="hidden sm:block sm:w-12 sm:h-12" />
        <img src="assets/logo-circle.png" alt="logo" class="w-8 h-8 sm:hidden" />
        <h2 class="hidden sm:block text-2xl font-semibold">Angular Library Games</h2>
      </div>
    </div>
  `,
  styles: ``
})
export class TopbarComponent {

}

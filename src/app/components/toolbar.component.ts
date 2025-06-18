import { Component } from '@angular/core';
import { SwitchModeComponent } from "./switch-mode.component";
import { SearchbarComponent } from "./searchbar.component";

@Component({
  selector: 'app-toolbar',
  imports: [SwitchModeComponent, SearchbarComponent],
  template: `
    <div class="p-4 w-full bg-base-300 flex-end-center rounded-lg shadow-md gap-3 sm:gap-8">
      <app-searchbar />
      <app-switch-mode />
    </div>
  `,
  styles: ``
})
export class ToolbarComponent {

}

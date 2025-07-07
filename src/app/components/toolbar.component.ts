import { Component } from '@angular/core';
import { SwitchModeComponent } from "./switch-mode.component";
import { SearchbarComponent } from "./searchbar.component";

@Component({
  selector: 'app-toolbar',
  imports: [SwitchModeComponent, SearchbarComponent],
  template: `
    <div class="p-4 w-full bg-base-300 flex items-center rounded-lg shadow-md gap-3 sm:gap-8">
      <div class="flex-auto">
        <app-searchbar />
      </div>
      <div>
        <app-switch-mode />
      </div>
    </div>
  `,
  styles: ``
})
export class ToolbarComponent {

}

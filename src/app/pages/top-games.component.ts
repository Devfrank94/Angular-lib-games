import { Component } from '@angular/core';
import { MaintenanceComponent } from "../components/maintenance.component";

@Component({
  selector: 'app-top-games',
  imports: [MaintenanceComponent],
  template: `
    <app-maintenance />
  `,
  styles: ``
})
export default class TopGamesComponent {

}

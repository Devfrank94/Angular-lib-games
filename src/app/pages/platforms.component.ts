import { Component } from '@angular/core';
import { MaintenanceComponent } from "../components/maintenance.component";

@Component({
  selector: 'app-platforms',
  imports: [MaintenanceComponent],
  template: `
    <app-maintenance />
  `,
  styles: ``
})
export default class PlatformsComponent {

}

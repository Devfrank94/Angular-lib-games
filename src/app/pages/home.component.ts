import { Component } from '@angular/core';
import { CardComponent } from "../components/card.component";

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  template: `
  <div class="glass grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 px-2 sm:py-2 rounded-xl shadow-xl">
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
  </div>

  `,
  styles: ``
})
export default class HomeComponent {

}

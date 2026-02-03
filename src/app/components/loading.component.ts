import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `
    <div class="h-80 sm:h-[50vh] 2xl:h-[70vh]">
      <span class="loading loading-infinity loading-xl sm:w-20"></span>
    </div>
  `,
  styles: ``
})
export class LoadingComponent {

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [CommonModule],
  template: `

    <div class="card bg-base-300 shadow-xl">
      <figure>
        <div class="skeleton w-full h-50 md:h-70 bg-base-content/12"></div>
      </figure>
      <div class="card-body">
        <div class="flex items-center gap-2 mb-1">
          <!-- Titolo -->
          <div class="skeleton h-6 w-4/12 bg-base-content/12"></div>
        </div>
      <div class="mb-2">
        <!-- Sottotitolo -->
        <div class="skeleton h-4 w-6/12 bg-base-content/12"></div>
      </div>

        <div class="flex gap-2 mb-4">
          <!-- Badge -->
          <div class="skeleton h-6 w-2/12 bg-base-content/12"></div>
          <div class="skeleton h-6 w-2/12 bg-base-content/12"></div>
          <div class="skeleton h-6 w-1/12 bg-base-content/12"></div>
        </div>

        <div class="space-y-3 mb-5">
          <!-- Elenco caratteristiche -->
          <div class="skeleton h-3 w-5/12 bg-base-content/12"></div>
          <div class="skeleton h-3 w-4/12 bg-base-content/12"></div>
          <div class="skeleton h-3 w-3/12 bg-base-content/12"></div>
          <div class="skeleton h-3 w-6/12 bg-base-content/12"></div>
        </div>
        <div>
          <div class="skeleton h-10 bg-base-content/12 w-full"></div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class SkeletonComponent {

}

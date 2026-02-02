import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorgenericComponent } from '../components/error-generic.component';
import { LoadingComponent } from '../components/loading.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-developers',
  imports: [CommonModule, ErrorgenericComponent, LoadingComponent],
  template: `
    @if (developersLoading()) {
      <div class="flex-center-center p-8">
        <app-loading />
      </div>
    } @else if (developersError()) {
      <app-error-generic/>
    } @else {
      <div class="glass rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        @for (developer of developers(); track developer.id) {
          <!-- {{ developers()[0] | json }} -->
          <div class="card bg-base-100 image-full shadow-md">
            <figure>
              <img
                [src]="developer.image_background"
                [alt]="developer.name"
                class="object-contain w-full scale-110"
                loading="lazy" />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-xl">{{ developer.name }}</h2>
              <div class="card-actions glass rounded-lg shadow-md mt-4">
                <div class="stat p-2">
                  <div class="stat-figure text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-7">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                  </div>
                  <div class="stat-title text-lg text-accent">Giochi Sviluppati</div>
                  <div class="stat-value text-accent">{{ developer.games_count }}</div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: ``
})
export default class DevelopersComponent implements OnInit {

  readonly apiService = inject(ApiService);

    developers = this.apiService.developers;
    developersLoading = this.apiService.developersLoading;
    developersError = this.apiService.developersError;

  ngOnInit(): void {
    this.apiService.getDevelopers();
  }
}


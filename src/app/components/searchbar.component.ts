import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-searchbar',
  imports: [CommonModule, FormsModule],
  template: `
      <label class="input input-sm rounded-md sm:w-60">
        <svg class="h-[1.2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
        type="search"
        placeholder="Cerca..."
        [(ngModel)]="searchQuery"
        (input)="onSearch()"
        (keyup.enter)="onSearch()" />
    </label>
  `,
  styles: ``
})
export class SearchbarComponent {

  private readonly apiService = inject(ApiService);
  searchQuery = signal('');

  onSearch() {
    const query = this.searchQuery().trim();
    if (query.length >= 3) {
      this.apiService.searchGames(query);
    } else if (query.length === 0) {
      this.apiService.getGames();
    }
  }

}

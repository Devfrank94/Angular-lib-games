import { Component, inject, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { globalSearchQuery } from '../signals/search.signal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, merge, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
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
        placeholder="Cerca il tuo videogame..."
        [value]="searchQuery()"
        (input)="onSearch($event)"
        (keyup.enter)="onEnter()" />
    </label>
  `,
  styles: ``
})
export class SearchbarComponent {

  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly searchQuery = globalSearchQuery;

  private searchSubject = new Subject<string>();
  private immediateSearch = new Subject<string>();

  constructor() {
    // Merge debounced input con ricerca immediata (Enter)
    // distinctUntilChanged evita la doppia chiamata quando Enter arriva dopo l'input
    merge(
      this.searchSubject.pipe(debounceTime(300)),
      this.immediateSearch
    ).pipe(
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(query => {
      this.performSearch(query);
    });

    // Ripristina la ricerca quando si torna alla home
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/' || event.url === '/home') {
          this.performSearch(this.searchQuery());
        }
      });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.searchSubject.next(input.value);
  }

  onEnter(): void {
    this.immediateSearch.next(this.searchQuery());
  }

  private performSearch(query: string): void {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length >= 3) {
      this.apiService.searchGames(trimmedQuery);
    } else if (trimmedQuery.length === 0) {
      this.apiService.getGames(1, true);
    }
  }

}

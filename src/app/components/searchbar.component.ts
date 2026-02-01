import { Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { globalSearchQuery } from '../signals/search.signal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

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
        [value]="searchQuery()"
        (input)="onSearch($event)"
        (keyup.enter)="onSearch()" />
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

  constructor() {
    // Debounce per evitare troppe chiamate API
    this.searchSubject.pipe(
      debounceTime(300), // Aspetta 300ms dopo che l'utente smette di digitare
      distinctUntilChanged(), // Solo se il valore è diverso
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
        // Se siamo in home e c'è una search query, ripristina i risultati
        if (event.url === '/' || event.url === '/home') {
          this.performSearch(this.searchQuery());
        }
      });
  }

  onSearch(event?: Event): void {
    // Se è chiamata dall'input, aggiorna il signal
    if (event) {
      const input = event.target as HTMLInputElement;
      this.searchQuery.set(input.value);
    }
    
    // Se è Enter, cerca immediatamente
    if (!event) {
      this.performSearch(this.searchQuery());
    } else {
      // Se è input, usa il debounce
      this.searchSubject.next(this.searchQuery());
    }
  }

  private performSearch(query: string): void {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length >= 3) {
      this.apiService.searchGames(trimmedQuery);
    } else if (trimmedQuery.length === 0) {
      this.apiService.getGames();
    }
  }

}

import { Component, input } from '@angular/core';
import { Game } from '../models/game.interface';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
      <div class="card w-100 bg-base-300 shadow-xl">
      <figure>
        <img
          [src]="game().background_image"
          (error)="handleImageError($event)"
          [alt]="game().name"
          class="w-full object-cover"
          loading="lazy"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ game().name }}
          @if (isNewGame()) {
            <div data-theme="light" class="badge badge-secondary">NEW</div>
          }
        </h2>
        <p>{{ getGameDescription() }}</p>

        <div class="flex gap-2">
          @for (genre of game().genres.slice(0, 2); track genre.id) {
            <div class="badge badge-xs lg:badge-md badge-outline tooltip tooltip-hover tooltip-bottom cursor-pointer" [attr.data-tip]="(genre.name)"><p class="truncate max-w-14">{{ genre.name }}</p></div>
          }
          @if (game().metacritic) {
            <div class="badge badge-warning badge-xs lg:badge-md">{{ game().metacritic }}</div>
          }
        </div>

        <ul class="mt-2 mb-4 flex flex-col gap-1 text-xs">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Rating: {{ game().rating }}/5 ({{ game().ratings_count }} reviews)</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Rilasciato: {{ game().released }}</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Tempo di gioco: {{ game().playtime }} ore</span>
          </li>
          @if (game().platforms.length > 0) {
            <li class="opacity-75">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Disponibile su: {{ getPlatformsText() }}</span>
            </li>
          }
        </ul>

        <div>
          <button class="btn btn-block text-lg sm:text-md bg-accent text-white mt-3 shadow-md">
            Dettagli Gioco
          </button>
        </div>
      </div>
    </div>

  `,
  styles: ``
})
export class CardComponent {

  game = input.required<Game>();

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder-img-games.png';
  }

  isNewGame(): boolean {
    if (!this.game().released) return false;
    const releaseDate = new Date(this.game().released);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return releaseDate > threeMonthsAgo;
  }

  getGameDescription(): string {
    const rating = this.game().rating;
    const metacritic = this.game().metacritic;

    if (rating >= 4.5) return "Gioco straordinario con recensioni eccellenti";
    if (rating >= 4.0) return "Ottimo gioco molto apprezzato dai giocatori";
    if (rating >= 3.5) return "Buon gioco con recensioni positive";
    if (metacritic >= 80) return "Gioco di alta qualità secondo la critica";
    return "Esplora questo interessante titolo gaming";
  }

  getPlatformsText(): string {
    const platforms = this.game().platforms.slice(0, 3);
    return platforms.map(p => p.platform.name).join(', ');
  }
}

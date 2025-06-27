import { Component, input, Input } from '@angular/core';
import { Game } from '../models/game.interface';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
      <!-- <div class="card lg:card-side bg-base-100 shadow-md">
        <figure>
          <img class="h-60 w-full object-cover sm:h-full"
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
            alt="Album" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Card Title
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <ul class="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span>Customizable style templates</span>
            </li>
            <li class="opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span class="line-through">Real-time collaboration tools</span>
            </li>
          </ul>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Fashion</div>
            <div class="badge badge-outline">Products</div>
            <button class="btn btn-primary">More</button>
          </div>
        </div>
      </div> -->

      <!-- <div class="card bg-base-300 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Card Title
            <div data-theme="light" class="badge badge-secondary">NEW</div>
          </h2>
          <p>Click the button to listen on Spotiwhy app.</p>
            <div class="flex gap-2">
              <div class="badge badge-xs lg:badge-md badge-outline">Fashion</div>
              <div class="badge badge-warning badge-xs lg:badge-md">Products</div>
            </div>
          <ul class="mt-2 mb-4 flex flex-col gap-1 text-xs">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span>Customizable style templates</span>
            </li>
            <li class="opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span class="line-through">Real-time collaboration tools</span>
            </li>
          </ul>
          <div>
            <button class="btn btn-block text-lg sm:text-md bg-accent text-white mt-3 shadow-md">Info</button>
          </div>
        </div>
      </div> -->

      <div class="card bg-base-300 shadow-xl">
      <figure>
        <img 
          [src]="game().background_image" 
          [alt]="game().name"
          class="w-full object-cover"
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
            <div class="badge badge-xs lg:badge-md badge-outline">{{ genre.name }}</div>
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

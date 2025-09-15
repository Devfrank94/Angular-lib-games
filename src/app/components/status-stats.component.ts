import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Game } from '../models/game.interface';

@Component({
  selector: 'app-status-stats',
  imports: [CommonModule],
  template: `
    @if (game()?.added_by_status; as stats) {
      <!-- TODO: sistemare stats -->
      <div class="stats bg-accent text-white stats-vertical lg:stats-horizontal shadow-md">
        <div class="stat place-items-center">
          <div class="stat-title text-white">Non Acquistato</div>
          <div class="stat-value">{{ stats.yet }}</div>
          <div class="stat-desc text-white">Giochi nella wishlist</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title text-white">Posseduto</div>
          <div class="stat-value">{{ stats.owned }}</div>
          <div class="stat-desc text-white">Nella libreria</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title text-white">Completato</div>
          <div class="stat-value">{{ stats.beaten }}</div>
          <div class="stat-desc text-white">↗︎ Finiti al 100%</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title text-white">Da Giocare</div>
          <div class="stat-value">{{ stats.toplay }}</div>
          <div class="stat-desc text-white">Nel backlog</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title text-white">In Corso</div>
          <div class="stat-value">{{ stats.playing }}</div>
          <div class="stat-desc text-white">↗︎ Attualmente attivi</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title text-white">Abbandonato</div>
          <div class="stat-value">{{ stats.dropped }}</div>
          <div class="stat-desc text-white">↘︎ Non completati</div>
        </div>
      </div>
    }
  `,
  styles: ``
})
export class StatusStatsComponent {

  game = input.required<Game>();

}

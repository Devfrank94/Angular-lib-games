import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Game } from '../models/game.interface';

@Component({
    selector: "app-status-stats",
    imports: [CommonModule],
    template: `
        @if (game()?.added_by_status; as stats) {
        <h3 class="text-lg text-center font-semibold mb-2">Statistiche</h3>
        <div class="glass p-1 sm:p-2 rounded-xl">
          <div class="flex flex-col min-[1130px]:flex-row bg-accent text-white shadow-md rounded-lg">
            <div class="grid place-items-center py-2 px-4">
                <div class="text-white">Non Acquistato</div>
                <div class="flex">
                  <div class="text-4xl font-semibold">{{ stats.yet }}</div>
                <div class="stat-figure ms-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        fill="none"
                        class="h-8 w-8 stroke-white"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                        ></path>
                    </svg>
                </div>
                </div>
                <div class="stat-desc text-white">Giochi nella wishlist</div>
              </div>
              <div class="divider w-full min-[1130px]:divider-horizontal mx-0 max-[1130px]:my-0"></div>
            <div class="grid place-items-center py-2 px-4">
                <div class="text-white">Posseduto</div>
                <div class="flex">
                  <div class="text-4xl font-semibold">{{ stats.owned }}</div>
                  <div class="stat-figure ms-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          class="h-8 w-8 stroke-white"
                      >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                          />
                      </svg>
                  </div>
                </div>
                <div class="stat-desc text-white">Nella libreria</div>
            </div>
            <div class="divider w-full min-[1130px]:divider-horizontal mx-0 max-[1130px]:my-0"></div>
              <div class="grid place-items-center py-2 px-4">
                  <div class="text-white">Completato</div>
                  <div class="flex">
                    <div class="text-4xl font-semibold">{{ stats.beaten }}</div>
                  <div class="stat-figure ms-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          class="h-8 w-8 stroke-white"
                      >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                          />
                      </svg>
                  </div>
                </div>
                <div class="stat-desc text-white">Finiti al 100%</div>
            </div>
            <div class="divider w-full min-[1130px]:divider-horizontal mx-0 max-[1130px]:my-0"></div>
            <div class="grid place-items-center py-2 px-4">
                <div class="text-white">Da Giocare</div>
                <div class="flex">
                  <div class="text-4xl font-semibold">{{ stats.toplay }}</div>
                  <div class="stat-figure ms-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          class="h-8 w-8 stroke-white"
                      >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                      </svg>
                  </div>
                </div>
                <div class="stat-desc text-white">Nei preferiti</div>
            </div>
            <div class="divider w-full min-[1130px]:divider-horizontal mx-0 max-[1130px]:my-0"></div>
            <div class="grid place-items-center py-2 px-4">
                <div class="text-white">In Corso</div>
                <div class="flex">
                  <div class="text-4xl font-semibold">{{ stats.playing }}</div>
                  <div class="stat-figure ms-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          class="h-8 w-8 stroke-white"
                      >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                      </svg>
                  </div>
                </div>
                <div class="stat-desc text-white">Attualmente attivi</div>
            </div>
            <div class="divider w-full min-[1130px]:divider-horizontal mx-0 max-[1130px]:my-0"></div>
            <div class="grid place-items-center py-2 px-4">
                <div class="text-white">Abbandonato</div>
                <div class="flex">
                  <div class="text-4xl font-semibold">{{ stats.dropped }}</div>
                <div class="stat-figure ms-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        class="h-8 w-8 stroke-white"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                        />
                    </svg>
                </div>
                </div>
                <div class="stat-desc text-white">Non completati</div>
            </div>
          </div>
        </div>

        }
    `,
    styles: ``,
})
export class StatusStatsComponent {
    game = input.required<Game>();
}

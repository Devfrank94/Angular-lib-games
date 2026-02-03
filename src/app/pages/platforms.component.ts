import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../components/loading.component";
import { ErrorgenericComponent } from "../components/error-generic.component";

@Component({
  selector: 'app-platforms',
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorgenericComponent],
  template: `
    @if (platformsLoading()) {
    <div class="flex-center-center p-8">
      <app-loading />
    </div>
  } @else if (platformsError()) {
    <app-error-generic/>
  } @else {
      <div class="h-full glass rounded-lg shadow-md p-4 overflow-y-scroll">
        <div class="grid grid-cols-1 gap-4">
          @for (platform of platforms(); track platform.id) {
            <div class="card lg:card-side bg-base-100 shadow-xl">
              <figure class="flex-center-center lg:w-2/4">
                  <div class="flex-center-center">
                      <img
                      [src]="platformImage(platform.name)"
                      [alt]="platform.name"
                      class="object-contain"
                      loading="lazy"
                    />
                  </div>
              </figure>
              <div class="card-body">
                <div class="flex-start-center">
                  <h2 class="card-title me-4">{{ platform.name }}</h2>
                  <div class="bg-accent py-1 px-2 rounded-full">
                    <img
                      [src]="platformIcon(platform.name)"
                      [alt]="platform.name"
                      class="w-4 h-4 sm:w-5 sm:h-5 invert"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <p>Titoli disponibili: {{ platform.games_count }}</p>
                </div>
                <div class="flex-center-center">
                  <div class="w-100 lg:w-full">
                    <h2 class="font-bold mb-3">Top 6 giochi:</h2>
                    <div class="overflow-x-auto border rounded-box border-base-content/15 bg-base-100">
                      <table class="table table-zebra">
                        <thead>
                          <tr>
                            <th>Nome</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (game of platform.games; track game.id) {
                            <tr class="hover:bg-accent hover:text-white">
                              <td class="font-semibold">
                                <a [routerLink]="['/game', game.id, game.slug]" class="link link-hover">
                                  <p class="truncate">{{ game.name }}</p>
                                </a>
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: ``
})
export default class PlatformsComponent implements OnInit {
  readonly apiService = inject(ApiService);

  platforms = this.apiService.platforms;
  platformsLoading = this.apiService.platformsLoading;
  platformsError = this.apiService.platformsError;

  private readonly platformImageMap = new Map([

    ['PlayStation', 'assets/image_platforms/PS1.webp'],
    ['PlayStation 2', 'assets/image_platforms/PS2.webp'],
    ['PlayStation 3', 'assets/image_platforms/PS3.webp'],
    ['PlayStation 4', 'assets/image_platforms/PS4.webp'],
    ['PlayStation 5', 'assets/image_platforms/PS5.webp'],
    ['PS Vita', 'assets/image_platforms/PS_Vita.webp'],
    ['PSP', 'assets/image_platforms/PSP.webp'],
    ['Xbox', 'assets/image_platforms/Xbox.webp'],
    ['Xbox 360', 'assets/image_platforms/Xbox360.webp'],
    ['Xbox One', 'assets/image_platforms/XboxOne.webp'],
    ['Xbox Series S/X', 'assets/image_platforms/Xbox_Series_S_X.webp'],
    ['Nintendo Switch', 'assets/image_platforms/Nintendo_Switch.webp'],
    ['Nintendo 3DS', 'assets/image_platforms/Nintendo_3DS.webp'],
    ['Nintendo DS', 'assets/image_platforms/Nintendo_DS.webp'],
    ['Nintendo DSi', 'assets/image_platforms/Nintendo_DSi.webp'],
    ['PC', 'assets/image_platforms/Pc.webp'],
    ['macOS', 'assets/image_platforms/MacOs.webp'],
    ['Linux', 'assets/image_platforms/Linux.webp'],
    ['iOS', 'assets/image_platforms/ios.webp'],
    ['Android', 'assets/image_platforms/Android.webp']
  ]);

  platformImage = (platformName: string) => {
    return this.platformImageMap.get(platformName) || null;
  };

    private readonly platformIconMap = new Map([

    ['PlayStation', 'assets/platforms/playstation.svg'],
    ['PlayStation 2', 'assets/platforms/playstation.svg'],
    ['PlayStation 3', 'assets/platforms/playstation.svg'],
    ['PlayStation 4', 'assets/platforms/playstation.svg'],
    ['PlayStation 5', 'assets/platforms/playstation.svg'],
    ['PS Vita', 'assets/platforms/playstation.svg'],
    ['PSP', 'assets/platforms/playstation.svg'],
    ['Xbox', 'assets/platforms/xbox.svg'],
    ['Xbox 360', 'assets/platforms/xbox.svg'],
    ['Xbox One', 'assets/platforms/xbox.svg'],
    ['Xbox Series S/X', 'assets/platforms/xbox.svg'],
    ['Nintendo Switch', 'assets/platforms/nintendo.svg'],
    ['Nintendo 3DS', 'assets/platforms/nintendo.svg'],
    ['Nintendo DS', 'assets/platforms/nintendo.svg'],
    ['Nintendo DSi', 'assets/platforms/nintendo.svg'],
    ['PC', 'assets/platforms/windows.svg'],
    ['macOS', 'assets/platforms/mac.svg'],
    ['Linux', 'assets/platforms/linux.svg'],
    ['iOS', 'assets/platforms/ios.svg'],
    ['Android', 'assets/platforms/android.svg']

  ]);

  platformIcon = (platformName: string) => {
    return this.platformIconMap.get(platformName) || null;
  };

  ngOnInit() {
    this.apiService.getPlatforms();
  }
}

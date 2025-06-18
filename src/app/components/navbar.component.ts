import { Component, inject, effect } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  template: `

  @if (navbarService.navbarConfig(); as navbarConfig)  {
    <ul class="hidden sm:block menu menu-sm md:menu-md rounded-lg shadow-xl md:w-50 bg-base-300">
      <li class="gap-4 md:my-2">
        @for  (item of navbarConfig; track item.route) {
        <a class="tooltip tooltip-bottom md:tooltip-right" [attr.data-tip]="capitalize(item.label)" [routerLink]="item.route" routerLinkActive="menu-active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              [attr.d]="item.iconSvg" />
          </svg>
          <p class="hidden md:block mt-1 ms-2 capitalize">{{ item.label }}</p>
        </a>
        }
      </li>
    </ul>
    <!-- Mobile Menù -->
    <div class="dock color-base-content rounded-b-lg fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      @for  (item of navbarConfig; track item.route) {
      <button [routerLink]="item.route" routerLinkActive="dock-active">
        <svg class="size-[1.5rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path [attr.d]="item.iconSvg" fill="none"
            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7">
            </path>
        </svg>
        <span class="text-[8px] sm:text-[10px] font-semibold">{{ item.label }}</span>
      </button>
    }
    </div>
  }

  `,
  styles: ``
})
export class NavbarComponent {
  navbarService = inject(NavbarService);

  // constructor() {
  //   effect(() => {
  //     console.log('Navbar config:', this.navbarService.navbarConfig());
  //   });
  // }

  capitalize(label: string): string {
    return label ? label.charAt(0).toUpperCase() + label.slice(1) : '';
  }
}

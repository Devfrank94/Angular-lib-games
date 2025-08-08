import { Component, inject, signal, HostListener } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  template: `

  @if (navbarService.navbarConfig(); as navbarConfig) {
    <ul class="h-full hidden sm:block menu menu-sm md:menu-md lg:menu-lg xl:menu-xl rounded-lg shadow-xl bg-base-300">
      <div class="max-[868px]:hidden">
        <div class="ms-1 lg:ms-2 xl:ms-3">
          <div class="flex items-center my-2">
            <label class="btn btn-circle btn-neutral fill-neutral-content swap swap-rotate">
              <input
              type="checkbox"
              [checked]="isMenuOpen()"
              (change)="toggleMenu()" />
              <!-- hamburger icon -->
              <svg
                class="swap-off h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <!-- close icon -->
              <svg
                class="swap-on h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <polygon
                  points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
            <div *ngIf="isMenuOpen()">
              <p class="hidden md:block mt-1 ms-3 md:text-lg lg:text-xl">Menù</p>
            </div>
          </div>
        </div>
        <div class="border-b-1 border-base-content/20 my-4"></div>
      </div>
      <li class="gap-4 md:my-2">
        @for  (item of navbarConfig; track item.route) {
        <a class="tooltip tooltip-hover tooltip-bottom md:tooltip-right" [attr.data-tip]="capitalize(item.label)" [routerLink]="item.route" routerLinkActive="menu-active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 my-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              [attr.d]="item.iconSvg" />
          </svg>
          <div *ngIf="isMenuOpen()">
            <p class="hidden md:block mt-1 capitalize md:text-lg lg:text-xl" [class.ms-2]="isMenuOpen()">{{ item.label }}</p>
          </div>
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
  isMenuOpen = signal(false);

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth < 868) {
      this.isMenuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update(state => !state);
  }

  capitalize(label: string): string {
    return label ? label.charAt(0).toUpperCase() + label.slice(1) : '';
  }
}

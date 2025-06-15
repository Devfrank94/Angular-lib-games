import { Component, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-switch-mode',
  imports: [],
  template: `
  <label class="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>

    <input
        type="checkbox"
        class="toggle theme-controller"
        [checked]="isDarkMode()"
        (change)="toggleTheme()" />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </label>
  `,
  styles: [],
})

  export class SwitchModeComponent {
  private readonly document = inject(DOCUMENT);

  // Signal per gestire lo stato del tema
  readonly isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Effect per applicare il tema quando cambia lo stato
    effect(() => this.applyTheme(this.isDarkMode() ? 'dark' : 'light'));
  }

  toggleTheme(): void {
    this.isDarkMode.update(current => !current);
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    const { documentElement, body } = this.document;

    // Applica il tema in più modi per garantire compatibilità
    documentElement.setAttribute('data-theme', theme);
    documentElement.className = theme;
    body.setAttribute('data-theme', theme);

    localStorage.setItem('theme', theme);
  }
}


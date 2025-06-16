import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-go-to-top',
  imports: [],
  template: `
    @if (isVisible()) {
      <button
        class="btn btn-circle btn-secondary fixed bottom-10 right-15 z-50 shadow-lg animate-bounce"
        (click)="scrollToTop()"
        aria-label="Torna in cima">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
      </button>
    }
  `,
  styles: ``
})
export class GoToTopComponent {
  isVisible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isVisible.set(window.scrollY > 40);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

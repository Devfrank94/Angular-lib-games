import { Component } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  imports: [],
  template: `
  <div class="h-100">
    <div class="flex-center-center h-full bg-base-300 rounded-lg shadow-md py-8 px-5">
      <div class="text-center">
        <!-- Maintenance Icon -->
        <div class="my-2 sm:my-8">
          <div class=" w-16 h-16 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-6 bg-warning/10 rounded-full flex-center-center">
            <svg class=" w-8 h-8 sm:w-16 sm:h-16 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z"/>
            </svg>
          </div>

          <h1 class="text-2xl sm:text-4xl font-bold text-warning mb-4">Manutenzione</h1>
          <p class="text-base-content/80 text-sm sm:text-lg">
            La pagina che stai cercando è in manutenzione o in fase di sviluppo.
          </p>
        </div>
      </div>
    </div>
  </div>

  `,
  styles: ``
})
export class MaintenanceComponent {

}

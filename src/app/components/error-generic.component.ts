import { Component } from '@angular/core';

@Component({
  selector: 'app-error-generic',
  imports: [],
  template: `
    <div class="flex flex-col min-h-60 h-90">
      <div class="text-center flex-1 bg-base-100/50 flex-center-center rounded-lg shadow-md p-5">
        <div class="my-2 sm:my-8">
          <div class=" w-16 h-16 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-6 bg-error/10 rounded-full flex-center-center">
            <svg class=" w-8 h-8 sm:w-16 sm:h-16 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <h1 class="text-2xl sm:text-3xl lg:text-5xl font-bold text-error mb-4">Errore! Ricarica la pagina.</h1>
          <h2 class="text-1xl md:text-2xl font-bold text-base-content mb-2">
            Oops! Qualcosa è andato storto
          </h2>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ErrorgenericComponent {

}

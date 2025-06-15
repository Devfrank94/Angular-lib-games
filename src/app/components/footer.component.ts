import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="footer footer-horizontal footer-center bg-neutral text-primary-content py-6 px-6 sm:px-12">
  <aside>
    <img
      src="../../../logo-footer.png"
      alt="logo"
      class="w-28 h-28" />
    <p class="font-bold">
      Angular Library Games
      <br />
      La migliore libreria di giochi
    </p>
    <p>Copyright © 2025 - Tutti i diritti riservati by DevFrank94</p>
  </aside>
  <div class="flex w-full flex-col">
  <div class="divider">Canali Social</div>
  </div>
  <nav>
    <div class="grid grid-flow-col gap-4">
      <a href="https://www.linkedin.com/in/francesco-murro-dev/" target="_blank">
        <img src="linkedin.svg" alt="LinkedIn" width="28" height="28" class="filter invert" />
      </a>
      <a href="https://github.com/Devfrank94?tab=repositories" target="_blank">
        <img src="github.svg" alt="GitHub" width="28" height="28" class="filter invert" />
      </a>
      <a href="mailto:francescomurro94@gmail.com">
        <img src="gmail.svg" alt="Gmail" width="28" height="28" class="filter invert" />
      </a>
    </div>
  </nav>
</footer>
  `,
  styles: [],
})
export class FooterComponent {

}

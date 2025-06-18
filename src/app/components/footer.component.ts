import { Component, inject, effect} from '@angular/core';
import { FooterService } from '../services/footer.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  template: `

  @if (footerService.footerConfig(); as footer) {
    <footer class="footer footer-horizontal footer-center bg-neutral text-white pt-0 sm:pt-3 pb-4 px-6 sm:px-12">
      <div>
        <img [src]="footer.companyLogo" alt="logo" class="w-17 h-17 sm:w-20 sm:h-20" />
          <p class="font-bold">
            {{ footer.companyName }}
            <br />
            {{ footer.companyDescription }}
          </p>
        <p>{{ footer.copyright }}</p>
      </div>
      <div class="flex w-full flex-col">

      <div class="divider my-0">Contatti</div></div>

      <div class="grid grid-flow-col gap-4">
        @for (social of footer.socialLinks; track social.url) {
        <a [href]="social.url" target="_blank">
          <img [src]="social.img" [alt]="'logo-' + social.name" width="28" height="28" class="filter invert" />
        </a>
        }
      </div>
    </footer>
  }
  `,
  styles: [],
})
export class FooterComponent {
  footerService = inject(FooterService);

  // constructor() {
  //   effect(() => {
  //     console.log('Footer config:', this.footerService.footerConfig());
  //   });
  // }

}

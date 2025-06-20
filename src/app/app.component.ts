import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoToTopComponent } from "./components/go-to-top.component";
import { FooterComponent } from "./components/footer.component";
import { NavbarComponent } from "./components/navbar.component";
import { TopbarComponent } from "./components/topbar.component";
import { ToolbarComponent } from "./components/toolbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GoToTopComponent, FooterComponent, NavbarComponent, TopbarComponent, ToolbarComponent],
  template: `

    <div class="h-screen flex flex-col">
      <div class="flex-1">
        <app-topbar />
        <div class="flex-center-center py-3 sm:py-1">
          <div class="my-container my-box p-3 sm:m-4 sm:p-4 min-h-[70vh] max-h-[80vh]">
            <div class="flex gap-4 py-4 px-1 sm:px-4">
              <div class="hidden sm:block min-w-fit">
                <!-- Nav desktop -->
                <app-navbar />
              </div>
              <div class="w-full flex flex-col gap-4">
                <app-toolbar />
                <div class="py-3 sm:py-0 sm:px-1 w-full max-h-[54vh] sm:max-h-[59vh] md:max-h-[65vh] lg:max-h-[60vh] xl:max-h-[65vh] overflow-y-auto rounded-xl">
                  <router-outlet />
                </div>
                <!-- Nav mobile -->
                <div class="block mt-5 sm:hidden">
                  <app-navbar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <app-go-to-top />
        <app-footer />
      </div>
    </div>

  `,
  styles: `
    .my-box {
    backdrop-filter: blur(2px) saturate(200%);
    -webkit-backdrop-filter: blur(2px) saturate(200%);
    background-color: rgba(50, 50, 50, 0.125);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    }
`,
})
export class AppComponent {
  title = 'Angular-Games-Library';

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
      <!-- <div class="card lg:card-side bg-base-100 shadow-md">
        <figure>
          <img class="h-60 w-full object-cover sm:h-full"
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
            alt="Album" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Card Title
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <ul class="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span>Customizable style templates</span>
            </li>
            <li class="opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span class="line-through">Real-time collaboration tools</span>
            </li>
          </ul>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Fashion</div>
            <div class="badge badge-outline">Products</div>
            <button class="btn btn-primary">More</button>
          </div>
        </div>
      </div> -->

      <div class="card bg-base-300 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Card Title
            <div data-theme="light" class="badge badge-secondary">NEW</div>
          </h2>
          <p>Click the button to listen on Spotiwhy app.</p>
            <div class="flex gap-2">
              <div class="badge badge-xs lg:badge-md badge-outline">Fashion</div>
              <div class="badge badge-warning badge-xs lg:badge-md">Products</div>
            </div>
          <ul class="mt-2 mb-4 flex flex-col gap-1 text-xs">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span>High-resolution image generation</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span>Customizable style templates</span>
            </li>
            <li class="opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <span class="line-through">Real-time collaboration tools</span>
            </li>
          </ul>
          <div>
            <button class="btn btn-block bg-accent text-white mt-3 shadow-md">Info</button>
          </div>
        </div>
      </div>
  `,
  styles: ``
})
export class CardComponent {

}

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    title: "Home - Games Library",
    loadComponent: () => import('./pages/home.component'),
  },
  {
    path: "platforms",
    loadComponent: () => import('./pages/platforms.component'),
    title: "Piattaforme - Games Library",
  },
  {
    path: "creators",
    loadComponent: () => import('./pages/creators.component'),
    title: "Creatori - Games Library",
  },
  {
    path: "developers",
    loadComponent: () => import('./pages/developers.component'),
    title: "Sviluppatori - Games Library",
  },
  {
    path: "new-releases",
    loadComponent: () => import('./pages/new-releases.component'),
    title: "Nuove Uscite - Games Library",
  },
  {
    path: "top-games",
    loadComponent: () => import('./pages/top-games.component'),
    title: "Top Giochi - Games Library",
  },
  {
    path: "404",
    loadComponent: () => import('./pages/error404.component'),
    title: "Errore 404 Pagina non trovata"
  },
  {
    path: "**",
    redirectTo: "404",
    title: "Errore 404 Pagina non trovata"
  }
];

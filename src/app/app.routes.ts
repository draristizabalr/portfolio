import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about'),
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills'),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact'),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

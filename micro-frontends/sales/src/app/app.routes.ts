import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./sales/sales.component').then(m => m.SalesComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
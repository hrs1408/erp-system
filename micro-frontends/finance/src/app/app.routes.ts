import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./finance/finance.component').then(m => m.FinanceComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
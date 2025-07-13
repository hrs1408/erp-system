import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./hr/hr.component').then(m => m.HrComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
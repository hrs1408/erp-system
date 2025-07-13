import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3002/remoteEntry.js',
      remoteName: 'dashboard',
      exposedModule: './DashboardModule'
    }).then((m: any) => m.DashboardModule)
  },
  {
    path: 'inventory',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3003/remoteEntry.js',
      remoteName: 'inventory',
      exposedModule: './InventoryModule'
    }).then((m: any) => m.InventoryModule)
  },
  {
    path: 'sales',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3004/remoteEntry.js',
      remoteName: 'sales',
      exposedModule: './SalesModule'
    }).then((m: any) => m.SalesModule)
  },
  {
    path: 'hr',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3005/remoteEntry.js',
      remoteName: 'hr',
      exposedModule: './HRModule'
    }).then((m: any) => m.HRModule)
  },
  {
    path: 'finance',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3006/remoteEntry.js',
      remoteName: 'finance',
      exposedModule: './FinanceModule'
    }).then((m: any) => m.FinanceModule)
  },
  {
    path: 'reports',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3007/remoteEntry.js',
      remoteName: 'reports',
      exposedModule: './ReportsModule'
    }).then((m: any) => m.ReportsModule)
  },
  {
    path: 'auth',
    loadChildren: () => loadRemoteModule({
      remoteEntry: 'http://localhost:3001/remoteEntry.js',
      remoteName: 'auth',
      exposedModule: './AuthModule'
    }).then((m: any) => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
]; 
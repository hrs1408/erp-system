import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';

import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './components/dashboard-overview.component';
import { SalesChartComponent } from './components/sales-chart.component';
import { InventoryStatusComponent } from './components/inventory-status.component';

const routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardOverviewComponent,
    SalesChartComponent,
    InventoryStatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  bootstrap: [AppComponent]
})
export class DashboardModule { } 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { SalesComponent } from './sales.component';
import { OrderListComponent } from './components/order-list.component';
import { CustomerListComponent } from './components/customer-list.component';
import { SalesChartComponent } from './components/sales-chart.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'orders', component: OrderListComponent },
      { path: 'customers', component: CustomerListComponent },
      { path: 'analytics', component: SalesChartComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    OrderListComponent,
    CustomerListComponent,
    SalesChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CurrencyPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class SalesModule { } 
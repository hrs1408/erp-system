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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

import { ReportsComponent } from './reports.component';
import { SalesReportComponent } from './components/sales-report.component';
import { InventoryReportComponent } from './components/inventory-report.component';
import { FinancialReportComponent } from './components/financial-report.component';
import { HRReportComponent } from './components/hr-report.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      { path: '', redirectTo: 'sales', pathMatch: 'full' },
      { path: 'sales', component: SalesReportComponent },
      { path: 'inventory', component: InventoryReportComponent },
      { path: 'financial', component: FinancialReportComponent },
      { path: 'hr', component: HRReportComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    SalesReportComponent,
    InventoryReportComponent,
    FinancialReportComponent,
    HRReportComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatMenuModule
  ],
  bootstrap: [AppComponent]
})
export class ReportsModule { } 
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

import { FinanceComponent } from './finance.component';
import { TransactionListComponent } from './components/transaction-list.component';
import { FinancialReportComponent } from './components/financial-report.component';
import { BudgetComponent } from './components/budget.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: '',
    component: FinanceComponent,
    children: [
      { path: '', redirectTo: 'transactions', pathMatch: 'full' },
      { path: 'transactions', component: TransactionListComponent },
      { path: 'reports', component: FinancialReportComponent },
      { path: 'budget', component: BudgetComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FinanceComponent,
    TransactionListComponent,
    FinancialReportComponent,
    BudgetComponent
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
    MatChipsModule
  ],
  bootstrap: [AppComponent]
})
export class FinanceModule { } 
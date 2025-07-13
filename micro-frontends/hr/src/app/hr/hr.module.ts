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

import { HrComponent } from './hr.component';
import { EmployeeListComponent } from './components/employee-list.component';
import { AttendanceComponent } from './components/attendance.component';
import { PayrollComponent } from './components/payroll.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: '',
    component: HrComponent,
    children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'payroll', component: PayrollComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HrComponent,
    EmployeeListComponent,
    AttendanceComponent,
    PayrollComponent
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
export class HRModule { } 
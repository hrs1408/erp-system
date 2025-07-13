import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CurrencyPipe } from '@angular/common';

import { InventoryComponent } from './inventory.component';
import { ProductListComponent } from './components/product-list.component';
import { ProductFormComponent } from './components/product-form.component';
import { StockStatusComponent } from './components/stock-status.component';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'stock-status', component: StockStatusComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    ProductListComponent,
    ProductFormComponent,
    StockStatusComponent
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
    MatProgressBarModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class InventoryModule { } 
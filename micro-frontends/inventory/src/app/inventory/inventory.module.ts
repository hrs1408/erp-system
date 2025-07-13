import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    FormsModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class InventoryModule { } 
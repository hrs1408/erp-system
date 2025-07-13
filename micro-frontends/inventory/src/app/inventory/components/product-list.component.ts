import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  template: `
    <h2>Danh sách sản phẩm</h2>
    <ul>
      <li *ngFor="let product of products">
        {{ product.name }} - {{ product.category }} - {{ product.quantity }} {{ product.unit }}
      </li>
    </ul>
  `
})
export class ProductListComponent {
  products = [
    { name: 'Sản phẩm A', category: 'Loại 1', quantity: 10, unit: 'cái' },
    { name: 'Sản phẩm B', category: 'Loại 2', quantity: 5, unit: 'hộp' },
    { name: 'Sản phẩm C', category: 'Loại 1', quantity: 0, unit: 'cái' }
  ];
} 
import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-status',
  template: `
    <h2>Trạng thái kho</h2>
    <ul>
      <li>Còn hàng: 10 sản phẩm</li>
      <li>Sắp hết: 2 sản phẩm</li>
      <li>Hết hàng: 1 sản phẩm</li>
    </ul>
  `
})
export class StockStatusComponent {} 
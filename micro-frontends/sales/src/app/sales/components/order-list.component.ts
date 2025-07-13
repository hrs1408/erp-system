import { Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  template: `
    <h2>Danh sách đơn hàng</h2>
    <ul>
      <li *ngFor="let order of orders">
        Mã: {{ order.id }} - Khách: {{ order.customer }} - Tổng: {{ order.total }}₫
      </li>
    </ul>
  `
})
export class OrderListComponent {
  orders = [
    { id: 'DH001', customer: 'Nguyễn Văn A', total: 1200000 },
    { id: 'DH002', customer: 'Trần Thị B', total: 850000 },
    { id: 'DH003', customer: 'Lê Văn C', total: 430000 }
  ];
} 
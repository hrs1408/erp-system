import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  template: `
    <h2>Danh sách khách hàng</h2>
    <ul>
      <li *ngFor="let customer of customers">
        {{ customer.name }} - {{ customer.phone }}
      </li>
    </ul>
  `
})
export class CustomerListComponent {
  customers = [
    { name: 'Nguyễn Văn A', phone: '0901234567' },
    { name: 'Trần Thị B', phone: '0912345678' },
    { name: 'Lê Văn C', phone: '0987654321' }
  ];
} 
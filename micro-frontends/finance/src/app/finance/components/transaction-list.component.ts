import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  template: `
    <h2>Danh sách giao dịch</h2>
    <ul>
      <li *ngFor="let t of transactions">
        {{ t.date }} - {{ t.type }} - {{ t.amount }}₫
      </li>
    </ul>
  `
})
export class TransactionListComponent {
  transactions = [
    { date: '2024-06-01', type: 'Thu', amount: 5000000 },
    { date: '2024-06-02', type: 'Chi', amount: 2000000 },
    { date: '2024-06-03', type: 'Thu', amount: 3000000 }
  ];
} 
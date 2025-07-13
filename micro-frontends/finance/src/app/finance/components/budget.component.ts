import { Component } from '@angular/core';

@Component({
  selector: 'app-budget',
  template: `
    <h2>Ngân sách</h2>
    <ul>
      <li>Ngân sách năm: 100 triệu</li>
      <li>Đã sử dụng: 40 triệu</li>
      <li>Còn lại: 60 triệu</li>
    </ul>
  `
})
export class BudgetComponent {} 
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  template: `
    <h2>Danh sách nhân viên</h2>
    <ul>
      <li *ngFor="let emp of employees">
        {{ emp.name }} - {{ emp.position }}
      </li>
    </ul>
  `
})
export class EmployeeListComponent {
  employees = [
    { name: 'Nguyễn Văn A', position: 'Kế toán' },
    { name: 'Trần Thị B', position: 'Nhân sự' },
    { name: 'Lê Văn C', position: 'Quản lý kho' }
  ];
} 
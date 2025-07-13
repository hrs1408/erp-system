import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-finance',
  
  template: `
    <div class="finance-container">
      <div class="header-card">
        <div class="header-content">
          <div class="header-title">
            <span class="icon">💰</span>
            Quản lý tài chính
          </div>
          <div class="header-subtitle">Quản lý hoạt động tài chính</div>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" (click)="addNew()">
            <span class="icon">➕</span>
            Thêm mới
          </button>
          <button class="btn btn-secondary" (click)="importData()">
            <span class="icon">📤</span>
            Nhập
          </button>
          <button class="btn btn-danger" (click)="exportData()">
            <span class="icon">📥</span>
            Xuất
          </button>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ totalRecords }}</div>
            <div class="stat-label">Tổng bản ghi</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ activeRecords }}</div>
            <div class="stat-label">Đang hoạt động</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ pendingRecords }}</div>
            <div class="stat-label">Chờ xử lý</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ totalValue | currency:'VND' }}</div>
            <div class="stat-label">Tổng giá trị</div>
          </div>
        </div>
      </div>

      <div class="table-card">
        <div class="table-header">
          <h3>Dữ liệu tài chính</h3>
        </div>
        <div class="table-content">
          <div class="search-field">
            <input type="text" (keyup)="applyFilter($event)" placeholder="Tìm kiếm...">
            <span class="search-icon">🔍</span>
          </div>

          <div class="table-container">
            <table class="finance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Trạng thái</th>
                  <th>Ngày</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of records">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>
                    <span [class]="getStatusClass(item.status)">{{ item.status }}</span>
                  </td>
                  <td>{{ item.date | date }}</td>
                  <td class="actions">
                    <button class="btn-icon btn-edit" (click)="editItem(item)" title="Sửa">
                      ✏️
                    </button>
                    <button class="btn-icon btn-view" (click)="viewItem(item)" title="Xem">
                      👁️
                    </button>
                    <button class="btn-icon btn-delete" (click)="deleteItem(item)" title="Xóa">
                      🗑️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .finance-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .header-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .header-content {
      margin-bottom: 20px;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .header-subtitle {
      font-size: 14px;
      opacity: 0.9;
    }

    .header-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background: #c82333;
    }

    .stats-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .stat-item {
      text-align: center;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-number {
      font-size: 32px;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 8px;
    }

    .stat-label {
      color: #6c757d;
      font-size: 14px;
    }

    .table-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .table-header h3 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 18px;
    }

    .search-field {
      position: relative;
      width: 100%;
      margin-bottom: 20px;
    }

    .search-field input {
      width: 100%;
      padding: 12px 40px 12px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .search-field input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #6c757d;
    }

    .table-container {
      overflow-x: auto;
    }

    .finance-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    .finance-table th {
      background: #f8f9fa;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #dee2e6;
    }

    .finance-table td {
      padding: 12px;
      border-bottom: 1px solid #dee2e6;
      vertical-align: middle;
    }

    .finance-table tbody tr:hover {
      background: #f8f9fa;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 4px;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }

    .btn-edit:hover {
      background: #e3f2fd;
    }

    .btn-view:hover {
      background: #f3e5f5;
    }

    .btn-delete:hover {
      background: #ffebee;
    }

    .status-active {
      color: #4caf50;
      font-weight: 500;
    }

    .status-pending {
      color: #ff9800;
      font-weight: 500;
    }

    .status-inactive {
      color: #f44336;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .finance-container {
        padding: 10px;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .header-actions {
        flex-direction: column;
      }

      .finance-table {
        font-size: 12px;
      }

      .finance-table th,
      .finance-table td {
        padding: 8px 4px;
      }
    }
  `]
})
export class FinanceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'date', 'actions'];
  dataSource: any;
  
  // Mock data
  records: any[] = [
    {
      id: 1,
      name: 'Sample Record 1',
      status: 'Active',
      date: new Date(),
      value: 1000
    },
    {
      id: 2,
      name: 'Sample Record 2',
      status: 'Pending',
      date: new Date(),
      value: 2500
    },
    {
      id: 3,
      name: 'Sample Record 3',
      status: 'Inactive',
      date: new Date(),
      value: 500
    }
  ];

  get totalRecords(): number {
    return this.records.length;
  }

  get activeRecords(): number {
    return this.records.filter(record => record.status === 'Active').length;
  }

  get pendingRecords(): number {
    return this.records.filter(record => record.status === 'Pending').length;
  }

  get totalValue(): number {
    return this.records.reduce((sum, record) => sum + record.value, 0);
  }

  ngOnInit() {
    this.dataSource = this.records;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('Filter:', filterValue);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Pending': return 'status-pending';
      case 'Inactive': return 'status-inactive';
      default: return '';
    }
  }

  addNew() {
    console.log('Add new clicked');
  }

  editItem(item: any) {
    console.log('Edit item:', item);
  }

  viewItem(item: any) {
    console.log('View item:', item);
  }

  deleteItem(item: any) {
    console.log('Delete item:', item);
  }

  importData() {
    console.log('Import data clicked');
  }

  exportData() {
    console.log('Export data clicked');
  }
}
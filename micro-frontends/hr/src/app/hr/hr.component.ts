import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr',
  
  template: `
    <div class="hr-container">
      <div class="header-card">
        <div class="header-content">
          <div class="header-title">
            <span class="icon">👥</span>
            Quản lý nhân sự
          </div>
          <div class="header-subtitle">Quản lý hoạt động nhân sự</div>
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
          <h3>Dữ liệu nhân sự</h3>
        </div>
        <div class="table-content">
          <div class="search-field">
            <input type="text" (keyup)="applyFilter($event)" placeholder="Tìm kiếm...">
            <span class="search-icon">🔍</span>
          </div>

          <div class="table-container">
            <table class="hr-table">
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
    .hr-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
    }

    .header-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .header-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
      font-weight: 500;
    }

    .header-card mat-card-actions {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    .stats-card {
      background: #f8f9fa;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 16px;
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
      color: var(--primary-color);
      margin-bottom: 8px;
    }

    .stat-label {
      color: var(--text-secondary);
      font-size: 14px;
    }

    .table-card {
      margin-top: 20px;
    }

    .search-field {
      width: 100%;
      margin-bottom: 20px;
    }

    .table-container {
      position: relative;
      min-height: 400px;
    }

    .hr-table {
      width: 100%;
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
      .hr-container {
        padding: 10px;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .header-card mat-card-actions {
        flex-direction: column;
      }
    }
  `]
})
export class HrComponent implements OnInit {
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
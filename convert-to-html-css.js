// Script để chuyển đổi các component từ Material sang HTML/CSS thuần
const fs = require('fs');
const path = require('path');

// Template HTML/CSS thuần cho các component
const htmlTemplates = {
  hr: `
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
  
  finance: `
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
  
  reports: `
    <div class="reports-container">
      <div class="header-card">
        <div class="header-content">
          <div class="header-title">
            <span class="icon">📊</span>
            Báo cáo & Phân tích
          </div>
          <div class="header-subtitle">Quản lý báo cáo và phân tích</div>
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
          <h3>Dữ liệu báo cáo</h3>
        </div>
        <div class="table-content">
          <div class="search-field">
            <input type="text" (keyup)="applyFilter($event)" placeholder="Tìm kiếm...">
            <span class="search-icon">🔍</span>
          </div>

          <div class="table-container">
            <table class="reports-table">
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
  `
};

// CSS chung cho tất cả các component
const commonCSS = `
    .container {
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

    .table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    .table th {
      background: #f8f9fa;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #dee2e6;
    }

    .table td {
      padding: 12px;
      border-bottom: 1px solid #dee2e6;
      vertical-align: middle;
    }

    .table tbody tr:hover {
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

    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .header-actions {
        flex-direction: column;
      }

      .table {
        font-size: 12px;
      }

      .table th,
      .table td {
        padding: 8px 4px;
      }
    }
`;

console.log('Script chuyển đổi từ Material sang HTML/CSS thuần đã được tạo.');
console.log('Sử dụng các template và CSS trên để chuyển đổi các component còn lại.'); 
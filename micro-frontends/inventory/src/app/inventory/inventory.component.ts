import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
  lastUpdated: Date;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Component({
  selector: 'app-inventory',
  template: `
    <div class="inventory-container">
      <div class="header-card">
        <div class="header-content">
          <div class="header-title">
            <span class="icon">📦</span>
            Quản lý kho hàng
          </div>
          <div class="header-subtitle">Quản lý sản phẩm trong kho</div>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" (click)="addItem()">
            <span class="icon">➕</span>
            Thêm sản phẩm
          </button>
          <button class="btn btn-secondary" (click)="importInventory()">
            <span class="icon">📤</span>
            Nhập
          </button>
          <button class="btn btn-danger" (click)="exportInventory()">
            <span class="icon">📥</span>
            Xuất
          </button>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ totalItems }}</div>
            <div class="stat-label">Tổng sản phẩm</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ lowStockItems }}</div>
            <div class="stat-label">Sắp hết</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ outOfStockItems }}</div>
            <div class="stat-label">Hết hàng</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ totalValue | currency:'VND' }}</div>
            <div class="stat-label">Tổng giá trị</div>
          </div>
        </div>
      </div>

      <div class="table-card">
        <div class="table-header">
          <h3>Danh sách sản phẩm</h3>
        </div>
        <div class="table-content">
          <div class="search-field">
            <input type="text" (keyup)="applyFilter($event)" placeholder="Tìm kiếm theo tên, loại, nhà cung cấp...">
            <span class="search-icon">🔍</span>
          </div>

          <div class="table-container">
            <table class="inventory-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sản phẩm</th>
                  <th>Loại</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of inventoryItems">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.category }}</td>
                  <td>
                    <span [class]="getQuantityClass(item.quantity)">{{ item.quantity }} {{ item.unit }}</span>
                  </td>
                  <td>{{ item.price | currency:'VND' }}</td>
                  <td>
                    <span [class]="getStatusClass(item.status)">{{ item.status }}</span>
                  </td>
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
    .inventory-container {
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

    .inventory-table {
      width: 100%;
      border-collapse: collapse;
      background: white;
    }

    .inventory-table th {
      background: #f8f9fa;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #dee2e6;
    }

    .inventory-table td {
      padding: 12px;
      border-bottom: 1px solid #dee2e6;
      vertical-align: middle;
    }

    .inventory-table tbody tr:hover {
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

    .quantity-low {
      color: #ff9800;
      font-weight: 500;
    }

    .quantity-out {
      color: #f44336;
      font-weight: 500;
    }

    .status-in-stock {
      color: #4caf50;
      font-weight: 500;
    }

    .status-low-stock {
      color: #ff9800;
      font-weight: 500;
    }

    .status-out-of-stock {
      color: #f44336;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .inventory-container {
        padding: 10px;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .header-actions {
        flex-direction: column;
      }

      .inventory-table {
        font-size: 12px;
      }

      .inventory-table th,
      .inventory-table td {
        padding: 8px 4px;
      }
    }
  `]
})
export class InventoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'quantity', 'price', 'status', 'actions'];
  dataSource: any;
  
  // Mock data
  inventoryItems: InventoryItem[] = [
    {
      id: 1,
      name: 'Laptop Dell XPS 13',
      category: 'Electronics',
      quantity: 15,
      unit: 'units',
      price: 1299.99,
      supplier: 'Dell Inc.',
      lastUpdated: new Date(),
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Office Chair',
      category: 'Furniture',
      quantity: 3,
      unit: 'pieces',
      price: 299.99,
      supplier: 'Office Depot',
      lastUpdated: new Date(),
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Printer Paper A4',
      category: 'Office Supplies',
      quantity: 0,
      unit: 'reams',
      price: 12.99,
      supplier: 'Staples',
      lastUpdated: new Date(),
      status: 'Out of Stock'
    }
  ];

  get totalItems(): number {
    return this.inventoryItems.length;
  }

  get lowStockItems(): number {
    return this.inventoryItems.filter(item => item.status === 'Low Stock').length;
  }

  get outOfStockItems(): number {
    return this.inventoryItems.filter(item => item.status === 'Out of Stock').length;
  }

  get totalValue(): number {
    return this.inventoryItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }

  ngOnInit() {
    this.dataSource = this.inventoryItems;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Implement filtering logic
    console.log('Filter:', filterValue);
  }

  getQuantityClass(quantity: number): string {
    if (quantity === 0) return 'quantity-out';
    if (quantity <= 5) return 'quantity-low';
    return '';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Stock': return 'status-in-stock';
      case 'Low Stock': return 'status-low-stock';
      case 'Out of Stock': return 'status-out-of-stock';
      default: return '';
    }
  }

  addItem() {
    console.log('Add item clicked');
    // Implement add item logic
  }

  editItem(item: InventoryItem) {
    console.log('Edit item:', item);
    // Implement edit item logic
  }

  viewItem(item: InventoryItem) {
    console.log('View item:', item);
    // Implement view item logic
  }

  deleteItem(item: InventoryItem) {
    console.log('Delete item:', item);
    // Implement delete item logic
  }

  importInventory() {
    console.log('Import inventory clicked');
    // Implement import logic
  }

  exportInventory() {
    console.log('Export inventory clicked');
    // Implement export logic
  }
} 
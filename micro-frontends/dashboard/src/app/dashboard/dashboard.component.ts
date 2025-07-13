import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-dashboard',
  template: `
    <div class="dashboard-container">
      <h1>Bảng điều khiển</h1>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-header">
            <h3>Tổng quan</h3>
          </div>
          <div class="card-content">
            <div class="stat-item">
              <div class="stat-value">1,234</div>
              <div class="stat-label">Đơn hàng hôm nay</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">$45,678</div>
              <div class="stat-label">Doanh thu hôm nay</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">89</div>
              <div class="stat-label">Khách hàng mới</div>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <h3>Biểu đồ bán hàng</h3>
          </div>
          <div class="card-content">
            <div class="chart-placeholder">
              <div class="chart-icon">📊</div>
              <p>Biểu đồ bán hàng 7 ngày qua</p>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <h3>Trạng thái kho</h3>
          </div>
          <div class="card-content">
            <div class="inventory-status">
              <div class="status-item">
                <span class="status-label">Sản phẩm tồn kho:</span>
                <span class="status-value">1,567</span>
              </div>
              <div class="status-item">
                <span class="status-label">Sản phẩm sắp hết:</span>
                <span class="status-value warning">23</span>
              </div>
              <div class="status-item">
                <span class="status-label">Sản phẩm hết hàng:</span>
                <span class="status-value danger">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-grid-2">
        <div class="dashboard-card">
          <div class="card-header">
            <h3>Hoạt động gần đây</h3>
          </div>
          <div class="card-content">
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon">🛒</div>
                <div class="activity-content">
                  <div class="activity-title">Đơn hàng mới #1234</div>
                  <div class="activity-time">2 phút trước</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">📦</div>
                <div class="activity-content">
                  <div class="activity-title">Nhập kho 500 sản phẩm</div>
                  <div class="activity-time">15 phút trước</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">👤</div>
                <div class="activity-content">
                  <div class="activity-title">Khách hàng mới đăng ký</div>
                  <div class="activity-time">1 giờ trước</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-header">
            <h3>Thông báo</h3>
          </div>
          <div class="card-content">
            <div class="notification-list">
              <div class="notification-item">
                <div class="notification-icon info">ℹ️</div>
                <div class="notification-content">
                  <div class="notification-title">Cập nhật hệ thống</div>
                  <div class="notification-message">Hệ thống sẽ được bảo trì vào 22:00 tối nay</div>
                </div>
              </div>
              <div class="notification-item">
                <div class="notification-icon warning">⚠️</div>
                <div class="notification-content">
                  <div class="notification-title">Sản phẩm sắp hết</div>
                  <div class="notification-message">5 sản phẩm cần bổ sung hàng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-container h1 {
      color: #333;
      margin-bottom: 30px;
      font-size: 2.5em;
      font-weight: 300;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .dashboard-grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 20px;
    }

    .dashboard-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .dashboard-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.3em;
      font-weight: 500;
    }

    .card-content {
      padding: 20px;
    }

    .stat-item {
      margin-bottom: 20px;
      text-align: center;
      padding: 15px;
      border-radius: 6px;
      background: #f8f9fa;
    }

    .stat-value {
      font-size: 2.2em;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 0.9em;
      color: #666;
      font-weight: 500;
    }

    .chart-placeholder {
      text-align: center;
      padding: 60px 20px;
      color: #888;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .chart-icon {
      font-size: 4em;
      margin-bottom: 10px;
      opacity: 0.6;
    }

    .inventory-status {
      padding: 0;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 4px solid #e0e0e0;
    }

    .status-label {
      font-weight: 500;
      color: #333;
    }

    .status-value {
      font-weight: bold;
      font-size: 1.1em;
    }

    .status-value.warning {
      color: #ff9800;
    }

    .status-value.danger {
      color: #f44336;
    }

    .activity-list, .notification-list {
      max-height: 280px;
      overflow-y: auto;
    }

    .activity-item, .notification-item {
      display: flex;
      align-items: flex-start;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .activity-item:last-child, .notification-item:last-child {
      border-bottom: none;
    }

    .activity-icon, .notification-icon {
      font-size: 1.5em;
      margin-right: 15px;
      margin-top: 2px;
      opacity: 0.8;
    }

    .activity-content, .notification-content {
      flex: 1;
    }

    .activity-title, .notification-title {
      font-weight: 500;
      color: #333;
      margin-bottom: 5px;
    }

    .activity-time {
      font-size: 0.8em;
      color: #888;
    }

    .notification-message {
      font-size: 0.9em;
      color: #666;
      line-height: 1.4;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .dashboard-container {
        padding: 10px;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .dashboard-grid-2 {
        grid-template-columns: 1fr;
      }

      .dashboard-container h1 {
        font-size: 2em;
        text-align: center;
      }
    }

    /* Scrollbar styling */
    .activity-list::-webkit-scrollbar, .notification-list::-webkit-scrollbar {
      width: 6px;
    }

    .activity-list::-webkit-scrollbar-track, .notification-list::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .activity-list::-webkit-scrollbar-thumb, .notification-list::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }

    .activity-list::-webkit-scrollbar-thumb:hover, .notification-list::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  `]
})
export class DashboardComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    // Load dashboard data
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Implement data loading logic
    console.log('Loading dashboard data...');
  }
} 
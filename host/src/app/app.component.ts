import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'erp-root',
  template: `
    <header class="toolbar">
      <button class="menu-button" (click)="toggleSidenav()">
        <span class="icon">☰</span>
      </button>
      <span class="title">Hệ thống ERP</span>
      <div class="spacer"></div>
      <button class="icon-button">
        <span class="icon">🔔</span>
      </button>
      <button class="icon-button">
        <span class="icon">👤</span>
      </button>
    </header>

    <div class="container">
      <nav class="sidenav" [class.sidenav-open]="sidenavOpen">
        <ul class="nav-list">
          <li>
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
              <span class="nav-icon">📊</span>
              <span class="nav-text">Dashboard</span>
            </a>
          </li>
          <li>
            <a routerLink="/inventory" routerLinkActive="active" class="nav-item">
              <span class="nav-icon">📦</span>
              <span class="nav-text">Kho hàng</span>
            </a>
          </li>
          <li>
            <a routerLink="/sales" routerLinkActive="active" class="nav-item">
              <span class="nav-icon">💰</span>
              <span class="nav-text">Bán hàng</span>
            </a>
          </li>
          <li>
            <a routerLink="/hr" routerLinkActive="active" class="nav-item">
              <span class="nav-icon">👥</span>
              <span class="nav-text">Nhân sự</span>
            </a>
          </li>
          <li>
            <a routerLink="/finance" routerLinkActive="active" class="nav-item">
              <span class="nav-icon">🏦</span>
              <span class="nav-text">Tài chính</span>
            </a>
          </li>
          <li>
            <a routerLink="/reports" routerLinkActive="active" class="nav-item">
              <span class="nav-icon">📈</span>
              <span class="nav-text">Báo cáo</span>
            </a>
          </li>
          <li>
            <a routerLink="/auth" routerLinkActive="active" class="nav-item">
              <span class="nav-icon">🔐</span>
              <span class="nav-text">Xác thực</span>
            </a>
          </li>
        </ul>
      </nav>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .toolbar {
      background-color: #3f51b5;
      color: white;
      padding: 0 16px;
      height: 64px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .menu-button, .icon-button {
      background: none;
      border: none;
      color: white;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .menu-button:hover, .icon-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .icon {
      font-size: 24px;
      line-height: 1;
    }

    .title {
      font-size: 20px;
      font-weight: 500;
      margin-left: 16px;
    }

    .spacer {
      flex: 1;
    }

    .container {
      display: flex;
      margin-top: 64px;
      height: calc(100vh - 64px);
    }

    .sidenav {
      width: 250px;
      background-color: white;
      box-shadow: 2px 0 4px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
      transform: translateX(0);
    }

    .sidenav.sidenav-open {
      transform: translateX(0);
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      text-decoration: none;
      color: rgba(0, 0, 0, 0.87);
      transition: background-color 0.3s;
      border-bottom: 1px solid #f0f0f0;
    }

    .nav-item:hover {
      background-color: #f5f5f5;
    }

    .nav-item.active {
      background-color: rgba(63, 81, 181, 0.1);
      color: #3f51b5;
      border-right: 3px solid #3f51b5;
    }

    .nav-icon {
      font-size: 20px;
      margin-right: 16px;
      min-width: 24px;
    }

    .nav-text {
      font-size: 14px;
      font-weight: 500;
    }

    .content {
      flex: 1;
      padding: 20px;
      background-color: #fafafa;
      overflow-y: auto;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .sidenav {
        position: fixed;
        left: 0;
        top: 64px;
        height: calc(100vh - 64px);
        z-index: 999;
        transform: translateX(-100%);
      }

      .sidenav.sidenav-open {
        transform: translateX(0);
      }

      .content {
        margin-left: 0;
      }
    }
  `]
})
export class AppComponent {
  title = 'ERP System';
  sidenavOpen = true;

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }
} 
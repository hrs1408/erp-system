import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <header class="toolbar">
      <span class="title">ERP Dashboard</span>
    </header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .toolbar {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .content {
      padding: 24px;
      background: #fafafa;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'ERP Dashboard';
} 
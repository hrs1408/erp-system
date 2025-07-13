import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  template: `
    <header class="toolbar">
      <span class="title">ERP Reports</span>
    </header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .toolbar {
      background: linear-gradient(90deg, #43cea2 0%, #185a9d 100%);
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
  title = 'ERP Reports';
}
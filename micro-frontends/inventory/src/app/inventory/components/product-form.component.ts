import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  template: `
    <h2>Thêm/Sửa sản phẩm</h2>
    <form (ngSubmit)="onSubmit()">
      <label>
        Tên sản phẩm:
        <input [(ngModel)]="product.name" name="name" required />
      </label><br />
      <label>
        Loại:
        <input [(ngModel)]="product.category" name="category" required />
      </label><br />
      <label>
        Số lượng:
        <input type="number" [(ngModel)]="product.quantity" name="quantity" required />
      </label><br />
      <label>
        Đơn vị:
        <input [(ngModel)]="product.unit" name="unit" required />
      </label><br />
      <button type="submit">Lưu</button>
    </form>
    <div *ngIf="submitted">
      <p>Đã lưu: {{ product | json }}</p>
    </div>
  `
})
export class ProductFormComponent {
  product = { name: '', category: '', quantity: 0, unit: '' };
  submitted = false;
  onSubmit() {
    this.submitted = true;
  }
} 
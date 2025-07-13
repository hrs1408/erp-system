import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User, UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private users: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@erp.com',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      department: 'IT',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      lastLoginAt: new Date(),
      avatar: null
    },
    {
      id: '2',
      username: 'manager',
      email: 'manager@erp.com',
      firstName: 'Manager',
      lastName: 'User',
      role: UserRole.MANAGER,
      department: 'Sales',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      lastLoginAt: new Date(),
      avatar: null
    },
    {
      id: '3',
      username: 'employee',
      email: 'employee@erp.com',
      firstName: 'Employee',
      lastName: 'User',
      role: UserRole.EMPLOYEE,
      department: 'HR',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      lastLoginAt: new Date(),
      avatar: null
    }
  ];

  private dashboardData = {
    orders: {
      today: 1234,
      week: 8567,
      month: 34567
    },
    revenue: {
      today: 45678,
      week: 234567,
      month: 987654
    },
    customers: {
      new: 89,
      total: 1234,
      active: 987
    },
    inventory: {
      total: 1567,
      low: 23,
      out: 5
    }
  };

  private salesData = {
    recent: [
      { id: '1', customer: 'Công ty ABC', amount: 15000, date: new Date(), status: 'completed' },
      { id: '2', customer: 'Công ty XYZ', amount: 25000, date: new Date(), status: 'pending' },
      { id: '3', customer: 'Công ty DEF', amount: 18000, date: new Date(), status: 'processing' }
    ],
    chart: [
      { date: '2024-01-01', sales: 12000 },
      { date: '2024-01-02', sales: 15000 },
      { date: '2024-01-03', sales: 18000 },
      { date: '2024-01-04', sales: 14000 },
      { date: '2024-01-05', sales: 22000 },
      { date: '2024-01-06', sales: 19000 },
      { date: '2024-01-07', sales: 25000 }
    ]
  };

  private inventoryData = {
    products: [
      { id: '1', name: 'Sản phẩm A', sku: 'SP001', quantity: 150, price: 100000, category: 'Electronics' },
      { id: '2', name: 'Sản phẩm B', sku: 'SP002', quantity: 75, price: 200000, category: 'Clothing' },
      { id: '3', name: 'Sản phẩm C', sku: 'SP003', quantity: 200, price: 50000, category: 'Books' },
      { id: '4', name: 'Sản phẩm D', sku: 'SP004', quantity: 25, price: 300000, category: 'Electronics' },
      { id: '5', name: 'Sản phẩm E', sku: 'SP005', quantity: 0, price: 150000, category: 'Clothing' }
    ],
    categories: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports']
  };

  private hrData = {
    employees: [
      { id: '1', name: 'Nguyễn Văn A', position: 'Developer', department: 'IT', salary: 25000000, joinDate: new Date('2023-01-01') },
      { id: '2', name: 'Trần Thị B', position: 'Manager', department: 'Sales', salary: 35000000, joinDate: new Date('2022-06-01') },
      { id: '3', name: 'Lê Văn C', position: 'HR Specialist', department: 'HR', salary: 20000000, joinDate: new Date('2023-03-01') },
      { id: '4', name: 'Phạm Thị D', position: 'Accountant', department: 'Finance', salary: 22000000, joinDate: new Date('2023-08-01') }
    ],
    departments: ['IT', 'Sales', 'HR', 'Finance', 'Marketing', 'Operations']
  };

  private financeData = {
    transactions: [
      { id: '1', type: 'income', amount: 50000000, description: 'Doanh thu tháng 1', date: new Date() },
      { id: '2', type: 'expense', amount: 15000000, description: 'Chi phí vận hành', date: new Date() },
      { id: '3', type: 'income', amount: 30000000, description: 'Doanh thu tháng 2', date: new Date() },
      { id: '4', type: 'expense', amount: 8000000, description: 'Chi phí marketing', date: new Date() }
    ],
    summary: {
      totalIncome: 80000000,
      totalExpense: 23000000,
      netProfit: 57000000,
      pendingPayments: 12000000
    }
  };

  // User methods
  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(500));
  }

  getUserById(id: string): Observable<User | null> {
    const user = this.users.find(u => u.id === id);
    return of(user || null).pipe(delay(300));
  }

  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: (this.users.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return of(newUser).pipe(delay(500));
  }

  updateUser(id: string, updates: Partial<User>): Observable<User | null> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates, updatedAt: new Date() };
      return of(this.users[index]).pipe(delay(500));
    }
    return of(null).pipe(delay(300));
  }

  deleteUser(id: string): Observable<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  // Dashboard methods
  getDashboardData(): Observable<any> {
    return of(this.dashboardData).pipe(delay(300));
  }

  // Sales methods
  getSalesData(): Observable<any> {
    return of(this.salesData).pipe(delay(400));
  }

  // Inventory methods
  getInventoryData(): Observable<any> {
    return of(this.inventoryData).pipe(delay(400));
  }

  // HR methods
  getHRData(): Observable<any> {
    return of(this.hrData).pipe(delay(400));
  }

  // Finance methods
  getFinanceData(): Observable<any> {
    return of(this.financeData).pipe(delay(400));
  }

  // LocalStorage methods
  saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromLocalStorage<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
} 
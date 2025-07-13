import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, map, catchError, throwError, tap } from 'rxjs';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  AuthState,
  User,
  UserRole
} from '../models';
import { MockDataService } from './mock-data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth';
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  public authState$ = this.authStateSubject.asObservable();

  // Mock users for authentication
  private mockUsers: User[] = [
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
      avatar: undefined
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
      avatar: undefined
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
      avatar: undefined
    }
  ];

  constructor(private mockDataService: MockDataService, private http: HttpClient) {
    this.loadStoredAuth();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.setLoading(true);
    
    // Simulate API delay
    return of(null).pipe(
      delay(1000),
      map(() => {
        const user = this.mockUsers.find(u => 
          (u.username === credentials.username || u.email === credentials.username) &&
          u.isActive
        );

        if (!user) {
          this.setError('Tên đăng nhập hoặc mật khẩu không đúng');
          throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
        }

        // For demo purposes, accept any password
        const response: LoginResponse = {
          user,
          token: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          expiresIn: 24 * 60 * 60
        };

        this.storeAuth(response);
        this.authStateSubject.next({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });

        return response;
      })
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData)
      .pipe(
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.clearAuth();
    this.authStateSubject.next({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post(`${this.API_URL}/refresh`, { refreshToken })
      .pipe(
        tap((response: any) => {
          this.storeAuth(response);
        }),
        catchError((error: any) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasPermission(permission: string): boolean {
    // Implement permission checking logic
    return true;
  }

  private storeAuth(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  private clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.authStateSubject.next({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  private setLoading(isLoading: boolean): void {
    const currentState = this.authStateSubject.value;
    this.authStateSubject.next({
      ...currentState,
      isLoading
    });
  }

  private setError(error: string): void {
    const currentState = this.authStateSubject.value;
    this.authStateSubject.next({
      ...currentState,
      isLoading: false,
      error
    });
  }
} 
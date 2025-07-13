export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  permission?: string;
  badge?: number;
  disabled?: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    route: string;
  };
}

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  username: string;
  action: string;
  module: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
} 
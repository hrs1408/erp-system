export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  avatar?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  VIEWER = 'viewer'
}

export interface UserProfile {
  user: User;
  permissions: Permission[];
  preferences: UserPreferences;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
} 
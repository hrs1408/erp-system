# Hệ thống ERP - Micro Frontend

## Mô tả
Hệ thống ERP (Enterprise Resource Planning) được xây dựng bằng kiến trúc Micro Frontend, cho phép phát triển và triển khai độc lập các module khác nhau.

## Cấu trúc dự án

```
erp-system/
├── host/                    # Ứng dụng chính (Shell)
├── micro-frontends/         # Các micro frontend
│   ├── auth/               # Module xác thực
│   ├── dashboard/          # Module bảng điều khiển
│   ├── inventory/          # Module quản lý kho
│   ├── sales/              # Module bán hàng
│   ├── hr/                 # Module nhân sự
│   ├── finance/            # Module tài chính
│   └── reports/            # Module báo cáo
├── shared/                 # Thư viện dùng chung
└── docker-compose.yml      # Cấu hình Docker
```

## Các module chính

### 1. Authentication Module
- Đăng nhập/đăng xuất
- Quản lý quyền truy cập
- JWT token management

### 2. Dashboard Module
- Tổng quan doanh nghiệp
- Thống kê real-time
- Widgets tùy chỉnh

### 3. Inventory Module
- Quản lý kho hàng
- Theo dõi tồn kho
- Quản lý nhà cung cấp

### 4. Sales Module
- Quản lý đơn hàng
- Quản lý khách hàng
- Báo giá và hợp đồng

### 5. HR Module
- Quản lý nhân viên
- Chấm công
- Lương thưởng

### 6. Finance Module
- Quản lý tài chính
- Kế toán
- Báo cáo tài chính

### 7. Reports Module
- Báo cáo tổng hợp
- Xuất báo cáo
- Dashboard analytics

## Công nghệ sử dụng

### Frontend
- Angular 17
- TypeScript
- Module Federation (Webpack 5)
- Angular Material
- Angular Router
- NgRx (State Management)
- RxJS

### Data Storage
- LocalStorage (Client-side)
- Mock Data Services
- IndexedDB (Optional)

### DevOps
- Docker
- Docker Compose

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm run install:all
```

### 2. Chạy development
```bash
# Chạy tất cả micro frontends
npm run dev

# Hoặc chạy từng module riêng lẻ
npm run dev:host
npm run dev:auth
npm run dev:dashboard
# ...
```

### 3. Build production
```bash
npm run build
```

## Ports mặc định

- Host App: http://localhost:3000
- Auth Module: http://localhost:3001
- Dashboard Module: http://localhost:3002
- Inventory Module: http://localhost:3003
- Sales Module: http://localhost:3004
- HR Module: http://localhost:3005
- Finance Module: http://localhost:3006
- Reports Module: http://localhost:3007


## Docker

```bash
# Build và chạy với Docker
docker-compose up --build

# Chạy ở background
docker-compose up -d
```

## Tính năng chính

- ✅ Micro Frontend Architecture
- ✅ Module Federation
- ✅ Shared State Management
- ✅ Real-time Updates
- ✅ Responsive Design
- ✅ Dark/Light Theme
- ✅ Multi-language Support
- ✅ Role-based Access Control
- ✅ Audit Logging
- ✅ Export/Import Data

## Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết. # erp-system

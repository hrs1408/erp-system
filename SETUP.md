# Hướng dẫn cài đặt và chạy hệ thống ERP

## Yêu cầu hệ thống

- Node.js 18+ 
- npm hoặc yarn
- Git

## Cài đặt

### 1. Clone repository
```bash
git clone <repository-url>
cd erp-system
```

### 2. Cài đặt dependencies cho tất cả modules
```bash
npm run install:all
```

Hoặc cài đặt từng module riêng lẻ:
```bash
# Cài đặt shared library
cd shared && npm install

# Cài đặt host application
cd ../host && npm install

# Cài đặt các micro frontends
cd ../micro-frontends/auth && npm install
cd ../dashboard && npm install
cd ../inventory && npm install
cd ../sales && npm install
cd ../hr && npm install
cd ../finance && npm install
cd ../reports && npm install
```

## Chạy hệ thống

### Phương pháp 1: Chạy tất cả cùng lúc
```bash
npm run dev
```

### Phương pháp 2: Chạy từng module riêng lẻ
```bash
# Chạy host application
npm run dev:host

# Chạy các micro frontends
npm run dev:auth
npm run dev:dashboard
npm run dev:inventory
npm run dev:sales
npm run dev:hr
npm run dev:finance
npm run dev:reports
```

## Truy cập ứng dụng

Sau khi chạy thành công, bạn có thể truy cập:

- **Host Application**: http://localhost:3000
- **Auth Module**: http://localhost:3001
- **Dashboard Module**: http://localhost:3002
- **Inventory Module**: http://localhost:3003
- **Sales Module**: http://localhost:3004
- **HR Module**: http://localhost:3005
- **Finance Module**: http://localhost:3006
- **Reports Module**: http://localhost:3007

## Tài khoản demo

Hệ thống có sẵn các tài khoản demo:

1. **Admin User**
   - Username: `admin`
   - Email: `admin@erp.com`
   - Password: `any password` (cho demo)

2. **Manager User**
   - Username: `manager`
   - Email: `manager@erp.com`
   - Password: `any password` (cho demo)

3. **Employee User**
   - Username: `employee`
   - Email: `employee@erp.com`
   - Password: `any password` (cho demo)

## Cấu trúc dự án

```
erp-system/
├── shared/                    # Thư viện dùng chung
│   ├── src/lib/
│   │   ├── models/           # Interfaces và types
│   │   ├── services/         # Services dùng chung
│   │   └── components/       # Components dùng chung
├── host/                     # Ứng dụng chính (Shell)
│   ├── src/app/
│   │   ├── components/       # Components của host
│   │   └── services/         # Services của host
├── micro-frontends/          # Các micro frontends
│   ├── auth/                # Module xác thực
│   ├── dashboard/           # Module bảng điều khiển
│   ├── inventory/           # Module quản lý kho
│   ├── sales/               # Module bán hàng
│   ├── hr/                  # Module nhân sự
│   ├── finance/             # Module tài chính
│   └── reports/             # Module báo cáo
└── docker-compose.yml        # Cấu hình Docker
```

## Tính năng chính

### 1. Authentication Module
- Đăng nhập/đăng xuất
- Quản lý quyền truy cập
- Mock authentication (không cần backend)

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

## Lưu trữ dữ liệu

Hệ thống sử dụng:
- **LocalStorage**: Lưu trữ dữ liệu người dùng, cài đặt
- **Mock Data Services**: Dữ liệu mẫu cho demo
- **IndexedDB**: Lưu trữ dữ liệu lớn (tùy chọn)

## Build production

```bash
# Build tất cả modules
npm run build

# Build từng module riêng lẻ
npm run build:host
npm run build:auth
npm run build:dashboard
npm run build:inventory
npm run build:sales
npm run build:hr
npm run build:finance
npm run build:reports
```

## Docker

```bash
# Build và chạy với Docker
docker-compose up --build

# Chạy ở background
docker-compose up -d

# Dừng các containers
docker-compose down
```

## Troubleshooting

### Lỗi thường gặp

1. **Port đã được sử dụng**
   ```bash
   # Kiểm tra port đang sử dụng
   netstat -ano | findstr :3000
   
   # Kill process sử dụng port
   taskkill /PID <process-id> /F
   ```

2. **Lỗi Module Federation**
   - Đảm bảo tất cả micro frontends đã được build
   - Kiểm tra cấu hình webpack.config.js

3. **Lỗi dependencies**
   ```bash
   # Xóa node_modules và cài lại
   rm -rf node_modules package-lock.json
   npm install
   ```

### Logs

Để xem logs của từng module:
```bash
# Host application
cd host && npm run start

# Micro frontend
cd micro-frontends/dashboard && npm run start
```

## Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết. 
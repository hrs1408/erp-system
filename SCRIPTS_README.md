# 🚀 ERP System - Scripts Guide

## 📋 Tổng quan

Bộ script này giúp bạn quản lý toàn bộ hệ thống ERP một cách dễ dàng, bao gồm khởi động, dừng và kiểm tra trạng thái của tất cả các microservices.

## 🛠️ Các Script có sẵn

### 🟢 **Khởi động tất cả services**

#### **Windows (Batch)**
```bash
start-all.bat
```
- Khởi động tất cả 8 microservices trong các cửa sổ riêng biệt
- Tự động cài đặt dependencies
- Hiển thị thông tin port cho từng service

#### **Windows (PowerShell)**
```powershell
.\start-all.ps1
```
- Khởi động tất cả services với monitoring
- Kiểm tra Node.js và npm trước khi chạy
- Hiển thị trạng thái real-time

#### **Linux/Mac (Bash)**
```bash
./start-all.sh
```
- Khởi động tất cả services trong background
- Tạo logs cho từng service
- Monitoring và health check tự động

#### **Cross-platform (npm)**
```bash
npm run start:all
```
- Sử dụng concurrently để chạy tất cả services
- Hiển thị output của tất cả services trong một terminal

### 🔴 **Dừng tất cả services**

#### **Windows (Batch)**
```bash
stop-all.bat
```
- Dừng tất cả Node.js và npm processes
- Dọn dẹp temporary files

#### **Linux/Mac (Bash)**
```bash
./stop-all.sh
```
- Dừng tất cả processes trên các port ERP
- Dọn dẹp logs và PID files

### 📊 **Kiểm tra trạng thái services**

#### **Linux/Mac (Bash)**
```bash
./check-status.sh
```
- Kiểm tra trạng thái của tất cả services
- Hiển thị health percentage
- Thông tin về processes và port usage

#### **Windows (PowerShell)**
```powershell
.\check-status.ps1
```
- Kiểm tra trạng thái services trên Windows
- Hiển thị thông tin chi tiết về processes

## 🎯 **Cách sử dụng**

### **1. Cài đặt dependencies**
```bash
# Cài đặt dependencies cho tất cả services
npm run install:all
```

### **2. Khởi động hệ thống**

#### **Windows:**
```bash
# Cách 1: Sử dụng batch script
start-all.bat

# Cách 2: Sử dụng PowerShell
.\start-all.ps1

# Cách 3: Sử dụng npm
npm run start:all
```

#### **Linux/Mac:**
```bash
# Cách 1: Sử dụng bash script
chmod +x start-all.sh
./start-all.sh

# Cách 2: Sử dụng npm
npm run start:all
```

### **3. Kiểm tra trạng thái**
```bash
# Linux/Mac
./check-status.sh

# Windows
.\check-status.ps1
```

### **4. Dừng hệ thống**
```bash
# Windows
stop-all.bat

# Linux/Mac
./stop-all.sh
```

## 📁 **Cấu trúc Ports**

| Service | Port | URL |
|---------|------|-----|
| Host App | 4200 | http://localhost:4200 |
| Auth Service | 3001 | http://localhost:3001 |
| Dashboard Service | 3002 | http://localhost:3002 |
| Inventory Service | 3003 | http://localhost:3003 |
| Sales Service | 3004 | http://localhost:3004 |
| HR Service | 3005 | http://localhost:3005 |
| Finance Service | 3006 | http://localhost:3006 |
| Reports Service | 3007 | http://localhost:3007 |

## 🔧 **NPM Scripts**

### **Khởi động từng service riêng lẻ:**
```bash
npm run start:host        # Host application
npm run start:auth        # Authentication service
npm run start:dashboard   # Dashboard service
npm run start:inventory   # Inventory service
npm run start:sales       # Sales service
npm run start:hr          # HR service
npm run start:finance     # Finance service
npm run start:reports     # Reports service
```

### **Build từng service:**
```bash
npm run build:all         # Build tất cả services
npm run build:host        # Build host application
npm run build:auth        # Build auth service
# ... tương tự cho các service khác
```

### **Test từng service:**
```bash
npm run test:all          # Test tất cả services
npm run test:host         # Test host application
npm run test:auth         # Test auth service
# ... tương tự cho các service khác
```

### **Clean từng service:**
```bash
npm run clean:all         # Clean tất cả services
npm run clean:host        # Clean host application
npm run clean:auth        # Clean auth service
# ... tương tự cho các service khác
```

## 🚨 **Troubleshooting**

### **Port đã được sử dụng:**
```bash
# Windows
netstat -ano | findstr :3001

# Linux/Mac
lsof -i :3001
```

### **Process không dừng được:**
```bash
# Windows
taskkill /f /im node.exe

# Linux/Mac
pkill -f node
```

### **Dependencies lỗi:**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### **Angular cache lỗi:**
```bash
# Clear Angular cache
ng cache clean
```

## 📝 **Logs**

### **Linux/Mac:**
- Logs được lưu trong thư mục `logs/`
- Mỗi service có file log riêng
- PID files được lưu để quản lý processes

### **Windows:**
- Logs hiển thị trong các cửa sổ terminal riêng biệt
- Có thể redirect output vào file nếu cần

## 🔒 **Security Notes**

- Scripts chỉ chạy trên localhost
- Không expose services ra internet
- Sử dụng ports mặc định của Angular
- Không lưu sensitive data trong logs

## 🎯 **Best Practices**

1. **Luôn kiểm tra trạng thái trước khi khởi động**
2. **Sử dụng script dừng để cleanup đúng cách**
3. **Monitor logs để phát hiện lỗi sớm**
4. **Backup code trước khi chạy scripts**
5. **Kiểm tra port availability trước khi chạy**

## 📞 **Support**

Nếu gặp vấn đề:
1. Kiểm tra Node.js và npm version
2. Đảm bảo ports không bị conflict
3. Chạy script với quyền admin (nếu cần)
4. Kiểm tra logs trong thư mục `logs/`

---

## 🎉 **Chúc mừng!**

Bây giờ bạn có thể quản lý toàn bộ hệ thống ERP một cách dễ dàng với các script này! 
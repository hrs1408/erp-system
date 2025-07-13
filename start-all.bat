@echo off
echo ========================================
echo    ERP System - Starting All Services
echo ========================================
echo.

echo Installing dependencies for all services...
call npm run install:all

echo.
echo Starting all microservices...
echo.

echo [1/8] Starting Host Application (Port 4200)...
start "Host App" cmd /k "cd host && npm start"

echo [2/8] Starting Auth Microservice (Port 3001)...
start "Auth Service" cmd /k "cd micro-frontends/auth && npm start"

echo [3/8] Starting Dashboard Microservice (Port 3002)...
start "Dashboard Service" cmd /k "cd micro-frontends/dashboard && npm start"

echo [4/8] Starting Inventory Microservice (Port 3003)...
start "Inventory Service" cmd /k "cd micro-frontends/inventory && npm start"

echo [5/8] Starting Sales Microservice (Port 3004)...
start "Sales Service" cmd /k "cd micro-frontends/sales && npm start"

echo [6/8] Starting HR Microservice (Port 3005)...
start "HR Service" cmd /k "cd micro-frontends/hr && npm start"

echo [7/8] Starting Finance Microservice (Port 3006)...
start "Finance Service" cmd /k "cd micro-frontends/finance && npm start"

echo [8/8] Starting Reports Microservice (Port 3007)...
start "Reports Service" cmd /k "cd micro-frontends/reports && npm start"

echo.
echo ========================================
echo    All services are starting...
echo ========================================
echo.
echo Services will be available at:
echo - Host App:        http://localhost:4200
echo - Auth Service:    http://localhost:3001
echo - Dashboard:       http://localhost:3002
echo - Inventory:       http://localhost:3003
echo - Sales:           http://localhost:3004
echo - HR:              http://localhost:3005
echo - Finance:         http://localhost:3006
echo - Reports:         http://localhost:3007
echo.
echo Press any key to exit this window...
pause > nul 
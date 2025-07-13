@echo off
echo ========================================
echo    ERP System - Stopping All Services
echo ========================================
echo.

echo Stopping all Node.js processes...
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo Successfully stopped all Node.js processes.
) else (
    echo No Node.js processes were running.
)

echo.
echo Stopping all npm processes...
taskkill /f /im npm.cmd 2>nul
if %errorlevel% equ 0 (
    echo Successfully stopped all npm processes.
) else (
    echo No npm processes were running.
)

echo.
echo Cleaning up temporary files...
if exist logs rmdir /s /q logs 2>nul
if exist *.pid del *.pid 2>nul

echo.
echo ========================================
echo    All services have been stopped
echo ========================================
echo.
pause 
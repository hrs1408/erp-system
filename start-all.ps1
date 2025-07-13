# ERP System - Start All Services PowerShell Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ERP System - Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: npm is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies for all services..." -ForegroundColor Yellow
npm run install:all

Write-Host ""
Write-Host "Starting all microservices..." -ForegroundColor Yellow
Write-Host ""

# Function to start a service
function Start-Service {
    param(
        [string]$ServiceName,
        [string]$Directory,
        [string]$Port
    )
    
    Write-Host "[$ServiceName] Starting on port $Port..." -ForegroundColor Green
    
    $scriptBlock = {
        param($dir, $port)
        Set-Location $dir
        npm start
    }
    
    Start-Job -Name $ServiceName -ScriptBlock $scriptBlock -ArgumentList $Directory, $Port
}

# Start all services
$services = @(
    @{Name="Host App"; Dir="host"; Port="4200"},
    @{Name="Auth Service"; Dir="micro-frontends/auth"; Port="3001"},
    @{Name="Dashboard Service"; Dir="micro-frontends/dashboard"; Port="3002"},
    @{Name="Inventory Service"; Dir="micro-frontends/inventory"; Port="3003"},
    @{Name="Sales Service"; Dir="micro-frontends/sales"; Port="3004"},
    @{Name="HR Service"; Dir="micro-frontends/hr"; Port="3005"},
    @{Name="Finance Service"; Dir="micro-frontends/finance"; Port="3006"},
    @{Name="Reports Service"; Dir="micro-frontends/reports"; Port="3007"}
)

$jobs = @()

foreach ($service in $services) {
    $job = Start-Service -ServiceName $service.Name -Directory $service.Dir -Port $service.Port
    $jobs += $job
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    All services are starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Services will be available at:" -ForegroundColor White
Write-Host "- Host App:        http://localhost:4200" -ForegroundColor Yellow
Write-Host "- Auth Service:    http://localhost:3001" -ForegroundColor Yellow
Write-Host "- Dashboard:       http://localhost:3002" -ForegroundColor Yellow
Write-Host "- Inventory:       http://localhost:3003" -ForegroundColor Yellow
Write-Host "- Sales:           http://localhost:3004" -ForegroundColor Yellow
Write-Host "- HR:              http://localhost:3005" -ForegroundColor Yellow
Write-Host "- Finance:         http://localhost:3006" -ForegroundColor Yellow
Write-Host "- Reports:         http://localhost:3007" -ForegroundColor Yellow
Write-Host ""

# Monitor jobs
Write-Host "Monitoring services... Press Ctrl+C to stop all services" -ForegroundColor Cyan
Write-Host ""

try {
    while ($true) {
        $runningJobs = Get-Job -State Running
        if ($runningJobs.Count -eq 0) {
            Write-Host "All services have stopped." -ForegroundColor Red
            break
        }
        
        Write-Host "Running services: $($runningJobs.Count)/$($services.Count)" -ForegroundColor Green
        Start-Sleep -Seconds 10
    }
} catch {
    Write-Host ""
    Write-Host "Stopping all services..." -ForegroundColor Yellow
    Get-Job | Stop-Job
    Get-Job | Remove-Job
    Write-Host "All services stopped." -ForegroundColor Green
} 
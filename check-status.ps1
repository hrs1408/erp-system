# ERP System - Check Service Status PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ERP System - Service Status Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Array of services
$services = @(
    @{Name="Host App"; Port="4200"},
    @{Name="Auth Service"; Port="3001"},
    @{Name="Dashboard Service"; Port="3002"},
    @{Name="Inventory Service"; Port="3003"},
    @{Name="Sales Service"; Port="3004"},
    @{Name="HR Service"; Port="3005"},
    @{Name="Finance Service"; Port="3006"},
    @{Name="Reports Service"; Port="3007"}
)

# Function to check if service is running
function Test-ServiceStatus {
    param(
        [string]$ServiceName,
        [string]$Port
    )
    
    try {
        # Check if port is in use
        $connection = Test-NetConnection -ComputerName localhost -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
        
        if ($connection) {
            # Try to connect to the service
            try {
                $response = Invoke-WebRequest -Uri "http://localhost:$Port" -TimeoutSec 5 -UseBasicParsing -ErrorAction SilentlyContinue
                if ($response.StatusCode -eq 200) {
                    Write-Host "✓ $ServiceName is running on port $Port" -ForegroundColor Green
                    return $true
                } else {
                    Write-Host "⚠ $ServiceName port $Port is in use but not responding" -ForegroundColor Yellow
                    return $false
                }
            } catch {
                Write-Host "⚠ $ServiceName port $Port is in use but not responding" -ForegroundColor Yellow
                return $false
            }
        } else {
            Write-Host "✗ $ServiceName is not running on port $Port" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "✗ $ServiceName is not running on port $Port" -ForegroundColor Red
        return $false
    }
}

# Check all services
$runningCount = 0
$totalCount = $services.Count

foreach ($service in $services) {
    if (Test-ServiceStatus -ServiceName $service.Name -Port $service.Port) {
        $runningCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total services: $totalCount" -ForegroundColor Blue
Write-Host "Running services: $runningCount" -ForegroundColor Green
Write-Host "Stopped services: $($totalCount - $runningCount)" -ForegroundColor Red

# Show percentage
if ($totalCount -gt 0) {
    $percentage = [math]::Round(($runningCount * 100) / $totalCount)
    Write-Host "Health: $percentage%" -ForegroundColor Blue
}

Write-Host ""

# Show process information
Write-Host "Process Information:" -ForegroundColor Cyan
Write-Host "Node.js processes:" -ForegroundColor Yellow

try {
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    if ($nodeProcesses) {
        $nodeProcesses | Select-Object Id, ProcessName, CPU, WorkingSet | Format-Table -AutoSize
    } else {
        Write-Host "No Node.js processes found" -ForegroundColor Red
    }
} catch {
    Write-Host "No Node.js processes found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Port usage:" -ForegroundColor Yellow

foreach ($service in $services) {
    try {
        $connections = Get-NetTCPConnection -LocalPort $service.Port -ErrorAction SilentlyContinue
        if ($connections) {
            $pid = $connections[0].OwningProcess
            Write-Host "Port $($service.Port): PID $pid" -ForegroundColor Green
        } else {
            Write-Host "Port $($service.Port): No process" -ForegroundColor Red
        }
    } catch {
        Write-Host "Port $($service.Port): No process" -ForegroundColor Red
    }
}

Write-Host "" 
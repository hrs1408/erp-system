#!/bin/bash

# ERP System - Check Service Status Script

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================"
echo -e "   ERP System - Service Status Check"
echo -e "========================================${NC}"
echo ""

# Array of services
services=(
    "Host App:4200"
    "Auth Service:3001"
    "Dashboard Service:3002"
    "Inventory Service:3003"
    "Sales Service:3004"
    "HR Service:3005"
    "Finance Service:3006"
    "Reports Service:3007"
)

# Function to check if service is running
check_service() {
    local service_name=$1
    local port=$2
    
    # Check if port is in use
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        # Try to connect to the service
        if curl -s "http://localhost:$port" > /dev/null 2>&1; then
            echo -e "${GREEN}✓ $service_name is running on port $port${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠ $service_name port $port is in use but not responding${NC}"
            return 1
        fi
    else
        echo -e "${RED}✗ $service_name is not running on port $port${NC}"
        return 1
    fi
}

# Check all services
running_count=0
total_count=${#services[@]}

for service in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service"
    if check_service "$name" "$port"; then
        ((running_count++))
    fi
done

echo ""
echo -e "${CYAN}========================================"
echo -e "    Summary"
echo -e "========================================${NC}"
echo -e "${BLUE}Total services: $total_count${NC}"
echo -e "${GREEN}Running services: $running_count${NC}"
echo -e "${RED}Stopped services: $((total_count - running_count))${NC}"

# Show percentage
if [ $total_count -gt 0 ]; then
    percentage=$((running_count * 100 / total_count))
    echo -e "${BLUE}Health: $percentage%${NC}"
fi

echo ""

# Show process information
echo -e "${CYAN}Process Information:${NC}"
echo -e "${YELLOW}Node.js processes:${NC}"
ps aux | grep -E "(node|npm)" | grep -v grep | head -10

echo ""
echo -e "${YELLOW}Port usage:${NC}"
for service in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service"
    pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo -e "${GREEN}Port $port: PID $pid${NC}"
    else
        echo -e "${RED}Port $port: No process${NC}"
    fi
done

echo "" 
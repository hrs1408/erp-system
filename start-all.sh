#!/bin/bash

# ERP System - Start All Services Bash Script

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================"
echo -e "   ERP System - Starting All Services"
echo -e "========================================${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed or not in PATH${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed or not in PATH${NC}"
    exit 1
fi

echo -e "${GREEN}Node.js version: $(node --version)${NC}"
echo -e "${GREEN}npm version: $(npm --version)${NC}"
echo ""

echo -e "${YELLOW}Installing dependencies for all services...${NC}"
npm run install:all

echo ""
echo -e "${YELLOW}Starting all microservices...${NC}"
echo ""

# Function to start a service
start_service() {
    local service_name=$1
    local directory=$2
    local port=$3
    
    echo -e "${GREEN}[$service_name] Starting on port $port...${NC}"
    
    # Start service in background
    cd "$directory" && npm start > "../logs/${service_name}.log" 2>&1 &
    local pid=$!
    echo $pid > "../logs/${service_name}.pid"
    
    # Wait a bit before starting next service
    sleep 2
}

# Create logs directory
mkdir -p logs

# Array of services
services=(
    "Host App:host:4200"
    "Auth Service:micro-frontends/auth:3001"
    "Dashboard Service:micro-frontends/dashboard:3002"
    "Inventory Service:micro-frontends/inventory:3003"
    "Sales Service:micro-frontends/sales:3004"
    "HR Service:micro-frontends/hr:3005"
    "Finance Service:micro-frontends/finance:3006"
    "Reports Service:micro-frontends/reports:3007"
)

# Start all services
for service in "${services[@]}"; do
    IFS=':' read -r name dir port <<< "$service"
    start_service "$name" "$dir" "$port"
done

echo ""
echo -e "${CYAN}========================================"
echo -e "    All services are starting..."
echo -e "========================================${NC}"
echo ""
echo -e "${BLUE}Services will be available at:${NC}"
echo -e "${YELLOW}- Host App:        http://localhost:4200${NC}"
echo -e "${YELLOW}- Auth Service:    http://localhost:3001${NC}"
echo -e "${YELLOW}- Dashboard:       http://localhost:3002${NC}"
echo -e "${YELLOW}- Inventory:       http://localhost:3003${NC}"
echo -e "${YELLOW}- Sales:           http://localhost:3004${NC}"
echo -e "${YELLOW}- HR:              http://localhost:3005${NC}"
echo -e "${YELLOW}- Finance:         http://localhost:3006${NC}"
echo -e "${YELLOW}- Reports:         http://localhost:3007${NC}"
echo ""

# Function to check if service is running
check_service() {
    local service_name=$1
    local port=$2
    
    if curl -s "http://localhost:$port" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ $service_name is running on port $port${NC}"
        return 0
    else
        echo -e "${RED}✗ $service_name is not responding on port $port${NC}"
        return 1
    fi
}

# Monitor services
echo -e "${CYAN}Monitoring services... Press Ctrl+C to stop all services${NC}"
echo ""

# Trap to handle Ctrl+C
trap 'echo ""; echo -e "${YELLOW}Stopping all services...${NC}"; pkill -f "npm start"; echo -e "${GREEN}All services stopped.${NC}"; exit 0' INT

# Check services every 10 seconds
while true; do
    echo -e "${BLUE}Checking service status...${NC}"
    running_count=0
    
    for service in "${services[@]}"; do
        IFS=':' read -r name dir port <<< "$service"
        if check_service "$name" "$port"; then
            ((running_count++))
        fi
    done
    
    echo -e "${GREEN}Running services: $running_count/${#services[@]}${NC}"
    echo ""
    sleep 10
done 
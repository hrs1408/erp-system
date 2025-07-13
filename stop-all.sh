#!/bin/bash

# ERP System - Stop All Services Bash Script

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================"
echo -e "   ERP System - Stopping All Services"
echo -e "========================================${NC}"
echo ""

# Stop all Node.js processes
echo -e "${YELLOW}Stopping all Node.js processes...${NC}"
pkill -f "node" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully stopped all Node.js processes.${NC}"
else
    echo -e "${YELLOW}No Node.js processes were running.${NC}"
fi

# Stop all npm processes
echo -e "${YELLOW}Stopping all npm processes...${NC}"
pkill -f "npm" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully stopped all npm processes.${NC}"
else
    echo -e "${YELLOW}No npm processes were running.${NC}"
fi

# Stop processes on specific ports
echo -e "${YELLOW}Stopping processes on ERP ports...${NC}"
ports=(4200 3001 3002 3003 3004 3005 3006 3007)
for port in "${ports[@]}"; do
    pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo -e "${GREEN}Stopping process on port $port (PID: $pid)${NC}"
        kill -9 $pid 2>/dev/null
    fi
done

# Clean up temporary files
echo -e "${YELLOW}Cleaning up temporary files...${NC}"
if [ -d "logs" ]; then
    rm -rf logs
    echo -e "${GREEN}Removed logs directory.${NC}"
fi

if [ -f "*.pid" ]; then
    rm -f *.pid
    echo -e "${GREEN}Removed PID files.${NC}"
fi

echo ""
echo -e "${CYAN}========================================"
echo -e "    All services have been stopped"
echo -e "========================================${NC}"
echo "" 
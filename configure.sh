#!/bin/bash

# Configuration Management Script for Dr. Ajay Krishna Murthy Website
# This script reads the main config.env and sets up the appropriate environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Dr. Ajay Krishna Murthy - Configuration Manager${NC}"

# Check if config.env exists
if [ ! -f "config.env" ]; then
    echo -e "${RED}Error: config.env not found!${NC}"
    exit 1
fi

# Read the environment from config.env
APP_ENVIRONMENT=$(grep "^APP_ENVIRONMENT=" config.env | cut -d '=' -f 2)

if [ -z "$APP_ENVIRONMENT" ]; then
    echo -e "${RED}Error: APP_ENVIRONMENT not set in config.env!${NC}"
    exit 1
fi

echo -e "${YELLOW}Configuring for environment: ${APP_ENVIRONMENT}${NC}"

# Validate environment value
if [ "$APP_ENVIRONMENT" != "development" ] && [ "$APP_ENVIRONMENT" != "production" ]; then
    echo -e "${RED}Error: Invalid APP_ENVIRONMENT value. Use 'development' or 'production'${NC}"
    exit 1
fi

# Configure Backend
echo -e "${BLUE}Configuring backend...${NC}"
cd backend

if [ "$APP_ENVIRONMENT" = "production" ]; then
    if [ -f "env.production" ]; then
        cp env.production .env
        echo -e "${GREEN}✓ Backend configured for production${NC}"
    else
        echo -e "${RED}Error: backend/env.production not found!${NC}"
        exit 1
    fi
else
    if [ -f "env.development" ]; then
        cp env.development .env
        echo -e "${GREEN}✓ Backend configured for development${NC}"
    else
        echo -e "${RED}Error: backend/env.development not found!${NC}"
        exit 1
    fi
fi

cd ..

# Configure Frontend
echo -e "${BLUE}Configuring frontend...${NC}"
cd frontend

if [ "$APP_ENVIRONMENT" = "production" ]; then
    if [ -f "env.production" ]; then
        cp env.production .env.production
        # Also create .env.local for Next.js production build
        cp env.production .env.local
        echo -e "${GREEN}✓ Frontend configured for production${NC}"
    else
        echo -e "${RED}Error: frontend/env.production not found!${NC}"
        exit 1
    fi
else
    if [ -f "env.development" ]; then
        cp env.development .env.local
        echo -e "${GREEN}✓ Frontend configured for development${NC}"
    else
        echo -e "${RED}Error: frontend/env.development not found!${NC}"
        exit 1
    fi
fi

cd ..

echo -e "${GREEN}✅ Configuration complete!${NC}"
echo ""
echo -e "${YELLOW}Environment: ${APP_ENVIRONMENT}${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"

if [ "$APP_ENVIRONMENT" = "production" ]; then
    echo "1. Update backend/.env with your production values"
    echo "2. Update frontend/.env.production with your production values"
    echo "3. Run: ./deploy.sh production"
    echo ""
    echo -e "${YELLOW}Important: Don't forget to update the production values in the .env files!${NC}"
else
    echo "1. Run: ./deploy.sh development"
    echo "2. Start development servers:"
    echo "   Backend: cd backend && source venv_prod/bin/activate && python manage.py runserver"
    echo "   Frontend: cd frontend && npm run dev"
fi

echo ""
echo -e "${GREEN}To switch environments, edit config.env and run this script again.${NC}" 
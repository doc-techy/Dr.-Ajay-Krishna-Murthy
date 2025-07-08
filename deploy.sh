#!/bin/bash

# Dr. Ajay Krishna Murthy - Medical Practice Deployment Script
# This script sets up the application for production deployment

set -e

echo "🚀 Starting deployment setup for Dr. Ajay Krishna Murthy Medical Practice..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if environment argument is provided
if [ "$#" -ne 1 ]; then
    echo -e "${RED}Usage: $0 [development|production]${NC}"
    echo "Example: $0 development"
    echo "Example: $0 production"
    exit 1
fi

ENVIRONMENT=$1

echo -e "${BLUE}Deploying for: ${ENVIRONMENT}${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command_exists python3; then
    echo -e "${RED}Python3 is required but not installed.${NC}"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}Node.js is required but not installed.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}npm is required but not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"

# Backend Setup
echo -e "${YELLOW}Setting up backend...${NC}"
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv_prod" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv_prod
fi

# Activate virtual environment
source venv_prod/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Setup environment file
if [ "$ENVIRONMENT" = "production" ]; then
    if [ ! -f ".env" ]; then
        echo "Setting up production environment file..."
        cp env.production .env
        echo -e "${YELLOW}⚠️  IMPORTANT: Update .env file with your production values!${NC}"
        echo -e "${YELLOW}   - SECRET_KEY${NC}"
        echo -e "${YELLOW}   - DATABASE_URL${NC}"
        echo -e "${YELLOW}   - ALLOWED_HOSTS${NC}"
        echo -e "${YELLOW}   - EMAIL settings${NC}"
        echo -e "${YELLOW}   - CORS settings${NC}"
    fi
else
    if [ ! -f ".env" ]; then
        echo "Setting up development environment file..."
        cp env.development .env
    fi
fi

# Run migrations
echo "Running database migrations..."
python manage.py migrate

# Collect static files for production
if [ "$ENVIRONMENT" = "production" ]; then
    echo "Collecting static files..."
    python manage.py collectstatic --noinput
fi

# Create superuser for production (interactive)
if [ "$ENVIRONMENT" = "production" ]; then
    echo "Creating superuser for admin access..."
    python manage.py createsuperuser --noinput --username admin --email admin@example.com || true
fi

cd ..

# Frontend Setup
echo -e "${YELLOW}Setting up frontend...${NC}"
cd frontend

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Setup environment file
if [ "$ENVIRONMENT" = "production" ]; then
    if [ ! -f ".env.production" ]; then
        echo "Setting up production environment file..."
        cp env.production .env.production
        echo -e "${YELLOW}⚠️  IMPORTANT: Update .env.production file with your production values!${NC}"
        echo -e "${YELLOW}   - NEXT_PUBLIC_BACKEND_URL${NC}"
        echo -e "${YELLOW}   - NEXTAUTH_URL${NC}"
        echo -e "${YELLOW}   - Contact information${NC}"
        echo -e "${YELLOW}   - Domain settings${NC}"
    fi
else
    if [ ! -f ".env.local" ]; then
        echo "Setting up development environment file..."
        cp env.development .env.local
    fi
fi

# Build for production
if [ "$ENVIRONMENT" = "production" ]; then
    echo "Building frontend for production..."
    npm run build
fi

cd ..

echo -e "${GREEN}✅ Deployment setup completed!${NC}"

if [ "$ENVIRONMENT" = "production" ]; then
    echo -e "${BLUE}📋 Production Deployment Checklist:${NC}"
    echo "1. Update backend/.env with production values"
    echo "2. Update frontend/.env.production with production values"
    echo "3. Set up production database (PostgreSQL recommended)"
    echo "4. Configure web server (nginx + gunicorn)"
    echo "5. Set up SSL certificates"
    echo "6. Configure firewall and security settings"
    echo "7. Set up monitoring and logging"
    echo ""
    echo -e "${YELLOW}To start production servers:${NC}"
    echo "Backend: cd backend && source venv_prod/bin/activate && gunicorn config.wsgi:application"
    echo "Frontend: cd frontend && npm start"
else
    echo -e "${BLUE}🚀 Development servers ready!${NC}"
    echo ""
    echo -e "${YELLOW}To start development servers:${NC}"
    echo "Backend: cd backend && source venv_prod/bin/activate && python manage.py runserver"
    echo "Frontend: cd frontend && npm run dev"
    echo ""
    echo "Backend will be available at: http://localhost:8000"
    echo "Frontend will be available at: http://localhost:3000"
fi

echo -e "${GREEN}🎉 Setup complete! Happy coding!${NC}"
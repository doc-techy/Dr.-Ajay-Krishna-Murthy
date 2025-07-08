#!/bin/bash

# Dr. Ajay Krishna Murthy - Universal Deployment Script
# This single script handles all deployment needs

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Dr. Ajay Krishna Murthy - Universal Deployment Script${NC}"

# Function to show usage
show_usage() {
    echo "Usage: $0 [development|production|server]"
    echo ""
    echo "Commands:"
    echo "  development  - Setup for local development"
    echo "  production   - Setup for production deployment" 
    echo "  server       - Deploy to server (65.0.97.115)"
    echo ""
    echo "Examples:"
    echo "  $0 development"
    echo "  $0 production"
    echo "  $0 server"
    exit 1
}

# Check arguments
if [ "$#" -ne 1 ]; then
    show_usage
fi

ENVIRONMENT=$1

case $ENVIRONMENT in
    development)
        echo -e "${YELLOW}Setting up for DEVELOPMENT environment${NC}"
        sed -i 's/APP_ENVIRONMENT=.*/APP_ENVIRONMENT=development/' config.env
        ;;
    production)
        echo -e "${YELLOW}Setting up for PRODUCTION environment${NC}"
        sed -i 's/APP_ENVIRONMENT=.*/APP_ENVIRONMENT=production/' config.env
        ;;
    server)
        echo -e "${YELLOW}Deploying to SERVER (65.0.97.115)${NC}"
        sed -i 's/APP_ENVIRONMENT=.*/APP_ENVIRONMENT=production/' config.env
        ;;
    *)
        echo -e "${RED}Invalid environment: $ENVIRONMENT${NC}"
        show_usage
        ;;
esac

# Apply configuration
echo -e "${BLUE}Applying configuration...${NC}"

# Read current environment from config.env
CURRENT_ENV=$(grep "APP_ENVIRONMENT=" config.env | cut -d'=' -f2)

# Create backend .env file
cd backend
if [ "$CURRENT_ENV" = "production" ]; then
    cp env.production .env
else
    cp env.development .env
fi
cd ..

# Create frontend environment file
cd frontend
if [ "$CURRENT_ENV" = "production" ]; then
    cp env.production .env.production
    cp env.production .env.local
else
    cp env.development .env.local
fi
cd ..

# Backend Setup
echo -e "${YELLOW}Setting up backend...${NC}"
cd backend

# Create/activate virtual environment
if [ ! -d "venv_prod" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv_prod
fi

source venv_prod/bin/activate
pip install -r requirements.txt

# Generate Django secret key if needed
if [ "$ENVIRONMENT" = "production" ] || [ "$ENVIRONMENT" = "server" ]; then
    if grep -q "REPLACE_WITH_50_CHAR_RANDOM_SECRET_KEY" .env; then
        echo "Generating Django secret key..."
        DJANGO_SECRET=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
        sed -i "s/REPLACE_WITH_50_CHAR_RANDOM_SECRET_KEY/$DJANGO_SECRET/" .env
        echo -e "${GREEN}✓ Django secret key generated${NC}"
    fi
fi

# Database setup
echo "Setting up database..."
python manage.py migrate
python manage.py create_test_appointments

# Collect static files for production
if [ "$ENVIRONMENT" = "production" ] || [ "$ENVIRONMENT" = "server" ]; then
    echo "Collecting static files..."
    python manage.py collectstatic --noinput
fi

echo -e "${GREEN}✓ Backend setup completed${NC}"
cd ..

# Frontend Setup
echo -e "${YELLOW}Setting up frontend...${NC}"
cd frontend

npm install

if [ "$ENVIRONMENT" = "production" ] || [ "$ENVIRONMENT" = "server" ]; then
    echo "Building frontend for production..."
    npm run build
fi

echo -e "${GREEN}✓ Frontend setup completed${NC}"
cd ..

# Server deployment instructions
if [ "$ENVIRONMENT" = "server" ]; then
    echo -e "${GREEN}✅ Ready for server deployment!${NC}"
    echo ""
    echo -e "${BLUE}📋 Server Deployment Instructions:${NC}"
    echo ""
    echo "1. Transfer files to server:"
    echo "   rsync -av --exclude 'node_modules' --exclude 'venv*' --exclude '.git' \\"
    echo "     . user@65.0.97.115:/var/www/dr_ajay/"
    echo ""
    echo "2. On server, run setup:"
    echo "   ssh user@65.0.97.115"
    echo "   cd /var/www/dr_ajay"
    echo "   sudo chown -R www-data:www-data ."
    echo "   sudo chmod -R 755 ."
    echo "   ./deploy.sh production"
    echo ""
    echo "3. Configure Apache2:"
    echo "   sudo nano /etc/apache2/sites-available/dr_ajay.conf"
    echo "   sudo a2ensite dr_ajay.conf"
    echo "   sudo systemctl restart apache2"
    echo ""
    echo "4. Start frontend:"
    echo "   sudo npm install -g pm2"
    echo "   pm2 start npm --name dr_ajay -- start"
    echo "   pm2 save && pm2 startup"
    echo ""
    echo -e "${BLUE}🌐 Access URLs:${NC}"
    echo "   Backend API: http://65.0.97.115/api/"
    echo "   Frontend: http://65.0.97.115:3000/"
    echo "   Admin: http://65.0.97.115:3000/admin"
    echo ""
else
    echo -e "${GREEN}✅ Setup completed!${NC}"
    echo ""
    echo -e "${BLUE}🚀 Start servers:${NC}"
    echo "   Backend: cd backend && source venv_prod/bin/activate && python manage.py runserver"
    echo "   Frontend: cd frontend && npm run dev"
    echo ""
    echo -e "${BLUE}🌐 Access URLs:${NC}"
    if [ "$ENVIRONMENT" = "development" ]; then
        echo "   Backend: http://localhost:8000/api/"
        echo "   Frontend: http://localhost:3000/"
        echo "   Admin: http://localhost:3000/admin"
    else
        echo "   Backend: http://65.0.97.115/api/"
        echo "   Frontend: http://65.0.97.115:3000/"
        echo "   Admin: http://65.0.97.115:3000/admin"
    fi
fi

echo ""
echo -e "${BLUE}🔐 Admin Credentials:${NC}"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo -e "${GREEN}🎉 Deployment ready!${NC}"
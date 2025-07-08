# Dr. Ajay Krishna Murthy - Medical Practice Website

A modern, professional medical practice website built with Django (backend) and Next.js (frontend), designed for Dr. Ajay Krishna Murthy's medical practice.

## 🏥 Features

- **Professional Medical Website**: Complete practice information and services
- **Appointment Management**: Backend API for appointment booking
- **Responsive Design**: Mobile-first, modern UI
- **Admin Dashboard**: Django admin for content management
- **Production Ready**: Secure, scalable architecture

## 🛠️ Technology Stack

### Backend (Django)
- Python 3.x
- Django 5.2.4
- PostgreSQL (Production) / SQLite (Development)
- Django REST Framework ready
- CORS headers for frontend integration

### Frontend (Next.js)
- React 19
- Next.js 15.3.4
- TypeScript
- Tailwind CSS
- Modern responsive design

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn
- PostgreSQL (for production)

### 🔧 Automated Setup

Use the deployment script for quick setup:

```bash
# For development
chmod +x deploy.sh
./deploy.sh development

# For production
./deploy.sh production
```

### 📝 Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv_prod
   source venv_prod/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   ```bash
   # For development
   cp env.development .env
   
   # For production
   cp env.production .env
   # Then update .env with your production values
   ```

5. **Database setup**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (production)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server**
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   # For development
   cp env.development .env.local
   
   # For production
   cp env.production .env.production
   # Then update with your production values
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🌐 Environment Configuration

### Backend Environment Variables

**Critical production variables to update:**
- `SECRET_KEY`: Django secret key (50+ characters)
- `DATABASE_URL`: Production database connection
- `ALLOWED_HOSTS`: Your domain names
- `CORS_ALLOWED_ORIGINS`: Frontend domain URLs
- `EMAIL_*`: Email service configuration

### Frontend Environment Variables

**Critical production variables to update:**
- `NEXT_PUBLIC_BACKEND_URL`: Backend API URL
- `NEXTAUTH_URL`: Frontend domain URL
- `NEXT_PUBLIC_CONTACT_*`: Real contact information
- `NEXT_PUBLIC_DOMAIN`: Your domain name

## 📦 Project Structure

```
Dr.-Ajay-Krishna-Murthy/
├── backend/                    # Django backend
│   ├── appointment/           # Appointment management app
│   ├── config/               # Django settings
│   ├── requirements.txt      # Python dependencies
│   ├── env.production        # Production environment template
│   └── env.development       # Development environment template
├── frontend/                  # Next.js frontend
│   ├── src/                  # Source code
│   │   ├── app/             # Next.js app router
│   │   └── components/      # React components
│   ├── package.json         # Node.js dependencies
│   ├── env.production       # Production environment template
│   └── env.development      # Development environment template
├── deploy.sh                 # Automated deployment script
└── README.md                # This file
```

## 🔒 Security Features

- HTTPS enforcement in production
- CORS protection
- CSRF protection
- Security headers
- Environment variable management
- SQL injection protection
- XSS protection

## 🚀 Production Deployment

### Option 1: Using Deploy Script
```bash
./deploy.sh production
```

### Option 2: Manual Production Setup

1. **Server Setup**
   - Ubuntu/CentOS server
   - Python 3.8+, Node.js 18+
   - PostgreSQL database
   - Nginx web server

2. **Backend Deployment**
   ```bash
   cd backend
   source venv_prod/bin/activate
   gunicorn config.wsgi:application
   ```

3. **Frontend Deployment**
   ```bash
   cd frontend
   npm run build
   npm start
   ```

4. **Nginx Configuration** (example)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
       }
       
       location /api/ {
           proxy_pass http://localhost:8000;
       }
   }
   ```

## 🧪 Development

### Development Servers
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- Admin Dashboard: http://localhost:3000/admin (protected)
- Admin Login: http://localhost:3000/login

### Default Admin Credentials (Development)
- Username: `admin`
- Password: `admin123`
- **⚠️ Change these in production!**

### Key Commands

```bash
# Backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
python manage.py test

# Frontend
npm run dev
npm run build
npm run start
npm run lint
```

## 📚 API Documentation

The backend provides REST API endpoints for:
- Appointment management
- Admin operations
- Health checks

Visit `/admin/` for the Django admin interface.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is proprietary software for Dr. Ajay Krishna Murthy's medical practice.

## 📞 Support

For technical support or deployment assistance, please contact the development team.

---

**⚠️ Important Production Notes:**
- Always update environment files with real production values
- Use strong, unique passwords and secret keys
- Set up SSL certificates for HTTPS
- Configure proper database backups
- Monitor application logs and performance
- Follow security best practices 
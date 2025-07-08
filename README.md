# Dr. Ajay Medical Practice Management System

A professional medical practice management system built with Next.js (frontend) and Django/FastAPI (backend).

## 🏥 Features

- **Patient Management**: Store and manage patient information
- **Appointment Booking**: Online appointment scheduling system
- **Admin Dashboard**: Comprehensive appointment management
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live appointment status updates
- **Email Notifications**: Automated appointment confirmations
- **Secure Authentication**: JWT-based authentication system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dr_ajay.git
   cd dr_ajay
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp env.template .env.local
   # Edit .env.local with your configuration
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp env.template .env
   # Edit .env with your configuration
   python manage.py migrate
   python manage.py runserver
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Dashboard: http://localhost:3000/admin

## 📁 Project Structure

```
dr_ajay/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Next.js pages
│   │   ├── styles/         # CSS styles
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   ├── env.template        # Environment variables template
│   └── package.json        # Dependencies
├── backend/                 # Django/FastAPI backend
│   ├── api/                # API endpoints
│   ├── models/             # Database models
│   ├── serializers/        # API serializers
│   ├── views/              # API views
│   ├── env.template        # Environment variables template
│   └── requirements.txt    # Python dependencies
├── optimize_memory.sh      # Memory optimization script
├── server_management.md    # Server management guide
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## ⚙️ Configuration

### Frontend Environment Variables

Copy `frontend/env.template` to `frontend/.env.local` and configure:

```bash
# Required
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME="Dr. Ajay Medical Practice"

# Optional
NEXT_PUBLIC_CONTACT_EMAIL=info@drajay.com
NEXT_PUBLIC_CONTACT_PHONE=+1-234-567-8900
```

### Backend Environment Variables

Copy `backend/env.template` to `backend/.env` and configure:

```bash
# Required
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost:5432/dr_ajay_db
ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com

# Email (Optional)
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

## 🚀 Production Deployment

### Environment Setup

1. **Server Requirements**
   - Ubuntu 20.04+ or similar
   - 2GB+ RAM (1GB minimum with optimization)
   - 20GB+ storage
   - Python 3.8+, Node.js 18+, PostgreSQL 12+

2. **Environment Configuration**
   ```bash
   # Production frontend
   cp frontend/env.template frontend/.env.production
   
   # Production backend
   cp backend/env.template backend/.env
   ```

3. **Build for Production**
   ```bash
   # Frontend
   cd frontend
   npm run build
   npm start
   
   # Backend
   cd backend
   python manage.py collectstatic
   python manage.py migrate
   gunicorn myproject.wsgi:application
   ```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Static files
    location /static/ {
        alias /var/www/dr_ajay/static/;
    }
    
    location /media/ {
        alias /var/www/dr_ajay/media/;
    }
}
```

### SSL Configuration

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🛠️ Development

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
python manage.py test
```

### Code Quality

```bash
# Frontend linting
cd frontend
npm run lint
npm run lint:fix

# Backend linting
cd backend
flake8 .
black .
```

### Database Management

```bash
# Create migration
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Database backup
pg_dump dr_ajay_db > backup.sql

# Database restore
psql dr_ajay_db < backup.sql
```

## 🔧 Small Server Optimization

For servers with limited memory (like 1GB RAM):

1. **Use the optimization script**
   ```bash
   ./optimize_memory.sh
   ```

2. **Monitor memory usage**
   ```bash
   free -h
   htop
   ```

3. **Manage Cursor AI usage**
   ```bash
   # Close Cursor when not actively coding
   pkill -f cursor
   
   # Kill TypeScript servers
   pkill -f tsserver
   ```

4. **Read the server management guide**
   ```bash
   cat server_management.md
   ```

## 📊 API Documentation

### Appointment Endpoints

- `GET /api/appointments/` - List all appointments
- `POST /api/appointments/` - Create new appointment
- `GET /api/appointments/{id}/` - Get appointment details
- `PUT /api/appointments/{id}/` - Update appointment
- `DELETE /api/appointments/{id}/` - Delete appointment
- `GET /api/appointments/stats/` - Get appointment statistics

### Request/Response Examples

```javascript
// Create appointment
POST /api/appointments/
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "date": "2024-01-15",
  "time": "10:00",
  "message": "Regular checkup"
}

// Response
{
  "success": true,
  "appointment": {
    "id": 1,
    "name": "John Doe",
    "status": "pending",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Memory crashes on small server**
   ```bash
   ./optimize_memory.sh
   pkill -f cursor
   ```

2. **Frontend build errors**
   ```bash
   cd frontend
   rm -rf .next node_modules
   npm install
   npm run build
   ```

3. **Database connection errors**
   ```bash
   # Check PostgreSQL status
   sudo systemctl status postgresql
   
   # Restart if needed
   sudo systemctl restart postgresql
   ```

4. **Port already in use**
   ```bash
   # Find process using port
   lsof -i :3000
   lsof -i :8000
   
   # Kill process
   kill -9 <PID>
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test` and `python manage.py test`
5. Commit changes: `git commit -am 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: https://your-domain.com
- **API Documentation**: https://your-domain.com/api/docs/
- **Support**: info@drajay.com

## 📞 Support

For support and questions:
- Email: info@drajay.com
- Phone: +1-234-567-8900
- GitHub Issues: [Create an issue](https://github.com/yourusername/dr_ajay/issues)

---

**Made with ❤️ for Dr. Ajay Medical Practice** 
# 🚀 Quick Start Guide - Dr. Ajay Krishna Murthy Website

## 🎯 One-Step Environment Switch

### To Switch Between Development and Production:

1. **Edit `config.env`** - Change this single line:
   ```
   APP_ENVIRONMENT=development
   ```
   To:
   ```
   APP_ENVIRONMENT=production
   ```

2. **Run configuration script**:
   ```bash
   ./configure.sh
   ```

3. **Deploy the application**:
   ```bash
   ./deploy.sh [development|production]
   ```

That's it! ✨ The entire application (frontend + backend) is now configured for your chosen environment.

## 📁 Configuration Files

### Master Control File
- **`config.env`** - Controls the entire application environment (ONE LINE CHANGE!)

### Unified Configuration
- **`app.config.json`** - All application settings in one place:
  - Backend URLs and database details
  - Frontend settings
  - Contact information
  - Security settings
  - Feature flags

### Environment-Specific Files
- **Backend**: `backend/env.development` and `backend/env.production`
- **Frontend**: `frontend/env.development` and `frontend/env.production`

## 🔧 Configuration Details

### For Production Deployment:

1. **Update `app.config.json`** production section with:
   - Your domain URLs
   - Database credentials
   - Contact information
   - Security settings

2. **Set environment**:
   ```bash
   # Edit config.env
   APP_ENVIRONMENT=production
   
   # Apply configuration
   ./configure.sh
   
   # Deploy
   ./deploy.sh production
   ```

### For Development:

```bash
# Edit config.env
APP_ENVIRONMENT=development

# Apply configuration
./configure.sh

# Deploy
./deploy.sh development
```

## 🌐 Key Configuration Values

Edit these in `app.config.json`:

```json
{
  "environments": {
    "production": {
      "backend": {
        "url": "https://api.your-domain.com"  // Your API URL
      },
      "database": {
        "host": "your-db-host.com",          // Your database host
        "name": "dr_ajay_production",        // Your database name
        "user": "production_user",           // Your database user
        "password": "YOUR_SECURE_PASSWORD"   // Your database password
      },
      "frontend": {
        "url": "https://www.your-domain.com" // Your website URL
      },
      "contact": {
        "email": "info@drajay.com",         // Your email
        "phone": "+91-XXXXXXXXXX",          // Your phone
        "address": "Your Clinic Address"     // Your address
      }
    }
  }
}
```

## 🚦 Quick Commands

```bash
# Check current environment
grep APP_ENVIRONMENT config.env

# Switch to production
sed -i 's/APP_ENVIRONMENT=.*/APP_ENVIRONMENT=production/' config.env

# Switch to development
sed -i 's/APP_ENVIRONMENT=.*/APP_ENVIRONMENT=development/' config.env

# Apply and deploy
./configure.sh && ./deploy.sh production
```

## ✅ That's All!

One change in `config.env` controls your entire application environment. Simple, clean, and efficient! 🎉 
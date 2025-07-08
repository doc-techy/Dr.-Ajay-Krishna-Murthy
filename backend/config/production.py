import os
from .settings import *

# Override database settings for production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ajay_db',
        'USER': 'admin',
        'PASSWORD': 'admin@123',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Production settings
DEBUG = False

# Update allowed hosts for your server
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '13.235.74.250',  # Your server IP address
    'your-domain.com',  # Replace with your actual domain if you have one
]

# Static files configuration for Apache
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Media files configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Security settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Update CORS for production
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    # Add your production frontend URLs here
] 
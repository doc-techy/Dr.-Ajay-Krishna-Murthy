import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

// Read configuration
const appConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'app.config.json'), 'utf-8')
);

// Get environment from config.env
let environment = 'development';
try {
  const configEnv = fs.readFileSync(
    path.join(__dirname, '..', 'config.env'),
    'utf-8'
  );
  const match = configEnv.match(/APP_ENVIRONMENT=(\w+)/);
  if (match) {
    environment = match[1];
  }
} catch (error) {
  console.log('Using default development environment');
}

const envConfig = appConfig.environments[environment];

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
  generateEtags: false,
  
  // Remove the problematic allowedDevOrigins for production
  ...(environment === 'development' && {
    allowedDevOrigins: ['192.168.29.189:3001'],
  }),

  // Image optimization
  images: {
    unoptimized: true,
    domains: ['localhost', 'your-domain.vercel.app'],
  },

  // Environment variables from unified config
  env: {
    NEXT_PUBLIC_APP_NAME: envConfig.app.name,
    NEXT_PUBLIC_BACKEND_URL: envConfig.backend.url,
    NEXT_PUBLIC_API_VERSION: envConfig.backend.apiVersion,
    NEXT_PUBLIC_APP_VERSION: envConfig.app.version,
    NEXT_PUBLIC_CONTACT_EMAIL: envConfig.contact.email,
    NEXT_PUBLIC_CONTACT_PHONE: envConfig.contact.phone,
    NEXT_PUBLIC_CONTACT_ADDRESS: envConfig.contact.address,
    NEXT_PUBLIC_EMERGENCY_PHONE: envConfig.contact.emergencyPhone,
    NEXT_PUBLIC_BUSINESS_HOURS: appConfig.businessHours,
    NEXT_PUBLIC_ENVIRONMENT: environment,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/admin',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

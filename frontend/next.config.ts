import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
  generateEtags: false,
  
  // Remove the problematic allowedDevOrigins for production
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: ['192.168.29.189:3001'],
  }),

  // Image optimization
  images: {
    unoptimized: true,
    domains: ['localhost', 'your-domain.vercel.app'],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Dr. Ajay Medical Practice',
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  },

  // Experimental features for better performance
  // experimental: {
  //   optimizeCss: true, // Temporarily disabled due to critters dependency issue
  // },

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

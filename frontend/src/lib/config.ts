import appConfig from '../../../app.config.json';
import fs from 'fs';
import path from 'path';

// Function to get current environment from config.env
function getCurrentEnvironment(): 'development' | 'production' {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  
  try {
    const configEnvPath = path.join(process.cwd(), '..', 'config.env');
    const configEnv = fs.readFileSync(configEnvPath, 'utf-8');
    const match = configEnv.match(/APP_ENVIRONMENT=(\w+)/);
    return (match?.[1] as 'development' | 'production') || 'development';
  } catch {
    return 'development';
  }
}

// Configuration for different environments
const config = {
  development: {
    backendUrl: 'http://localhost:8000',
    apiVersion: 'v1',
    timeout: 30000,
  },
  production: {
    backendUrl: 'http://65.0.97.115', // EC2 backend server on port 80
    apiVersion: 'v1',
    timeout: 30000,
  },
};

// Determine environment
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export const API_CONFIG = config[environment];

// API endpoint builders
export const API_ENDPOINTS = {
  appointments: `${API_CONFIG.backendUrl}/api/${API_CONFIG.apiVersion}/appointments`,
  stats: `${API_CONFIG.backendUrl}/api/${API_CONFIG.apiVersion}/appointments/stats`,
  auth: `${API_CONFIG.backendUrl}/api/${API_CONFIG.apiVersion}/auth`,
} as const;

export default API_CONFIG;

// Helper function to get config values
export function getConfig<T>(path: string): T | undefined {
  const keys = path.split('.');
  let result: unknown = config;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  
  return result as T;
}

// Export specific configurations for easy access
export const backendUrl = config.backend.url;
export const apiUrl = config.backend.apiUrl;
export const appName = config.app.name;
export const contactEmail = config.contact.email;
export const contactPhone = config.contact.phone;
export const isProduction = environment === 'production';
export const isDevelopment = environment === 'development'; 
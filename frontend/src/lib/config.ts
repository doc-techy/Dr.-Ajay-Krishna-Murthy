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
  let result: unknown = API_CONFIG;
  
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
export const backendUrl = API_CONFIG.backendUrl;
export const apiVersion = API_CONFIG.apiVersion;
export const isProduction = environment === 'production';
export const isDevelopment = environment === 'development'; 
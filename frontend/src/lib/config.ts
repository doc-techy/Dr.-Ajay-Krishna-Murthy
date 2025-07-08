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

const environment = getCurrentEnvironment();
const envConfig = appConfig.environments[environment];

// Export configuration
export const config = {
  environment,
  backend: {
    url: envConfig.backend.url,
    apiVersion: envConfig.backend.apiVersion,
    timeout: envConfig.backend.timeout,
    apiUrl: `${envConfig.backend.url}/api/${envConfig.backend.apiVersion}`,
  },
  app: {
    name: envConfig.app.name,
    version: envConfig.app.version,
    debug: envConfig.app.debug,
    logLevel: envConfig.app.logLevel,
  },
  contact: {
    email: envConfig.contact.email,
    phone: envConfig.contact.phone,
    address: envConfig.contact.address,
    emergencyPhone: envConfig.contact.emergencyPhone,
  },
  businessHours: appConfig.businessHours,
  features: appConfig.features,
  security: envConfig.security,
};

// Helper function to get config values
export function getConfig<T>(path: string): T | undefined {
  const keys = path.split('.');
  let result: any = config;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
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
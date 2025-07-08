// Simple authentication utilities for admin access
// In production, this should be replaced with a proper authentication system (e.g., NextAuth.js)

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

// Storage key for auth data
const AUTH_STORAGE_KEY = 'dr_ajay_auth';

// Mock admin credentials (REPLACE WITH REAL AUTHENTICATION IN PRODUCTION)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123' // Change this in production!
};

// Get current user from storage
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const authData = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authData) return null;
  
  try {
    const data = JSON.parse(authData);
    // Check if token is still valid (24 hour expiry)
    if (data.expiry && new Date(data.expiry) < new Date()) {
      logout();
      return null;
    }
    return data.user;
  } catch {
    return null;
  }
}

// Login function
export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  // In production, this should make an API call to your backend
  // For now, we'll use mock credentials
  
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const user: User = {
      id: '1',
      username: username,
      isAdmin: true
    };
    
    const authData = {
      user,
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    
    return { success: true };
  }
  
  return { success: false, error: 'Invalid username or password' };
}

// Logout function
export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.location.href = '/';
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// Check if user is admin
export function isAdmin(): boolean {
  const user = getCurrentUser();
  return user?.isAdmin === true;
} 
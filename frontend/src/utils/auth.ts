import api from './api';
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types';

export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    
    // Store token and session info
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    if (response.data.sessionId) {
      localStorage.setItem('sessionId', response.data.sessionId);
    }
    
    return response.data;
  },

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/register', credentials);
    
    // Store token and session info
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    if (response.data.sessionId) {
      localStorage.setItem('sessionId', response.data.sessionId);
    }
    
    return response.data;
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('sessionId');
    }
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<string> {
    const response = await api.post('/auth/refresh');
    const newToken = response.data.token;
    
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    }
    
    return newToken;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },
};
import axios, { AxiosError } from 'axios';
import type { ApiError } from '../types';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust based on your backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      status: error.response?.status || 500,
      code: error.code,
    };

    if (error.response?.data) {
      const errorData = error.response.data as any;
      apiError.message = errorData.message || errorData.error || apiError.message;
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('sessionId');
      window.location.href = '/login';
    }

    return Promise.reject(apiError);
  }
);

export default api;
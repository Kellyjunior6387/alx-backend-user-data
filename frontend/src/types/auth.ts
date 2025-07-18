export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  sessionId?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
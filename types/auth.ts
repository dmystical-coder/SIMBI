export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  educationLevel?: string;
  timezone?: string;
  preferredStudyMethod?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  educationLevel?: string;
  timezone?: string;
  preferredStudyMethod?: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  user?: User;
  access_token?: string;
  refresh_token?: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  access_token: string;
  refresh_token: string;
}

export interface ApiError {
  status: string;
  message: string;
  details?: any[];
}

// frontend/lib/api/auth.ts

/**
 * Authentication API functions
 * Matches backend/app/api/routes/auth.py
 */

import { apiClient } from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  full_name: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
}

export const authApi = {
  /**
   * Sign up a new user
   * POST /api/v1/auth/signup
   */
  signup: async (data: SignupRequest): Promise<User> => {
    return apiClient.post<User>('/api/v1/auth/signup', data, false);
  },

  /**
   * Login with email and password
   * POST /api/v1/auth/login/email
   */
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    return apiClient.post<TokenResponse>('/api/v1/auth/login/email', data, false);
  },

  /**
   * OAuth2 compatible login (form data)
   * POST /api/v1/auth/login
   */
  loginOAuth2: async (username: string, password: string): Promise<TokenResponse> => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  },

  /**
   * Get current user
   * GET /api/v1/auth/me
   */
  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>('/api/v1/auth/me');
  },

  /**
   * Logout (client-side)
   */
  logout: () => {
    apiClient.setToken(null);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!apiClient.getToken();
  },

  /**
   * Get stored token
   */
  getToken: (): string | null => {
    return apiClient.getToken();
  },
};

export default authApi;
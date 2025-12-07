// frontend/lib/api/client.ts
/**
 * API Client for Clinovia Backend
 * Handles authentication, error handling, and request/response interceptors
 */

import { BACKEND_API_URL } from '@/config/api';
import type {
  AuthEndpoints,
  AlzheimerEndpoints,
  CardiologyEndpoints,
  UserEndpoints,
  DashboardEndpoints,
  ReportEndpoints,
} from '@/config/api';

type Endpoint =
  | AuthEndpoints
  | AlzheimerEndpoints
  | CardiologyEndpoints
  | UserEndpoints
  | DashboardEndpoints
  | ReportEndpoints
  | string;

interface ApiError {
  detail: string;
  status?: number;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private logoutCallback: (() => void) | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  /** Set authentication token */
  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('access_token', token);
      } else {
        localStorage.removeItem('access_token');
      }
    }
  }

  /** Set logout callback */
  setLogoutCallback(callback: () => void) {
    this.logoutCallback = callback;
  }

  /** Get current token */
  getToken(): string | null {
    return this.token;
  }

  /** Construct headers for requests */
  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  /** Handle API responses */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      this.setToken(null);
      this.logoutCallback?.();
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const error: ApiError = await response
        .json()
        .catch(() => ({ detail: response.statusText || 'An unexpected error occurred' }));
      throw new Error(error.detail);
    }

    // Empty response
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  /** Generic GET request */
  async get<T>(endpoint: Endpoint, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(includeAuth),
    });
    return this.handleResponse<T>(response);
  }

  /** Generic POST request */
  async post<T>(endpoint: Endpoint, data?: any, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(includeAuth),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  /** Generic PUT request */
  async put<T>(endpoint: Endpoint, data?: any, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(includeAuth),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  /** Generic PATCH request */
  async patch<T>(endpoint: Endpoint, data?: any, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(includeAuth),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  /** Generic DELETE request */
  async delete<T>(endpoint: Endpoint, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(includeAuth),
    });
    return this.handleResponse<T>(response);
  }
}

// Singleton instance
export const apiClient = new ApiClient(BACKEND_API_URL);

// Helpers
export const setApiToken = (token: string | null) => apiClient.setToken(token);
export const setLogoutCallback = (callback: () => void) => apiClient.setLogoutCallback(callback);

export default apiClient;

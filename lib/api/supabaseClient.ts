// frontend/lib/api/supabaseClient.ts
/**
 * API Client (Supabase Auth Version)
 * - Automatically attaches Supabase JWT
 * - Handles 401 logout
 * - Replaces old custom authApi
 */

import { supabase } from "@/lib/supabaseClient";
import { BACKEND_API_URL } from "@/config/api";
import type {
  AuthEndpoints,
  AlzheimerEndpoints,
  CardiologyEndpoints,
  UserEndpoints,
  DashboardEndpoints,
  ReportEndpoints,
} from "@/config/api";

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
  private logoutCallback: (() => void) | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /** Supabase manages tokens → no localStorage tokens needed */
  async getToken(): Promise<string | null> {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  /** Set logout callback */
  setLogoutCallback(callback: () => void) {
    this.logoutCallback = callback;
  }

  /** Construct request headers */
  private async getHeaders(includeAuth: boolean = true): Promise<HeadersInit> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = await this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /** Handle API responses */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      console.warn("Unauthorized. Clearing Supabase session.");
      await supabase.auth.signOut();
      this.logoutCallback?.();
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      const error: ApiError = await response
        .json()
        .catch(() => ({ detail: response.statusText || "Unknown error" }));
      throw new Error(error.detail);
    }

    if (response.status === 204) return {} as T;

    return response.json();
  }

  /** GET */
  async get<T>(endpoint: Endpoint, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: await this.getHeaders(includeAuth),
    });
    return this.handleResponse(response);
  }

  /** POST */
  async post<T>(endpoint: Endpoint, data?: any, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: await this.getHeaders(includeAuth),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse(response);
  }

  /** PUT */
  async put<T>(endpoint: Endpoint, data?: any, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: await this.getHeaders(includeAuth),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse(response);
  }

  /** PATCH */
  async patch<T>(
    endpoint: Endpoint,
    data?: any,
    includeAuth = true
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PATCH",
      headers: await this.getHeaders(includeAuth),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse(response);
  }

  /** DELETE */
  async delete<T>(endpoint: Endpoint, includeAuth = true): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: await this.getHeaders(includeAuth),
    });
    return this.handleResponse(response);
  }
}

// Singleton instance
export const apiClient = new ApiClient(BACKEND_API_URL);

// Helper: set logout callback
export const setLogoutCallback = (callback: () => void) =>
  apiClient.setLogoutCallback(callback);

export default apiClient;

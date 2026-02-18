// lib/apiClient.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { supabase } from "@/lib/supabaseClient";

// ✅ Custom error class for API failures
export class ApiError extends Error {
  status: number;
  body?: string;

  constructor(status: number, message?: string) {
    super(message || `API Error (${status})`);
    this.name = "ApiError";
    this.status = status;
  }
}

// ✅ Create Axios instance with base config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000, // 30s default timeout
});

// ✅ Request interceptor: attach auth token
apiClient.interceptors.request.use(
  async (config) => {
    // Skip auth for public endpoints if needed
    if (config.headers?.["X-Skip-Auth"] === "true") {
      return config;
    }

    const {  { session }, error } = await supabase.auth.getSession();
    
    if (error || !session?.access_token) {
      console.warn("⚠️ No valid session for request:", config.url);
      throw new ApiError(401, "Authentication required");
    }

    // Type-safe header assignment
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session.access_token}`,
    };
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ✅ Response interceptor: global error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    // Handle 401: session expired or invalid token
    if (status === 401) {
      console.warn("🔐 Session expired, redirecting to login");
      // Optional: trigger logout flow or redirect
      // window.location.href = "/login";
    }

    // Handle 403: permission denied
    if (status === 403) {
      console.warn("🚫 Access denied to resource");
    }

    // Handle 404: endpoint not found
    if (status === 404) {
      console.warn("🔍 API endpoint not found:", error.config?.url);
    }

    // Wrap in custom error for consistent handling upstream
    throw new ApiError(
      status || 500,
      error.response?.data ? JSON.stringify(error.response.data) : error.message
    );
  }
);

// ✅ Type-safe request wrapper (optional convenience)
export async function request<TResponse, TBody = unknown>(
  path: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: TBody;
    skipAuth?: boolean;
  } = {}
): Promise<TResponse> {
  const { method = "GET", body, skipAuth = false } = options;
  
  const config: AxiosRequestConfig = {
    method,
    url: path,
    ...(skipAuth && { headers: { "X-Skip-Auth": "true" } }),
    ...(body && { data: body }),
  };

  const {  data } = await apiClient.request<TResponse>(config);
  return data;
}

// ✅ Export both the instance and wrapper
export { apiClient };
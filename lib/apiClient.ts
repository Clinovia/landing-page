import { supabase } from "@/lib/supabaseClient";

// ----------------------------------
// Error Class
// ----------------------------------
export class ApiError extends Error {
  status: number;
  body?: string;

  constructor(status: number, body?: string) {
    super(`API Error (${status})`);
    this.status = status;
    this.body = body;
  }
}

// ----------------------------------
// Types
// ----------------------------------
type ApiRequestOptions<TBody> = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
  requireAuth?: boolean;
  rawResponse?: boolean;
};

// ----------------------------------
// Token Helper (cached)
// ----------------------------------
let cachedToken: string | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const { data, error } = await supabase.auth.getSession();

  const token = data.session?.access_token;

  if (error || !token) {
    throw new ApiError(401, "Not authenticated");
  }

  cachedToken = token;
  return token;
}

// Optional: reset token if needed (e.g., logout)
export function clearCachedToken() {
  cachedToken = null;
}

// ----------------------------------
// Core API Request
// ----------------------------------
export async function apiRequest<TResponse, TBody = unknown>(
  options: ApiRequestOptions<TBody>
): Promise<TResponse> {
  const {
    path,
    method = "GET",
    body,
    requireAuth = true,
    rawResponse = false,
  } = options;

  let token: string | null = null;

  if (requireAuth) {
    token = await getAccessToken();
  }

  // Timeout protection
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    console.log("apiRequest", {
      path,
      method,
      token: token ? "present" : "missing",
    });

    const response = await fetch(path, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ApiError(response.status, text);
    }

    if (rawResponse) {
      return response as unknown as TResponse;
    }

    return (await response.json()) as TResponse;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new ApiError(408, "Request timeout");
    }

    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// ----------------------------------
// File Upload (multipart/form-data)
// ----------------------------------
export async function apiRequestWithFile<T>({
  path,
  fileField,
  file,
  extraFields,
}: {
  path: string;
  fileField: string;
  file: File;
  extraFields?: Record<string, unknown>;
}): Promise<T> {
  const token = await getAccessToken();

  const formData = new FormData();
  formData.append(fileField, file);

  if (extraFields) {
    Object.entries(extraFields).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      credentials: "include",
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ApiError(response.status, text);
    }

    return (await response.json()) as T;
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new ApiError(408, "File upload timeout");
    }

    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
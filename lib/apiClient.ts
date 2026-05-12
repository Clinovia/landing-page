// frontend-mci/lib/apiClient.ts
import { supabaseClient } from "@/lib/api";

/* ─────────────────────────────────────────────
 * Thin API client wrapper (REST-style)
 * ───────────────────────────────────────────── */

export const apiClient = {
  get: <T>(path: string) =>
    apiRequest<T>({ path, method: "GET" }),

  post: <T>(path: string, body?: unknown) =>
    apiRequest<T>({ path, method: "POST", body }),

  put: <T>(path: string, body?: unknown) =>
    apiRequest<T>({ path, method: "PUT", body }),

  delete: <T>(path: string) =>
    apiRequest<T>({ path, method: "DELETE" }),
};

/* ─────────────────────────────────────────────
 * API Error (transport-level)
 * ───────────────────────────────────────────── */
export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError"; // ✅ helps with instanceof checks
    this.status = status;
  }
}

interface RequestOptions {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

/* ─────────────────────────────────────────────
 * Core API Request (JWT-aware)
 * ───────────────────────────────────────────── */
export async function apiRequest<T>({
  path,
  method = "GET",
  body,
  headers = {},
}: RequestOptions): Promise<T> {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const accessToken = session?.access_token;

  const res = await fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(text || "API request failed", res.status);
  }

  return res.json();
}

/* ─────────────────────────────────────────────
 * File Upload Variant
 * ───────────────────────────────────────────── */
export async function apiRequestWithFile<T>(
  path: string,
  formData: FormData
): Promise<T> {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const accessToken = session?.access_token;

  const res = await fetch(path, {
    method: "POST",
    headers: {
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(text || "File upload failed", res.status);
  }

  return res.json();
}
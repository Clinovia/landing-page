import { supabase } from "@/lib/supabaseClient";

// ----------------------------------
// Error Class
// ----------------------------------

export class ApiError extends Error {
  status: number;
  body?: string;

  constructor(status: number, body?: string) {
    super(`API Error (${status})${body ? `: ${body}` : ""}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

// ----------------------------------
// Types
// ----------------------------------

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiRequestOptions<TBody> = {
  path: string;
  method?: HttpMethod;
  body?: TBody;
  requireAuth?: boolean;
  rawResponse?: boolean;
  /** Per-request timeout in ms. Defaults to DEFAULT_TIMEOUT_MS. */
  timeoutMs?: number;
};

// ----------------------------------
// Constants
// ----------------------------------

const DEFAULT_TIMEOUT_MS = 10_000;
const FILE_UPLOAD_TIMEOUT_MS = 15_000;

// ----------------------------------
// Token Helper
//
// Delegates entirely to Supabase, which handles refresh transparently.
// No manual caching — a cached token can go stale after the 1hr expiry
// and cause 401s on the first request after a session refresh.
// ----------------------------------

async function getAccessToken(): Promise<string> {
  const { data, error } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (error || !token) {
    throw new ApiError(401, "Not authenticated");
  }

  return token;
}

// Kept for backward compatibility (e.g. logout flows that call clearCachedToken).
// Now a no-op since we no longer cache.
export function clearCachedToken(): void {}

// ----------------------------------
// Abort helper
// Returns a controller and a self-clearing timeout handle.
// ----------------------------------

function makeAbortController(timeoutMs: number): {
  controller: AbortController;
  clear: () => void;
} {
  const controller = new AbortController();
  const handle = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, clear: () => clearTimeout(handle) };
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
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  const token = requireAuth ? await getAccessToken() : null;

  const { controller, clear } = makeAbortController(timeoutMs);

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
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError(408, "Request timed out");
    }
    throw err;
  } finally {
    clear();
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
  timeoutMs = FILE_UPLOAD_TIMEOUT_MS,
}: {
  path: string;
  fileField: string;
  file: File;
  extraFields?: Record<string, unknown>;
  timeoutMs?: number;
}): Promise<T> {
  const token = await getAccessToken();

  const formData = new FormData();
  formData.append(fileField, file);

  if (extraFields) {
    for (const [key, value] of Object.entries(extraFields)) {
      formData.append(key, String(value));
    }
  }

  const { controller, clear } = makeAbortController(timeoutMs);

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
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError(408, "File upload timed out");
    }
    throw err;
  } finally {
    clear();
  }
}
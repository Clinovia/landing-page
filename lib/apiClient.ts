import { supabase } from "@/lib/supabaseClient";

// No BASE_URL needed — use relative paths so requests go through Next.js
export class ApiError extends Error {
  status: number;
  body?: string;
  constructor(status: number, body?: string) {
    super(`API Error (${status})`);
    this.status = status;
    this.body = body;
  }
}

export async function apiRequest<TResponse, TBody = unknown>({
  path,
  method = "GET",
  body,
  requireAuth = true,
}: {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
  requireAuth?: boolean;
}): Promise<TResponse> {
  let token: string | null = null;

  if (requireAuth) {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.access_token) {
      throw new ApiError(401, "Not authenticated");
    }
    token = session.access_token;
  }

  const response = await fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(response.status, text);
  }

  return response.json() as Promise<TResponse>;
}

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
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session?.access_token) {
    throw new ApiError(401, "Not authenticated");
  }

  const formData = new FormData();
  formData.append(fileField, file);
  if (extraFields) {
    Object.entries(extraFields).forEach(([key, value]) =>
      formData.append(key, String(value))
    );
  }

  const response = await fetch(path, {
    method: "POST",
    headers: { Authorization: `Bearer ${session.access_token}` },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(response.status, text);
  }

  return response.json() as Promise<T>;
}
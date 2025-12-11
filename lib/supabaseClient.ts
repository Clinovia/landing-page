// lib/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

/**
 * Create Supabase client (browser)
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Get current auth token for API requests
 */
export async function getAuthToken(): Promise<string | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) return null;
  return data?.session?.access_token ?? null;
}

/**
 * Generic JSON API request helper
 */
export async function apiRequest<T>({
  url,
  method = "GET",
  data,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
}): Promise<T> {
  const token = await getAuthToken();

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `API request failed (${response.status}): ${text || response.statusText}`
    );
  }

  return response.json();
}

/**
 * File upload helper (FormData)
 */
export async function apiRequestWithFile<T>({
  url,
  fileField,
  file,
  extraFields,
}: {
  url: string;
  fileField: string;
  file: File;
  extraFields?: Record<string, any>;
}): Promise<T> {
  const token = await getAuthToken();

  const formData = new FormData();
  formData.append(fileField, file);

  if (extraFields) {
    for (const [key, value] of Object.entries(extraFields)) {
      formData.append(key, value);
    }
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `File upload failed (${response.status}): ${text || response.statusText}`
    );
  }

  return response.json();
}

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/supabase-js";

/* ------------------------------------------------------------------
   Supabase client (SINGLETON — client components only)
------------------------------------------------------------------- */

export const supabase = createClientComponentClient();

/* ------------------------------------------------------------------
   Access token cache (for FastAPI calls)
------------------------------------------------------------------- */

let accessToken: string | null = null;
let initialized = false;

/**
 * Initialize token cache once
 */
async function initTokenCache() {
  if (initialized) return;
  initialized = true;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  accessToken = session?.access_token ?? null;
}

/**
 * Keep token in sync on auth changes
 */
supabase.auth.onAuthStateChange((_event, session: Session | null) => {
  accessToken = session?.access_token ?? null;
});

/**
 * Getter used by API helpers
 */
export async function getCachedToken(): Promise<string | null> {
  await initTokenCache();
  return accessToken;
}

/* ------------------------------------------------------------------
   Generic JSON API request helper
------------------------------------------------------------------- */

export async function apiRequest<T>({
  url,
  method = "GET",
  data,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: unknown;
}): Promise<T> {
  const token = await getCachedToken();

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
      `API request failed (${response.status}): ${
        text || response.statusText
      }`
    );
  }

  return response.json() as Promise<T>;
}

/* ------------------------------------------------------------------
   File upload helper (FormData)
------------------------------------------------------------------- */

export async function apiRequestWithFile<T>({
  url,
  fileField,
  file,
  extraFields,
}: {
  url: string;
  fileField: string;
  file: File;
  extraFields?: Record<string, unknown>;
}): Promise<T> {
  const token = await getCachedToken();

  const formData = new FormData();
  formData.append(fileField, file);

  if (extraFields) {
    Object.entries(extraFields).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
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
      `File upload failed (${response.status}): ${
        text || response.statusText
      }`
    );
  }

  return response.json() as Promise<T>;
}

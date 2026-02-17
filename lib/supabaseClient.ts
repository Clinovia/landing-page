// frontend/lib/supabaseClient.ts
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session } from "@supabase/supabase-js";

/* ------------------------------------------------------------------
   Supabase client (SINGLETON — client components only)
------------------------------------------------------------------- */

export const supabase = createClientComponentClient();

/* ------------------------------------------------------------------
   Access token helper (SAFE — no stale cache)
------------------------------------------------------------------- */

export async function getCachedToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token ?? null;
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

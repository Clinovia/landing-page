"use client";

import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
});

// Cache token
let accessToken: string | null = null;

// Keep token updated
supabase.auth.onAuthStateChange((_event, session) => {
  accessToken = session?.access_token || null;
});

// Attach token to every request
apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default apiClient;

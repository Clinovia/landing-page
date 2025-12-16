// lib/api/index.ts (or wherever this file lives)
/**
 * Main API module exports
 * Centralized exports for all API utilities
 */

// Export the pre-configured Supabase client instance
export { supabase, getCachedToken, apiRequest, apiRequestWithFile } from "../supabaseClient";

// Re-export endpoint types for convenience
export type {
  AuthEndpoints,
  AlzheimerEndpoints,
  CardiologyEndpoints,
  UserEndpoints,
  DashboardEndpoints,
  ReportEndpoints,
} from "@/config/api";
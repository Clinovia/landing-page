/**
 * Main API module exports
 * Centralized exports for all API utilities
 */

export { apiClient, setLogoutCallback } from "./supabaseClient";

// Re-export endpoint types for convenience
export type {
  AuthEndpoints,
  AlzheimerEndpoints,
  CardiologyEndpoints,
  UserEndpoints,
  DashboardEndpoints,
  ReportEndpoints,
} from "@/config/api";

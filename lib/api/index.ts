/* ─────────────────────────────────────────────
 * Core API Client (transport layer)
 * ───────────────────────────────────────────── */
export {
  apiRequest,
  apiRequestWithFile,
  ApiError,
} from "@/lib/apiClient";

/* ─────────────────────────────────────────────
 * Supabase Clients
 * ───────────────────────────────────────────── */

// Browser (singleton)
export { supabase as supabaseClient } from "@/lib/supabase/browserClient";;

/* ─────────────────────────────────────────────
 * API Contract Types
 * ───────────────────────────────────────────── */
export type {
  AuthEndpoints,
  UserEndpoints,
  DashboardEndpoints,
  ReportEndpoints,
} from "@/config/api";
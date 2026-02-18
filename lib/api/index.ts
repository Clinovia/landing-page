// lib/api/index.ts
export { supabase } from "../supabaseClient";
export { apiRequest, apiRequestWithFile, ApiError } from "../apiClient";

export type {
  AuthEndpoints,
  AlzheimerEndpoints,
  CardiologyEndpoints,
  UserEndpoints,
  DashboardEndpoints,
  ReportEndpoints,
} from "@/config/api";
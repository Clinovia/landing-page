// clinovia-saas/frontend/config/api.ts
/**
 * API Endpoints Configuration
 * Centralized API endpoint definitions
 */

const API_VERSION = 'v1';

/**
 * Backend API base URL
 * Picks up the environment variable or defaults to localhost
 */
export const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  'http://localhost:8000';

/**
 * Helper to build full API URL
 */
const buildUrl = (path: string) => `${BACKEND_API_URL}/api/${API_VERSION}${path}`;

/**
 * Authentication endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: buildUrl('/auth/login'),
  SIGNUP: buildUrl('/auth/signup'),
  LOGOUT: buildUrl('/auth/logout'),
  REFRESH: buildUrl('/auth/refresh'),
  FORGOT_PASSWORD: buildUrl('/auth/forgot-password'),
  RESET_PASSWORD: buildUrl('/auth/reset-password'),
  VERIFY_EMAIL: buildUrl('/auth/verify-email'),
} as const;

/**
 * MCI Screening endpoints
 * 24-month MCI-to-Alzheimer's progression risk model
 */
export const MCI_SCREENING_ENDPOINTS = {
  PREDICT: buildUrl('/mci-screening/predict'),
} as const;

/**
 * User/Profile endpoints
 */
export const USER_ENDPOINTS = {
  PROFILE: buildUrl('/user/profile'),
  UPDATE_PROFILE: buildUrl('/user/profile'),
  CHANGE_PASSWORD: buildUrl('/user/change-password'),
  DELETE_ACCOUNT: buildUrl('/user/delete'),
} as const;

/**
 * Report endpoints
 */
export const REPORT_ENDPOINTS = {
  GENERATE: buildUrl('/reports/generate'),
  LIST: buildUrl('/reports/list'),
  GET_BY_ID: (id: string) => buildUrl(`/reports/${id}`),
  DOWNLOAD: (id: string) => buildUrl(`/reports/${id}/download`),
  DELETE: (id: string) => buildUrl(`/reports/${id}`),
} as const;

/**
 * All API endpoints grouped
 */
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  MCI_SCREENING: MCI_SCREENING_ENDPOINTS,
  USER: USER_ENDPOINTS,
  REPORT: REPORT_ENDPOINTS,
} as const;

/**
 * API request timeout (in milliseconds)
 */
export const API_TIMEOUT = 30_000; // 30 seconds

/**
 * API retry configuration
 */
export const API_RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1_000, // 1 second
  RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
} as const;

/**
 * Type helpers
 */
export type AuthEndpoints = typeof AUTH_ENDPOINTS[keyof typeof AUTH_ENDPOINTS];
export type MCIScreeningEndpoints = typeof MCI_SCREENING_ENDPOINTS[keyof typeof MCI_SCREENING_ENDPOINTS];
export type UserEndpoints = typeof USER_ENDPOINTS[keyof typeof USER_ENDPOINTS];
export type ReportEndpoints =
  | typeof REPORT_ENDPOINTS[keyof typeof REPORT_ENDPOINTS]
  | ReturnType<typeof REPORT_ENDPOINTS.GET_BY_ID>;
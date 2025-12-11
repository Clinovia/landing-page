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
  process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
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
 * Alzheimer's module endpoints
 */
export const ALZHEIMER_ENDPOINTS = {
  DIAGNOSIS_SCREENING: buildUrl('/alzheimer/diagnosis-screening'),
  DIAGNOSIS_BASIC: buildUrl('/alzheimer/diagnosis-basic'),
  DIAGNOSIS_EXTENDED: buildUrl('/alzheimer/diagnosis-extended'),
  PROGNOSIS_2YR_BASIC: buildUrl('/alzheimer/prognosis-2yr-basic'),
  PROGNOSIS_2YR_EXTENDED: buildUrl('/alzheimer/prognosis-2yr-extended'),
  RISK_SCREENER: buildUrl('/alzheimer/risk-screener'),
} as const;

/**
 * Cardiology module endpoints
 */
export const CARDIOLOGY_ENDPOINTS = {
  ASCVD: buildUrl('/cardiology/ascvd'),
  BP_CATEGORY: buildUrl('/cardiology/bp-category'),
  CHA2DS2_VASC: buildUrl('/cardiology/cha2ds2vasc'),
  ECG_INTERPRETER: buildUrl('/cardiology/ecg-interpreter'),
  EF_PREDICTION: buildUrl('/cardiology/ejection-fraction'),
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
 * Dashboard/Analytics endpoints
 */
export const DASHBOARD_ENDPOINTS = {
  STATS: buildUrl('/dashboard/stats'),
  RECENT_ASSESSMENTS: buildUrl('/dashboard/recent'),
  CHARTS: buildUrl('/dashboard/charts'),
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
  ALZHEIMER: ALZHEIMER_ENDPOINTS,
  CARDIOLOGY: CARDIOLOGY_ENDPOINTS,
  USER: USER_ENDPOINTS,
  DASHBOARD: DASHBOARD_ENDPOINTS,
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
export type AlzheimerEndpoints = typeof ALZHEIMER_ENDPOINTS[keyof typeof ALZHEIMER_ENDPOINTS];
export type CardiologyEndpoints = typeof CARDIOLOGY_ENDPOINTS[keyof typeof CARDIOLOGY_ENDPOINTS];
export type UserEndpoints = typeof USER_ENDPOINTS[keyof typeof USER_ENDPOINTS];
export type DashboardEndpoints = typeof DASHBOARD_ENDPOINTS[keyof typeof DASHBOARD_ENDPOINTS];
export type ReportEndpoints =
  | typeof REPORT_ENDPOINTS[keyof typeof REPORT_ENDPOINTS]
  | ReturnType<typeof REPORT_ENDPOINTS.GET_BY_ID>;

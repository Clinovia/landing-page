// frontend/lib/api/index.ts

/**
 * Main API module exports
 * Central place to import all API functionality
 */

export { apiClient, setApiToken, setLogoutCallback } from './client';
export { authApi } from './auth';
export type { LoginRequest, SignupRequest, TokenResponse, User } from './auth';
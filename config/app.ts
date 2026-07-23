// config/app.ts

export const APP_CONFIG = {
  NAME: 'Clinovia',
  DESCRIPTION:
    'Research-use platform estimating 24-month risk of progression from mild cognitive impairment (MCI) to Alzheimer\'s disease.',
  VERSION: '1.0.0',
  AUTHOR: 'Clinovia Inc.',
  SUPPORT_EMAIL: 'support@clinovia.ai',
  CONTACT_EMAIL: 'contact@clinovia.ai',
} as const;

/**
 * Feature flags
 * Enable/disable features across the app
 */
export const FEATURE_FLAGS = {
  ENABLE_RISK_ASSESSMENT_CLINICAL: true,
  ENABLE_RISK_ASSESSMENT_MRI: true,
  ENABLE_REPORTS: true,
  ENABLE_DASHBOARD: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: false, // Coming soon
  ENABLE_DARK_MODE: true,
  ENABLE_EXPORT_PDF: true,
  ENABLE_MULTI_LANGUAGE: false, // Coming soon
} as const;

/**
 * Authentication configuration
 */
export const AUTH_CONFIG = {
  // Token expiration times (in seconds)
  ACCESS_TOKEN_EXPIRY: 7 * 24 * 60 * 60, // 7 days
  REFRESH_TOKEN_EXPIRY: 30 * 24 * 60 * 60, // 30 days

  // Session settings
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  REMEMBER_ME_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 days

  // Password requirements
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBER: true,
  PASSWORD_REQUIRE_SPECIAL: true,

  // Login attempts
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
} as const;

/**
 * UI/UX Configuration
 */
export const UI_CONFIG = {
  // Theme
  DEFAULT_THEME: 'light' as 'light' | 'dark',

  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],

  // Sidebar
  SIDEBAR_WIDTH: 280,
  SIDEBAR_COLLAPSED_WIDTH: 80,

  // Toast/Notification duration
  TOAST_DURATION: 5000, // 5 seconds

  // Loading states
  DEBOUNCE_DELAY: 500, // milliseconds
  LOADING_SPINNER_DELAY: 300, // milliseconds

  // File upload (MRI scan uploads, if/when supported)
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['.pdf', '.jpg', '.jpeg', '.png', '.dcm'],
} as const;

/**
 * Validation rules
 * Ranges reflect the inputs actually collected by the two risk-assessment editions.
 */
export const VALIDATION_RULES = {
  // Email
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Demographics
  MIN_AGE: 18,
  MAX_AGE: 120,

  // Cognitive assessments (Clinical Edition)
  MMSE: { MIN: 0, MAX: 30 }, // Mini-Mental State Examination score
  RAVLT_IMMEDIATE_RECALL: { MIN: 0, MAX: 75 }, // sum across trials, adjust to your instrument's actual scale

  // Quantitative MRI measures (MRI-Enhanced Edition) — volumes in mm^3, adjust to your pipeline's units
  MRI_MEASURES: {
    HIPPOCAMPUS: { MIN: 2000, MAX: 5000 },
    ENTORHINAL_CORTEX: { MIN: 1000, MAX: 3000 },
    MIDDLE_TEMPORAL_GYRUS: { MIN: 10000, MAX: 25000 },
    WHOLE_BRAIN: { MIN: 900000, MAX: 1400000 },
    VENTRICLES: { MIN: 5000, MAX: 60000 },
  },
} as const;

/**
 * Risk assessment module configuration
 */
export const MODULE_CONFIG = {
  RISK_ASSESSMENT_CLINICAL: {
    NAME: 'Clinical + Cognitive Risk Assessment',
    DESCRIPTION:
      'Estimates 24-month progression risk from MCI to Alzheimer\'s disease using age, sex, MMSE, and RAVLT Immediate Recall.',
    ICON: '🧠',
    COLOR: '#8B5CF6', // Purple
    ROUTE: '/risk-assessment',
    INPUTS: ['age', 'sex', 'mmse', 'ravlt_immediate_recall'],
  },
  RISK_ASSESSMENT_MRI: {
    NAME: 'MRI-Enhanced Risk Assessment',
    DESCRIPTION:
      'Adds quantitative MRI measures (hippocampus, entorhinal cortex, middle temporal gyrus, whole brain, ventricles) to the clinical model for a refined 24-month progression risk estimate.',
    ICON: '🧲',
    COLOR: '#0EA5E9', // Blue
    ROUTE: '/risk-assessment-mri',
    INPUTS: [
      'age',
      'sex',
      'mmse',
      'ravlt_immediate_recall',
      'hippocampus',
      'entorhinal_cortex',
      'middle_temporal_gyrus',
      'whole_brain',
      'ventricles',
    ],
  },
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  UNAUTHORIZED: 'You are not authorized. Please log in.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in!',
  SIGNUP: 'Account created successfully!',
  LOGOUT: 'Successfully logged out.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  REPORT_GENERATED: 'Report generated successfully.',
  DATA_SAVED: 'Data saved successfully.',
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'clinovia_theme',
  LANGUAGE: 'clinovia_language',
  SIDEBAR_COLLAPSED: 'clinovia_sidebar_collapsed',
  RECENT_SEARCHES: 'clinovia_recent_searches',
  PREFERENCES: 'clinovia_user_preferences',
} as const;

/**
 * Environment check
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_TEST = process.env.NODE_ENV === 'test';

/**
 * External links
 */
export const EXTERNAL_LINKS = {
  DOCUMENTATION: 'https://docs.clinovia.ai',
  SUPPORT: 'https://support.clinovia.ai',
  PRIVACY_POLICY: 'https://clinovia.ai/privacy',
  TERMS_OF_SERVICE: 'https://clinovia.ai/terms',
  FAQ: 'https://clinovia.ai/faq',
  GITHUB: 'https://github.com/clinovia',
} as const;
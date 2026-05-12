/**
 * Application Routes Configuration
 * Centralized route definitions for type-safe navigation
 */

export const PUBLIC_ROUTES = {
  HOME: "/",
  MODULES: "/modules",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
} as const;

export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
} as const;

export const DASHBOARD_ROUTES = {
  ROOT: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  REPORTS: "/reports",
} as const;

export const CLINICAL_ROUTES = {
  ALZHEIMER: {
    ROOT: "/clinical/alzheimer",
    STAGE1: "/clinical/alzheimer/stage1-clinical-screening",
    STAGE2: "/clinical/alzheimer/stage2a-plasma-model",
    STAGE3: "/clinical/alzheimer/stage2b-mri-model",
  },
} as const;

/* ──────────────────────────────────────────────
 * Unified ROUTES object (safe grouping only)
 * ────────────────────────────────────────────── */
export const ROUTES = {
  PUBLIC: PUBLIC_ROUTES,
  AUTH: AUTH_ROUTES,
  DASHBOARD: DASHBOARD_ROUTES,
  CLINICAL: CLINICAL_ROUTES,
} as const;

/* ──────────────────────────────────────────────
 * Type helpers
 * ────────────────────────────────────────────── */
type Values<T> = T[keyof T];

/**
 * All route values in the system (flat union)
 * Useful for navigation helpers only
 */
export type AppRoute =
  | Values<typeof PUBLIC_ROUTES>
  | Values<typeof AUTH_ROUTES>
  | Values<typeof DASHBOARD_ROUTES>
  | Values<typeof CLINICAL_ROUTES["ALZHEIMER"]>;

/* ──────────────────────────────────────────────
 * Route helpers (safe & scalable)
 * ────────────────────────────────────────────── */

const includesRoute = <T extends Record<string, string>>(
  routes: T,
  pathname: string
): boolean => {
  return (Object.values(routes) as string[]).includes(pathname);
};

export const isPublicRoute = (pathname: string): boolean =>
  includesRoute(PUBLIC_ROUTES, pathname);

export const isAuthRoute = (pathname: string): boolean =>
  Object.values(AUTH_ROUTES).some((route) => pathname.startsWith(route));

export const isProtectedRoute = (pathname: string): boolean =>
  Object.values(DASHBOARD_ROUTES).some((route) =>
    pathname.startsWith(route)
  );

/* ──────────────────────────────────────────────
 * Navigation defaults
 * ────────────────────────────────────────────── */
export const getDefaultRedirect = (userRole?: string): AppRoute => {
  switch (userRole) {
    case "admin":
      return DASHBOARD_ROUTES.ROOT;
    case "doctor":
      return CLINICAL_ROUTES.ALZHEIMER.ROOT;
    default:
      return DASHBOARD_ROUTES.ROOT;
  }
};

/* ──────────────────────────────────────────────
 * Breadcrumb helper (unchanged but safe)
 * ────────────────────────────────────────────── */
export const getBreadcrumbs = (
  pathname: string
): Array<{ label: string; href: string }> => {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ label: "Home", href: "/" }];

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = segment
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({ label, href: currentPath });
  });

  return breadcrumbs;
};
/**
 * -------------------------------------------------------
 * Application Routes
 * Mirrors /app directory structure
 * -------------------------------------------------------
 */

export const MARKETING_ROUTES = {
  HOME: "/",
  MODULES: "/modules",
  PRICING: "/pricing",
  PILOT: "/pilot",
  APPLY: "/apply",
  CHECKOUT_SUCCESS: "/checkout-success",
  CHECKOUT_CANCEL: "/checkout-cancel",
} as const;

export const AUTH_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  // Signup now returns an active session immediately (email confirmation
  // is disabled), so CONFIRM is repurposed as a short "setting up your
  // account" waiting screen while profile creation completes — not a
  // link-confirmation destination anymore. CHECK_EMAIL is intentionally
  // not listed here; it's no longer part of the signup flow.
  CONFIRM: "/confirm",
} as const;

export const CLINICAL_ROUTES = {
  RISK_ASSESSMENT: "/risk-assessment",
  RISK_ASSESSMENT_MRI: "/risk-assessment-mri",
} as const;

/* -------------------------------------------------------
 * Unified Routes
 * ----------------------------------------------------- */

export const ROUTES = {
  MARKETING: MARKETING_ROUTES,
  AUTH: AUTH_ROUTES,
  CLINICAL: CLINICAL_ROUTES,
} as const;

/* -------------------------------------------------------
 * Types
 * ----------------------------------------------------- */

type Values<T> = T[keyof T];

export type AppRoute =
  | Values<typeof MARKETING_ROUTES>
  | Values<typeof AUTH_ROUTES>
  | Values<typeof CLINICAL_ROUTES>;

export type Breadcrumb = {
  label: string;
  href: string;
};

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

const includesRoute = <T extends Record<string, string>>(
  routes: T,
  pathname: string
): boolean => Object.values(routes).includes(pathname);

export const isMarketingRoute = (pathname: string): boolean =>
  includesRoute(MARKETING_ROUTES, pathname);

export const isAuthRoute = (pathname: string): boolean =>
  Object.values(AUTH_ROUTES).some((route) => pathname.startsWith(route));

export const isClinicalRoute = (pathname: string): boolean =>
  pathname.startsWith(CLINICAL_ROUTES.RISK_ASSESSMENT);

/**
 * Protected routes require an
 * authenticated session.
 */
export const isProtectedRoute = (pathname: string): boolean =>
  isClinicalRoute(pathname);

/**
 * Public routes are accessible
 * without authentication.
 */
export const isPublicRoute = (pathname: string): boolean =>
  isMarketingRoute(pathname) || isAuthRoute(pathname);

/* -------------------------------------------------------
 * Redirects
 * ----------------------------------------------------- */

export const getDefaultRedirect = (): AppRoute => MARKETING_ROUTES.HOME;

/* -------------------------------------------------------
 * Breadcrumbs
 * ----------------------------------------------------- */

export const getBreadcrumbs = (pathname: string): Breadcrumb[] => {
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: Breadcrumb[] = [
    {
      label: "Home",
      href: MARKETING_ROUTES.HOME,
    },
  ];

  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;

    breadcrumbs.push({
      href: currentPath,
      label: segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    });
  }

  return breadcrumbs;
};
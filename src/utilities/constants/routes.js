import {
  ACCESS_DENIED_PAGE,
  ACTIVE_HEARINGS_PAGE,
  ARCHIVED_HEARINGS_PAGE,
  COOKIE_INFORMATION_PAGE,
  HEARING_PAGE,
  MY_HEARINGS_PAGE,
  TERMS_AND_CONDITIONS_PAGE,
} from "./pages";

// -------- ROUTES --------
export const ACTIVE_HEARINGS_ROUTE = `/${ACTIVE_HEARINGS_PAGE}`;
export const ARCHIVED_HEARINGS_ROUTE = `/${ARCHIVED_HEARINGS_PAGE}`;
export const MY_HEARINGS_ROUTE = `/${MY_HEARINGS_PAGE}`;
export const HEARING_BASE = `/${HEARING_PAGE}`;
export const HEARING_ROUTE = `${HEARING_BASE}/[hearingId]`;
export const HEARING_COMMENTS_ROUTE = `${HEARING_ROUTE}/comments`;
export const HEARING_ANSWER_ROUTE = `${HEARING_ROUTE}/answer`;
export const TERMS_AND_CONDITIONS_ROUTE = `/${TERMS_AND_CONDITIONS_PAGE}`;
export const ACCESS_DENIED_ROUTE = `/${ACCESS_DENIED_PAGE}`;
export const COOKIE_INFORMATION_ROUTE = `/${COOKIE_INFORMATION_PAGE}`;
// This url is constant in order to comply with accessibility legislation: https://digst.dk/digital-inklusion/webtilgaengelighed/om-tilgaengelighedserklaeringen/
export const DECLARATION_OF_ACCESSIBILITY_ROUTE = `/was`;

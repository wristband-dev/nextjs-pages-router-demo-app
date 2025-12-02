import * as http from 'http';
import { createWristbandAuth, getPagesRouterSession, SessionOptions } from '@wristband/nextjs-auth';

import { MySessionData } from '@/types';

/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */

/**
 * Wristband authentication client for handling OAuth flows (login, callback, logout).
 *
 * Use this client to:
 * - Initiate login redirects: `wristbandAuth.pagesRouter.login()`
 * - Handle OAuth callbacks: `wristbandAuth.pagesRouter.callback()`
 * - Handle logout: `wristbandAuth.pagesRouter.logout()`
 * - Create authentication middleware and session helpers
 */
export const wristbandAuth = createWristbandAuth({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  wristbandApplicationVanityDomain: process.env.APPLICATION_VANITY_DOMAIN!,
  scopes: ['openid', 'offline_access', 'email', 'profile', 'roles'],
  dangerouslyDisableSecureCookies: true, // IMPORTANT: Only for local development. Don't use in Production!
});

/**
 * Session configuration used across all session management utilities.
 *
 * IMPORTANT: In production, use a strong secret and set "secure: true".
 */
const sessionOptions: SessionOptions = { secrets: 'dummy-value-463a-812c-0d8db87c0ec5c1', secure: false };

/**
 * Authentication middleware that protects routes in the Next.js middleware/proxy.
 *
 * Supports two authentication strategies (tried in the order listed):
 * 1. JWT - Validates Bearer tokens in Authorization header
 * 2. SESSION - Validates session cookies and refreshes expired tokens
 *
 * When protected routes fail all auth strategies:
 * - APIs: "/api/v1/*" - Returns 401 if unauthenticated
 * - Pages: "/" - Defaults to a redirect to Login Endpoint
 */
export const requireMiddlewareAuth = wristbandAuth.createMiddlewareAuth<MySessionData>({
  authStrategies: ['JWT', 'SESSION'],
  sessionConfig: { sessionOptions },
  protectedApis: ['/api/v1(.*)'],
  protectedPages: ['/'],
});

/**
 * Retrieves session from Pages Router API routes and SSR functions.
 *
 * Use in:
 * - API Route Handlers
 * - getServerSideProps
 */
export function getSession(req: http.IncomingMessage, res: http.ServerResponse) {
  return getPagesRouterSession<MySessionData>(req, res, sessionOptions);
}

import type { SessionData } from '@wristband/nextjs-auth';

/**
 * Custom session data type for this application.
 * Extends the base SessionData from the Wristband SDK with app-specific fields.
 */
export interface MySessionData extends SessionData {
  // Custom Fields
  email?: string;
}

/**
 * Custom session metadata for Wristband React Client Auth SDK.
 * The metadata is accessible via the `useWristbandSession()` hook in React components.
 *
 * @example
 * ```typescript
 * const { metadata } = useWristbandSession<MySessionMetadata>();
 * console.log(metadata.email); // Access custom email field
 * ```
 */
export type MySessionMetadata = {
  email: string;
};

/**
 * Wristband tenant resource from the Wristband Tenant API.
 */
export type Tenant = {
  id: string;
  applicationId: string;
  vanityDomain: string;
  domainName: string;
  displayName: string;
  description: string;
  signupEnabled: boolean;
  status: string;
  publicMetadata: object;
  restrictedMetadata: object;
  metadata: {
    version: number;
    lastModifiedTime: string;
    creationTime: string;
    activationTime: string;
    deactivationTime: string;
  };
};

/**
 * Response data for the Hello World API route handlers.
 */
export type HelloWorldData = {
  message: string;
};

import axios from 'axios';

const CSRF_TOKEN_COOKIE_NAME = 'CSRF-TOKEN';
const CSRF_TOKEN_HEADER_NAME = 'X-CSRF-TOKEN';
const JSON_MEDIA_TYPE = 'application/json;charset=UTF-8';

const frontendApiClient = axios.create({
  // Set up baseURL based on whether this is server-side or client-side
  baseURL: typeof window !== 'undefined' ? `${window.location.origin}` : undefined,
  headers: { 'Content-Type': JSON_MEDIA_TYPE, Accept: JSON_MEDIA_TYPE },
  /* WRISTBAND_TOUCHPOINT - CSRF */
  xsrfCookieName: CSRF_TOKEN_COOKIE_NAME,
  xsrfHeaderName: CSRF_TOKEN_HEADER_NAME,
  withCredentials: true,
  withXSRFToken: true,
});

export default frontendApiClient;

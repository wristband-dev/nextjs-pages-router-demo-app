import type { AppProps } from 'next/app';
import { WristbandAuthProvider } from '@wristband/react-client-auth';

import '@/styles/globals.css';

import { RootLayout } from '@/components';
import { MySessionMetadata } from '@/types';

export default function App({ Component, pageProps }: AppProps) {
  return (
    /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
    <WristbandAuthProvider<MySessionMetadata>
      loginUrl="/api/auth/login"
      sessionUrl="/api/auth/session"
      tokenUrl="/api/auth/token"
    >
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </WristbandAuthProvider>
  );
}

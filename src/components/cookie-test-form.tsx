import React, { useState } from 'react';
import { isAxiosError } from 'axios';
import { redirectToLogin, useWristbandSession } from '@wristband/react-client-auth';

import frontendApiClient from '@/client/frontend-api-client';
import { ResponseBox, TestHelloButton } from '@/components';
import { MySessionData } from '@/types';

export function CookieTestForm() {
  const [isHelloWorldLoading, setIsHelloWorldLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  const { metadata } = useWristbandSession<MySessionData>();
  const { tenantName } = metadata;

  const sayHelloWithCookie = async () => {
    setIsHelloWorldLoading(true);

    try {
      const response = await frontendApiClient.post('/api/v1/hello-with-cookie', { message: 'Hello' });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);

      /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
      if (isAxiosError(error) && [401, 403].includes(error?.response!.status)) {
        redirectToLogin('/api/auth/login', { tenantName });
        window.alert('Authentication required.');
      } else {
        window.alert(`Error: ${error}`);
      }
    } finally {
      setIsHelloWorldLoading(false);
    }
  };

  return (
    <>
      <h2 className="font-bold text-md mb-1">Using Session Cookie From Browser</h2>
      <p className="my-2">
        When the button below is clicked, the browser automatically sends the session cookie in the request to the API
        route. The auth middleware/proxy will protect this API using the SESSION strategy before allowing access.
      </p>
      <TestHelloButton clicked={sayHelloWithCookie} isLoading={isHelloWorldLoading} />
      {message && <ResponseBox message={message} />}
    </>
  );
}

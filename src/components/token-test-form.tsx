import React, { useState } from 'react';
import { useWristbandToken, redirectToLogin, useWristbandSession, WristbandError } from '@wristband/react-client-auth';

import { ResponseBox, TestHelloButton } from '@/components';
import { MySessionData } from '@/types';

export function TokenTestForm() {
  const [isHelloWorldLoading, setIsHelloWorldLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  const { getToken } = useWristbandToken();
  const { metadata } = useWristbandSession<MySessionData>();
  const { tenantName } = metadata;

  const sayHelloWithToken = async () => {
    try {
      setIsHelloWorldLoading(true);
      const token = await getToken();
      const response = await fetch('/api/v1/hello-with-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: 'Hello' }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          redirectToLogin('/api/auth/login', { tenantName });
          window.alert('Authentication required.');
        } else {
          window.alert(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);

      if (error instanceof WristbandError) {
        window.alert('Authentication required.');
        redirectToLogin('/api/auth/login', { tenantName });
      } else {
        window.alert(`Unexpected error: ${error}`);
      }
    } finally {
      setIsHelloWorldLoading(false);
    }
  };

  return (
    <>
      <h2 className="font-bold text-md mb-1">Using Access Tokens From Browser</h2>
      <p className="my-2">
        When the button below is clicked, the getToken() function from the useWristbandToken() React hook will fetch and
        cache the access token. Then, the access token is added to the Authorization header in the request to the API
        route. The auth middleware/proxy will protect this API using the JWT strategy before allowing access.
      </p>
      <TestHelloButton clicked={sayHelloWithToken} isLoading={isHelloWorldLoading} />
      {message && <ResponseBox message={message} />}
    </>
  );
}

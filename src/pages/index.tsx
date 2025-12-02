import { useState } from 'react';
import { useWristbandAuth } from '@wristband/react-client-auth';

import { CookieTestForm, TabSelectorButton, TokenTestForm } from '@/components';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'cookie' | 'token'>('cookie');

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  const { isAuthenticated, isLoading } = useWristbandAuth();

  return (
    <section>
      <div className="mt-8 mb-4 mx-auto">
        <h1 className="text-2xl font-bold underline">Client-side API Route Calls</h1>
        <p className="mt-8 mx-auto">
          This page is protcted by the auth middleware/proxy before rendering. Once the page is rendered, it relies on
          the useWristbandAuth() React hook to perform an auth check before displaying the forms below.
        </p>
      </div>

      <div className="my-8 mx-auto">
        {isLoading && <h2>Loading...</h2>}
        {isAuthenticated && (
          <div className="flex flex-col gap-2 w-full">
            <hr className="my-2" />
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
              <TabSelectorButton
                title="API Route - Session Cookie"
                isActive={activeTab === 'cookie'}
                onClick={() => setActiveTab('cookie')}
              />
              <TabSelectorButton
                title="API Route - Access Token"
                isActive={activeTab === 'token'}
                onClick={() => setActiveTab('token')}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              {activeTab === 'cookie' && <CookieTestForm />}
              {activeTab === 'token' && <TokenTestForm />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

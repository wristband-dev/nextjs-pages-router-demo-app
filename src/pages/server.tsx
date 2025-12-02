import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useWristbandSession } from '@wristband/react-client-auth';

import { MySessionMetadata, Tenant } from '@/types';
import { getSession } from '@/wristband';
import { ResponseBox } from '@/components';

const JSON_MEDIA_TYPE: string = 'application/json;charset=UTF-8';

export default function SettingsPage({ tenant }: { tenant: Tenant }) {
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  const { metadata } = useWristbandSession<MySessionMetadata>();
  const { email } = metadata;

  return (
    <section>
      <div className="mt-8 mb-4 mx-auto">
        <h1 className="text-2xl font-bold underline">Server-Side Rendered Page</h1>
        <p className="mt-8 mx-auto">
          This Server-Side Rendered (SSR) page is <strong>not</strong> protcted by the auth middleware/proxy. For demo
          purposes only, a manual auth check with the getSession() function is performed in getServerSideProps() before
          the page is rendered. Typically, you can rely on the auth middleware/proxy to protect SSR pages.
        </p>
      </div>
      <div className="my-8 mx-auto">
        <ResponseBox title="Current User:" message={email || 'Unauthenticated'} />
      </div>
      <hr className="my-8 border border-pink" />
      <div className="my-8 mx-auto text-left">
        <ResponseBox title="Tenant Information:" message={JSON.stringify(tenant || {}, null, 2)} />
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async function (context: GetServerSidePropsContext) {
  const { req, res } = context;

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  const session = await getSession(req, res);
  const { accessToken, isAuthenticated, tenantId } = session;
  if (!isAuthenticated || !accessToken || !tenantId) {
    return {
      redirect: { destination: '/api/auth/login', permanent: false },
    };
  }

  const tenantResponse = await fetch(`https://${process.env.APPLICATION_VANITY_DOMAIN}/api/v1/tenants/${tenantId}`, {
    method: 'GET',
    headers: { 'Content-Type': JSON_MEDIA_TYPE, Accept: JSON_MEDIA_TYPE, Authorization: `Bearer ${accessToken}` },
    keepalive: true,
  });

  if (tenantResponse.status !== 200) {
    throw new Error(`Get tenant failed. Status: [${tenantResponse.status}], Message: [${tenantResponse.statusText}]`);
  }

  const tenant = await tenantResponse.json();
  return { props: { tenant } };
};

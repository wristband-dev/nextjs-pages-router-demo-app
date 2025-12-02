import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from '@/wristband';

/**
 * Token Endpoint
 *
 * Retrieves an access token and its expiration time to store in Wristband's react-client-auth SDK.
 * Calling Wrisband's React SDK getToken() function calls this endpoint when there is no access token
 * present in the React SDK client-side cache.
 */
export default async function tokenEndpoint(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const session = await getSession(req, res);
  const tokenResponse = session.getTokenResponse();
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.status(200).json(tokenResponse);
}

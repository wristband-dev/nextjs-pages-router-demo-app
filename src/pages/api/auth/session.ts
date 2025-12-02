import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from '@/wristband';

/**
 * Session Endpoint
 *
 * Data loaded upon app mount and stored in Wristband's react-client-auth SDK cache.
 * This API is the entrypoint for the React SPA.
 */
export default async function sessionEndpoint(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const session = await getSession(req, res);
  const sessionResponse = session.getSessionResponse({ email: session.email });
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.status(200).json(sessionResponse);
}

import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession, wristbandAuth } from '@/wristband';

const APP_HOME_URL: string = 'http://localhost:6001';

/**
 * Callback Endpoint
 */
export default async function callbackEndpoint(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  try {
    /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
    // After the user authenticates, exchange the incoming authorization code for JWTs and also retrieve userinfo.
    const callbackResult = await wristbandAuth.pagesRouter.callback(req, res);
    const { callbackData, redirectUrl, type } = callbackResult;

    if (type === 'redirect_required') {
      res.redirect(redirectUrl);
      return;
    }

    // Save all fields into the session
    const session = await getSession(req, res);
    session.fromCallback(callbackData, { email: callbackData.userinfo.email });
    await session.save();

    // Send the user back to the application.
    res.redirect(callbackData.returnUrl || APP_HOME_URL);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).end();
  }
}

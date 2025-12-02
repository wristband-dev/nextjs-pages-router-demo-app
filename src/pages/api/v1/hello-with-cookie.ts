import type { NextApiRequest, NextApiResponse } from 'next';

import { HelloWorldData } from '@/types';

export default async function helloWithCookie(req: NextApiRequest, res: NextApiResponse<HelloWorldData>) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  if (!req.body || typeof req.body.message !== 'string' || !req.body.message.trim()) {
    return res.status(400).json({ message: 'Request body must contain a non-empty "message" field' });
  }

  const currentTime = new Date().toISOString().split('.')[0];
  return res.status(200).json({ message: `You said "${req.body.message}" at ${currentTime}` });
}

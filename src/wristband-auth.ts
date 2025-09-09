import { createWristbandAuth } from '@wristband/nextjs-auth';

export const wristbandAuth = createWristbandAuth({
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
  wristbandApplicationVanityDomain: process.env.APPLICATION_VANITY_DOMAIN!,
  scopes: ['openid', 'offline_access', 'email', 'profile', 'roles'],
});

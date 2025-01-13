'use server';

import { UserId } from '@/types/auth/type';
import { generateSessionToken } from './generateSessionToken';
import { setSessionTokenCookie } from './setSessionTokenCookie';
import { createUserSession } from '@/server/db/auth/createUserSession';

export async function setSession(userId: UserId) {
  const token = generateSessionToken();
  const session = await createUserSession(token, userId);
  await setSessionTokenCookie(token, session.expiresAt);
}

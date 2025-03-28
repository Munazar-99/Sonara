import 'server-only';
import { validateSessionToken } from '@/server/db/auth/validateSessionToken';
import { SessionValidationResult } from '@/types/auth/type';
import { getSessionToken } from './getSessionToken';

export const getCurrentSession = async (): Promise<
  SessionValidationResult['session']
> => {
  const token = await getSessionToken();
  if (!token) {
    return null;
  }
  try {
    const session = await validateSessionToken(token);
    return session;
  } catch (error) {
    console.error('Error validating session token:', error);
    return null;
  }
};

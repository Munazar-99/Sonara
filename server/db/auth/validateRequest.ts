import { getSessionToken } from '@/utils/auth/getSessionToken';
import { validateSessionToken } from './validateSessionToken';

export async function validateRequest() {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }
  return validateSessionToken(sessionToken);
}

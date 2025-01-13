import { getSessionToken } from '@/utils/auth/getSessionToken';
import { validateSessionToken } from './validateSessionToken';
import { SessionValidationResult } from '@/types/auth/type';

export async function validateRequest(): Promise<SessionValidationResult> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }
  return validateSessionToken(sessionToken);
}

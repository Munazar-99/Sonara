import { validateSessionToken } from '@/server/db/auth/validateSessionToken';
import { SessionValidationResult } from '@/types/auth/type';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_session')?.value ?? null;
    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  },
);

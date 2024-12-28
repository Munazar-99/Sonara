'use server';

import { invalidateSession, validateRequest } from '@/auth';
import { deleteSessionTokenCookie } from '@/lib/auth/session';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

export async function logOut(): Promise<{ error: string }> {
  try {
    const { session } = await validateRequest();
    if (!session) {
      throw new Error('User not authenticated');
    }

    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
    redirect('/login');
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error(error);
    return { error: 'An error occurred during sign out process' };
  }
}

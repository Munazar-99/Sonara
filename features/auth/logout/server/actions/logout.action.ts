'use server';

import { invalidateSession } from '@/server/db/auth/invalidateSession';
import { validateRequest } from '@/server/db/auth/validateRequest';
import { deleteSessionTokenCookie } from '@/utils/auth/deleteSessionTokenCookie';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

// TODO: Add routing for when user is not authenticated
export async function logOut(): Promise<{ error?: string; success?: boolean }> {
  try {
    const { session } = await validateRequest();
    if (!session) {
      throw new Error('User not authenticated');
    }

    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
    return { success: true }; // Indicate success
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error(error);
    return { error: 'An error occurred during sign out process' };
  }
}

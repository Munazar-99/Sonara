'use server';

import { invalidateSession } from '@/server/db/auth/invalidateSession';
import { validateRequest } from '@/server/db/auth/validateRequest';
import { deleteSessionTokenCookie } from '@/utils/auth/deleteSessionTokenCookie';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

export async function logOut(): Promise<{ error?: string; success?: boolean }> {
  try {
    const { session } = await validateRequest();

    // If no session exists, redirect immediately
    if (!session) {
      return redirect('/login');
    }

    // Invalidate session and clear session token cookie
    await Promise.all([
      invalidateSession(session.id),
      deleteSessionTokenCookie(),
    ]);

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error('Logout error:', error);
    return { error: 'An error occurred during the sign-out process. Please try again.' };
  }
}

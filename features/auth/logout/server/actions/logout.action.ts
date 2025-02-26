'use server';

import { invalidateSession } from '@/server/db/auth/invalidateSession';
import { validateRequest } from '@/server/db/auth/validateRequest';
import { deleteSessionTokenCookie } from '@/utils/auth/deleteSessionTokenCookie';
import { redirect } from 'next/navigation';

export async function logOut(): Promise<{ error?: string; success?: boolean }> {
  let session;

  try {
    const result = await validateRequest();
    session = result.session;
  } catch (error) {
    console.error('Validation error:', error);
    return { error: 'Failed to validate session. Please try again.' };
  }

  // Redirect immediately if no session exists
  if (!session) {
    redirect('/login');
  }

  try {
    await Promise.all([
      invalidateSession(session.id),
      deleteSessionTokenCookie(),
    ]);

    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      error: 'An error occurred during the sign-out process. Please try again.',
    };
  }
}

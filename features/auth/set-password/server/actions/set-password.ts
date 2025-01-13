'use server';

import { z } from 'zod';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

import { isWithinExpirationDate } from 'oslo';

import { getTokenById } from '../db/getTokenById';
import { deleteUserPasswordResetSessionAndSetNewPassword } from '../db/setPassword';
import { passwordSchema } from '../../utils/zod/schema';
import { createUserSession } from '@/server/db/auth/createUserSession';
import { generateSessionToken } from '@/utils/auth/generateSessionToken';
import { setSessionTokenCookie } from '@/utils/auth/setSessionTokenCookie';
import { hashPassword } from '@/utils/auth/hashPassword';

export async function setPasswordAction(
  token: string,
  formData: z.infer<typeof passwordSchema>,
): Promise<{ error?: string; success?: boolean }> {
  try {
    const { newPassword } = passwordSchema.parse(formData);

    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );

    const tokenRecord = await getTokenById(sessionId);
    if (!tokenRecord || !isWithinExpirationDate(tokenRecord.expiresAt)) {
      throw new Error('Invalid or expired token');
    }
    if (!newPassword) {
      throw new Error('newPassword is required');
    }

    const passwordHash = await hashPassword(newPassword);
    await deleteUserPasswordResetSessionAndSetNewPassword(
      tokenRecord.userId,
      passwordHash,
      tokenRecord.id,
    );

    // Create a new session for the user
    const sessionToken = generateSessionToken();
    const session = await createUserSession(sessionToken, tokenRecord.userId);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      error:
        error instanceof z.ZodError
          ? error.errors[0].message
          : 'An error occurred while resetting the password.',
    };
  }
}

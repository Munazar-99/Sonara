'use server';

import { hashPassword } from '@/lib/auth/util';
import { z } from 'zod';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

import { generateSessionToken, createSession } from '@/auth';
import { isWithinExpirationDate } from 'oslo';

import { setSessionTokenCookie } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

const passwordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export async function resetPassword(
  token: string,
  formData: z.infer<typeof passwordSchema>,
): Promise<{ error?: string; success?: boolean }> {
  try {
    const { newPassword } = passwordSchema.parse(formData);

    const sessionId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(token)),
    );

    const tokenRecord = await prisma.passwordResetSession.findUnique({
      where: { id: sessionId },
    });
    if (!tokenRecord || !isWithinExpirationDate(tokenRecord.expiresAt)) {
      throw new Error('Invalid or expired token');
    }
    if (!newPassword) {
      throw new Error('newPassword is required');
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.$transaction(async tx => {
      await tx.user.update({
        where: { id: tokenRecord.userId },
        data: { passwordHash },
      });
      await tx.passwordResetSession.delete({ where: { id: tokenRecord.id } });
    });
    // Create a new session for the user
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, tokenRecord.userId);
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

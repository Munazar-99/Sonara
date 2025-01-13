import prisma from '@/lib/prisma/prisma';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { PasswordResetSession } from '@prisma/client';

export async function createPasswordResetSession(
  token: string,
  userId: string,
  email: string,
): Promise<PasswordResetSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

  const session = await prisma.passwordResetSession.create({
    data: {
      id: sessionId,
      userId,
      email,
      expiresAt,
    },
  });

  return session;
}

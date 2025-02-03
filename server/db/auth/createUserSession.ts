import { Session } from '.prisma/client';
import prisma from '@/lib/prisma/prisma';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';

export async function createUserSession(
  token: string,
  userId: string,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
}

import { redis } from '@/lib/upstash/upstash';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { Session } from '@prisma/client';

export async function validateSessionToken(
  token: string,
): Promise<Session | null> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const item = await redis.get<{
    id: string;
    user_id: string;
    expires_at: number;
  }>(`session:${sessionId}`);

  if (!item) {
    return null;
  }

  const session: Session = {
    id: item.id,
    userId: item.user_id,
    expiresAt: new Date(item.expires_at * 1000),
  };
  if (Date.now() >= session.expiresAt.getTime()) {
    await redis.del(`session:${sessionId}`);
    await redis.srem(`user_sessions:${session.userId}`, sessionId);
    return null;
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await redis.set(
      `session:${session.id}`,
      JSON.stringify({
        id: session.id,
        user_id: session.userId,
        expires_at: Math.floor(session.expiresAt.getTime() / 1000),
      }),
      {
        exat: Math.floor(session.expiresAt.getTime() / 1000),
      },
    );
  }
  return session;
}

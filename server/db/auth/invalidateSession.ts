import { redis } from '@/lib/upstash/upstash';

export async function invalidateSession(
  sessionId: string,
  userId: string,
): Promise<void> {
  await redis.del(`session:${sessionId}`);
  await redis.srem(`user_sessions:${userId}`, sessionId);
}

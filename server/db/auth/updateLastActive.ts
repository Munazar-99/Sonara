import prisma from '@/lib/prisma/prisma';
import 'server-only';
export async function updateLastActive(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { lastActive: new Date() },
  });
}

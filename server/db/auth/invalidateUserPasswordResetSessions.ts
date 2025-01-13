import prisma from '@/lib/prisma/prisma';

export async function invalidateUserPasswordResetSessions(
  userId: string,
): Promise<void> {
  await prisma.passwordResetSession.deleteMany({
    where: {
      userId: userId,
    },
  });
}

import 'server-only';
import prisma from '@/lib/prisma/prisma';
import { hashPassword } from '@/utils/auth/hashPassword';

export async function updatePassword(
  userId: string,
  newPassword: string,
  oldHash: string,
): Promise<void> {
  const newHash = await hashPassword(newPassword);

  if (newHash === oldHash) {
    throw new Error('New password cannot be the same as the old password');
  }

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newHash },
  });
}

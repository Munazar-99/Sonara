import prisma from '@/lib/prisma/prisma';
import 'server-only';

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

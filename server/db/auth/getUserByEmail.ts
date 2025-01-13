import prisma from '@/lib/prisma/prisma';

export const getUserByEmail = async (email: string) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  });
  return existingUser;
};

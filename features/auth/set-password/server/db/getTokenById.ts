import prisma from '@/lib/prisma/prisma';

export const getTokenById = async (id: string) => {
  const tokenRecord = await prisma.passwordResetSession.findUnique({
    where: { id },
  });
  return tokenRecord;
};

import prisma from '@/lib/prisma/prisma';

export const deleteUserPasswordResetSessionAndSetNewPassword = async (
  userId: string,
  passwordHash: string,
  tokenId: string,
) => {
  await prisma.$transaction(async tx => {
    await tx.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
    await tx.passwordResetSession.delete({ where: { id: tokenId } });
  });
};

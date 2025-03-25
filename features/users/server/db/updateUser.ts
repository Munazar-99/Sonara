import prisma from '@/lib/prisma/prisma';
import { UserStatus, UserRole } from '@prisma/client';

interface UpdateUserParams {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
  billingRate?: number;
  status?: UserStatus;
  apiKey?: string;
}

export async function updateUser({
  id,
  name,
  email,
  role,
  billingRate,
  status,
  apiKey,
}: UpdateUserParams) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
        billingRate,
        status,
        apiKey,
        updatedAt: new Date(),
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false };
  }
}

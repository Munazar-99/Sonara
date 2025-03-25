'use server';

import prisma from '@/lib/prisma/prisma';
import { encrypt } from '../../utils/crypto';
import { AddUserFormValues, addUserSchema } from '../../utils/schema';

export async function createUserAction(formData: AddUserFormValues) {
  const parsedData = addUserSchema.safeParse(formData);
  if (!parsedData.success) {
    return { success: false, message: parsedData.error.message };
  }

  const { email, role, billingRate, apiKey, sendInvite, name } =
    parsedData.data;
  const existingUser = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  });

  if (existingUser) {
    return { success: false, message: 'User already exists' };
  }
  const encryptedApiKey = encrypt(apiKey);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        billingRate,
        apiKey: encryptedApiKey,
        status: 'pending',
      },
    });

    if (sendInvite) {
      // TODO: Send an email with a signup link (e.g., `/complete-signup?token=xyz`)
    }

    return {
      success: true,
      message: 'User created successfully',
      data: newUser,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Error creating user' };
  }
}

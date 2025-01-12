'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { resetPasswordSchema } from '@/lib/zod/schema';
import {
  createPasswordResetSession,
  generateSessionToken,
  invalidateUserPasswordResetSessions,
  sendEmail,
} from '@/auth';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@/lib/db/upstash';
import { headers } from 'next/headers';

// implement upstash rate limiting
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '60s'),
});

export async function sendPasswordResetEmail(
  formData: z.infer<typeof resetPasswordSchema>,
): Promise<{ error?: string; success?: boolean }> {
  try {
    const ip = (await headers()).get('x-forwarded-for');
    const { success: withinLimit } = await rateLimit.limit(ip!);
    if (!withinLimit) {
      return { error: 'Too many requests. Please wait 1 minutes.' };
    }

    // Validate the incoming form data
    const { email } = resetPasswordSchema.parse(formData);

    // Check if the user exists in the database
    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    // Handle invalid user or password
    if (!existingUser) {
      return { error: 'Invalid credentials. Please try again.' };
    }

    // Create a new session for the user
    await invalidateUserPasswordResetSessions(existingUser.id);
    const token = generateSessionToken();
    await createPasswordResetSession(
      token,
      existingUser.id,
      existingUser.email,
    );

    //send password reset email
    const sendReset = await sendEmail(existingUser.email, token);
    if (!sendReset.success) {
      return { error: 'Something went wrong. Please try again.' };
    }

    return { success: true }; // Indicate success
  } catch (error) {
    // Check if the error is a known redirect error
    if (isRedirectError(error)) {
      // Optionally log the error or handle specific logic
      throw error;
    }

    // Handle known Zod validation errors
    if (error instanceof z.ZodError) {
      return { error: 'Invalid input. Please check your email and password.' };
    }

    // Handle unexpected errors
    console.error('Sign-in error: ', error);
    return { error: 'Something went wrong. Please try again.' };
  }
}

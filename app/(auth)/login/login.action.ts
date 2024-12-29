'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/util';
import { setSessionTokenCookie } from '@/lib/auth/session';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signInSchema } from '@/lib/zod/schema';
import { createSession, generateSessionToken } from '@/auth';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@/lib/db/upstash';
import { headers } from 'next/headers';

// implement upstash rate limiting
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60s'),
});

export async function loginAction(
  formData: z.infer<typeof signInSchema>,
): Promise<{ error?: string; success?: boolean }> {
  try {
    const ip = (await headers()).get('x-forwarded-for');
    const { success: MaxLimitReached } = await rateLimit.limit(ip!);
    if (!MaxLimitReached) {
      return { error: 'Too many requests. Please wait 2 minutes.' };
    }

    // Validate the incoming form data
    const { email, password } = signInSchema.parse(formData);

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
    if (!existingUser || !existingUser.passwordHash) {
      return { error: 'Invalid credentials. Please try again.' };
    }

    // Verify the provided password
    const hash = await hashPassword(password);

    // Handle incorrect password
    if (existingUser.passwordHash !== hash) {
      return { error: 'Invalid credentials. Please try again.' };
    }

    // Create a new session for the user
    const token = generateSessionToken();
    const session = await createSession(token, existingUser.id);
    await setSessionTokenCookie(token, session.expiresAt);

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

'use server';

import { z } from 'zod';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@/lib/upstash/upstash';
import { headers } from 'next/headers';
import { signInSchema } from '../../utils/zod/schema';
import { getUserByEmail } from '../../../../../server/db/auth/getUserByEmail';
import { generateSessionToken } from '@/utils/auth/generateSessionToken';
import { setSessionTokenCookie } from '@/utils/auth/setSessionTokenCookie';
import { createUserSession } from '@/server/db/auth/createUserSession';
import { hashPassword } from '@/utils/auth/hashPassword';

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
    const existingUser = await getUserByEmail(email);

    // Handle invalid user or password
    if (!existingUser || !existingUser.passwordHash) {
      return { error: 'Invalid credentials. Please try again.' };
    }

    // Hash the provided password
    const hash = await hashPassword(password);

    // Handle incorrect password
    if (existingUser.passwordHash !== hash) {
      return { error: 'Invalid credentials. Please try again.' };
    }

    // Create a new session for the user
    const token = generateSessionToken();
    const session = await createUserSession(token, existingUser.id);
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

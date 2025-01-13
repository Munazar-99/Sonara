'use server';

import { z } from 'zod';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@/lib/upstash/upstash';
import { headers } from 'next/headers';
import { getUserByEmail } from '@/server/db/auth/getUserByEmail';
import { EmailFormValues } from '../../utils/types/type';
import { createPasswordResetSession } from '@/server/db/auth/createPasswordResetSession';
import { invalidateUserPasswordResetSessions } from '@/server/db/auth/invalidateUserPasswordResetSessions';
import { generateSessionToken } from '@/utils/auth/generateSessionToken';
import { sendResetLinkEmail } from '@/server/email/sendResetLinkEmail';
import { emailSchema } from '../../utils/zod/schema';

// implement upstash rate limiting
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '60s'),
});

export async function requestResetAction(
  formData: EmailFormValues,
): Promise<{ error?: string; success?: boolean }> {
  try {
    const ip = (await headers()).get('x-forwarded-for');
    const { success: withinLimit } = await rateLimit.limit(ip!);
    if (!withinLimit) {
      return { error: 'Too many requests. Please wait 1 minutes.' };
    }

    // Validate the incoming form data
    const { email } = emailSchema.parse(formData);

    // Check if the user exists in the database
    const existingUser = await getUserByEmail(email);

    // Handle invalid user or password
    if (!existingUser) {
      // Delay the response to prevent user enumeration
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
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
    const sendReset = await sendResetLinkEmail(
      existingUser.email,
      token,
      existingUser.firstName,
    );
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

'use server';

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

// Implement Upstash rate limiting
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '60s'),
});

export async function requestResetAction(
  formData: EmailFormValues
): Promise<{ error?: string; success?: boolean }> {
  try {
    const ip = (await headers()).get('x-forwarded-for') ?? 'unknown-ip';
    const { success: withinLimit } = await rateLimit.limit(ip);
    if (!withinLimit) {
      return { error: 'Too many requests. Please wait 1 minute.' };
    }

    // Validate the incoming form data using safeParse to prevent crashes
    const validationResult = emailSchema.safeParse(formData);
    if (!validationResult.success) {
      return { error: 'Invalid input. Please check your email.' };
    }
    const { email } = validationResult.data;

    // Retrieve user from database
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      // Prevent user enumeration by always returning success
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true };
    }

    // Invalidate previous password reset sessions
    await invalidateUserPasswordResetSessions(existingUser.id);

    // Generate and store a new password reset token
    const token = generateSessionToken();
    await createPasswordResetSession(token, existingUser.id, existingUser.email);

    // Send the password reset email
    const sendReset = await sendResetLinkEmail(
      existingUser.email,
      token,
      existingUser.firstName
    );
    if (!sendReset.success) {
      return { error: 'Failed to send reset email. Please try again later.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Password reset request error:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}

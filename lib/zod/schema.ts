import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Invalid Password' }),
});

// reset password schema
export const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

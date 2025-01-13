import { validateRequest } from '@/server/db/auth/validateRequest';
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  return user ?? undefined;
});

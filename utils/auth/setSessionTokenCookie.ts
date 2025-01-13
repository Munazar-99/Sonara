import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '../constants/auth/constants';

export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date,
): Promise<void> {
  const allCookies = await cookies();
  allCookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    path: '/',
  });
}

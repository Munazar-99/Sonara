import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '../constants/auth/constants';

export async function getSessionToken(): Promise<string | undefined> {
  const allCookies = await cookies();
  const sessionCookie = allCookies.get(SESSION_COOKIE_NAME)?.value;
  return sessionCookie;
}

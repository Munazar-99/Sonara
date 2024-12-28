import { NextRequest, NextResponse } from 'next/server';

export const config = { matcher: ['/dashboard'] };

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth_session');

  if (!authCookie?.value) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

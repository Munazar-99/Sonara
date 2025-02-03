import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const config = { matcher: ['/calls', '/dashboard'] };

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === 'GET') {
    const response = NextResponse.next();
    const token = request.cookies.get('auth_session')?.value ?? null;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    } else if (token !== null) {
      // Only extend cookie expiration on GET requests since we can be sure
      // a new session wasn't set when handling the request.
      response.cookies.set('auth_session', token, {
        path: '/',
        maxAge: 60 * 60,
        sameSite: 'lax',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    }
    return response;
  }

  const originHeader = request.headers.get('Origin');
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get('Host');
  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, {
      status: 403,
    });
  }
  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  return NextResponse.next();
}

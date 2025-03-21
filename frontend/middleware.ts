import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware called for path:', request.nextUrl.pathname);

  const basicAuth = request.headers.get('authorization');
  console.log('Auth header present:', !!basicAuth);

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [_, pwd] = atob(authValue).split(':');
    if (pwd === 'kbkb2025') {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// This ensures the middleware runs on all routes
export const config = {
  matcher: '/:path*',
};

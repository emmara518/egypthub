import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/portal',
  '/booking/checkout',
  '/profile',
  '/bookings',
  '/payment',
  '/wallet',
  '/notifications',
  '/favorites',
  '/provider/dashboard',
  '/provider/experiences',
];

const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/portal', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/booking/checkout/:path*',
    '/profile/:path*',
    '/bookings/:path*',
    '/payment/:path*',
    '/wallet/:path*',
    '/notifications/:path*',
    '/favorites/:path*',
    '/provider/:path*',
    '/auth/login',
    '/auth/register',
  ],
};

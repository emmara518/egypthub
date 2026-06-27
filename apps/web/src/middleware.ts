import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/login', '/auth/register'],
};

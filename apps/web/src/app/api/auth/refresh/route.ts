import { NextResponse } from 'next/server';
import { verifyToken, signAccessToken, signRefreshToken } from '@/lib/api/jwt';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }
    const payload = await verifyToken(refreshToken);
    const accessToken = await signAccessToken({ userId: payload.userId, role: payload.role });
    const newRefreshToken = await signRefreshToken({ userId: payload.userId, role: payload.role });

    const response = NextResponse.json({ accessToken });
    response.cookies.set('access_token', accessToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', path: '/', maxAge: 60 * 15,
    });
    response.cookies.set('refresh_token', newRefreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }
}

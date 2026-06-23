import { cookies } from 'next/headers';
import { verifyToken, type TokenPayload } from './jwt';

export async function getAuthUser(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (!token) return null;
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export function requireRole(role: string) {
  return async (request: Request) => {
    const user = await getAuthUser();
    if (!user) return { error: 'Unauthorized', status: 401 };
    if (user.role !== role && user.role !== 'ADMIN') return { error: 'Forbidden', status: 403 };
    return { user };
  };
}

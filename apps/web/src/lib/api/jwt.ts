import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

function getSecret(): Uint8Array {
  const key = process.env.JWT_PUBLIC_KEY || 'dev-public-key';
  return new TextEncoder().encode(key);
}

function getPrivateSecret(): Uint8Array {
  const key = process.env.JWT_PRIVATE_KEY || 'dev-private-key';
  return new TextEncoder().encode(key);
}

export interface TokenPayload extends JWTPayload {
  userId: string;
  role: string;
}

export async function signAccessToken(payload: { userId: string; role: string }): Promise<string> {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(process.env.JWT_ISSUER || 'egypthub')
    .setAudience(process.env.JWT_AUDIENCE || 'egypthub-api')
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '15m')
    .setIssuedAt()
    .sign(getPrivateSecret());
}

export async function signRefreshToken(payload: { userId: string; role: string }): Promise<string> {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(process.env.JWT_ISSUER || 'egypthub')
    .setAudience(process.env.JWT_AUDIENCE || 'egypthub-api')
    .setExpirationTime(process.env.JWT_REFRESH_EXPIRES_IN || '7d')
    .setIssuedAt()
    .sign(getPrivateSecret());
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(), {
    issuer: process.env.JWT_ISSUER || 'egypthub',
    audience: process.env.JWT_AUDIENCE || 'egypthub-api',
  });
  return payload as unknown as TokenPayload;
}

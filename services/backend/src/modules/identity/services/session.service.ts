import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { RedisService } from '../../../infrastructure/redis/redis.service';
import { sha256, generateToken } from '../../../common/utils/crypto.utils';
import { AuthConfigService } from '../../../config';

interface SessionData {
  sessionId: string;
  refreshToken: string;
  familyId: string;
  familyCounter: number;
}

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly authConfig: AuthConfigService,
  ) {}

  async createSession(
    userId: string,
    ipAddress: string,
    userAgent?: string,
    deviceInfo?: string,
  ): Promise<SessionData> {
    const familyId = crypto.randomUUID();
    const rawToken = generateToken(64);
    const tokenHash = sha256(rawToken);

    const session = await this.prisma.session.create({
      data: {
        userId,
        refreshTokenHash: tokenHash,
        familyId,
        familyCounter: 0,
        ipAddress,
        userAgent,
        deviceInfo,
      },
    });

    const refreshExpiryMs = this.parseExpiryToMs(this.authConfig.jwtRefreshExpiry);
    await this.redis.set(
      `session:${session.sessionId}:family`,
      familyId,
      refreshExpiryMs,
    );

    return {
      sessionId: session.sessionId,
      refreshToken: rawToken,
      familyId,
      familyCounter: 0,
    };
  }

  async rotateSession(
    currentRefreshToken: string,
    ipAddress: string,
    userAgent?: string,
  ): Promise<SessionData | null> {
    const tokenHash = sha256(currentRefreshToken);

    const session = await this.prisma.session.findFirst({
      where: { refreshTokenHash: tokenHash, isActive: true, revokedAt: null },
    });

    if (!session) {
      this.logger.warn(`Session rotation attempted with invalid token hash: ${tokenHash.slice(0, 8)}...`);
      return null;
    }

    const storedFamily = await this.redis.get(`session:${session.sessionId}:family`);
    if (storedFamily && storedFamily !== session.familyId) {
      await this.revokeAllUserSessions(session.userId);
      this.logger.warn(`Token reuse detected for user ${session.userId}, all sessions revoked`);
      return null;
    }

    const newRawToken = generateToken(64);
    const newTokenHash = sha256(newRawToken);
    const newFamilyId = crypto.randomUUID();
    const newCounter = session.familyCounter + 1;

    await this.prisma.session.update({
      where: { sessionId: session.sessionId },
      data: {
        refreshTokenHash: newTokenHash,
        familyId: newFamilyId,
        familyCounter: newCounter,
        ipAddress,
        userAgent,
        lastUsedAt: new Date(),
      },
    });

    const refreshExpiryMs = this.parseExpiryToMs(this.authConfig.jwtRefreshExpiry);
    await this.redis.set(
      `session:${session.sessionId}:family`,
      newFamilyId,
      refreshExpiryMs,
    );

    return {
      sessionId: session.sessionId,
      refreshToken: newRawToken,
      familyId: newFamilyId,
      familyCounter: newCounter,
    };
  }

  async revokeSession(refreshToken: string): Promise<boolean> {
    const tokenHash = sha256(refreshToken);
    const result = await this.prisma.session.updateMany({
      where: { refreshTokenHash: tokenHash, isActive: true },
      data: { isActive: false, revokedAt: new Date() },
    });

    if (result.count > 0) {
      const session = await this.prisma.session.findFirst({
        where: { refreshTokenHash: tokenHash },
      });
      if (session) {
        await this.redis.del(`session:${session.sessionId}:family`);
      }
      return true;
    }
    return false;
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    const sessions = await this.prisma.session.findMany({
      where: { userId, isActive: true },
    });

    await this.prisma.session.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false, revokedAt: new Date() },
    });

    const pipeline = this.redis.getClient().pipeline();
    for (const session of sessions) {
      pipeline.del(`session:${session.sessionId}:family`);
    }
    await pipeline.exec();
  }

  async getUserActiveSessions(userId: string): Promise<number> {
    return this.prisma.session.count({
      where: { userId, isActive: true, revokedAt: null },
    });
  }

  async getUserSessions(userId: string) {
    return this.prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  private parseExpiryToMs(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 7 * 24 * 60 * 60 * 1000; // default 7d
    const value = parseInt(match[1], 10);
    switch (match[2]) {
      case 's': return value * 1000;
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: return 7 * 24 * 60 * 60 * 1000;
    }
  }
}

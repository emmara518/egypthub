# EgyptHub — Security Architecture

> **Version:** 1.0
> **Status:** Approved
> **Date:** June 2026

---

## Table of Contents

1. [Security Principles](#1-security-principles)
2. [Authentication](#2-authentication)
3. [Authorization (RBAC)](#3-authorization-rbac)
4. [JWT Strategy](#4-jwt-strategy)
5. [Session Management](#5-session-management)
6. [Multi-Factor Authentication](#6-multi-factor-authentication)
7. [Password Policy](#7-password-policy)
8. [API Key Management](#8-api-key-management)
9. [Encryption Strategy](#9-encryption-strategy)
10. [Data Protection](#10-data-protection)
11. [Audit Logging](#11-audit-logging)
12. [Fraud Prevention](#12-fraud-prevention)
13. [Input Security](#13-input-security)
14. [CORS, CSP, Headers](#14-cors-csp-headers)
15. [Webhook Security](#15-webhook-security)
16. [Third-Party Integrations](#16-third-party-integrations)
17. [Incident Response](#17-incident-response)

---

## 1. Security Principles

1. **Defense in depth** — Multiple layers of security controls at every tier
2. **Least privilege** — Every user/process gets minimum permissions needed
3. **Secure by default** — Opt-in to relaxed security, not opt-out
4. **Fail securely** — Errors default to denial, not information leakage
5. **Never trust, always verify** — Zero-trust architecture for internal services
6. **Encrypt everything** — Data at rest, in transit, in processing
7. **Assume breach** — Design for containment and detection
8. **Audit everything** — Every access and mutation is logged
9. **Separation of duties** — No single role can complete a sensitive flow alone
10. **Privacy by design** — PII minimization, data lifecycle management

---

## 2. Authentication

### 2.1 Authentication Methods

| Method | Use Case | Security Level |
|---|---|---|
| JWT (access + refresh tokens) | Web/mobile app users | High |
| OAuth 2.0 (Google, Apple) | Social login | High |
| API Key + Secret | Partner integrations | High |
| Session cookie (Next.js) | Server-side rendering | Medium |
| MFA (TOTP, SMS) | High-value operations | Very High |
| Webhook HMAC | Payment webhooks | High |

### 2.2 Authentication Flow

```
Registration:
──────────────
Client                    Server
  │                         │
  │  POST /v1/auth/register │
  │  { email, password,     │
  │    name, locale }       │
  │────────────────────────►│
  │                         ├── Validate input
  │                         ├── Hash password (bcrypt, 12 rounds)
  │                         ├── Create user record
  │                         ├── Assign default role (traveler)
  │                         ├── Create session
  │                         ├── Emit user.registered event
  │                         └── Generate tokens
  │◄────────────────────────│
  │ { accessToken,           │
  │   refreshToken,          │
  │   user }                 │
  │                         │

Login:
──────
Client                    Server
  │                         │
  │  POST /v1/auth/login    │
  │  { email, password }    │
  │────────────────────────►│
  │                         ├── Validate credentials
  │                         ├── Verify password (bcrypt compare)
  │                         ├── Check MFA requirement
  │                         ├── Create session
  │                         ├── Emit user.login event
  │                         └── Generate tokens
  │◄────────────────────────│
  │ { accessToken,           │
  │   refreshToken,          │
  │   user,                  │
  │   mfaRequired: false }   │
  │                         │

Token Refresh:
──────────────
Client                    Server
  │                         │
  │  POST /v1/auth/refresh  │
  │  { refreshToken }       │
  │────────────────────────►│
  │                         ├── Validate refresh token
  │                         ├── Check rotation (old token invalidated)
  │                         ├── Verify session still valid
  │                         └── Generate new token pair
  │◄────────────────────────│
  │ { accessToken,           │
  │   refreshToken }         │
```

### 2.3 Authentication Service

```typescript
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly mfaService: MfaService,
    private readonly eventBus: EventBusService,
    private readonly logger: PinoLogger,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResult> {
    // Check for existing user
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already registered');

    // Hash password
    const passwordHash = await this.passwordService.hash(dto.password);

    // Create user
    const user = await this.userRepository.create({
      email: dto.email,
      passwordHash,
      name: dto.name,
      locale: dto.locale || 'ar-SA',
      role: UserRole.TRAVELER,
    });

    // Create session
    const session = await this.sessionService.create(user.id);

    // Generate tokens
    const tokens = await this.tokenService.generateTokenPair(user, session.id);

    // Emit event
    await this.eventBus.emit(new UserRegisteredEvent(user.id, {
      userId: user.id,
      email: user.email,
      name: user.name,
      locale: user.locale,
    }));

    this.logger.info({ userId: user.id }, 'User registered');

    return { user, ...tokens, mfaRequired: false };
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    // Find user
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Verify password
    const valid = await this.passwordService.verify(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account temporarily locked');
    }

    // Check MFA
    if (user.mfaEnabled) {
      if (!dto.mfaCode) {
        return { mfaRequired: true, mfaSessionId: generateId() };
      }
      const mfaValid = await this.mfaService.verify(user.id, dto.mfaCode);
      if (!mfaValid) throw new UnauthorizedException('Invalid MFA code');
    }

    // Reset failed attempts
    await this.userRepository.resetFailedAttempts(user.id);

    // Create session
    const session = await this.sessionService.create(user.id);

    // Generate tokens
    const tokens = await this.tokenService.generateTokenPair(user, session.id);

    // Emit event
    await this.eventBus.emit(new UserLoggedInEvent(user.id, {
      userId: user.id,
      method: 'password',
    }));

    this.logger.info({ userId: user.id }, 'User logged in');

    return { user, ...tokens, mfaRequired: false };
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    // Verify refresh token
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);

    // Validate session still active
    const session = await this.sessionService.validate(payload.sessionId);
    if (!session) throw new UnauthorizedException('Session expired');

    // Rotate refresh token (invalidates old one)
    const tokens = await this.tokenService.rotateRefreshToken(refreshToken, payload.userId, payload.sessionId);
    return tokens;
  }

  async logout(userId: string, sessionId: string): Promise<void> {
    await this.sessionService.invalidate(sessionId);
    await this.tokenService.invalidateRefreshTokens(sessionId);
    this.logger.info({ userId, sessionId }, 'User logged out');
  }
}
```

---

## 3. Authorization (RBAC)

### 3.1 Role Hierarchy

```
                     ┌─────────────┐
                     │ Super Admin  │
                     └──────┬──────┘
                            │
                     ┌──────┴──────┐
                     │ Content Admin│
                     └──────┬──────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────┴─────┐ ┌────┴────┐ ┌──────┴──────┐
        │  Partner   │ │ Finance │ │  Ambassador  │
        └─────┬─────┘ └─────────┘ └──────┬───────┘
              │                          │
              └────────────┬─────────────┘
                           │
                    ┌──────┴──────┐
                    │  Traveler   │
                    └─────────────┘
```

### 3.2 Role Definitions

| Role | Description | Assignment |
|---|---|---|
| `SUPER_ADMIN` | Full system access | Manual (founder/CTO) |
| `CONTENT_ADMIN` | Catalog management, content moderation | Super Admin |
| `FINANCE` | Payment operations, refunds, invoices | Super Admin |
| `PARTNER` | Experience provider, own content management | Admin approval + verification |
| `AMBASSADOR` | Referral program, own dashboard | Approved application |
| `TRAVELER` | Browse, book, review (default role) | Self-registration |

### 3.3 Permission Matrix

```
Resource             TRAVELER  PARTNER  AMBASSADOR  CONTENT_ADMIN  FINANCE  SUPER_ADMIN
────────────────────────────────────────────────────────────────────────────────────────
destinations         read      read     read         read,write     read     read,write
experiences          read      r,w(own) read         read,write     read     read,write
experience.publish   —         —        —            write          —        write
bookings             r,w(own)  r(own)   —            read           read     read,write
payments             r(own)    r(own)   —            —              r,w      read,write
refunds              —         —        —            —              write    write
reviews              r,w       r        r            r,moderate     r        read,write
ambassadors          apply     —        r,w          —              —        r,approve
offers               read      read     read         read,write     read     read,write
partners             read      r,w      —            read,write     read     read,write
users                r,w(own)  r(own)   r(own)       read           read     read,write
wallet               r,w(own)  —        r,w(own)     —              r,w      read
notifications        r(own)    r(own)   r(own)       read           read     read
ai-conversations     r,w       —        —            —              —        read
trip-plans           r,w       —        —            —              —        read
analytics            —         r(own)   r(own)       r              r        read
audit-logs           —         —        —            —              —        read
invoice.manage       —         —        —            —              write    write
roles                —         —        —            —              —        write
system.config        —         —        —            —              —        write
```

### 3.4 Guard Implementation

```typescript
// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: TUser, info: any, context: ExecutionContext): TUser {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token expired', 'AUTH_TOKEN_EXPIRED');
    }
    if (err || !user) {
      throw new UnauthorizedException('Invalid token', 'AUTH_TOKEN_INVALID');
    }
    return user;
  }
}

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  private readonly roleHierarchy: Record<UserRole, number> = {
    [UserRole.TRAVELER]: 0,
    [UserRole.AMBASSADOR]: 1,
    [UserRole.PARTNER]: 2,
    [UserRole.FINANCE]: 3,
    [UserRole.CONTENT_ADMIN]: 4,
    [UserRole.SUPER_ADMIN]: 5,
  };

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const userLevel = this.roleHierarchy[user.role];
    const requiredLevel = Math.min(...requiredRoles.map((r) => this.roleHierarchy[r]));
    return userLevel >= requiredLevel;
  }
}

// ownership.guard.ts
@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly resourceService: ResourceService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.id;

    if (!resourceId) return true; // No resource ID = no ownership check needed

    const owner = await this.resourceService.getOwner(request.routeInfo.path, resourceId);
    if (!owner) return true; // Public resource

    // Admin overrides ownership
    if (user.role === UserRole.SUPER_ADMIN || user.role === UserRole.CONTENT_ADMIN) {
      return true;
    }

    return owner.userId === user.id || owner.partnerId === user.partnerId;
  }
}
```

### 3.5 Decorator Usage

```typescript
@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  @Get()
  @Roles(UserRole.TRAVELER)
  async findMyBookings(@CurrentUser() user: UserDto, @Query() query: PaginationDto) {
    return this.bookingService.findByUser(user.id, query);
  }

  @Get(':id')
  @Roles(UserRole.TRAVELER)
  @UseGuards(OwnershipGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingService.findById(id);
  }

  @Post()
  @Roles(UserRole.TRAVELER)
  async create(@Body(ValidationPipe) dto: CreateBookingDto, @CurrentUser() user: UserDto) {
    return this.bookingService.create(dto, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.TRAVELER)
  @UseGuards(OwnershipGuard)
  async cancel(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: UserDto) {
    return this.bookingService.cancel(id, user.id);
  }

  @Post(':id/force-cancel')
  @Roles(UserRole.CONTENT_ADMIN, UserRole.SUPER_ADMIN)
  async forceCancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingService.adminCancel(id);
  }
}
```

---

## 4. JWT Strategy

### 4.1 Token Structure

```typescript
// Access Token (short-lived)
interface AccessTokenPayload {
  sub: string;           // User ID
  sessionId: string;     // Session ID
  role: UserRole;        // User role
  locale: string;        // User locale
  type: 'access';
  iat: number;           // Issued at
  exp: number;           // Expiration (15 minutes)
}

// Refresh Token (long-lived, rotation-based)
interface RefreshTokenPayload {
  sub: string;                // User ID
  sessionId: string;          // Session ID
  tokenFamily: string;        // Token family (for rotation)
  type: 'refresh';
  iat: number;
  exp: number;                // Expiration (7 days)
}
```

### 4.2 Token Configuration

```typescript
// auth.config.ts
export default registerAs('auth', () => ({
  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: '15m',
      algorithm: 'RS256',
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: '7d',
      algorithm: 'RS256',
    },
    issuer: 'egypthub-api',
    audience: 'egypthub-client',
  },
  mfa: {
    totpIssuer: 'EgyptHub',
    totpDigits: 6,
    totpPeriod: 30,
    smsCodeLength: 6,
    smsCodeExpiry: 300, // 5 minutes
  },
  password: {
    bcryptRounds: 12,
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    specialChars: true,
    maxAge: 90, // days — force password change
    historySize: 5, // prevent reuse
  },
  session: {
    maxSessionsPerUser: 5,
    idleTimeout: 30 * 60, // 30 minutes
    absoluteTimeout: 24 * 60 * 60, // 24 hours
  },
  rateLimit: {
    login: { max: 5, window: 300 },     // 5 attempts per 5 min
    register: { max: 3, window: 3600 },  // 3 per hour
    mfa: { max: 3, window: 300 },        // 3 attempts per 5 min
    passwordReset: { max: 2, window: 3600 }, // 2 per hour
    apiKey: { max: 1, window: 24 * 3600 },  // 1 key generation per day
  },
}));
```

### 4.3 Token Service

```typescript
@Injectable()
export class TokenService {
  constructor(
    @InjectConfig() private readonly config: AuthConfig,
    private readonly redis: RedisService,
    private readonly logger: PinoLogger,
  ) {}

  async generateTokenPair(user: User, sessionId: string): Promise<TokenPair> {
    const tokenFamily = generateId();

    const accessToken = await this.signAccessToken({
      sub: user.id,
      sessionId,
      role: user.role,
      locale: user.locale,
    });

    const refreshToken = await this.signRefreshToken({
      sub: user.id,
      sessionId,
      tokenFamily,
    });

    // Store refresh token family in Redis for rotation validation
    await this.redis.set(
      `refresh:${user.id}:${tokenFamily}`,
      'valid',
      'EX',
      7 * 24 * 60 * 60, // 7 days
    );

    return { accessToken, refreshToken, expiresIn: 900 }; // 15 min
  }

  async rotateRefreshToken(
    oldRefreshToken: string,
    userId: string,
    sessionId: string,
  ): Promise<TokenPair> {
    const payload = await this.verifyRefreshToken(oldRefreshToken);

    // Check if this token family was already rotated (reuse detection)
    const familyStatus = await this.redis.get(`refresh:${userId}:${payload.tokenFamily}`);
    if (!familyStatus) {
      // Token family was already rotated — possible token theft
      this.logger.warn({
        userId,
        tokenFamily: payload.tokenFamily,
      }, 'Refresh token reuse detected — possible token theft');
      await this.sessionService.invalidateAll(userId);
      throw new UnauthorizedException('Token compromised — all sessions invalidated');
    }

    // Invalidate old family
    await this.redis.del(`refresh:${userId}:${payload.tokenFamily}`);

    // Generate new pair
    return this.generateTokenPair({ id: userId } as User, sessionId);
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      return jwt.verify(token, this.config.jwt.accessToken.secret, {
        algorithms: ['RS256'],
        issuer: this.config.jwt.issuer,
        audience: this.config.jwt.audience,
      }) as AccessTokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedException('Token expired', 'AUTH_TOKEN_EXPIRED');
      }
      throw new UnauthorizedException('Invalid token', 'AUTH_TOKEN_INVALID');
    }
  }

  async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      return jwt.verify(token, this.config.jwt.refreshToken.secret, {
        algorithms: ['RS256'],
        issuer: this.config.jwt.issuer,
        audience: this.config.jwt.audience,
      }) as RefreshTokenPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidateRefreshTokens(sessionId: string): Promise<void> {
    // Delete all refresh token families for this session
    const keys = await this.redis.keys(`refresh:*:${sessionId}`);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }

  private async signAccessToken(payload: Omit<AccessTokenPayload, 'iat' | 'exp' | 'type'>): Promise<string> {
    return jwt.sign(
      { ...payload, type: 'access' },
      this.config.jwt.accessToken.secret,
      {
        algorithm: 'RS256',
        expiresIn: this.config.jwt.accessToken.expiresIn,
        issuer: this.config.jwt.issuer,
        audience: this.config.jwt.audience,
      },
    );
  }

  private async signRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp' | 'type'>): Promise<string> {
    return jwt.sign(
      { ...payload, type: 'refresh' },
      this.config.jwt.refreshToken.secret,
      {
        algorithm: 'RS256',
        expiresIn: this.config.jwt.refreshToken.expiresIn,
        issuer: this.config.jwt.issuer,
        audience: this.config.jwt.audience,
      },
    );
  }
}
```

---

## 5. Session Management

### 5.1 Session Model

```sql
CREATE TABLE identity.sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES identity.users(id) ON DELETE CASCADE,
    refresh_token_hash TEXT NOT NULL,
    ip_address      INET NOT NULL,
    user_agent      TEXT,
    device_info     JSONB,
    geo_location    JSONB,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    last_activity   TIMESTAMPTZ NOT NULL DEFAULT now(),
    expired_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sessions_user_active ON identity.sessions(user_id, is_active) WHERE is_active = true;
CREATE INDEX idx_sessions_expired ON identity.sessions(expired_at) WHERE expired_at < now();

-- Session limit enforcement trigger
CREATE FUNCTION identity.enforce_session_limit()
RETURNS TRIGGER AS $$
DECLARE
    max_sessions INT := 5; -- configurable
    session_count INT;
BEGIN
    SELECT COUNT(*) INTO session_count
    FROM identity.sessions
    WHERE user_id = NEW.user_id AND is_active = true;

    IF session_count >= max_sessions THEN
        -- Deactivate oldest session
        UPDATE identity.sessions
        SET is_active = false
        WHERE id = (
            SELECT id FROM identity.sessions
            WHERE user_id = NEW.user_id AND is_active = true
            ORDER BY last_activity ASC
            LIMIT 1
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_session_limit
    BEFORE INSERT ON identity.sessions
    FOR EACH ROW
    EXECUTE FUNCTION identity.enforce_session_limit();
```

### 5.2 Session Service

```typescript
@Injectable()
export class SessionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly config: AuthConfig,
    private readonly logger: PinoLogger,
  ) {}

  async create(userId: string, metadata?: SessionMetadata): Promise<Session> {
    const session = await this.prisma.session.create({
      data: {
        userId,
        ipAddress: metadata?.ipAddress || '0.0.0.0',
        userAgent: metadata?.userAgent,
        deviceInfo: metadata?.deviceInfo || {},
        geoLocation: metadata?.geoLocation || {},
        expiredAt: new Date(Date.now() + this.config.session.absoluteTimeout * 1000),
      },
    });

    // Cache session in Redis for fast validation
    await this.redis.set(
      `session:${session.id}`,
      JSON.stringify({ userId, active: true }),
      'EX',
      this.config.session.absoluteTimeout,
    );

    return session;
  }

  async validate(sessionId: string): Promise<Session | null> {
    // Check Redis first
    const cached = await this.redis.get(`session:${sessionId}`);
    if (!cached) {
      // Fall back to DB
      const session = await this.prisma.session.findUnique({ where: { id: sessionId } });
      if (!session || !session.isActive || session.expiredAt < new Date()) return null;

      // Re-cache
      await this.redis.set(
        `session:${sessionId}`,
        JSON.stringify({ userId: session.userId, active: true }),
        'EX',
        Math.floor((session.expiredAt.getTime() - Date.now()) / 1000),
      );

      return session;
    }

    const data = JSON.parse(cached);
    if (!data.active) return null;

    // Update last activity (async, non-blocking)
    this.touchSession(sessionId);

    return { id: sessionId, userId: data.userId } as Session;
  }

  async invalidate(sessionId: string): Promise<void> {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: { isActive: false },
    });
    await this.redis.del(`session:${sessionId}`);
  }

  async invalidateAll(userId: string): Promise<void> {
    const sessions = await this.prisma.session.findMany({
      where: { userId, isActive: true },
      select: { id: true },
    });

    await this.prisma.session.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    // Clear all Redis session keys
    const keys = sessions.map((s) => `session:${s.id}`);
    if (keys.length > 0) await this.redis.del(...keys);

    this.logger.warn({ userId, sessionCount: sessions.length }, 'All sessions invalidated');
  }

  private async touchSession(sessionId: string): Promise<void> {
    try {
      await this.prisma.session.update({
        where: { id: sessionId },
        data: { lastActivity: new Date() },
      });
    } catch {
      // Non-critical, ignore
    }
  }
}
```

---

## 6. Multi-Factor Authentication

### 6.1 MFA Methods

| Method | Security | UX | Implementation |
|---|---|---|---|
| TOTP (Authenticator App) | Very High | Medium | speakeasy library |
| SMS Code | High | High | Twilio/Amazon SNS |
| Backup Codes | High | Low | Pre-generated, one-time use |
| Push Notification | Very High | High | (Future) |

### 6.2 MFA Service

```typescript
@Injectable()
export class MfaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly smsService: SmsService,
    private readonly redis: RedisService,
    private readonly config: AuthConfig,
  ) {}

  async setupTotp(userId: string): Promise<{ secret: string; qrCodeUrl: string; backupCodes: string[] }> {
    const secret = speakeasy.generateSecret({
      name: `${this.config.mfa.totpIssuer}:${userId}`,
    });

    // Store encrypted secret
    await this.prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: encrypt(secret.base32), mfaMethod: 'totp' },
    });

    // Generate backup codes
    const backupCodes = Array.from({ length: 8 }, () => generateCryptoCode(10));
    await this.storeBackupCodes(userId, backupCodes);

    return { secret: secret.base32, qrCodeUrl: secret.otpauth_url!, backupCodes };
  }

  async verifyTotp(userId: string, token: string): Promise<boolean> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (!user.mfaSecret) return false;

    return speakeasy.totp.verify({
      secret: decrypt(user.mfaSecret),
      encoding: 'base32',
      token,
      window: 1, // Allow 1 step skew
    });
  }

  async sendSmsCode(userId: string, phoneNumber: string): Promise<void> {
    const code = generateNumericCode(this.config.mfa.smsCodeLength);

    // Store code in Redis with expiry
    await this.redis.set(
      `mfa:sms:${userId}`,
      code,
      'EX',
      this.config.mfa.smsCodeExpiry,
    );

    // Send via SMS provider
    await this.smsService.send(phoneNumber, `Your EgyptHub verification code is: ${code}`);
  }

  async verifySmsCode(userId: string, code: string): Promise<boolean> {
    const stored = await this.redis.get(`mfa:sms:${userId}`);
    if (!stored || stored !== code) return false;

    await this.redis.del(`mfa:sms:${userId}`);
    return true;
  }

  async verifyBackupCode(userId: string, code: string): Promise<boolean> {
    const backupCodes = await this.getBackupCodes(userId);
    const index = backupCodes.findIndex((bc) => bc.code === code && !bc.used);

    if (index === -1) return false;

    // Mark as used
    await this.markBackupCodeUsed(userId, index);
    return true;
  }

  async verify(userId: string, code: string, method?: string): Promise<boolean> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const mfaMethod = method || user.mfaMethod;

    switch (mfaMethod) {
      case 'totp': return this.verifyTotp(userId, code);
      case 'sms': return this.verifySmsCode(userId, code);
      case 'backup': return this.verifyBackupCode(userId, code);
      default: return false;
    }
  }

  private async storeBackupCodes(userId: string, codes: string[]): Promise<void> {
    const hashed = codes.map((c) => hashSHA256(c));
    await this.redis.set(
      `mfa:backup:${userId}`,
      JSON.stringify(hashed.map((h) => ({ code: h, used: false }))),
      'EX',
      365 * 24 * 60 * 60, // 1 year
    );
  }

  private async getBackupCodes(userId: string): Promise<{ code: string; used: boolean }[]> {
    const data = await this.redis.get(`mfa:backup:${userId}`);
    return data ? JSON.parse(data) : [];
  }

  private async markBackupCodeUsed(userId: string, index: number): Promise<void> {
    const codes = await this.getBackupCodes(userId);
    if (codes[index]) {
      codes[index].used = true;
      await this.redis.set(`mfa:backup:${userId}`, JSON.stringify(codes));
    }
  }
}
```

---

## 7. Password Policy

### 7.1 Password Requirements

| Rule | Value |
|---|---|
| Minimum length | 8 characters |
| Maximum length | 128 characters |
| Uppercase letter | At least 1 |
| Lowercase letter | At least 1 |
| Digit | At least 1 |
| Special character | At least 1 |
| Max password age | 90 days |
| Password history | 5 most recent passwords blocked |
| Similarity to previous | Levenshtein distance > 5 |
| Common password check | Against HaveIBeenPwned API / known list |
| Max failed attempts | 5 before temporary lockout (15 min) |
| Account lockout duration | 15 minutes (increases with repeated lockouts) |

### 7.2 Password Service

```typescript
@Injectable()
export class PasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly config: AuthConfig,
    private readonly logger: PinoLogger,
  ) {}

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.config.password.bcryptRounds);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async validateStrength(password: string, userId?: string): Promise<PasswordValidationResult> {
    const errors: string[] = [];

    if (password.length < this.config.password.minLength) {
      errors.push(`Password must be at least ${this.config.password.minLength} characters`);
    }
    if (password.length > 128) {
      errors.push('Password must not exceed 128 characters');
    }
    if (this.config.password.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (this.config.password.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (this.config.password.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (this.config.password.specialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    // Check against password history
    if (userId) {
      const isReused = await this.checkPasswordHistory(userId, password);
      if (isReused) {
        errors.push('Password has been used recently');
        return { valid: false, errors };
      }
    }

    // Check against common passwords (async, non-blocking)
    const isCommon = await this.checkCommonPassword(password);
    if (isCommon) {
      errors.push('Password is too common');
      return { valid: false, errors };
    }

    return { valid: true, errors: [] };
  }

  async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });

    // Verify old password
    const valid = await this.verify(oldPassword, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Current password is incorrect');

    // Validate new password
    const validation = await this.validateStrength(newPassword, userId);
    if (!validation.valid) {
      throw new UnprocessableEntityException(validation.errors.join('; '));
    }

    // Hash and save
    const newHash = await this.hash(newPassword);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newHash,
        passwordChangedAt: new Date(),
      },
    });

    // Store in password history (keep last 5)
    await this.addPasswordHistory(userId, newHash);

    // Invalidate all sessions except current
    // (handled by calling service)

    this.logger.info({ userId }, 'Password changed');
  }

  private async checkPasswordHistory(userId: string, password: string): Promise<boolean> {
    const history = await this.prisma.passwordHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: this.config.password.historySize,
    });

    for (const entry of history) {
      if (await this.verify(password, entry.passwordHash)) return true;
    }
    return false;
  }

  private async addPasswordHistory(userId: string, hash: string): Promise<void> {
    await this.prisma.passwordHistory.create({
      data: { userId, passwordHash: hash },
    });

    // Keep only last N entries
    const count = await this.prisma.passwordHistory.count({ where: { userId } });
    if (count > this.config.password.historySize) {
      const oldest = await this.prisma.passwordHistory.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        take: count - this.config.password.historySize,
        select: { id: true },
      });
      await this.prisma.passwordHistory.deleteMany({
        where: { id: { in: oldest.map((o) => o.id) } },
      });
    }
  }

  private async checkCommonPassword(password: string): Promise<boolean> {
    // Check against Redis set of common passwords
    const isCommon = await this.redis.sIsMember('common_passwords', password.toLowerCase());
    return isCommon;
  }
}
```

### 7.3 Account Lockout

```typescript
@Injectable()
export class AccountLockoutService {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
    private readonly config: AuthConfig,
    private readonly logger: PinoLogger,
  ) {}

  async recordFailedAttempt(email: string): Promise<void> {
    const key = `login:attempts:${email}`;
    const attempts = await this.redis.incr(key);

    // Set TTL on first attempt
    if (attempts === 1) {
      await this.redis.expire(key, this.config.rateLimit.login.window);
    }

    // Lock account if threshold exceeded
    if (attempts >= this.config.rateLimit.login.max) {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (user) {
        const lockoutMinutes = this.calculateLockoutDuration(attempts);
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: attempts,
            lockedUntil: new Date(Date.now() + lockoutMinutes * 60 * 1000),
          },
        });
        this.logger.warn({ userId: user.id, attempts, lockoutMinutes }, 'Account locked due to failed attempts');
      }
    }
  }

  async resetFailedAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });
  }

  private calculateLockoutDuration(attempts: number): number {
    // Progressive lockout: 15min, 30min, 1hr, 2hr, 4hr, 8hr, 24hr
    const durations = [15, 30, 60, 120, 240, 480, 1440];
    const index = Math.min(Math.floor((attempts - 1) / 5), durations.length - 1);
    return durations[index];
  }
}
```

---

## 8. API Key Management

### 8.1 API Key Model

```sql
CREATE TABLE identity.api_keys (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES identity.users(id) ON DELETE CASCADE,
    name            TEXT NOT NULL, -- Human-readable label
    key_prefix      TEXT NOT NULL, -- First 8 chars of key (for identification)
    key_hash        TEXT NOT NULL, -- SHA-256 hash of full key
    permissions     JSONB NOT NULL DEFAULT '[]', -- Scoped permissions
    allowed_ips     INET[] DEFAULT '{}', -- IP whitelist (empty = any)
    rate_limit_multiplier REAL DEFAULT 1.0, -- Custom rate limit
    is_active       BOOLEAN NOT NULL DEFAULT true,
    last_used_at    TIMESTAMPTZ,
    expires_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_api_keys_user ON identity.api_keys(user_id);
CREATE INDEX idx_api_keys_prefix ON identity.api_keys(key_prefix);
```

### 8.2 API Key Format

```
egh_xxxxxxxx_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
│    │          │
│    │          └── 32-char random secret
│    └────────────── 8-char prefix (identifies the key)
└─────────────────── 4-char prefix (identifies EgyptHub)
```

### 8.3 API Key Service

```typescript
@Injectable()
export class ApiKeyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly logger: PinoLogger,
  ) {}

  async generate(userId: string, name: string, permissions: string[], allowedIps?: string[]): Promise<{ key: string; keyId: string }> {
    // Rate limit: max 1 API key per user per day
    const recentCount = await this.prisma.apiKey.count({
      where: {
        userId,
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });
    if (recentCount >= 1) {
      throw new TooManyRequestsException('API key generation rate limit exceeded');
    }

    const keyPrefix = generateCryptoString(8);
    const keySecret = generateCryptoString(32);
    const fullKey = `egh_${keyPrefix}_${keySecret}`;

    const apiKey = await this.prisma.apiKey.create({
      data: {
        userId,
        name,
        keyPrefix,
        keyHash: hashSHA256(fullKey),
        permissions,
        allowedIps: allowedIps || [],
      },
    });

    this.logger.info({ userId, keyId: apiKey.id, name }, 'API key generated');

    // Return full key only once (cannot be retrieved again)
    return { key: fullKey, keyId: apiKey.id };
  }

  async validate(key: string, ipAddress?: string): Promise<ApiKeyValidationResult | null> {
    // Extract prefix
    const parts = key.split('_');
    if (parts.length !== 3 || parts[0] !== 'egh') return null;

    const keyPrefix = parts[1];

    // Find by prefix (fast lookup)
    const apiKey = await this.prisma.apiKey.findFirst({
      where: { keyPrefix, isActive: true },
      include: { user: { select: { id: true, role: true, isActive: true } } },
    });

    if (!apiKey) return null;
    if (!apiKey.user.isActive) return null;
    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) return null;

    // Verify full key hash
    if (apiKey.keyHash !== hashSHA256(key)) return null;

    // Check IP whitelist
    if (apiKey.allowedIps.length > 0 && ipAddress) {
      if (!apiKey.allowedIps.includes(ipAddress)) return null;
    }

    // Update last used
    await this.prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { lastUsedAt: new Date() },
    });

    return {
      userId: apiKey.user.id,
      role: apiKey.user.role,
      permissions: apiKey.permissions,
      keyId: apiKey.id,
    };
  }

  async revoke(keyId: string, userId: string): Promise<void> {
    const apiKey = await this.prisma.apiKey.findFirst({
      where: { id: keyId, userId },
    });
    if (!apiKey) throw new NotFoundException('API key not found');

    await this.prisma.apiKey.update({
      where: { id: keyId },
      data: { isActive: false },
    });

    this.logger.info({ userId, keyId }, 'API key revoked');
  }
}
```

---

## 9. Encryption Strategy

### 9.1 Encryption Layers

| Layer | Algorithm | Key Management | Purpose |
|---|---|---|---|
| TLS 1.3 | AES-256-GCM | Let's Encrypt / ACME | Data in transit |
| Application-level | AES-256-GCM | AWS KMS / Azure Key Vault | PII encryption at rest |
| Database encryption | TDE (PostgreSQL) | Cloud provider KMS | Data at rest |
| Backups | AES-256-CBC | Separate backup key | Backup encryption |
| Payment data | Tokenization | PCI-compliant vault | Never store raw PAN/CVV |

### 9.2 Encryption Service

```typescript
@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyBuffer: Buffer;

  constructor(@InjectConfig() private readonly config: SecurityConfig) {
    this.keyBuffer = Buffer.from(config.encryptionKey, 'hex');
  }

  encrypt(plaintext: string): EncryptedData {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.keyBuffer, iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag,
      algorithm: this.algorithm,
    };
  }

  decrypt(data: EncryptedData): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.keyBuffer,
      Buffer.from(data.iv, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(data.authTag, 'hex'));
    let decrypted = decipher.update(data.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  generateSalt(): string {
    return crypto.randomBytes(16).toString('hex');
  }
}
```

### 9.3 PII Encryption Strategy

| Field | Encryption | Notes |
|---|---|---|
| Email | Encrypted at rest + hashed for lookup | Dual storage: encrypted + SHA-256 hash |
| Phone | Encrypted at rest + hashed for lookup | Same as email |
| Name | Encrypted at rest | |
| Address | Encrypted at rest | |
| Date of birth | Encrypted at rest | |
| IP address | Not stored (logged in audit only) | Anonymized after 90 days |
| Payment token | Tokenized (external vault) | Never stored in DB |
| Password | bcrypt (one-way) | Not reversible |
| MFA secret | Encrypted at rest | |
| API key hash | SHA-256 (one-way) | Not reversible |

### 9.4 Dual-Email Storage

```sql
-- Users table stores email in two forms:
CREATE TABLE identity.users (
    id                UUID PRIMARY KEY,
    email_encrypted   TEXT NOT NULL,  -- AES-256-GCM encrypted
    email_hash        TEXT NOT NULL UNIQUE,  -- SHA-256 hash for lookup
    phone_encrypted   TEXT,           -- AES-256-GCM encrypted
    phone_hash        TEXT UNIQUE,    -- SHA-256 hash for lookup
    ...
);
```

```typescript
// Lookup by email:
async function findByEmail(email: string): Promise<User | null> {
  const emailHash = encryptionService.hash(email.toLowerCase().trim());
  return prisma.user.findUnique({ where: { emailHash } });
}
```

---

## 10. Data Protection

### 10.1 Data Classification

| Classification | Definition | Examples | Controls |
|---|---|---|---|
| **Public** | No harm if disclosed | Destination names, descriptions, ratings | Standard access controls |
| **Internal** | Internal operations data | Booking counts, analytics aggregates | Authentication required |
| **Confidential** | Business-sensitive | Partner payouts, offer margins, unlisted content | Role-based access |
| **Restricted** | PII, financial | User email, payment data, MFA secrets | Encryption + strict RBAC + audit |
| **Regulated** | Legal/compliance | Refund records, tax invoices, GDPR data | Encryption + retention + audit |

### 10.2 Data Minimization

- Collect only data needed for the specific feature
- Never log full credit card numbers, passwords, or MFA codes
- Mask PII in logs (show first/last char: `j***@example.com`)
- Set `TTL` on temporary data (sessions, MFA codes, password reset tokens)
- Anonymize data after retention period

### 10.3 Data Retention Schedule

| Data Type | Active Retention | Archive | Deletion/Anonymization |
|---|---|---|---|
| User accounts | Active + 90 days after deactivation | — | Anonymize after 90 days of deactivation |
| Bookings | 2 years | 10 years (financial) | Anonymize user references after 10 years |
| Payments | 2 years | 10 years (legal) | Anonymize after 10 years |
| Conversations | 2 years | — | Anonymize after 2 years |
| Notifications | 90 days | — | Delete after 90 days |
| Audit logs | 1 year | 5 years (financial) | Anonymize after 5 years |
| Sessions | Active + 7 days | — | Delete after expiry + 7 days |
| Analytics events | 90 days raw | 2 years aggregated | Delete raw after 90 days |
| Password history | 90 days | — | Delete after 90 days |
| MFA backup codes | 1 year | — | Delete after 1 year |

### 10.4 Data Deletion/Anonymization

```sql
-- Anonymization function
CREATE OR REPLACE FUNCTION identity.anonymize_user(p_user_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE identity.users
    SET
        name = 'Deleted User',
        email_encrypted = NULL,
        email_hash = 'deleted_' || p_user_id,
        phone_encrypted = NULL,
        phone_hash = NULL,
        avatar_url = NULL,
        date_of_birth = NULL,
        locale = NULL,
        is_active = false,
        anonymized_at = now()
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Scheduled anonymization job (weekly)
CREATE OR REPLACE FUNCTION identity.anonymize_stale_users()
RETURNS int AS $$
DECLARE
    count int;
BEGIN
    UPDATE identity.users
    SET
        name = 'Deleted User',
        email_encrypted = NULL,
        email_hash = 'deleted_' || id,
        phone_encrypted = NULL,
        phone_hash = NULL,
        avatar_url = NULL,
        date_of_birth = NULL,
        locale = NULL,
        is_active = false,
        anonymized_at = now()
    WHERE
        is_active = false
        AND deactivated_at < now() - INTERVAL '90 days'
        AND anonymized_at IS NULL;

    GET DIAGNOSTICS count = ROW_COUNT;
    RETURN count;
END;
$$ LANGUAGE plpgsql;
```

---

## 11. Audit Logging

### 11.1 Audit Log Model

```sql
CREATE TABLE audit.audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action          TEXT NOT NULL,        -- e.g., 'booking.created', 'user.login'
    entity_type     TEXT NOT NULL,        -- e.g., 'booking', 'user'
    entity_id       UUID,                 -- The affected entity
    actor_id        UUID,                 -- User who performed the action
    actor_type      TEXT NOT NULL DEFAULT 'user',  -- 'user', 'system', 'admin'
    changes         JSONB NOT NULL DEFAULT '{}',   -- { "field": { "from": "x", "to": "y" } }
    metadata        JSONB NOT NULL DEFAULT '{}',   -- ip, user_agent, request_id
    occurred_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_entity ON audit.audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_actor ON audit.audit_logs(actor_id);
CREATE INDEX idx_audit_action ON audit.audit_logs(action);
CREATE INDEX idx_audit_occurred ON audit.audit_logs(occurred_at);
```

### 11.2 Auditable Actions

| Category | Actions |
|---|---|
| **Authentication** | login, logout, login.failed, register, mfa.enabled, mfa.disabled |
| **User** | profile.updated, password.changed, email.changed, account.deleted |
| **Booking** | booking.created, booking.confirmed, booking.cancelled, booking.modified |
| **Payment** | payment.authorized, payment.captured, payment.failed, payment.refunded |
| **Catalog** | destination.created, destination.updated, experience.published, offer.activated |
| **Admin** | user.suspended, user.role.changed, experience.forced.cancelled, refund.approved |
| **Security** | api_key.generated, api_key.revoked, session.invalidated, rate.limit.exceeded |
| **System** | backup.completed, migration.run, config.updated |

### 11.3 Audit Interceptor

```typescript
@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.route?.path;

    // Skip GET requests (read-only)
    if (method === 'GET') return next.handle();

    return next.handle().pipe(
      tap((response) => {
        const action = this.mapToAction(method, path);
        if (!action) return;

        const changes = this.extractChanges(method, request.body);
        const entityType = this.extractEntityType(path);
        const entityId = response?.data?.id || request.params?.id;

        this.prisma.auditLog.create({
          data: {
            action,
            entityType,
            entityId,
            actorId: request.user?.id,
            actorType: request.user?.role === 'super_admin' ? 'admin' : 'user',
            changes,
            metadata: {
              ip: request.ip,
              userAgent: request.headers['user-agent'],
              requestId: request.headers['x-request-id'],
            },
          },
        }).catch((err) => {
          // Audit logging failures must never break the main flow
          console.error('Audit log write failed:', err);
        });
      }),
    );
  }

  private mapToAction(method: string, path: string): string | null {
    const mapping: Record<string, Record<string, string>> = {
      POST: {
        '/v1/bookings': 'booking.created',
        '/v1/bookings/*/cancel': 'booking.cancelled',
        '/v1/reviews': 'review.created',
        '/v1/auth/login': 'user.login',
        '/v1/auth/register': 'user.registered',
      },
      PUT: {
        '/v1/experiences/*': 'experience.updated',
        '/v1/destinations/*': 'destination.updated',
      },
      PATCH: {
        '/v1/me/profile': 'profile.updated',
        '/v1/me/password': 'password.changed',
        '/v1/me/notifications/*/read': 'notification.read',
      },
      DELETE: {
        '/v1/me/account': 'account.deleted',
        '/v1/reviews/*': 'review.deleted',
      },
    };
    return mapping[method]?.[path] || null;
  }

  private extractEntityType(path: string): string {
    const parts = path.split('/');
    return parts[2] || 'unknown';
  }

  private extractChanges(method: string, body: any): Record<string, any> {
    if (method === 'POST') return { created: body };
    if (method === 'PATCH') return { updated: body };
    return {};
  }
}
```

### 11.4 Audit Log Retention

```sql
-- Partition audit_logs by month for efficient retention
CREATE TABLE audit.audit_logs (
    LIKE audit.audit_logs_template INCLUDING ALL
) PARTITION BY RANGE (occurred_at);

-- Monthly partitions managed by pg_partman
SELECT partman.create_parent(
    p_parent_table := 'audit.audit_logs',
    p_control := 'occurred_at',
    p_type := 'native',
    p_interval := '1 month',
    p_premake := 3
);

-- Detach and drop partitions older than retention period
-- Retention: 1 year active, 5 years for financial
-- Financial audit logs copied to separate table before partition drop
```

---

## 12. Fraud Prevention

### 12.1 Fraud Detection Rules

| Rule | Threshold | Action | Severity |
|---|---|---|---|
| Rapid booking creation | > 5 bookings in 10 min | Flag for review + rate limit | Medium |
| Multiple failed payments | > 3 failed attempts in 1 hour | Block payment method + notify | High |
| Account creation from same IP | > 3 accounts in 1 hour | Block registration from IP | High |
| Login from new device + location | First login from new geo | MFA challenge | Medium |
| Coupon abuse (same user) | > 10 coupon applications in 1 hour | Block coupon usage | High |
| Coupon abuse (same IP) | > 50 coupon checks in 1 hour | Block coupon checks | High |
| Review spam (same user) | > 5 reviews in 10 min | Flag + rate limit | Medium |
| Review spam (same IP) | > 20 reviews in 1 hour | Block reviews from IP | High |
| Price manipulation | Changed price > 20% in 1 hour | Flag for admin review | Critical |
| High-value refund request | Refund > 10,000 EGP within 24h of booking | Manual review required | High |
| Gift card brute force | > 10 failed code attempts in 5 min | Block IP + invalidate codes | Critical |
| API key abuse | > 1000 requests in 1 min | Auto-rotate key + alert | High |

### 12.2 Fraud Detection Service

```typescript
@Injectable()
export class FraudDetectionService {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly logger: PinoLogger,
  ) {}

  async checkBookingFraud(userId: string, bookingData: CreateBookingDto, metadata: RequestMetadata): Promise<FraudCheckResult> {
    const checks: FraudCheck[] = [];

    // Rapid booking check
    const recentBookings = await this.countRecentActions(userId, 'booking:created', 600);
    if (recentBookings >= 5) {
      checks.push({ rule: 'RAPID_BOOKING', severity: 'medium', action: 'flag' });
    }

    // High-value booking from new account
    const accountAge = await this.getAccountAge(userId);
    if (accountAge < 24 && bookingData.totalAmount > 5000) {
      checks.push({ rule: 'HIGH_VALUE_NEW_ACCOUNT', severity: 'high', action: 'manual_review' });
    }

    // Device fingerprint mismatch
    const knownDevices = await this.getKnownDevices(userId);
    if (knownDevices.length > 0 && !knownDevices.includes(metadata.deviceFingerprint)) {
      checks.push({ rule: 'UNKNOWN_DEVICE', severity: 'medium', action: 'mfa_challenge' });
    }

    const highestSeverity = this.getHighestSeverity(checks);
    const shouldBlock = checks.some((c) => c.action === 'block');

    if (shouldBlock || highestSeverity === 'critical') {
      this.logger.warn({ userId, bookingData, checks }, 'Fraud detection triggered block');
      await this.notifyFraudTeam(userId, checks, bookingData);
    }

    return {
      allowed: !shouldBlock,
      checks,
      requiresManualReview: checks.some((c) => c.action === 'manual_review'),
      requiresMfa: checks.some((c) => c.action === 'mfa_challenge'),
    };
  }

  async checkPaymentFraud(paymentData: { userId: string; amount: number; paymentMethodId: string }, metadata: RequestMetadata): Promise<FraudCheckResult> {
    const checks: FraudCheck[] = [];

    // Multiple failed payments
    const failedPayments = await this.countRecentActions(paymentData.userId, 'payment:failed', 3600);
    if (failedPayments >= 3) {
      checks.push({ rule: 'MULTIPLE_FAILED_PAYMENTS', severity: 'high', action: 'block' });
    }

    // Amount anomaly
    const avgAmount = await this.getAverageTransactionAmount(paymentData.userId);
    if (paymentData.amount > avgAmount * 5 && paymentData.amount > 10000) {
      checks.push({ rule: 'AMOUNT_ANOMALY', severity: 'medium', action: 'flag' });
    }

    return this.evaluateChecks(paymentData.userId, checks);
  }

  async checkCouponFraud(userId: string, code: string, ipAddress: string): Promise<FraudCheckResult> {
    const checks: FraudCheck[] = [];

    // Same user, many coupon attempts
    const userAttempts = await this.countRecentActions(userId, 'coupon:check', 3600);
    if (userAttempts >= 10) {
      checks.push({ rule: 'COUPON_ABUSE_USER', severity: 'high', action: 'block' });
    }

    // Same IP, many coupon attempts
    const ipAttempts = await this.countRecentActionsByIP(ipAddress, 'coupon:check', 3600);
    if (ipAttempts >= 50) {
      checks.push({ rule: 'COUPON_ABUSE_IP', severity: 'high', action: 'block' });
    }

    return this.evaluateChecks(userId, checks);
  }

  async checkReviewFraud(userId: string, ipAddress: string): Promise<FraudCheckResult> {
    const checks: FraudCheck[] = [];

    const userReviews = await this.countRecentActions(userId, 'review:created', 600);
    if (userReviews >= 5) {
      checks.push({ rule: 'REVIEW_SPAM_USER', severity: 'medium', action: 'block' });
    }

    const ipReviews = await this.countRecentActionsByIP(ipAddress, 'review:created', 3600);
    if (ipReviews >= 20) {
      checks.push({ rule: 'REVIEW_SPAM_IP', severity: 'high', action: 'block' });
    }

    return this.evaluateChecks(userId, checks);
  }

  private async countRecentActions(userId: string, action: string, windowSeconds: number): Promise<number> {
    const key = `fraud:${action}:${userId}`;
    const count = await this.redis.get(key);
    if (!count) return 0;

    // Increment and set expiry
    const pipeline = this.redis.pipeline();
    pipeline.incr(key);
    if (count === '0') pipeline.expire(key, windowSeconds);
    await pipeline.exec();

    return parseInt(count);
  }

  private async countRecentActionsByIP(ipAddress: string, action: string, windowSeconds: number): Promise<number> {
    const key = `fraud:${action}:ip:${ipAddress}`;
    const count = await this.redis.get(key);
    if (!count) return 0;

    const pipeline = this.redis.pipeline();
    pipeline.incr(key);
    if (count === '0') pipeline.expire(key, windowSeconds);
    await pipeline.exec();

    return parseInt(count);
  }

  private async getAccountAge(userId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true },
    });
    if (!user) return Infinity;
    return (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60); // hours
  }

  private async getAverageTransactionAmount(userId: string): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: { userId, status: 'completed' },
      _avg: { amount: true },
    });
    return result._avg.amount || 0;
  }

  private async getKnownDevices(userId: string): Promise<string[]> {
    const data = await this.redis.get(`fraud:devices:${userId}`);
    return data ? JSON.parse(data) : [];
  }

  private getHighestSeverity(checks: FraudCheck[]): string {
    const order = ['low', 'medium', 'high', 'critical'];
    let highest = 'low';
    for (const c of checks) {
      if (order.indexOf(c.severity) > order.indexOf(highest)) {
        highest = c.severity;
      }
    }
    return highest;
  }

  private async evaluateChecks(userId: string, checks: FraudCheck[]): Promise<FraudCheckResult> {
    const shouldBlock = checks.some((c) => c.action === 'block');
    if (shouldBlock) {
      this.logger.warn({ userId, checks }, 'Fraud detection triggered block');
    }
    return {
      allowed: !shouldBlock,
      checks,
      requiresManualReview: checks.some((c) => c.action === 'manual_review'),
      requiresMfa: checks.some((c) => c.action === 'mfa_challenge'),
    };
  }

  private async notifyFraudTeam(userId: string, checks: FraudCheck[], data: any): Promise<void> {
    await this.prisma.fraudAlert.create({
      data: {
        userId,
        checks,
        data,
        status: 'pending',
      },
    });
  }
}
```

---

## 13. Input Security

### 13.1 Input Validation Controls

| Control | Implementation | Where |
|---|---|---|
| Schema validation | class-validator DTOs | Controller layer |
| HTML sanitization | sanitize-html | User-generated content |
| SQL injection | Prisma parameterized queries | ORM layer |
| XSS prevention | Content-Security-Policy + output encoding | HTTP headers + React |
| CSRF protection | SameSite cookies + double-submit cookie | Middleware |
| Request size limit | body-parser limit (1MB default) | HTTP server |
| File upload validation | File type + size + virus scan | Upload handler |
| Rate limiting | @nestjs/throttler | Guard layer |
| IP allow/deny | Global middleware | Network layer |

### 13.2 HTML Sanitization

```typescript
@Injectable()
export class SanitizationService {
  private readonly sanitizer: sanitizeHtml.IOptions;

  constructor() {
    this.sanitizer = {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'img']),
      allowedAttributes: {
        a: ['href', 'target', 'rel'],
        img: ['src', 'alt', 'width', 'height'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
      transformTags: {
        a: (tagName, attribs) => ({
          tagName,
          attribs: {
            ...attribs,
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        }),
      },
    };
  }

  sanitize(input: string): string {
    return sanitizeHtml(input, this.sanitizer);
  }

  sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const result = { ...obj };
    for (const key of Object.keys(result)) {
      if (typeof result[key] === 'string') {
        result[key] = this.sanitize(result[key]) as any;
      }
    }
    return result;
  }
}
```

### 13.3 Rate Limiting Configuration

```typescript
// app.module.ts
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'global',
            ttl: 60000,
            limit: 120,
          },
          {
            name: 'auth',
            ttl: 300000,
            limit: 5,
          },
          {
            name: 'ai',
            ttl: 60000,
            limit: 10,
          },
        ],
      }),
    }),
  ],
})
export class AppModule {}

// Custom throttle guard
@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Use user ID if authenticated, otherwise IP
    if (req.user?.id) return `user:${req.user.id}`;
    return `ip:${req.ip}`;
  }

  protected getLimitAndTtl(context: ExecutionContext): Promise<{ limit: number; ttl: number }> {
    const handler = context.getHandler();
    const controller = context.getClass();

    // Check for @Throttle() decorator on handler
    const throttleMeta = this.reflector.getAllAndOverride<ThrottlerOptions[]>(THROTTLER_OPTIONS, [
      handler,
      controller,
    ]);

    if (throttleMeta && throttleMeta.length > 0) {
      return Promise.resolve({
        limit: throttleMeta[0].limit,
        ttl: throttleMeta[0].ttl,
      });
    }

    // Default
    return Promise.resolve({ limit: 120, ttl: 60000 });
  }
}
```

---

## 14. CORS, CSP, Headers

### 14.1 CORS Configuration

```typescript
// main.ts
const app = await NestFactory.create(AppModule);

app.enableCors({
  origin: [
    'https://egypthub.com',
    'https://www.egypthub.com',
    'https://admin.egypthub.com',
    /\.egypthub\.com$/,        // All subdomains
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Idempotency-Key',
    'X-Request-Id',
    'Accept-Language',
    'If-Match',
    'If-None-Match',
  ],
  exposedHeaders: [
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'Idempotent-Replayed',
    'Sunset',
    'Deprecation',
  ],
  credentials: true,
  maxAge: 86400, // 24 hours (preflight cache)
});
```

### 14.2 Security Headers

```typescript
// helmet configuration
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // unsafe-inline for Next.js
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'https://*.egypthub.com', 'https://*.s3.amazonaws.com', 'data:'],
      connectSrc: ["'self'", 'https://api.egypthub.com', 'https://*.s3.amazonaws.com'],
      fontSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
      frameAncestors: ["'none'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Required for some CDN resources
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '0'); // Deprecated but belt-and-suspenders
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});
```

### 14.3 HTTP Security Headers Summary

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Force HTTPS |
| `Content-Security-Policy` | See above | Prevent XSS |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `0` | Disable legacy XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer info |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restrict API access |
| `Cross-Origin-Embedder-Policy` | `require-corp` (relaxed for CDN) | COEP isolation |
| `Cross-Origin-Resource-Policy` | `cross-origin` | Allow CDN resources |
| `Cross-Origin-Opener-Policy` | `same-origin` | COOP isolation |

---

## 15. Webhook Security

### 15.1 Webhook Verification

```typescript
@Injectable()
export class WebhookVerifier {
  constructor(
    @InjectConfig() private readonly config: PaymentConfig,
    private readonly redis: RedisService,
  ) {}

  async verifyPaymentWebhook(payload: string, signature: string, timestamp: string): Promise<boolean> {
    // 1. Verify timestamp is within 5 minutes
    const eventTime = parseInt(timestamp);
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - eventTime) > 300) return false; // Too old

    // 2. Replay attack check (nonce)
    const nonce = this.extractNonce(payload);
    if (nonce) {
      const seen = await this.redis.get(`webhook:nonce:${nonce}`);
      if (seen) return false; // Already processed
      await this.redis.set(`webhook:nonce:${nonce}`, '1', 'EX', 3600); // 1 hour TTL
    }

    // 3. HMAC verification
    const expectedSig = crypto
      .createHmac('sha256', this.config.webhookSecret)
      .update(`${timestamp}.${payload}`)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSig),
    );
  }

  private extractNonce(payload: string): string | null {
    try {
      const parsed = JSON.parse(payload);
      return parsed.id || null; // Webhook event ID is the nonce
    } catch {
      return null;
    }
  }
}
```

### 15.2 Webhook Processing

```typescript
@Controller('webhooks')
export class WebhookController {
  constructor(
    private readonly webhookVerifier: WebhookVerifier,
    private readonly queueService: QueueService,
    private readonly logger: PinoLogger,
  ) {}

  @Post('payment-gateway')
  async handlePaymentWebhook(
    @Req() req: Request,
    @Headers('x-webhook-signature') signature: string,
    @Headers('x-webhook-timestamp') timestamp: string,
  ): Promise<{ received: boolean }> {
    const rawBody = (req as any).rawBody; // Raw body required for signature verification
    const verified = await this.webhookVerifier.verifyPaymentWebhook(
      rawBody,
      signature,
      timestamp,
    );

    if (!verified) {
      this.logger.warn('Payment webhook verification failed');
      throw new UnauthorizedException('Invalid webhook signature');
    }

    const event = JSON.parse(rawBody);

    // Queue for processing (async)
    await this.queueService.add('payment-webhook', `payment.${event.type}`, {
      eventId: event.id,
      type: event.type,
      data: event.data,
    });

    return { received: true };
  }
}
```

### 15.3 Webhook Retry Policy

| Scenario | Action |
|---|---|
| Server returns 200 | Webhook acknowledged |
| Server returns 4xx | Do not retry (configuration error) |
| Server returns 5xx | Retry with backoff: 1min, 5min, 15min, 1hr, 6hr, 24hr |
| Server timeout | Retry with backoff (same as 5xx) |
| Max retries exceeded | Alert operator + flag for manual reconciliation |

---

## 16. Third-Party Integrations

### 16.1 Integration Security Checklist

| Requirement | Implementation |
|---|---|
| TLS 1.3 for all outbound calls | HTTPS-only, certificate validation |
| Secret rotation | Every 90 days or on compromise |
| Minimal scope | Request only required permissions |
| IP whitelisting | Outbound calls from known IPs only |
| Token vault | Stored encrypted in AWS Secrets Manager |
| No logging of secrets | Pino redact configuration |
| Rate limiting | Per-integration limits |
| Circuit breaker | Opossum or custom implementation |
| Timeout | 10s default, 30s for payment |
| Error handling | Graceful degradation with fallback |

### 16.2 Integration Credential Storage

```typescript
@Injectable()
export class IntegrationCredentialsService {
  constructor(
    private readonly secretsManager: SecretsManagerService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async getCredentials(integration: string): Promise<IntegrationCredentials> {
    // Fetch from cloud secrets manager
    const secret = await this.secretsManager.getSecret(`egypthub/integrations/${integration}`);
    return JSON.parse(secret);
  }

  async rotateCredentials(integration: string, newCredentials: IntegrationCredentials): Promise<void> {
    // Store new version
    await this.secretsManager.putSecret(
      `egypthub/integrations/${integration}`,
      JSON.stringify(newCredentials),
    );

    this.logger.info({ integration }, 'Integration credentials rotated');
  }
}
```

---

## 17. Incident Response

### 17.1 Security Incident Severity

| Severity | Definition | Response Time | Example |
|---|---|---|---|
| **SEV-1** | Active breach or data exposure | < 15 minutes | Unauthorized DB access, PII leak |
| **SEV-2** | Credential compromise | < 1 hour | API key leak, admin account takeover |
| **SEV-3** | Vulnerability discovered | < 24 hours | XSS in user content, insecure dependency |
| **SEV-4** | Policy violation | < 72 hours | Missing audit log, incorrect permission |

### 17.2 Incident Response Flow

```
1. Detection
   ├── Automated alerts (fraud detection, anomaly detection)
   ├── User reports suspicious activity
   └── Routine audit log review

2. Triage
   ├── Determine severity
   ├── Contain immediate damage (block IP, suspend user, revoke key)
   └── Notify on-call engineer

3. Investigation
   ├── Collect logs (audit, application, database)
   ├── Identify root cause
   ├── Determine scope of impact
   └── Preserve evidence (snapshot DB, freeze logs)

4. Remediation
   ├── Fix vulnerability
   ├── Rotate compromised credentials
   ├── Restore from clean backup if needed
   └── Notify affected users (within 72 hours for GDPR)

5. Post-Mortem
   ├── Root cause analysis document
   ├── Timeline of events
   ├── Action items to prevent recurrence
   └── Update security policies/procedures
```

### 17.3 Contact Channels

| Channel | Purpose | Availability |
|---|---|---|
| `security@egypthub.com` | Vulnerability reports | 24/7 |
| PagerDuty | Critical incidents | 24/7 on-call rotation |
| Internal Slack #security | Coordination | Business hours |
| Legal counsel | Data breach notification | On retainer |

---

*End of Security Architecture — Version 1.0*

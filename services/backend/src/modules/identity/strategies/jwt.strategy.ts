import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfigService } from '../../../config';
import { ErrorCodes } from '../../../common/constants';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  sessionId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authConfig: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtAccessSecret,
      issuer: authConfig.jwtIssuer,
      audience: authConfig.jwtAudience,
    });
  }

  async validate(payload: JwtPayload): Promise<{ userId: string; email: string; role: string; sessionId: string }> {
    if (!payload.sub) {
      throw new UnauthorizedException({
        errorCode: ErrorCodes.AUTH_TOKEN_INVALID,
        message: 'Invalid token payload',
      });
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      sessionId: payload.sessionId,
    };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

interface JwtPayload {
  sub: string;
  phone: string;
  role: string;
  name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'super-secret-jwt-key-change-in-production'),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findById(payload.sub);
    if (!user) throw new UnauthorizedException('المستخدم مش موجود');
    return { id: user.id, phone: user.phone, role: user.role, name: user.name };
  }
}

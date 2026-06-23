import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfigService } from '../../config';

import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { MfaService } from './services/mfa.service';

import { JwtStrategy } from './strategies/jwt.strategy';

import { PasswordService } from '../../common/services/password.service';
import { PiiEncryptionService } from '../../common/services/pii-encryption.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [AuthConfigService],
      useFactory: (authConfig: AuthConfigService) => ({
        secret: authConfig.jwtAccessSecret,
        signOptions: {
          expiresIn: authConfig.jwtAccessExpiry,
          issuer: authConfig.jwtIssuer,
          audience: authConfig.jwtAudience,
        },
      }),
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [
    AuthService,
    UserService,
    SessionService,
    MfaService,
    JwtStrategy,
    PasswordService,
    PiiEncryptionService,
  ],
  exports: [AuthService, UserService, SessionService, MfaService],
})
export class IdentityModule {}

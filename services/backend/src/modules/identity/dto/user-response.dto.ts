import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  nameAr?: string;

  @ApiPropertyOptional()
  nameEn?: string;

  @ApiPropertyOptional()
  nationality?: string;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  mfaEnabled!: boolean;

  @ApiPropertyOptional()
  mfaMethod?: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class AuthTokensDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  expiresIn!: number;
}

export class AuthResponseDto {
  @ApiProperty()
  user!: UserResponseDto;

  @ApiProperty()
  tokens!: AuthTokensDto;
}

export class MfaSetupResponseDto {
  @ApiProperty()
  secret?: string;

  @ApiProperty()
  qrCodeUrl?: string;

  @ApiProperty()
  method!: string;

  @ApiProperty()
  backupCodes!: string[];
}

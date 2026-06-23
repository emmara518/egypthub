import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MfaVerifyDto {
  @ApiProperty({ description: 'TOTP code or SMS code' })
  @IsString()
  code!: string;
}

import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MfaSetupDto {
  @ApiProperty({ enum: ['totp', 'sms'] })
  @IsString()
  @IsIn(['totp', 'sms'])
  method!: 'totp' | 'sms';
}

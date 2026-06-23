import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty()
  @IsString()
  refreshToken!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deviceInfo?: string;
}

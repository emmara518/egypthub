import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '+201234567890' })
  @IsString()
  @Matches(/^\+[1-9]\d{6,14}$/, { message: 'Phone must be in E.164 format (e.g. +201234567890)' })
  phone!: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {
    message: 'Password must contain uppercase, lowercase, number, and special character',
  })
  password!: string;

  @ApiPropertyOptional({ example: 'محمد' })
  @IsOptional()
  @IsString()
  nameAr?: string;

  @ApiPropertyOptional({ example: 'Mohamed' })
  @IsOptional()
  @IsString()
  nameEn?: string;

  @ApiPropertyOptional({ example: 'Egyptian' })
  @IsOptional()
  @IsString()
  nationality?: string;
}

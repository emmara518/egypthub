import { IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDestinationDto {
  @ApiProperty({ example: 'المملكة العربية السعودية' })
  @IsString()
  nameAr: string;

  @ApiProperty({ example: 'Saudi Arabia' })
  @IsString()
  nameEn: string;

  @ApiPropertyOptional({ example: 'المملكة العربية السعودية...' })
  @IsOptional()
  @IsString()
  summaryAr?: string;

  @ApiPropertyOptional({ example: 'The Kingdom of Saudi Arabia...' })
  @IsOptional()
  @IsString()
  summaryEn?: string;

  @ApiPropertyOptional({ example: 'المملكة العربية السعودية...' })
  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @ApiPropertyOptional({ example: 'The Kingdom of Saudi Arabia...' })
  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @ApiPropertyOptional({ example: '{lat: 21.3891, lng: 39.8579}' })
  @IsOptional()
  @IsObject()
  location?: Record<string, unknown>;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: ['image1.jpg', 'image2.jpg'] })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ example: 'draft' })
  @IsOptional()
  @IsString()
  status?: string;
}

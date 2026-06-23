import { ApiProperty } from '@nestjs/swagger';

export interface CategoryResponseDto {
  @ApiProperty({ type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  categoryId: string;

  @ApiProperty({ example: 'المملكة العربية السعودية' })
  nameAr: string;

  @ApiProperty({ example: 'Saudi Arabia' })
  nameEn: string;

  @ApiProperty({ example: 'saudi-arabia' })
  slug: string;

  @ApiProperty({ example: 'المملكة العربية السعودية...' })
  descriptionAr?: string;

  @ApiProperty({ example: 'The Kingdom of Saudi Arabia...' })
  descriptionEn?: string;

  @ApiProperty({ example: 'building' })
  icon?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  imageUrl?: string;

  @ApiProperty({ example: 0 })
  sortOrder: number;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;
}

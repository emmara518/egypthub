import { IsString, IsOptional, IsNumber, IsInt, Min, IsArray, IsUUID, IsDecimal } from 'class-validator';
import { Decimal } from 'decimal.js';

export class CreateOfferDto {
  @IsString()
  nameAr: string;

  @IsString()
  nameEn: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @IsOptional()
  @IsString()
  couponCode?: string;

  @IsOptional()
  @IsString()
  discountType?: string;

  @IsOptional()
  @IsNumber()
  discountValue?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxRedemptions?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxPerUser?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minBookingAmount?: number;

  @IsOptional()
  startsAt?: Date;

  @IsOptional()
  expiresAt?: Date;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  experienceIds?: string[];
}

import { IsString, IsOptional, IsNumber, IsInt, Min, IsArray, IsUUID } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  nameAr: string;

  @IsString()
  nameEn: string;

  @IsUUID()
  destinationId: string;

  @IsOptional()
  @IsUUID()
  partnerId?: string;

  @IsOptional()
  @IsString()
  summaryAr?: string;

  @IsOptional()
  @IsString()
  summaryEn?: string;

  @IsOptional()
  @IsString()
  descriptionAr?: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @IsOptional()
  @IsString()
  durationUnit?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxGuests?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  minGuests?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  originalPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  images?: string[];

  @IsOptional()
  includes?: string[];

  @IsOptional()
  excludes?: string[];

  @IsOptional()
  requirements?: string[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds?: string[];
}

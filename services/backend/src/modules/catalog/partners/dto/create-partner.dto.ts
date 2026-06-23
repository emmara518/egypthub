import { IsString, IsOptional, IsObject, IsNumber, Min } from 'class-validator';

export class CreatePartnerDto {
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
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsObject()
  location?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  images?: string[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  commissionRate?: number;
}

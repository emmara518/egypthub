import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateStoryDto {
  @IsOptional()
  @IsUUID()
  destinationId?: string;

  @IsOptional()
  @IsUUID()
  experienceId?: string;

  @IsString()
  titleAr: string;

  @IsString()
  titleEn: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  contentAr?: string;

  @IsOptional()
  @IsString()
  contentEn?: string;

  @IsOptional()
  @IsString()
  excerptAr?: string;

  @IsOptional()
  @IsString()
  excerptEn?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  images?: string[];

  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsString()
  status?: string;
}

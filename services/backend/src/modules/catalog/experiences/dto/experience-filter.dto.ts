import { IsOptional, IsString, IsInt, Min, IsUUID } from 'class-validator';

export class ExperienceFilterDto {
  @IsOptional()
  @IsUUID()
  destinationId?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

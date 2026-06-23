export class DestinationResponseDto {
  destinationId: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  summaryAr?: string;
  summaryEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  location?: Record<string, unknown>;
  imageUrl?: string;
  images?: string[];
  status: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

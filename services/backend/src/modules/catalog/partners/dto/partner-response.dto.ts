export class PartnerResponseDto {
  partnerId: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  descriptionAr?: string;
  descriptionEn?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: Record<string, unknown>;
  imageUrl?: string;
  images?: string[];
  status: string;
  commissionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

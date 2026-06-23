export class OfferResponseDto {
  offerId: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  descriptionAr?: string;
  descriptionEn?: string;
  couponCode?: string;
  discountType?: string;
  discountValue?: number;
  maxRedemptions?: number;
  maxPerUser?: number;
  minBookingAmount?: number;
  startsAt?: Date;
  expiresAt?: Date;
  status: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  experiences?: { experienceId: string }[];
}

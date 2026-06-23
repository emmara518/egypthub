export class StoryResponseDto {
  storyId: string;
  destinationId?: string;
  experienceId?: string;
  titleAr: string;
  titleEn: string;
  slug: string;
  contentAr?: string;
  contentEn?: string;
  excerptAr?: string;
  excerptEn?: string;
  imageUrl?: string;
  images?: string[];
  tags?: string[];
  status: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

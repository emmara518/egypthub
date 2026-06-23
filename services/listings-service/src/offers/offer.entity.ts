import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Business } from '../businesses/business.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'business_id' })
  businessId: string;

  @Column({ name: 'title_ar', length: 200 })
  titleAr: string;

  @Column({ name: 'title_en', length: 200, nullable: true })
  titleEn: string;

  @Column({ name: 'description_ar', type: 'text', nullable: true })
  descriptionAr: string;

  @Column({ name: 'description_en', type: 'text', nullable: true })
  descriptionEn: string;

  @Column({ name: 'original_price', type: 'decimal', precision: 10, scale: 2 })
  originalPrice: number;

  @Column({ name: 'offer_price', type: 'decimal', precision: 10, scale: 2 })
  offerPrice: number;

  @Column({ length: 3, default: 'EGP' })
  currency: string;

  @Column({ name: 'valid_from', type: 'timestamptz' })
  validFrom: Date;

  @Column({ name: 'valid_until', type: 'timestamptz' })
  validUntil: Date;

  @Column({ name: 'max_bookings', default: 100 })
  maxBookings: number;

  @Column({ name: 'current_bookings', default: 0 })
  currentBookings: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  business: Business;
}

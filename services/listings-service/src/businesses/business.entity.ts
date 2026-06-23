import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { City } from '../cities/city.entity';
import { Category } from '../categories/category.entity';

export enum BusinessStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @Column({ name: 'city_id' })
  cityId: string;

  @Column({ name: 'name_ar', length: 200 })
  nameAr: string;

  @Column({ name: 'name_en', length: 200, nullable: true })
  nameEn: string;

  @Column({ name: 'description_ar', type: 'text' })
  descriptionAr: string;

  @Column({ name: 'description_en', type: 'text', nullable: true })
  descriptionEn: string;

  @Column({ unique: true, length: 200 })
  slug: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 20, nullable: true })
  whatsapp: string;

  @Column({ name: 'address_ar', type: 'text', nullable: true })
  addressAr: string;

  @Column({ name: 'address_en', type: 'text', nullable: true })
  addressEn: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column({ type: 'text', array: true, default: '{}' })
  images: string[];

  @Column({ name: 'cover_image', length: 500, nullable: true })
  coverImage: string;

  @Column({ type: 'enum', enum: BusinessStatus, default: BusinessStatus.PENDING })
  status: BusinessStatus;

  @Column({ name: 'commission_rate', type: 'decimal', precision: 5, scale: 2, default: 10.00 })
  commissionRate: number;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ type: 'jsonb', nullable: true })
  workingHours: Record<string, { open: string; close: string }>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'business_categories',
    joinColumn: { name: 'business_id' },
    inverseJoinColumn: { name: 'category_id' },
  })
  categories: Category[];
}

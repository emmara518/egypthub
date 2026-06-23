import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name_ar', length: 100 })
  nameAr: string;

  @Column({ name: 'name_en', length: 100 })
  nameEn: string;

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column({ name: 'description_ar', type: 'text', nullable: true })
  descriptionAr: string;

  @Column({ name: 'description_en', type: 'text', nullable: true })
  descriptionEn: string;

  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

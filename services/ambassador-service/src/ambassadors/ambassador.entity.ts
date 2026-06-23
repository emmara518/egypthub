import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('ambassadors')
export class Ambassador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @Column({ name: 'referral_code', unique: true, length: 20 })
  referralCode: string;

  @Column({ name: 'bio_ar', type: 'text', nullable: true })
  bioAr: string;

  @Column({ name: 'bio_en', type: 'text', nullable: true })
  bioEn: string;

  @Column({ name: 'city_id', nullable: true })
  cityId: string;

  @Column({ name: 'is_approved', default: false })
  isApproved: boolean;

  @Column({ name: 'total_earnings', type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalEarnings: number;

  @Column({ name: 'available_balance', type: 'decimal', precision: 12, scale: 2, default: 0 })
  availableBalance: number;

  @Column({ name: 'commission_rate', type: 'decimal', precision: 5, scale: 2, default: 5.00 })
  commissionRate: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

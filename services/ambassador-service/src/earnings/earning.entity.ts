import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('ambassador_earnings')
export class AmbassadorEarning {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'ambassador_id' })
  ambassadorId: string;

  @Column({ name: 'booking_id', nullable: true })
  bookingId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @Column({ name: 'description_ar', type: 'text', nullable: true })
  descriptionAr: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

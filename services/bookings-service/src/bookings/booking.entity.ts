import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'business_id' })
  businessId: string;

  @Column({ name: 'offer_id', nullable: true })
  offerId: string;

  @Column({ name: 'ambassador_id', nullable: true })
  ambassadorId: string;

  @Column({ name: 'booking_code', unique: true, length: 20 })
  bookingCode: string;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ name: 'commission_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
  commissionAmount: number;

  @Column({ name: 'guest_count', default: 1 })
  guestCount: number;

  @Column({ name: 'booking_date', type: 'date' })
  bookingDate: Date;

  @Column({ name: 'booking_time', type: 'time', nullable: true })
  bookingTime: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'qr_code', length: 500, nullable: true })
  qrCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

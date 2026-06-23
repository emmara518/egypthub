export interface BookingDetail { label: string; value: string; }

export interface BookingConfirmationProps {
  bookingId: string; status?: 'confirmed' | 'pending' | 'cancelled'; details: BookingDetail[]; message?: string; onViewBooking?: () => void; className?: string;
}

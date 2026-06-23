export interface TicketPassenger { name: string; type: string; seat?: string; }

export interface BookingTicketProps {
  title: string; date: string; time: string; location: string; passengers: TicketPassenger[]; bookingRef: string; qrValue?: string; className?: string;
}

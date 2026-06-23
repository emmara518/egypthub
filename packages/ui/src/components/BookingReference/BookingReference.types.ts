export interface BookingReferenceProps {
  referenceCode: string; label?: string; onCopy?: (code: string) => void; className?: string;
}

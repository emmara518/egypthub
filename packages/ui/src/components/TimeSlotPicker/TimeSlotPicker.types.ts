export interface TimeSlot { id: string; label: string; isAvailable?: boolean; price?: string; }

export interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedId?: string;
  onSelect: (slotId: string) => void;
  date?: string;
  className?: string;
}

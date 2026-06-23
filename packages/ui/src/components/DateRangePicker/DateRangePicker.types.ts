export interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (start: Date | undefined, end: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

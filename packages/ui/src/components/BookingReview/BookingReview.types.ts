export interface ReviewItem { label: string; value: string; }

export interface BookingReviewProps {
  title: string;
  sections: { title: string; items: ReviewItem[] }[];
  onEdit?: (sectionTitle: string) => void;
  onConfirm?: () => void;
  className?: string;
}

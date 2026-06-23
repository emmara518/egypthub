export type ExperienceBadgeType = 'bestseller' | 'top-rated' | 'new' | 'limited' | 'private';

export interface ExperienceBadgeProps {
  type: ExperienceBadgeType;
  className?: string;
}

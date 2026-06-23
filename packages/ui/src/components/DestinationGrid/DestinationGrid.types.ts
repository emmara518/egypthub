import type { DestinationCardProps } from '../DestinationCard/DestinationCard.types';

export interface DestinationGridProps {
  destinations: DestinationCardProps[];
  cols?: 2 | 3 | 4;
  className?: string;
}

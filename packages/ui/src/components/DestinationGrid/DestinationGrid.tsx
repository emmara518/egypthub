import { cn } from '../../utils/cn';
import { Grid } from '../Grid';
import { DestinationCard } from '../DestinationCard';
import type { DestinationGridProps } from './DestinationGrid.types';

const colsMap: Record<number, number> = { 2: 2, 3: 3, 4: 4 };

export function DestinationGrid({ destinations, cols = 3, className }: DestinationGridProps) {
  return (
    <Grid cols={colsMap[cols] as 1 | 2 | 3 | 4} gap={6} className={className}>
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} {...dest} />
      ))}
    </Grid>
  );
}

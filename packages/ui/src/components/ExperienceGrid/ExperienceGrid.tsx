import { cn } from '../../utils/cn';
import { Grid } from '../Grid';
import { ExperienceCard } from '../ExperienceCard';
import type { ExperienceGridProps } from './ExperienceGrid.types';

export function ExperienceGrid({ experiences, cols = 3, className }: ExperienceGridProps) {
  return (
    <Grid cols={cols as 1 | 2 | 3} gap={6} className={className}>
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} {...exp} />
      ))}
    </Grid>
  );
}

import type { ExperienceCardProps } from '../ExperienceCard/ExperienceCard.types';

export interface ExperienceGridProps {
  experiences: ExperienceCardProps[];
  cols?: 2 | 3;
  className?: string;
}

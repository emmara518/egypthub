export interface TravelerCardProps {
  name: string; type: string; age?: string; passport?: string; isMain?: boolean; onRemove?: () => void; className?: string;
}

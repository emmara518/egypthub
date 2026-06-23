import { cn } from '../../utils/cn';
import { Card } from '../Card';
import { RatingStars } from '../RatingStars';
import type { ReviewCardProps } from './ReviewCard.types';

export function ReviewCard({
  authorName,
  authorAvatar,
  rating,
  content,
  date,
  tripInfo,
  className,
}: ReviewCardProps) {
  return (
    <Card variant="default" padding="md" className={cn('', className)}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-elevated overflow-hidden flex items-center justify-center flex-shrink-0">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-body-sm font-semibold text-gold">{authorName.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-body-sm font-semibold text-text-primary">{authorName}</span>
            <span className="text-caption text-text-muted">{date}</span>
          </div>
          <RatingStars rating={rating} size="sm" className="mt-1" />
          {tripInfo && <p className="text-caption text-text-muted mt-1">{tripInfo}</p>}
          <p className="text-body-sm text-text-primary mt-2 leading-relaxed">{content}</p>
        </div>
      </div>
    </Card>
  );
}

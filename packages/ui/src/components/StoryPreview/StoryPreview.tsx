'use client';

import { cn } from '../../utils/cn';
import { Modal } from '../Modal';
import type { StoryPreviewProps } from './StoryPreview.types';

export function StoryPreview({
  image,
  title,
  excerpt,
  authorName,
  authorAvatar,
  content,
  readTime,
  isOpen,
  onClose,
  className,
}: StoryPreviewProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg" showCloseButton>
      <div className={cn('', className)}>
        {image && (
          <div className="relative h-48 sm:h-64 -mx-8 -mt-8 mb-6 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated to-transparent" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-surface-elevated overflow-hidden flex items-center justify-center flex-shrink-0">
            {authorAvatar ? (
              <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-body-sm font-semibold text-gold">{authorName.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="text-body-sm font-semibold text-text-primary">{authorName}</div>
            <div className="text-caption text-text-muted">{readTime} قراءة</div>
          </div>
        </div>

        <h2 className="text-heading-md font-bold text-text-primary leading-snug">{title}</h2>
        <p className="text-body-sm text-text-secondary mt-2">{excerpt}</p>
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-body-md text-text-primary leading-relaxed whitespace-pre-line">{content}</p>
        </div>
      </div>
    </Modal>
  );
}

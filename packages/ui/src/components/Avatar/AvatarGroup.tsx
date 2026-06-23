import { cn } from '../../utils/cn';
import { Avatar } from './Avatar';
import type { AvatarGroupProps } from './Avatar.types';
import { avatarSizeMap } from './Avatar.types';

export function AvatarGroup({ avatars, size = 'md', max = 4, className }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn('flex -space-x-2 rtl:space-x-reverse', className)}>
      {visibleAvatars.map((avatar, i) => (
        <div key={i} className="ring-2 ring-surface rounded-full">
          <Avatar
            size={size}
            src={avatar.src}
            name={avatar.name}
            alt={avatar.alt}
          />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            'inline-flex items-center justify-center rounded-full ring-2 ring-surface bg-surface-elevated text-text-secondary font-medium',
            avatarSizeMap[size].class
          )}
          aria-label={`${overflow} more`}
        >
          <span className="select-none">+{overflow}</span>
        </div>
      )}
    </div>
  );
}

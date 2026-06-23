'use client';

import { cn } from '../../utils/cn';
import { Drawer } from '../Drawer';
import type { MobileSidebarProps, SidebarNavItem } from './Sidebar.types';

function MobileNavItem({
  item,
  isActive,
  onNavigate,
}: {
  item: SidebarNavItem;
  isActive: boolean;
  onNavigate?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        item.onClick?.();
        onNavigate?.(item.id);
      }}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset',
        isActive
          ? 'bg-gold/10 text-gold'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
      )}
    >
      {item.icon && (
        <span className={cn('flex-shrink-0', isActive ? 'text-gold' : 'text-text-muted')}>
          {item.icon}
        </span>
      )}
      <span className="text-body-md font-medium flex-1 text-right">{item.label}</span>
      {item.badge !== undefined && item.badge > 0 && (
        <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-error text-[11px] font-bold text-white flex items-center justify-center">
          {item.badge > 99 ? '99+' : item.badge}
        </span>
      )}
    </button>
  );
}

export function MobileSidebar({
  items,
  user,
  isOpen,
  onClose,
  activeItem,
  onNavigate,
}: MobileSidebarProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      size="full"
      title={user?.name}
      showCloseButton
    >
      <nav aria-label="Mobile navigation" className="space-y-1 py-2">
        {items.map((item) => (
          <MobileNavItem
            key={item.id}
            item={item}
            isActive={item.id === activeItem || !!item.active}
            onNavigate={(id) => {
              onNavigate?.(id);
              onClose();
            }}
          />
        ))}
      </nav>

      {user && (
        <div className="mt-6 pt-6 border-t border-border px-2">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-body-sm font-semibold text-gold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-md font-medium text-text-primary">{user.name}</p>
              {user.email && <p className="text-body-sm text-text-muted truncate">{user.email}</p>}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

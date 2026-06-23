'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { SidebarProps, SidebarNavItem } from './Sidebar.types';

function SidebarNavItem({
  item,
  collapsed,
  isActive,
  onNavigate,
  depth = 0,
}: {
  item: SidebarNavItem;
  collapsed: boolean;
  isActive: boolean;
  onNavigate?: (id: string) => void;
  depth?: number;
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
        'flex items-center gap-3 w-full rounded-lg transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset',
        collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5',
        depth > 0 && !collapsed && 'pr-6 rtl:pl-6 rtl:pr-3',
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
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
            className="text-body-sm font-medium truncate flex-1 text-left rtl:text-right"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      {item.badge !== undefined && item.badge > 0 && !collapsed && (
        <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-error text-[11px] font-bold text-white flex items-center justify-center leading-none">
          {item.badge > 99 ? '99+' : item.badge}
        </span>
      )}
    </button>
  );
}

export function Sidebar({
  items,
  user,
  isCollapsed = false,
  onToggle,
  activeItem,
  onNavigate,
  className,
}: SidebarProps) {
  const reducedMotion = useReducedMotion();

  return (
    <aside
      aria-label="Sidebar navigation"
      className={cn(
        'hidden lg:flex flex-col bg-surface border-l rtl:border-r rtl:border-l-0 border-border h-screen sticky top-0',
        'transition-all duration-200 ease-in-out',
        isCollapsed ? 'w-[72px]' : 'w-[260px]',
        className
      )}
    >
      {/* Toggle button */}
      <div className={cn(
        'flex items-center px-4 h-16 border-b border-border',
        isCollapsed && 'justify-center px-0'
      )}>
        <button
          type="button"
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-2 text-text-muted hover:text-gold transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <motion.svg
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rtl:-scale-x-100"
          >
            <path d="M15 18l-6-6 6-6" />
          </motion.svg>
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {items.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            collapsed={isCollapsed}
            isActive={item.id === activeItem || !!item.active}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* User section */}
      {user && (
        <div className={cn(
          'border-t border-border p-3',
          isCollapsed && 'flex justify-center p-2'
        )}>
          <div className={cn(
            'flex items-center gap-3 px-2 py-2 rounded-lg',
            isCollapsed && 'px-0 justify-center'
          )}>
            <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center flex-shrink-0 overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-body-sm font-semibold text-gold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-body-sm font-medium text-text-primary truncate">{user.name}</p>
                  {user.role && <p className="text-caption text-text-muted truncate">{user.role}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </aside>
  );
}

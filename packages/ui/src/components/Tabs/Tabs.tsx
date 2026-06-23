'use client';

import { useRef } from 'react';
import { cn } from '../../utils/cn';
import type { TabsProps } from './Tabs.types';

const variantStyles = {
  underline: {
    list: 'border-b border-border',
    tab: 'px-4 py-3 text-body-sm font-medium border-b-2 border-transparent -mb-px transition-colors',
    active: 'text-gold border-gold',
    inactive: 'text-text-secondary hover:text-text-primary hover:border-border-light',
  },
  pills: {
    list: 'gap-1',
    tab: 'px-4 py-2 text-body-sm font-medium rounded-lg transition-colors',
    active: 'bg-gold text-text-inverse',
    inactive: 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
  },
  buttons: {
    list: 'gap-2',
    tab: 'px-5 py-2.5 text-body-sm font-medium rounded-lg border border-border transition-colors',
    active: 'bg-gold text-text-inverse border-gold',
    inactive: 'text-text-secondary hover:text-text-primary hover:border-border-light bg-surface',
  },
};

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}: TabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const style = variantStyles[variant];
  const active = tabs.find((t) => t.id === activeTab);

  return (
    <div className={cn('', className)}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation="horizontal"
        className={cn('flex items-center', style.list)}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => {
                const currentIndex = tabs.findIndex((t) => t.id === activeTab);
                let nextIndex: number | null = null;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  nextIndex = (currentIndex + 1) % tabs.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                if (nextIndex !== null) {
                  e.preventDefault();
                  onChange(tabs[nextIndex].id);
                  document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
                }
              }}
              className={cn(
                style.tab,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'whitespace-nowrap',
                isActive ? style.active : style.inactive
              )}
            >
              <span className="flex items-center gap-2">
                {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {active?.content && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="pt-4"
        >
          {active.content}
        </div>
      )}
    </div>
  );
}

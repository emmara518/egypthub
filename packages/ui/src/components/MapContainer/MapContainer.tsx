'use client';

import { useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import type { MapContainerProps, MapPinProps, MapTooltipProps, MapFiltersProps } from './MapContainer.types';

export function MapContainer({ center, zoom = 10, className, children, onCenterChange }: MapContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(
        'relative w-full h-[400px] sm:h-[500px] lg:h-[600px]',
        'bg-surface-elevated border border-border rounded-xl overflow-hidden',
        className
      )}
    >
      {/* Placeholder when no map library is integrated */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-gold mb-4">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p className="text-body-sm text-text-muted">خريطة</p>
          <p className="text-caption text-text-muted mt-1">خط العرض: {center.lat}، خط الطول: {center.lng}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function MapPin({ position, label, active = false, onClick, className }: MapPinProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'absolute z-10 transform -translate-x-1/2 -translate-y-full cursor-pointer',
        'transition-transform duration-200 hover:scale-110',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full',
        className
      )}
      style={{ left: `${((position.lng + 180) / 360) * 100}%`, top: `${((90 - position.lat) / 180) * 100}%` }}
      aria-label={label || `Location at ${position.lat}, ${position.lng}`}
    >
      <svg width={active ? 32 : 24} height={active ? 32 : 24} viewBox="0 0 24 24" fill={active ? '#D4A24C' : '#141B2D'} stroke={active ? '#D4A24C' : '#1E2A3D'} strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" fill={active ? '#0A0E17' : '#D4A24C'} />
      </svg>
      {label && (
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-bg-primary text-text-primary text-[10px] font-medium whitespace-nowrap shadow-md">
          {label}
        </span>
      )}
    </button>
  );
}

export function MapTooltip({ title, description, image, price, rating }: MapTooltipProps) {
  return (
    <div className="bg-surface-elevated border border-border rounded-lg shadow-xl p-3 min-w-[180px] max-w-[240px]">
      {image && (
        <div className="h-20 -mx-3 -mt-3 mb-2 overflow-hidden rounded-t-lg">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="text-body-sm font-semibold text-text-primary">{title}</div>
      {description && <div className="text-caption text-text-muted mt-0.5">{description}</div>}
      {price && <div className="text-body-sm font-bold text-gold mt-1">{price}</div>}
    </div>
  );
}

export function MapFilters({ categories, onToggle, className }: MapFiltersProps) {
  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onToggle(cat.id)}
          className={cn(
            'px-3 py-1.5 text-[12px] font-medium rounded-full border transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
            cat.active
              ? 'bg-gold text-text-inverse border-gold'
              : 'bg-surface text-text-secondary border-border hover:border-border-light hover:text-text-primary'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

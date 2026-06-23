'use client';

import { cn } from '../../utils/cn';
import type { HeroProps, HeroContentProps, HeroMediaProps, HeroSearchProps, HeroStatsProps, HeroCTAProps } from './Hero.types';

const sizeMap: Record<string, string> = {
  sm: 'min-h-[400px] py-16',
  md: 'min-h-[500px] py-20',
  lg: 'min-h-[600px] py-24',
  xl: 'min-h-[700px] py-32',
  full: 'min-h-screen py-32',
};

const gradientMap: Record<string, string> = {
  dark: 'bg-gradient-to-b from-bg-primary/40 via-bg-primary/70 to-bg-primary',
  gold: 'bg-gradient-to-b from-gold/5 via-bg-primary/40 to-bg-primary',
  none: '',
};

export function Hero({ children, className, size = 'lg', gradient = 'dark' }: HeroProps) {
  return (
    <section className={cn('relative flex items-center justify-center overflow-hidden', sizeMap[size], gradientMap[gradient], className)}>
      <div className="relative z-10 w-full max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

const alignMap: Record<string, string> = {
  left: 'text-left rtl:text-right',
  center: 'text-center',
  right: 'text-right rtl:text-left',
};

export function HeroContent({ title, subtitle, children, align = 'center', className }: HeroContentProps) {
  return (
    <div className={cn('max-w-3xl mx-auto', alignMap[align], className)}>
      <h1 className="text-display-sm sm:text-display-md lg:text-display-lg font-bold text-text-primary leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-body-lg text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

export function HeroMedia({ src, alt, overlay = true, className }: HeroMediaProps) {
  return (
    <div className={cn('absolute inset-0 z-0', className)}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {overlay && <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/30 to-bg-primary" />}
    </div>
  );
}

export function HeroSearch({ placeholder = 'ابحث عن وجهتك...', value, onChange, onSubmit, className }: HeroSearchProps) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}
      className={cn('flex items-center gap-2 max-w-xl mx-auto mt-8', className)}
    >
      <div className="relative flex-1">
        <svg className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 text-text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-10 rtl:pr-10 rtl:pl-4 bg-surface/80 backdrop-blur border border-border text-text-primary placeholder:text-text-muted rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-body-md"
          aria-label={placeholder}
        />
      </div>
      <button
        type="submit"
        className="h-12 px-6 bg-gold text-text-inverse font-semibold rounded-xl hover:bg-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold whitespace-nowrap"
      >
        بحث
      </button>
    </form>
  );
}

export function HeroStats({ items, className }: HeroStatsProps) {
  return (
    <div className={cn('flex items-center justify-center gap-8 sm:gap-12 mt-10 flex-wrap', className)}>
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-stat-md font-bold text-gold">{item.value}</div>
          <div className="text-body-sm text-text-secondary mt-0.5">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export function HeroCTA({ primaryLabel, primaryOnClick, secondaryLabel, secondaryOnClick, className }: HeroCTAProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4 mt-8 flex-wrap', className)}>
      <button
        type="button"
        onClick={primaryOnClick}
        className="h-12 px-8 bg-gold text-text-inverse font-semibold rounded-xl hover:bg-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        {primaryLabel}
      </button>
      {secondaryLabel && (
        <button
          type="button"
          onClick={secondaryOnClick}
          className="h-12 px-8 bg-surface border border-border text-text-primary font-semibold rounded-xl hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {secondaryLabel}
        </button>
      )}
    </div>
  );
}

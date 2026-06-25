'use client';

import { motion } from 'framer-motion';

interface BrandMotifProps {
  variant?: 'avatar-ring' | 'map-node' | 'gold-line';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function BrandMotif({ variant = 'avatar-ring', size = 'md', className = '' }: BrandMotifProps) {
  const sizes = { sm: 'w-12 h-12', md: 'w-20 h-20', lg: 'w-32 h-32' };
  const ringSizes = { sm: 'w-10 h-10', md: 'w-16 h-16', lg: 'w-28 h-28' };
  
  if (variant === 'gold-line') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="w-0.5 h-4 bg-theme-gold rounded-full" />
        <span className="h-px flex-1 bg-gradient-to-r from-theme-gold/40 to-transparent" />
      </div>
    );
  }

  if (variant === 'map-node') {
    return (
      <div className={`relative flex items-center justify-center ${sizes[size]} ${className}`}>
        <div className="absolute inset-0 rounded-full border border-theme-gold/20 animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-2 rounded-full border border-theme-gold/30" />
        <div className="w-3 h-3 rounded-full bg-theme-gold shadow-[0_0_10px_rgba(212,162,76,0.5)]" />
      </div>
    );
  }

  // Avatar ring variant (default)
  return (
    <div className={`relative flex items-center justify-center ${sizes[size]} ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-theme-gold/20 border-t-theme-gold/60"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-2 rounded-full border border-theme-gold/10 border-r-theme-gold/40 ${ringSizes[size]}`}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-4 rounded-full border border-theme-gold/5 border-b-theme-gold/30 ${ringSizes[size]}`}
      />
    </div>
  );
}

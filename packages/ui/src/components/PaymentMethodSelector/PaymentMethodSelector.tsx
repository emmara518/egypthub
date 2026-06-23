'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { PaymentMethodSelectorProps } from './PaymentMethodSelector.types';

const iconPaths: Record<string, JSX.Element> = {
  visa: <svg width="24" height="16" viewBox="0 0 24 16"><rect x="0.5" y="0.5" width="23" height="15" rx="2" fill="#1A1F71"/><text x="12" y="12" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="Arial">VISA</text></svg>,
  mastercard: <svg width="24" height="16" viewBox="0 0 24 16"><rect x="0.5" y="0.5" width="23" height="15" rx="2" fill="#ccc"/><circle cx="9" cy="8" r="4" fill="#EB001B"/><circle cx="15" cy="8" r="4" fill="#F79E1B"/></svg>,
  mada: <svg width="24" height="16" viewBox="0 0 24 16"><rect x="0.5" y="0.5" width="23" height="15" rx="2" fill="#004B87"/><text x="12" y="12" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial">MADA</text></svg>,
  stcpay: <svg width="24" height="16" viewBox="0 0 24 16"><rect x="0.5" y="0.5" width="23" height="15" rx="2" fill="#7B2D8E"/><text x="12" y="12" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="Arial">stc</text></svg>,
  applepay: <svg width="24" height="16" viewBox="0 0 24 16"><rect x="0.5" y="0.5" width="23" height="15" rx="2" fill="#000"/><text x="12" y="12" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial"></text></svg>,
};

export function PaymentMethodSelector({ options, selected, onChange, className }: PaymentMethodSelectorProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-3', className)}>
      {options.map((option) => (
        <motion.button key={option.id} whileTap={{ scale: 0.97 }} onClick={() => onChange(option.id)}
          className={cn('flex flex-col items-center gap-2 p-3 rounded-xl border transition-all', selected === option.id ? 'border-gold bg-gold/5 ring-1 ring-gold/30' : 'border-border bg-surface hover:border-gold/50')} aria-label={option.label} aria-pressed={selected === option.id}
        >
          {iconPaths[option.icon]}
          <span className="text-caption text-text-secondary">{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

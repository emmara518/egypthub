'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { InstallmentSelectorProps } from './InstallmentSelector.types';

export function InstallmentSelector({ plans, selected, onChange, currency = '$', className }: InstallmentSelectorProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {plans.map((plan) => (
        <motion.button key={plan.id} whileTap={{ scale: 0.97 }} onClick={() => onChange(plan.id)}
          className={cn('p-4 rounded-xl border text-center transition-all', selected === plan.id ? 'border-gold bg-gold/5 ring-1 ring-gold/30' : 'border-border bg-surface hover:border-gold/50')}
        >
          <span className="text-display-xs font-bold text-text-primary">{plan.months}</span>
          <span className="text-caption text-text-muted block mb-1">شهر</span>
          <span className="text-body-sm font-semibold text-gold">{currency}{plan.monthlyAmount}<span className="text-caption text-text-muted">/شهر</span></span>
          {plan.isNoInterest && <span className="block text-caption text-success mt-1">بدون فوائد</span>}
          {plan.totalAmount && <span className="block text-caption text-text-muted mt-0.5">المجموع {currency}{plan.totalAmount}</span>}
        </motion.button>
      ))}
    </div>
  );
}

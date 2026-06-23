'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { WalletCardProps } from './WalletCard.types';

export function WalletCard({ balance, currency = '$', cardNumber, isActive = true, onTopUp, className }: WalletCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} className={cn('relative rounded-2xl p-5 text-white overflow-hidden', isActive ? 'bg-gradient-to-br from-gold to-gold-dark' : 'bg-surface', className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <p className="text-caption opacity-80 mb-1">رصيد المحفظة</p>
        <p className="text-display-sm font-bold mb-4">{currency}{balance}</p>
        {cardNumber && <p className="text-body-sm font-mono opacity-70" dir="ltr">{cardNumber.replace(/(.{4})/g, '$1 ').trim()}</p>}
        {onTopUp && (
          <motion.button whileTap={{ scale: 0.95 }} onClick={onTopUp} className={cn('mt-4 px-4 py-2 rounded-xl text-body-sm font-semibold transition-colors', isActive ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gold text-text-inverse')}>
            شحن المحفظة
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

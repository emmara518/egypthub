'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { PaymentCardProps } from './PaymentCard.types';

const brandColors = { visa: '#1A1F71', mastercard: '#000', mada: '#004B87' };

export function PaymentCard({ cardNumber, cardHolder, expiry, brand = 'visa', isFlipped, className }: PaymentCardProps) {
  return (
    <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} className={cn('relative w-full max-w-[340px] h-[200px] rounded-2xl p-5 text-white overflow-hidden', className)} style={{ background: `linear-gradient(135deg, ${brandColors[brand]}, ${brandColors[brand]}cc)` }}>
      <div className="absolute top-4 right-4 opacity-30"><svg width="40" height="30" viewBox="0 0 24 16"><rect x="0.5" y="0.5" width="23" height="15" rx="2" fill="white"/></svg></div>
      <div className={cn('flex flex-col justify-between h-full transition-all', isFlipped ? 'opacity-0' : 'opacity-100')}>
        <div className="flex items-center justify-between">
          <span className="text-caption opacity-70">{brand === 'mada' ? 'مدى' : brand === 'visa' ? 'VISA' : 'MASTERCARD'}</span>
        </div>
        <div>
          <p className="text-lg tracking-widest font-mono mb-4" dir="ltr">{cardNumber.replace(/(.{4})/g, '$1 ').trim()}</p>
          <div className="flex items-center justify-between text-caption">
            <div><span className="opacity-70 text-[10px] block">حامل البطاقة</span><span>{cardHolder}</span></div>
            <div><span className="opacity-70 text-[10px] block">تاريخ الانتهاء</span><span>{expiry}</span></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

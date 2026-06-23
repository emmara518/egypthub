'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { BookingConfirmationProps } from './BookingConfirmation.types';

const statusConfig = { confirmed: { icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, label: 'تم تأكيد الحجز' }, pending: { icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warning"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, label: 'قيد المراجعة' }, cancelled: { icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-error"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>, label: 'تم الإلغاء' } };

export function BookingConfirmation({ bookingId, status = 'confirmed', details, message, onViewBooking, className }: BookingConfirmationProps) {
  const config = statusConfig[status];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className={cn('bg-surface border border-border rounded-2xl p-6 text-center', className)}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="flex justify-center mb-4">
        {config.icon}
      </motion.div>
      <h3 className="text-heading-sm font-bold text-text-primary mb-2">{config.label}</h3>
      <p className="text-body-sm text-text-secondary mb-1">رقم الحجز: <span className="font-mono font-semibold text-gold" dir="ltr">{bookingId}</span></p>
      {message && <p className="text-body-sm text-text-secondary mb-4">{message}</p>}
      <div className="text-right space-y-2 mb-4">
        {details.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-body-sm"><span className="text-text-muted">{d.label}</span><span className="text-text-primary font-medium">{d.value}</span></div>
        ))}
      </div>
      {onViewBooking && (
        <motion.button whileTap={{ scale: 0.98 }} onClick={onViewBooking} className="w-full py-2.5 bg-gold text-text-inverse rounded-xl text-body-sm font-semibold hover:bg-gold-light transition-colors">
          عرض الحجز
        </motion.button>
      )}
    </motion.div>
  );
}

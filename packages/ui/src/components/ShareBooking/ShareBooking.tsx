'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { ShareBookingProps } from './ShareBooking.types';

export function ShareBooking({ url, message = 'شاهد رحلتي على إيجيبت هب!', platforms = ['whatsapp', 'email', 'copy'], onShare, className }: ShareBookingProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      onShare?.('copy');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [url, onShare]);

  const buttons: Record<string, { label: string; icon: JSX.Element; action: () => void }> = {
    whatsapp: { label: 'واتساب', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, action: () => { window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`, '_blank'); onShare?.('whatsapp'); } },
    email: { label: 'بريد', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-primary"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, action: () => { window.open(`mailto:?subject=${encodeURIComponent(message)}&body=${encodeURIComponent(url)}`); onShare?.('email'); } },
    copy: { label: copied ? 'تم' : 'رابط', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={copied ? 'text-success' : 'text-text-primary'}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, action: handleCopy },
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {platforms.map((p) => {
        const btn = buttons[p];
        if (!btn) return null;
        return (
          <motion.button key={p} whileTap={{ scale: 0.95 }} onClick={btn.action} className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-xl hover:border-gold/50 transition-colors text-body-sm font-medium text-text-primary" aria-label={btn.label}>
            {btn.icon}
            <span>{btn.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { VoiceStatusProps, VoiceStatusType } from './VoiceStatus.types';

const statusConfig: Record<VoiceStatusType, { icon: string; label: string; color: string }> = {
  idle: { icon: '○', label: 'انقر للتحدث', color: 'text-text-muted' },
  listening: { icon: '●', label: 'استماع...', color: 'text-success' },
  processing: { icon: '◌', label: 'معالجة...', color: 'text-gold' },
  speaking: { icon: '▶', label: 'تحدث...', color: 'text-gold' },
  error: { icon: '✕', label: 'حدث خطأ', color: 'text-error' },
};

export function VoiceStatus({ status = 'idle', message, className }: VoiceStatusProps) {
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex items-center gap-2 px-4 py-2', className)}
    >
      <motion.span
        animate={status === 'listening' ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className={cn('text-body-md', config.color)}
      >
        {config.icon}
      </motion.span>
      <span className="text-body-sm text-text-secondary">
        {message || config.label}
      </span>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { VoiceWaveformProps } from './VoiceWaveform.types';

export function VoiceWaveform({ isActive = false, bars = 32, className }: VoiceWaveformProps) {
  return (
    <div
      className={cn('flex items-center gap-[2px] h-10', className)}
      aria-label={isActive ? 'موجة صوتية نشطة' : 'موجة صوتية'}
      role="img"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const height = isActive
          ? 20 + Math.sin(i * 0.8 + Date.now() * 0.003) * 15 + Math.random() * 10
          : 6 + (i % 5) * 3;

        return (
          <motion.div
            key={i}
            className={cn(
              'w-[3px] rounded-full transition-colors duration-300',
              isActive ? 'bg-gold' : 'bg-border'
            )}
            animate={
              isActive
                ? {
                    height: [
                      20 + Math.sin(i * 0.8) * 10,
                      20 + Math.sin(i * 0.8 + 1) * 15,
                      20 + Math.sin(i * 0.8 + 2) * 8,
                      20 + Math.sin(i * 0.8 + 3) * 18,
                    ],
                    opacity: [0.6, 1, 0.7, 0.9],
                  }
                : undefined
            }
            transition={{
              duration: 0.8 + (i % 4) * 0.15,
              repeat: Infinity,
              delay: i * 0.04,
              ease: 'easeInOut',
            }}
            style={{ height }}
          />
        );
      })}
    </div>
  );
}

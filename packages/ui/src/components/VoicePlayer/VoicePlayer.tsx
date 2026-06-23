'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { VoiceWaveform } from '../VoiceWaveform';
import type { VoicePlayerProps } from './VoicePlayer.types';

export function VoicePlayer({ src, isPlaying: controlledPlaying, onPlay, onPause, onEnded, className }: VoicePlayerProps) {
  const [internalPlaying, setInternalPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = controlledPlaying ?? internalPlaying;

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      setInternalPlaying(false);
      onPause?.();
    } else {
      setInternalPlaying(true);
      onPlay?.();
    }
  }, [isPlaying, onPlay, onPause]);

  const handleEnded = useCallback(() => {
    setInternalPlaying(false);
    setProgress(0);
    onEnded?.();
  }, [onEnded]);

  return (
    <div className={cn('flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3', className)}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
        className="w-9 h-9 rounded-full bg-gold text-text-inverse flex items-center justify-center flex-shrink-0 hover:bg-gold-light transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          {isPlaying ? (
            <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>
          ) : (
            <polygon points="5 3 19 12 5 21 5 3" />
          )}
        </svg>
      </motion.button>

      <VoiceWaveform isActive={isPlaying} bars={24} />

      {src && (
        <audio
          ref={audioRef}
          src={src}
          onEnded={handleEnded}
          onTimeUpdate={(e) => {
            const audio = e.currentTarget;
            setProgress((audio.currentTime / (audio.duration || 1)) * 100);
          }}
        />
      )}
    </div>
  );
}

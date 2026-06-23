'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { VoiceRecorderProps } from './VoiceRecorder.types';

export function VoiceRecorder({ onStart, onStop, isRecording: controlledRecording, maxDuration = 60, isDisabled, className }: VoiceRecorderProps) {
  const [internalRecording, setInternalRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const isRecording = controlledRecording ?? internalRecording;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const startRecording = useCallback(() => {
    if (isDisabled) return;
    setInternalRecording(true);
    setDuration(0);
    onStart?.();
    intervalRef.current = setInterval(() => {
      setDuration((prev) => {
        if (prev >= maxDuration) {
          stopRecording();
          return maxDuration;
        }
        return prev + 1;
      });
    }, 1000);
  }, [isDisabled, maxDuration, onStart]);

  const stopRecording = useCallback(() => {
    clearTimer();
    setInternalRecording(false);
    onStop?.(duration);
  }, [clearTimer, duration, onStop]);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleRecording}
        disabled={isDisabled}
        aria-label={isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل'}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
          isRecording
            ? 'bg-error text-white shadow-lg shadow-error/30 animate-pulse'
            : 'bg-surface border border-border text-text-secondary hover:border-gold hover:text-gold',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        )}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          {isRecording ? (
            <rect x="6" y="6" width="12" height="12" rx="2" />
          ) : (
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          )}
        </svg>
      </motion.button>

      {isRecording && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
          <span className="text-body-sm font-medium text-text-primary tabular-nums">
            {formatDuration(duration)}
          </span>
        </motion.div>
      )}
    </div>
  );
}

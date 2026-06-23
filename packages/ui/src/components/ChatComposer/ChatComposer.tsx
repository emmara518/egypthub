'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { ChatComposerProps } from './ChatComposer.types';

export function ChatComposer({ onSend, placeholder = 'اكتب رسالتك...', isDisabled, className }: ChatComposerProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isDisabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, isDisabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div
      className={cn(
        'flex items-end gap-2 p-4 border-t border-border bg-surface',
        className
      )}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isDisabled}
        rows={1}
        className={cn(
          'flex-1 bg-bg-primary text-text-primary text-body-sm rounded-xl px-4 py-3',
          'border border-border focus:border-gold focus:ring-1 focus:ring-gold/30',
          'placeholder:text-text-muted resize-none outline-none transition-colors',
          'min-h-[44px] max-h-[120px]'
        )}
        aria-label={placeholder}
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        disabled={isDisabled || !value.trim()}
        aria-label="إرسال"
        className={cn(
          'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center',
          'bg-gold text-text-inverse transition-all duration-200',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'hover:bg-gold-light active:bg-gold-dark'
        )}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </motion.button>
    </div>
  );
}

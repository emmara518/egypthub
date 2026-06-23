'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Avatar } from '../Avatar';
import type { ChatWindowProps } from './ChatWindow.types';

export function ChatWindow({ children, title = 'المساعد الذكي', subtitle, isOpen = true, onClose, headerAvatar, className }: ChatWindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'flex flex-col bg-bg-primary border border-border rounded-2xl shadow-xl overflow-hidden',
            'w-full max-w-md h-[600px] max-h-[80vh]',
            className
          )}
          role="dialog"
          aria-label={title}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface">
            {headerAvatar && <Avatar src={headerAvatar} alt={title} size="sm" />}
            <div className="flex-1 min-w-0">
              <h3 className="text-body-md font-semibold text-text-primary truncate">{title}</h3>
              {subtitle && <p className="text-caption text-text-muted truncate">{subtitle}</p>}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
                aria-label="إغلاق المحادثة"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Close, CheckSimple } from '@/components/Icons';

export default function NotificationBell() {
  const { notifications, markRead } = useAppStore();
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const recent = notifications.slice(0, 5);

  useEffect(() => {
    if (unreadCount > 0) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 3000);
      return () => clearTimeout(t);
    }
  }, [unreadCount]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const clearAll = () => {
    notifications.forEach((n) => {
      if (!n.read) markRead(n.id);
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`relative p-2 rounded-lg transition-all ${
          open ? 'bg-theme-gold/10 text-theme-gold' : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
        aria-label="الإشعارات"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <motion.span
            animate={pulse ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
            className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-theme-gold text-[#0A0E17] text-[9px] font-bold flex items-center justify-center font-english"
            style={{ minWidth: '18px', minHeight: '18px', fontSize: '9px', lineHeight: '1' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-[#141B2D] border border-theme-gold/20 shadow-elevation-lg overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-cairo">الإشعارات</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-theme-gold font-cairo hover:underline"
                  >
                    مسح الكل
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {recent.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-3xl mb-2">🔔</div>
                  <p className="text-sm text-theme-muted font-cairo">لا توجد إشعارات</p>
                </div>
              ) : (
                recent.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-white/5 ${
                      n.read ? '' : 'bg-theme-gold/5'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      n.read ? 'bg-transparent' : 'bg-theme-gold'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-cairo ${
                        n.read ? 'text-theme-secondary' : 'text-white'
                      }`}>{n.message}</p>
                      <p className="text-[10px] text-theme-muted font-cairo mt-0.5">
                        {new Date(n.date).toLocaleString('ar-EG')}
                      </p>
                    </div>
                    {!n.read && (
                      <button
                        onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                        className="w-6 h-6 rounded-full bg-theme-gold/10 flex items-center justify-center text-theme-gold shrink-0"
                      >
                        <CheckSimple size={10} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="block p-3 text-center text-sm text-theme-gold font-cairo border-t border-white/5 hover:bg-white/5 transition-all"
            >
              عرض كل الإشعارات
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

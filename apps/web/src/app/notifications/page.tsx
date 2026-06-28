'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

type FilterType = 'all' | 'unread';

function groupByDate(notifications: { id: string; message: string; read: boolean; date: string }[]) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const weekAgo = new Date(today.getTime() - 7 * 86400000);

  const groups: Record<string, typeof notifications> = {};

  for (const n of notifications) {
    const d = new Date(n.date);
    let key: string;
    if (d >= today) key = 'اليوم';
    else if (d >= yesterday) key = 'أمس';
    else if (d >= weekAgo) key = 'هذا الأسبوع';
    else key = 'سابقاً';

    if (!groups[key]) groups[key] = [];
    groups[key].push(n);
  }

  return groups;
}

function getNotificationIcon(message: string) {
  if (message.includes('تأكيد') || message.includes('تم')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );
  }
  if (message.includes('عرض') || message.includes('خصم') || message.includes('العيد')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  if (message.includes('تذكير')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function EmptyStateIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" className="mx-auto mb-4 opacity-30">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function NotificationsPage() {
  const { notifications, markRead } = useAppStore();
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = useMemo(() => {
    return filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;
  }, [notifications, filter]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    notifications.forEach((n) => {
      if (!n.read) markRead(n.id);
    });
  };

  const order = ['اليوم', 'أمس', 'هذا الأسبوع', 'سابقاً'];

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-3xl mx-auto px-4 lg:px-6 py-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          العودة للرئيسية
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">الإشعارات</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-white/60 mt-1">{unreadCount} إشعارات غير مقروءة</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-sm hover:bg-theme-gold/10 transition-all flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              تحديد الكل كمقروء
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {(['all', 'unread'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                filter === f
                  ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20'
                  : 'text-white/60 hover:text-white bg-theme-surface border border-white/[0.08]'
              }`}
            >
              {f === 'all' ? 'الكل' : 'غير مقروء'}
              {f === 'unread' && unreadCount > 0 && (
                <span className="mr-1 text-xs opacity-60">({unreadCount})</span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <EmptyStateIcon />
            <h2 className="text-xl font-bold text-white mb-2">لا توجد إشعارات</h2>
            <p className="text-white/60 text-sm">
              {filter === 'unread' ? 'ليس لديك إشعارات غير مقروءة' : 'ستظهر الإشعارات هنا عند توفرها'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {order.map((groupKey) => {
              const items = grouped[groupKey];
              if (!items || items.length === 0) return null;

              return (
                <div key={groupKey}>
                  <h3 className="text-sm font-bold text-white/40 mb-3 px-1">{groupKey}</h3>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {items.map((n, idx) => (
                        <motion.div
                          key={n.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          onClick={() => markRead(n.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            n.read
                              ? 'border-white/[0.05] bg-theme-surface/50'
                              : 'border-theme-gold/15 bg-theme-gold/[0.03]'
                          } hover:border-theme-gold/30`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-theme-bg border border-white/[0.05] flex items-center justify-center shrink-0">
                              {getNotificationIcon(n.message)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm ${
                                n.read ? 'text-white/60' : 'text-white font-medium'
                              }`}>{n.message}</p>
                              <p className="text-xs text-white/40 mt-1.5">
                                {new Date(n.date).toLocaleString('ar-EG')}
                              </p>
                            </div>
                            {!n.read && (
                              <div className="shrink-0 mt-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                                  className="w-7 h-7 rounded-full bg-theme-gold/10 flex items-center justify-center text-theme-gold hover:bg-theme-gold/20 transition-all touch-target"
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SavedPage {
  url: string;
  title: string;
  savedAt: string;
}

export default function OfflinePage() {
  const [savedPages, setSavedPages] = useState<SavedPage[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [cacheStatus, setCacheStatus] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const stored = localStorage.getItem('egypthub-offline-pages');
    if (stored) setSavedPages(JSON.parse(stored));

    if ('caches' in window) {
      caches.open('egypthub-v1').then((cache) => {
        cache.keys().then((keys) => setCacheStatus(`${keys.length} ملف`));
      });
    }
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveCurrentPage = () => {
    const entry: SavedPage = {
      url: window.location.pathname,
      title: document.title || 'الصفحة الحالية',
      savedAt: new Date().toISOString(),
    };
    const updated = [...savedPages, entry];
    setSavedPages(updated);
    localStorage.setItem('egypthub-offline-pages', JSON.stringify(updated));
  };

  const removePage = (url: string) => {
    const updated = savedPages.filter((p) => p.url !== url);
    setSavedPages(updated);
    localStorage.setItem('egypthub-offline-pages', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#080C18] pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-cairo mb-2">التصفح بدون نت</h1>
          <p className="text-sm text-white/60 font-cairo">الصفحات اللي حفظتها تقدر تقراها في أي وقت</p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className={`text-xs font-cairo ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            {isOnline ? 'متصل بالنت' : 'غير متصل — تستخدم النسخة المخزنة'}
          </span>
          {cacheStatus && <span className="text-xs text-white/40 font-cairo">| {cacheStatus} بالكاش</span>}
        </div>

        {!isOnline && (
          <div className="px-4 py-2 rounded-xl bg-theme-gold/10 border border-theme-gold/20 text-theme-gold text-sm font-cairo text-center mb-6">
            أنت الآن تستعرض المحتوى المخزن — بعض الميزات قد لا تعمل
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <span className="text-xs text-green-400 font-cairo">متاح للتصفح بدون نت</span>
          </div>
          <button onClick={saveCurrentPage} className="w-full px-4 py-3 rounded-xl bg-gradient-gold text-[#0A0E17] font-cairo font-bold text-sm">
            احفظ الصفحة الحالية للقراءة بدون نت
          </button>
        </div>

        <div className="space-y-3">
          {savedPages.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4A24C/30" strokeWidth="1.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
              <p className="text-sm text-white/40 font-cairo">لا توجد صفحات محفوظة بعد</p>
              <p className="text-xs text-white/30 font-cairo mt-1">احفظ الصفحات اللي عايز تقراها من غير نت</p>
            </div>
          ) : (
            savedPages.map((page, idx) => (
              <motion.div
                key={page.url + idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Link href={page.url} className="text-sm text-white font-cairo hover:text-theme-gold transition-colors">
                      {page.title}
                    </Link>
                    <p className="text-[10px] text-white/40 font-cairo mt-0.5">{new Date(page.savedAt).toLocaleDateString('ar-EG')}</p>
                  </div>
                  <button onClick={() => removePage(page.url)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

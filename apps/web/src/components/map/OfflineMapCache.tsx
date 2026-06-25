'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const MAP_CACHE_KEY = 'egypthub-offline-map';
const MAP_META_KEY = 'egypthub-offline-map-meta';

export default function OfflineMapCache() {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'ready' | 'unavailable'>('idle');
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const meta = localStorage.getItem(MAP_META_KEY);
    if (meta) {
      const { size: s } = JSON.parse(meta);
      setSize(s);
      setStatus('ready');
    } else {
      setStatus('unavailable');
    }
  }, []);

  const handleDownload = useCallback(async () => {
    setStatus('downloading');
    setProgress(0);
    try {
      const cached = await caches.open('egypthub-v1');
      const mapData = {
        version: Date.now(),
        paths: {
          cairo: 'M30,40 L50,30 L70,45 L60,60 L40,55 Z',
          alexandria: 'M20,20 L45,15 L50,30 L30,40 Z',
          luxor: 'M55,65 L75,60 L80,75 L60,80 Z',
          aswan: 'M50,80 L70,78 L75,90 L55,92 Z',
          hurghada: 'M78,55 L90,50 L92,65 L80,70 Z',
          sharm: 'M82,30 L92,25 L95,40 L85,45 Z',
          dahab: 'M85,28 L90,22 L93,30 L88,32 Z',
          siwa: 'M10,35 L25,32 L28,45 L15,48 Z',
        },
        destinations: [
          { id: 'cairo', name: 'القاهرة', lat: 30.0444, lng: 31.2357 },
          { id: 'alexandria', name: 'الإسكندرية', lat: 31.2001, lng: 29.9187 },
          { id: 'luxor', name: 'الأقصر', lat: 25.6872, lng: 32.6396 },
          { id: 'aswan', name: 'أسوان', lat: 24.0889, lng: 32.8998 },
          { id: 'sharm-el-sheikh', name: 'شرم الشيخ', lat: 27.9158, lng: 34.33 },
          { id: 'hurghada', name: 'الغردقة', lat: 27.2579, lng: 33.8116 },
          { id: 'dahab', name: 'دهب', lat: 28.5015, lng: 34.5154 },
          { id: 'siwa', name: 'واحة سيوة', lat: 29.2032, lng: 25.5117 },
        ],
      };
      const steps = 5;
      for (let i = 1; i <= steps; i++) {
        await new Promise(r => setTimeout(r, 300));
        setProgress(Math.round((i / steps) * 100));
      }
      const dataStr = JSON.stringify(mapData);
      localStorage.setItem(MAP_CACHE_KEY, dataStr);
      const dataSize = (new Blob([dataStr]).size / 1024).toFixed(1);
      localStorage.setItem(MAP_META_KEY, JSON.stringify({ size: dataSize }));
      setSize(dataSize);
      setStatus('ready');
    } catch {
      setStatus('unavailable');
    }
  }, []);

  const handleDelete = () => {
    localStorage.removeItem(MAP_CACHE_KEY);
    localStorage.removeItem(MAP_META_KEY);
    setStatus('unavailable');
    setSize('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-theme-gold/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
        </div>
        <div>
          <h3 className="text-sm font-bold text-white font-cairo">الخرائط للاستخدام بدون نت</h3>
          <p className="text-xs text-white/50 font-cairo">حمّل خريطة مصر وشوف الأماكن من غير نت</p>
        </div>
      </div>

      {status === 'downloading' && (
        <div className="space-y-2 mb-3">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-gold"
            />
          </div>
          <p className="text-xs text-theme-gold font-cairo text-center">{progress}% — جار التحميل...</p>
        </div>
      )}

      {status === 'ready' && (
        <div className="mb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <span className="text-xs text-green-400 font-cairo">متاح للتصفح بدون نت — {size} KB</span>
          </div>
          <button onClick={handleDelete} className="text-xs text-red-400 font-cairo hover:text-red-300 transition-colors">حذف الخريطة</button>
        </div>
      )}

      {status === 'unavailable' && (
        <p className="text-xs text-white/50 mb-3 font-cairo">غير متاح — الخريطة مش محملة</p>
      )}

      {status !== 'downloading' && (
        <button
          onClick={status === 'ready' ? handleDelete : handleDownload}
          className={`w-full px-4 py-2.5 rounded-xl font-cairo font-bold text-sm transition-all ${
            status === 'ready'
              ? 'border border-red-400/30 text-red-400 hover:bg-red-500/10'
              : 'bg-gradient-gold text-[#0A0E17] hover:brightness-110'
          }`}
        >
          {status === 'ready' ? 'حذف الخريطة المحملة' : 'تحميل الخريطة للاستخدام بدون نت'}
        </button>
      )}
    </motion.div>
  );
}

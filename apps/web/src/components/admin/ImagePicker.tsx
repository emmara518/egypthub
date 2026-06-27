'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  uploadedAt: string;
}

interface ImagePickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  multiple?: boolean;
  onSelectMultiple?: (urls: string[]) => void;
}

const SAMPLE_MEDIA: MediaItem[] = [
  { id: '1', url: '/assets/home/pyramids.jpg', filename: 'pyramids.jpg', size: 245000, type: 'image/jpeg', uploadedAt: '2026-06-20' },
  { id: '2', url: '/assets/home/nile-sunset.jpg', filename: 'nile-sunset.jpg', size: 312000, type: 'image/jpeg', uploadedAt: '2026-06-19' },
  { id: '3', url: '/assets/home/red-sea.jpg', filename: 'red-sea.jpg', size: 198000, type: 'image/jpeg', uploadedAt: '2026-06-18' },
  { id: '4', url: '/assets/home/luxor-temple.jpg', filename: 'luxor-temple.jpg', size: 267000, type: 'image/jpeg', uploadedAt: '2026-06-17' },
  { id: '5', url: '/assets/home/desert-dahab.jpg', filename: 'desert-dahab.jpg', size: 178000, type: 'image/jpeg', uploadedAt: '2026-06-16' },
  { id: '6', url: '/assets/home/alexandria.jpg', filename: 'alexandria.jpg', size: 223000, type: 'image/jpeg', uploadedAt: '2026-06-15' },
  { id: '7', url: '/images/egypt/pyramids.webp', filename: 'pyramids.webp', size: 89000, type: 'image/webp', uploadedAt: '2026-06-14' },
  { id: '8', url: '/images/egypt/nile.webp', filename: 'nile.webp', size: 76000, type: 'image/webp', uploadedAt: '2026-06-13' },
  { id: '9', url: '/images/egypt/luxor.webp', filename: 'luxor.webp', size: 92000, type: 'image/webp', uploadedAt: '2026-06-12' },
  { id: '10', url: '/images/egypt/desert.webp', filename: 'desert.webp', size: 67000, type: 'image/webp', uploadedAt: '2026-06-11' },
  { id: '11', url: '/images/egypt/redsea.webp', filename: 'redsea.webp', size: 84000, type: 'image/webp', uploadedAt: '2026-06-10' },
  { id: '12', url: '/images/destinations/cairo.jpg', filename: 'cairo.jpg', size: 195000, type: 'image/jpeg', uploadedAt: '2026-06-09' },
  { id: '13', url: '/images/destinations/hurghada.jpg', filename: 'hurghada.jpg', size: 212000, type: 'image/jpeg', uploadedAt: '2026-06-08' },
  { id: '14', url: '/images/destinations/luxor.jpg', filename: 'luxor.jpg', size: 234000, type: 'image/jpeg', uploadedAt: '2026-06-07' },
  { id: '15', url: '/images/destinations/alexandria.jpg', filename: 'alexandria.jpg', size: 188000, type: 'image/jpeg', uploadedAt: '2026-06-06' },
  { id: '16', url: '/assets/back_ground.webp', filename: 'back_ground.webp', size: 156000, type: 'image/webp', uploadedAt: '2026-06-05' },
  { id: '17', url: '/images/businesses/cleopatra-hotel.jpg', filename: 'cleopatra-hotel.jpg', size: 178000, type: 'image/jpeg', uploadedAt: '2026-06-04' },
  { id: '18', url: '/images/businesses/nile-cruise.jpg', filename: 'nile-cruise.jpg', size: 245000, type: 'image/jpeg', uploadedAt: '2026-06-03' },
  { id: '19', url: '/images/activities/diving-activity.jpg', filename: 'diving-activity.jpg', size: 198000, type: 'image/jpeg', uploadedAt: '2026-06-02' },
  { id: '20', url: '/images/stories/camel-trek.svg', filename: 'camel-trek.svg', size: 45000, type: 'image/svg+xml', uploadedAt: '2026-06-01' },
];

export default function ImagePicker({ open, onClose, onSelect, multiple, onSelectMultiple }: ImagePickerProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setSelected(new Set());
    try {
      const stored = localStorage.getItem('egypthub_media');
      const uploaded: MediaItem[] = stored ? JSON.parse(stored) : [];
      setMedia([...uploaded, ...SAMPLE_MEDIA]);
    } catch { setMedia(SAMPLE_MEDIA); }
    setLoading(false);
  }, [open]);

  const filtered = search.trim()
    ? media.filter(m => m.filename.toLowerCase().includes(search.toLowerCase()))
    : media;

  const toggleSelect = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    const urls = media.filter(m => selected.has(m.id)).map(m => m.url);
    if (multiple && onSelectMultiple) {
      onSelectMultiple(urls);
    } else if (urls.length > 0) {
      onSelect(urls[0]);
    }
    onClose();
  }, [selected, media, multiple, onSelect, onSelectMultiple, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-w-4xl w-full max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-cairo text-theme">اختر صورة</h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="بحث عن صور..."
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-theme-gold border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-theme-muted font-cairo text-sm">لا توجد صور</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {filtered.map((item) => {
                    const isSelected = selected.has(item.id);
                    return (
                      <motion.button
                        key={item.id}
                        layout
                        onClick={() => toggleSelect(item.id)}
                        className={`relative rounded-xl overflow-hidden border-2 aspect-square transition-all ${
                          isSelected ? 'border-theme-gold ring-1 ring-theme-gold/50' : 'border-theme-gold/10 hover:border-theme-gold/30'
                        }`}
                      >
                        <img src={item.url} alt={item.filename} className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatar.png'; }} />
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-theme-gold flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                          </div>
                        )}
                        <div className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/70 to-transparent">
                          <p className="text-[8px] text-white/80 truncate font-english">{item.filename}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-theme-gold/10">
              <span className="text-xs text-theme-muted font-cairo">{selected.size} مختار</span>
              <div className="flex gap-3">
                <button onClick={onClose} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={handleConfirm} disabled={selected.size === 0}
                  className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all disabled:opacity-50">
                  {multiple ? `إضافة (${selected.size})` : 'اختيار'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

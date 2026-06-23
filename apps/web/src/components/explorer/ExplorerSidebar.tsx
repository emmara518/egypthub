'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplorerFilter, ExplorerNodeType } from '@/lib/explorer/types';

interface ExplorerSidebarProps {
  onFilterChange: (filter: ExplorerFilter) => void;
  onLayerChange: (layer: ExplorerNodeType | 'all') => void;
  activeLayer: string;
  activeFilter: ExplorerFilter;
  availableCategories: string[];
  resultsCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

const LAYERS: { key: ExplorerNodeType | 'all'; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'city', label: 'مدن' },
  { key: 'experience', label: 'تجارب' },
  { key: 'story', label: 'قصص' },
  { key: 'food', label: 'أكل' },
  { key: 'ambassador', label: 'مرشدون' },
];

const CATEGORIES = [
  'Adventure', 'Culture', 'History', 'Food', 'Relaxation',
  'Luxury', 'Family', 'Photography', 'Diving', 'Nature', 'Local Life',
];

const PRICE_RANGES = ['منخفض', 'متوسط', 'مرتفع'];
const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging'];

export default function ExplorerSidebar({
  onFilterChange,
  onLayerChange,
  activeLayer,
  activeFilter,
  availableCategories,
  resultsCount,
  isOpen,
  onToggle,
}: ExplorerSidebarProps) {
  const [filterVisible, setFilterVisible] = useState(true);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeFilter.categories.length > 0) count += activeFilter.categories.length;
    if (activeFilter.priceRange.length > 0) count += activeFilter.priceRange.length;
    if (activeFilter.difficulty.length > 0) count += activeFilter.difficulty.length;
    if (activeFilter.intents.length > 0) count += activeFilter.intents.length;
    return count;
  }, [activeFilter]);

  const toggleCategory = (cat: string) => {
    const next = activeFilter.categories.includes(cat)
      ? activeFilter.categories.filter(c => c !== cat)
      : [...activeFilter.categories, cat];
    onFilterChange({ ...activeFilter, categories: next });
  };

  const togglePrice = (range: string) => {
    const next = activeFilter.priceRange.includes(range)
      ? activeFilter.priceRange.filter(r => r !== range)
      : [...activeFilter.priceRange, range];
    onFilterChange({ ...activeFilter, priceRange: next });
  };

  const toggleDifficulty = (diff: string) => {
    const next = activeFilter.difficulty.includes(diff)
      ? activeFilter.difficulty.filter(d => d !== diff)
      : [...activeFilter.difficulty, diff];
    onFilterChange({ ...activeFilter, difficulty: next });
  };

  const clearAll = () => {
    onFilterChange({ ...activeFilter, categories: [], priceRange: [], difficulty: [], intents: [] });
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-theme-gold text-theme-bg flex items-center justify-center shadow-lg"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed lg:sticky top-0 right-0 z-40 w-72 h-full overflow-y-auto bg-theme-bg lg:bg-transparent border-l border-theme-border p-5 space-y-6"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-theme font-cairo">التصفية</h3>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-theme-gold hover:underline font-cairo"
                  >
                    مسح الكل
                  </button>
                )}
                <button onClick={onToggle} className="lg:hidden text-theme-secondary hover:text-theme">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs text-theme-secondary font-cairo mb-2">
                {resultsCount} نتيجة
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-theme mb-3 font-cairo">الطبقات</p>
              <div className="flex flex-wrap gap-1.5">
                {LAYERS.map(layer => (
                  <button
                    key={layer.key}
                    onClick={() => onLayerChange(layer.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-cairo border transition-all duration-200 ${
                      activeLayer === layer.key
                        ? 'bg-theme-gold/10 border-theme-gold text-theme-gold'
                        : 'border-theme-border text-theme-secondary hover:border-theme-gold/50 hover:text-theme'
                    }`}
                  >
                    {layer.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => setFilterVisible(!filterVisible)}
                className="flex items-center justify-between w-full text-xs font-semibold text-theme mb-3 font-cairo"
              >
                التصنيفات
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`transition-transform duration-200 ${filterVisible ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <AnimatePresence>
                {filterVisible && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {CATEGORIES.filter(cat => availableCategories.length === 0 || availableCategories.includes(cat)).map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1.5 rounded-full text-xs font-cairo border transition-all duration-200 ${
                            activeFilter.categories.includes(cat)
                              ? 'bg-theme-gold/10 border-theme-gold text-theme-gold'
                              : 'border-theme-border text-theme-secondary hover:border-theme-gold/50 hover:text-theme'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <p className="text-xs font-semibold text-theme mb-3 font-cairo">نطاق السعر</p>
              <div className="flex flex-wrap gap-1.5">
                {PRICE_RANGES.map(range => (
                  <button
                    key={range}
                    onClick={() => togglePrice(range)}
                    className={`px-3 py-1.5 rounded-full text-xs font-cairo border transition-all duration-200 ${
                      activeFilter.priceRange.includes(range)
                        ? 'bg-theme-gold/10 border-theme-gold text-theme-gold'
                        : 'border-theme-border text-theme-secondary hover:border-theme-gold/50 hover:text-theme'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-theme mb-3 font-cairo">الصعوبة</p>
              <div className="flex flex-wrap gap-1.5">
                {DIFFICULTIES.map(diff => (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-full text-xs font-cairo border transition-all duration-200 ${
                      activeFilter.difficulty.includes(diff)
                        ? 'bg-theme-gold/10 border-theme-gold text-theme-gold'
                        : 'border-theme-border text-theme-secondary hover:border-theme-gold/50 hover:text-theme'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2"
              >
                <button
                  onClick={clearAll}
                  className="w-full py-2 rounded-lg border border-theme-gold/30 text-theme-gold text-xs font-cairo hover:bg-theme-gold/5 transition-colors"
                >
                  إزالة جميع الفلاتر ({activeFilterCount})
                </button>
              </motion.div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

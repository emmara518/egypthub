'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchSuggestion {
  id: string;
  label: string;
  labelEn?: string;
  type: string;
  icon?: string;
}

interface ExplorerSearchBarProps {
  onSearch: (query: string) => void;
  onSuggestionSelect: (nodeId: string) => void;
  initialQuery?: string;
  resultCount?: number;
}

const RECENT_KEY = 'egypthub_explorer_recent';
const MAX_RECENT = 6;

const POPULAR_SEARCHES = [
  'شرم الشيخ', 'الغوص', 'الأهرامات', 'الأقصر', 'الغردقة', 'سيوة',
];

const AI_SUGGESTIONS = [
  { text: 'وجهة عائلية', icon: '👨‍👩‍👧‍👦' },
  { text: 'مغامرات صحراوية', icon: '🏜️' },
  { text: 'غوص للمبتدئين', icon: '🤿' },
  { text: 'فنادق 5 نجوم', icon: '⭐' },
  { text: 'رحلات رخيصة', icon: '💰' },
];

function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function addRecentSearch(query: string) {
  try {
    const existing = getRecentSearches();
    const next = [query, ...existing.filter(s => s !== query)].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch { }
}

function removeRecentSearch(query: string) {
  try {
    const next = getRecentSearches().filter(s => s !== query);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch { }
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function ExplorerSearchBar({
  onSearch, onSuggestionSelect, initialQuery = '', resultCount,
}: ExplorerSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecentSearches());
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showVoiceTip, setShowVoiceTip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const searchNodes = useCallback(async (q: string): Promise<SearchSuggestion[]> => {
    if (q.length < 2) return [];
    setIsLoading(true);
    try {
      const { buildExplorerGraph, searchNodes: doSearch } = await import('@/lib/explorer/explorerEngine');
      const graph = buildExplorerGraph();
      const results = doSearch(graph, q);
      return results.slice(0, 8).map(r => ({
        id: r.id, label: r.label || r.labelEn || '', labelEn: r.labelEn, type: r.type || '',
      }));
    } catch { return []; }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(async () => {
        const results = await searchNodes(query);
        setSuggestions(results);
        setSelectedIdx(-1);
      }, 180);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setSelectedIdx(-1);
    }
  }, [query, searchNodes]);

  const handleSubmit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addRecentSearch(trimmed);
    setRecentSearches(getRecentSearches());
    onSearch(trimmed);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIdx >= 0 && suggestions[selectedIdx]) {
        onSuggestionSelect(suggestions[selectedIdx].id);
        setIsFocused(false);
      } else {
        handleSubmit(query);
      }
    } else if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(prev => Math.min(prev + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(prev => Math.max(prev - 1, -1)); }
    else if (e.key === 'Escape') { setIsFocused(false); inputRef.current?.blur(); }
  };

  const showDropdown = isFocused && (query.length >= 2 ? suggestions.length > 0 || isLoading : recentSearches.length > 0);

  return (
    <div ref={containerRef} className="relative w-full" role="search" aria-label="ابحث في مصر">
      <div className="relative group">
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-gold/70 z-10 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { setIsFocused(true); setShowVoiceTip(true); }}
          onBlur={() => setTimeout(() => setShowVoiceTip(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="ابحث عن وجهة، تجربة، مطعم..."
          className="w-full bg-theme-card/80 border border-theme-border rounded-2xl py-3.5 pr-12 pl-12 text-sm text-theme placeholder:text-theme-secondary/40 font-cairo outline-none transition-all duration-300 focus:border-theme-gold/50 focus:ring-2 focus:ring-theme-gold/10 focus:bg-theme-card"
          aria-label="بحث"
          aria-expanded={showDropdown}
          aria-controls="search-dropdown"
          aria-autocomplete="list"
          role="combobox"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query ? (
            <button
              onClick={() => { setQuery(''); setSuggestions([]); inputRef.current?.focus(); }}
              className="text-theme-secondary/50 hover:text-theme transition-colors p-1"
              aria-label="مسح البحث"
            >
              <CloseIcon />
            </button>
          ) : (
            <button
              onClick={() => setShowVoiceTip(v => !v)}
              className="text-theme-secondary/40 hover:text-theme-gold transition-colors p-1"
              aria-label="بحث صوتي"
              title="البحث الصوتي قريباً"
            >
              <VoiceIcon />
            </button>
          )}
        </div>
        <AnimatePresence>
          {showVoiceTip && !query && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute -bottom-8 left-3 bg-theme-card border border-theme-border rounded-lg px-3 py-1.5 shadow-lg z-20"
            >
              <p className="text-[10px] text-theme-secondary font-cairo whitespace-nowrap">🎤 البحث الصوتي قريباً</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            id="search-dropdown"
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full mt-1.5 left-0 right-0 z-50 bg-theme-card/95 backdrop-blur-xl border border-theme-border/80 rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
            role="listbox"
          >
            {query.length >= 2 && suggestions.length > 0 && (
              <div className="p-2">
                {isLoading && (
                  <div className="px-3 py-2 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-theme-gold/30 border-t-theme-gold animate-spin" />
                    <span className="text-xs text-theme-secondary font-cairo">جارٍ البحث...</span>
                  </div>
                )}
                <ul>
                  {suggestions.map((s, i) => (
                    <li
                      key={`${s.id}-${i}`}
                      onClick={() => { onSuggestionSelect(s.id); setIsFocused(false); }}
                      onMouseEnter={() => setSelectedIdx(i)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-cairo cursor-pointer transition-all flex items-center gap-3 ${
                        i === selectedIdx ? 'bg-theme-gold/10 text-theme-gold' : 'text-theme hover:bg-theme-border/30'
                      }`}
                      role="option"
                      aria-selected={i === selectedIdx}
                    >
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        s.type === 'city' ? 'bg-amber-500/15 text-amber-400' :
                        s.type === 'experience' ? 'bg-blue-500/15 text-blue-400' :
                        s.type === 'story' ? 'bg-purple-500/15 text-purple-400' :
                        s.type === 'food' ? 'bg-orange-500/15 text-orange-400' :
                        'bg-emerald-500/15 text-emerald-400'
                      }`}>
                        {s.type}
                      </span>
                      <span className="flex-1">{s.label}</span>
                      {s.labelEn && <span className="text-xs text-theme-muted font-english">{s.labelEn}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {query.length < 2 && recentSearches.length > 0 && (
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-theme-secondary/60 font-cairo font-semibold tracking-wider flex items-center gap-1.5">
                    <ClockIcon /> عمليات البحث الأخيرة
                  </p>
                  <button
                    onClick={() => { localStorage.removeItem(RECENT_KEY); setRecentSearches([]); }}
                    className="text-[10px] text-theme-gold hover:underline font-cairo"
                  >
                    مسح الكل
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map((s, i) => (
                    <span
                      key={`r-${i}`}
                      onClick={() => { setQuery(s); handleSubmit(s); }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-theme-surface border border-theme-border text-xs text-theme-secondary font-cairo cursor-pointer hover:bg-theme-gold/5 hover:border-theme-gold/20 hover:text-theme transition-all"
                    >
                      <ClockIcon />
                      {s}
                      <button
                        onClick={e => { e.stopPropagation(); removeRecentSearch(s); setRecentSearches(getRecentSearches()); }}
                        className="text-theme-muted hover:text-red-400 transition-colors"
                        aria-label={`حذف ${s}`}
                      >
                        <CloseIcon />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {query.length < 2 && recentSearches.length === 0 && (
              <div className="p-3 space-y-2">
                <p className="text-xs text-theme-secondary/60 font-cairo font-semibold tracking-wider">الأكثر بحثاً</p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map(s => (
                    <span
                      key={s}
                      onClick={() => { setQuery(s); handleSubmit(s); }}
                      className="px-2.5 py-1.5 rounded-lg bg-theme-surface border border-theme-border text-xs text-theme-secondary font-cairo cursor-pointer hover:bg-theme-gold/5 hover:border-theme-gold/20 hover:text-theme transition-all"
                    >
                      🔥 {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-theme-secondary/60 font-cairo font-semibold tracking-wider pt-2">اقتراحات ذكية</p>
                <div className="flex flex-wrap gap-1.5">
                  {AI_SUGGESTIONS.map(s => (
                    <span
                      key={s.text}
                      onClick={() => { setQuery(s.text); handleSubmit(s.text); }}
                      className="px-2.5 py-1.5 rounded-lg bg-gradient-to-l from-theme-gold/5 to-transparent border border-theme-gold/10 text-xs text-theme-gold/80 font-cairo cursor-pointer hover:bg-theme-gold/10 hover:border-theme-gold/20 transition-all"
                    >
                      {s.icon} {s.text}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {resultCount !== undefined && query && !isFocused && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-theme-secondary/60 font-cairo mt-1.5 mr-1"
        >
          {resultCount} نتيجة لـ &ldquo;{query}&rdquo;
        </motion.p>
      )}
    </div>
  );
}

export { SearchIcon, VoiceIcon };

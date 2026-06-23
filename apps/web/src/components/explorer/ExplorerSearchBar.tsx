'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buildExplorerGraph, searchNodes as doSearch } from '@/lib/explorer/explorerEngine';

let _graph: ReturnType<typeof buildExplorerGraph> | null = null;
function getGraph() {
  if (!_graph) _graph = buildExplorerGraph();
  return _graph;
}

interface ExplorerSearchBarProps {
  onSearch: (query: string) => void;
  onSuggestionSelect: (nodeId: string) => void;
  initialQuery?: string;
}

interface SearchSuggestion {
  id: string;
  label: string;
  type: string;
}

const RECENT_KEY = 'egypthub_explorer_recent';

function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addRecentSearch(query: string) {
  try {
    const existing = getRecentSearches();
    const next = [query, ...existing.filter(s => s !== query)].slice(0, 5);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch { }
}

export default function ExplorerSearchBar({
  onSearch,
  onSuggestionSelect,
  initialQuery = '',
}: ExplorerSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const searchNodes = useCallback(async (q: string): Promise<SearchSuggestion[]> => {
    if (q.length < 2) return [];
    try {
      const graph = getGraph();
      const results = doSearch(graph, q);
      return results.map((r) => ({
        id: r.id,
        label: r.label || r.labelEn || '',
        type: r.type || '',
      }));
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(async () => {
        const results = await searchNodes(query);
        setSuggestions(results);
        setSelectedIdx(-1);
      }, 200);
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
      } else {
        handleSubmit(query);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(prev => Math.max(prev - 1, -1));
    }
  };

  const showDropdown = isFocused && (suggestions.length > 0 || (recentSearches.length > 0 && query.length < 2));

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      <div className="relative">
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2"
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="ابحث في مصر..."
          className="w-full bg-theme-card/80 border border-theme-border rounded-xl py-2.5 pr-10 pl-3 text-sm text-theme placeholder:text-theme-secondary/50 font-cairo outline-none focus:border-theme-gold/40 transition-colors"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setSuggestions([]); inputRef.current?.focus(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-theme-secondary/50 hover:text-theme"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 left-0 right-0 z-50 bg-theme-card border border-theme-border rounded-xl overflow-hidden shadow-lg"
          >
            {suggestions.length > 0 ? (
              <ul>
                {suggestions.map((s, i) => (
                  <li
                    key={`${s.id}-${i}`}
                    onClick={() => { onSuggestionSelect(s.id); setIsFocused(false); }}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={`px-4 py-2.5 text-sm font-cairo cursor-pointer transition-colors flex items-center gap-2 ${
                      i === selectedIdx ? 'bg-theme-gold/10 text-theme-gold' : 'text-theme hover:bg-theme-border/30'
                    }`}
                  >
                    <span className="text-theme-secondary/50 text-xs">{s.type}</span>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            ) : recentSearches.length > 0 && query.length < 2 ? (
              <div className="p-3">
                <p className="text-xs text-theme-secondary/50 font-cairo mb-2">عمليات البحث الأخيرة</p>
                <ul>
                  {recentSearches.map((s, i) => (
                    <li
                      key={`r-${i}`}
                      onClick={() => { setQuery(s); handleSubmit(s); }}
                      className="px-2 py-1.5 text-sm text-theme-secondary font-cairo cursor-pointer hover:text-theme rounded-lg hover:bg-theme-border/30 transition-colors"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

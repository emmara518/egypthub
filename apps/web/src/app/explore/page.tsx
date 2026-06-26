'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExplorerMap, ExplorerSidebar, ExplorerSearchBar,
  CityExplorerView, DiscoveryFeed, MyDiscoveriesDrawer,
} from '@/components/explorer';
import PremiumCard, { PremiumCardSkeleton } from '@/components/explorer/PremiumCard';
import {
  buildExplorerGraph, getNodesByType, searchNodes,
} from '@/lib/explorer/explorerEngine';
import { applyFilter, sortNodes, createEmptyFilter, getAvailableCategories } from '@/lib/explorer/filterEngine';
import { trackEvent } from '@/lib/explorer/analyticsTracker';
import { decodeExplorerState } from '@/lib/explorer/deepLinkEngine';
import type { ExplorerFilter, ExplorerNodeType } from '@/lib/explorer/types';
import Link from 'next/link';

const graph = buildExplorerGraph();
const categories = getAvailableCategories(graph);

export default function ExplorePage() {
  const [activeLayer, setActiveLayer] = useState<ExplorerNodeType | 'all'>('all');
  const [filter, setFilter] = useState<ExplorerFilter>(createEmptyFilter());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [feedView, setFeedView] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const decoded = decodeExplorerState(params.toString());
    if (decoded.city) setSelectedCity(decoded.city);
    if (decoded.layer && decoded.layer !== 'all') setActiveLayer(decoded.layer);
    if (decoded.search) {
      setSearchQuery(decoded.search);
      const results = searchNodes(graph, decoded.search);
      setHighlightedIds(results.map(n => n.id));
    }
  }, []);

  const updateUrl = useCallback((params: Record<string, string | undefined>) => {
    const current = new URLSearchParams(window.location.search);
    const merged = Object.fromEntries(current.entries());
    for (const [key, val] of Object.entries(params)) {
      if (val) merged[key] = val;
      else delete merged[key];
    }
    const search = new URLSearchParams(merged).toString();
    const url = search ? `/explore?${search}` : '/explore';
    window.history.replaceState(null, '', url);
  }, []);

  const handleLayerChange = useCallback((layer: ExplorerNodeType | 'all') => {
    setActiveLayer(layer);
    setFeedView(false);
    trackEvent('layer_changed', { layer: String(layer) });
    updateUrl({ layer: layer !== 'all' ? layer : undefined });
  }, [updateUrl]);

  const handleFilterChange = useCallback((newFilter: ExplorerFilter) => {
    setFilter(newFilter);
    trackEvent('filter_changed', { categories: newFilter.categories.join(',') });
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setTimeout(() => {
      if (query.length >= 2) {
        const results = searchNodes(graph, query);
        setHighlightedIds(results.map(n => n.id));
        trackEvent('search_query', { query, results: String(results.length) });
      } else {
        setHighlightedIds([]);
      }
      setIsLoading(false);
    }, 200);
    updateUrl({ search: query || undefined });
  }, [updateUrl]);

  const handleSuggestionSelect = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    setSelectedCity(null);
    setFeedView(false);
  }, []);

  const handleCitySelect = useCallback((citySlug: string) => {
    setSelectedCity(citySlug);
    setSelectedNodeId(null);
    trackEvent('city_click', { citySlug });
    updateUrl({ city: citySlug });
  }, [updateUrl]);

  const handleCityClose = useCallback(() => {
    setSelectedCity(null);
    updateUrl({ city: undefined });
  }, [updateUrl]);

  const handlePlanTrip = useCallback((citySlug: string) => {
    trackEvent('trip_plan_request', { citySlug });
    window.location.href = `/zainab?city=${citySlug}`;
  }, []);

  const handleTalkToZainab = useCallback((citySlug: string) => {
    trackEvent('zainab_interaction', { citySlug });
    window.location.href = `/zainab?city=${citySlug}`;
  }, []);

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    trackEvent('experience_click', { nodeId });
  }, []);

  const handleShare = useCallback((nodeId: string) => {
    navigator.clipboard?.writeText(`${window.location.origin}/explore?node=${nodeId}`);
  }, []);

  const layerNodes = useMemo(() => getNodesByType(graph, activeLayer), [activeLayer]);

  const filteredNodes = useMemo(() => {
    let nodes = layerNodes;
    if (searchQuery) {
      const searched = searchNodes(graph, searchQuery);
      const ids = new Set(searched.map(n => n.id));
      nodes = nodes.filter(n => ids.has(n.id));
    }
    const applied = applyFilter(nodes, filter);
    return sortNodes(applied, filter.sortBy);
  }, [layerNodes, filter, searchQuery]);

  return (
    <div className="min-h-screen bg-theme-bg pt-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-theme-border/50">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-theme-gold hover:text-theme-gold/80 text-xs font-cairo transition-colors flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              الرئيسية
            </Link>
            <span className="text-theme-border/50">|</span>
            <h1 className="text-base font-bold text-theme font-playfair">اكتشف مصر</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedView(v => !v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-cairo transition-all ${
                feedView
                  ? 'bg-theme-gold/15 text-theme-gold border border-theme-gold/25'
                  : 'text-theme-secondary border border-theme-border hover:border-theme-gold/30 hover:text-theme'
              }`}
            >
              {feedView ? '🎯 التوصيات' : '🗺️ الخريطة'}
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs text-theme-secondary border border-theme-border hover:border-theme-gold/30 hover:text-theme transition-all font-cairo"
            >
              ⭐ المحفوظات
            </button>
          </div>
        </div>

        <div className="flex gap-0 lg:gap-4 px-4 lg:px-6 py-4">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="hidden lg:block shrink-0 overflow-hidden"
              >
                <ExplorerSidebar
                  onFilterChange={handleFilterChange}
                  onLayerChange={handleLayerChange}
                  activeLayer={activeLayer}
                  activeFilter={filter}
                  availableCategories={categories}
                  resultsCount={filteredNodes.length}
                  isOpen={sidebarOpen}
                  onToggle={() => setSidebarOpen(false)}
                />
              </motion.aside>
            )}
          </AnimatePresence>

          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden lg:flex shrink-0 items-center gap-1 px-3 text-theme-secondary hover:text-theme-gold text-xs font-cairo transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
              </svg>
              فلاتر
            </button>
          )}

          <div className="flex-1 min-w-0 space-y-4">
            <ExplorerSearchBar
              onSearch={handleSearch}
              onSuggestionSelect={handleSuggestionSelect}
              initialQuery={searchQuery}
              resultCount={searchQuery ? filteredNodes.length : undefined}
            />

            {selectedCity ? (
              <CityExplorerView
                citySlug={selectedCity}
                onClose={handleCityClose}
                onPlanTrip={handlePlanTrip}
                onTalkToZainab={handleTalkToZainab}
                graph={graph}
              />
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="xl:col-span-2">
                  <div className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden">
                    <ExplorerMap
                      nodes={filteredNodes}
                      activeLayer={activeLayer}
                      onCitySelect={handleCitySelect}
                      onNodeSelect={handleNodeSelect}
                      selectedNodeId={selectedNodeId}
                      highlightedIds={highlightedIds}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="xl:col-span-1">
                  {feedView ? (
                    <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4 xl:max-h-[calc(100vh-200px)] xl:overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                      <DiscoveryFeed
                        graph={graph}
                        onNodeSelect={handleNodeSelect}
                        onCitySelect={handleCitySelect}
                        onFavorite={handleNodeSelect}
                        onShare={handleShare}
                        filter={filter}
                        highlightedIds={highlightedIds}
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4 xl:max-h-[calc(100vh-200px)] xl:overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-theme font-cairo">النتائج</h3>
                        <span className="text-[10px] text-theme-secondary font-cairo">{filteredNodes.length}</span>
                      </div>
                      {isLoading ? (
                        <div className="space-y-3">
                          {[1, 2, 3].map(i => <PremiumCardSkeleton key={i} />)}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {filteredNodes.slice(0, 20).map((node, i) => (
                            <PremiumCard
                              key={node.id}
                              node={node}
                              index={i}
                              highlighted={highlightedIds.includes(node.id)}
                              onSelect={() => {
                                if (node.type === 'city') handleCitySelect(node.citySlug);
                                else handleNodeSelect(node.id);
                              }}
                              onFavorite={handleNodeSelect}
                              onShare={handleShare}
                              variant="compact"
                            />
                          ))}
                          {filteredNodes.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                              </svg>
                              <p className="text-xs text-theme-secondary font-cairo mt-3">لا توجد نتائج مطابقة</p>
                              <p className="text-[10px] text-theme-secondary/60 font-cairo mt-1">جرب تغيير الفلاتر أو البحث</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <MyDiscoveriesDrawer
        graph={graph}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNodeSelect={handleNodeSelect}
      />
    </div>
  );
}

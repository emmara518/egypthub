'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExplorerMap, ExplorerSidebar, ExplorerSearchBar,
  CityExplorerView, DiscoveryFeed, MyDiscoveriesDrawer,
} from '@/components/explorer';
import {
  buildExplorerGraph, getNodesByType, filterNodes, searchNodes,
  getNodeById,
} from '@/lib/explorer/explorerEngine';
import { createEmptyFilter, getAvailableCategories } from '@/lib/explorer/filterEngine';
import { trackEvent } from '@/lib/explorer/analyticsTracker';
import { decodeExplorerState, encodeExplorerState } from '@/lib/explorer/deepLinkEngine';
import type { ExplorerFilter, ExplorerNodeType, ExplorerNode } from '@/lib/explorer/types';
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
    const url = search ? `/egypthub/explore?${search}` : '/egypthub/explore';
    window.history.replaceState(null, '', url);
  }, []);

  const handleLayerChange = useCallback((layer: ExplorerNodeType | 'all') => {
    setActiveLayer(layer);
    setFeedView(false);
    trackEvent('layer_changed', { layer });
    updateUrl({ layer: layer !== 'all' ? layer : undefined });
  }, [updateUrl]);

  const handleFilterChange = useCallback((newFilter: ExplorerFilter) => {
    setFilter(newFilter);
    trackEvent('filter_changed', { categories: newFilter.categories.join(',') });
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = searchNodes(graph, query);
      setHighlightedIds(results.map(n => n.id));
      trackEvent('search_query', { query, results: String(results.length) });
    } else {
      setHighlightedIds([]);
    }
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
    window.location.href = `/egypthub/zainab?city=${citySlug}`;
  }, []);

  const handleTalkToZainab = useCallback((citySlug: string) => {
    trackEvent('zainab_interaction', { citySlug });
    window.location.href = `/egypthub/zainab?city=${citySlug}`;
  }, []);

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    trackEvent('experience_click', { nodeId });
  }, []);

  const layerNodes = useMemo(() => {
    return getNodesByType(graph, activeLayer);
  }, [activeLayer]);

  const filteredNodes = useMemo(() => {
    let nodes = layerNodes;
    if (searchQuery) {
      const searched = searchNodes(graph, searchQuery);
      const searchedIds = new Set(searched.map(n => n.id));
      nodes = nodes.filter(n => searchedIds.has(n.id));
    }
    return filterNodes(nodes, filter);
  }, [layerNodes, filter, searchQuery]);

  return (
    <div className="min-h-screen bg-theme-bg pt-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-theme-gold hover:text-theme-gold/80 text-sm font-cairo transition-colors">
              ← الرئيسية
            </Link>
            <h1 className="text-xl font-bold text-theme font-playfair hidden sm:block">
              اكتشف مصر
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedView(v => !v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-cairo transition-colors ${
                feedView ? 'bg-theme-gold/15 text-theme-gold border border-theme-gold/25' : 'text-theme-secondary border border-theme-gold/10 hover:border-theme-gold/30'
              }`}
            >
              {feedView ? '🎯 التوصيات' : '🗺️ الخريطة'}
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs text-theme-secondary border border-theme-gold/10 hover:border-theme-gold/30 transition-colors font-cairo"
            >
              ⭐ المحفوظات
            </button>
          </div>
        </div>

        <div className="flex gap-0 lg:gap-4 px-4 lg:px-6">
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
              className="hidden lg:flex shrink-0 items-center gap-1 px-2 text-theme-secondary hover:text-theme-gold text-xs font-cairo transition-colors"
            >
              ☰ فلاتر
            </button>
          )}

          <div className="flex-1 min-w-0 space-y-4">
            <ExplorerSearchBar
              onSearch={handleSearch}
              onSuggestionSelect={handleSuggestionSelect}
              initialQuery={searchQuery}
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
                  <div className="rounded-2xl border border-theme-gold/15 bg-theme-card overflow-hidden">
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
                    <div className="rounded-2xl border border-theme-gold/15 bg-theme-card p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                      <DiscoveryFeed
                        graph={graph}
                        onNodeSelect={handleNodeSelect}
                        onCitySelect={handleCitySelect}
                        filter={filter}
                        highlightedIds={highlightedIds}
                      />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-theme-gold/15 bg-theme-card p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                      <h3 className="text-sm font-bold text-theme font-cairo mb-3">
                        نتائج البحث ({filteredNodes.length})
                      </h3>
                      <div className="space-y-2">
                        {filteredNodes.slice(0, 20).map(node => (
                          <motion.div
                            key={node.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ x: -3 }}
                            onClick={() => {
                              if (node.type === 'city') handleCitySelect(node.citySlug);
                              else handleNodeSelect(node.id);
                            }}
                            className="p-3 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/20 cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {node.type === 'city' ? '🏙️' : node.type === 'experience' ? '✨' : node.type === 'story' ? '📖' : node.type === 'food' ? '🍽️' : '🧕'}
                              </span>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-theme font-cairo truncate">{node.label}</p>
                                <p className="text-[10px] text-theme-muted font-cairo truncate">{node.subtitle}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {filteredNodes.length === 0 && (
                          <p className="text-xs text-theme-secondary text-center py-8 font-cairo">
                            لا توجد نتائج مطابقة
                          </p>
                        )}
                      </div>
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

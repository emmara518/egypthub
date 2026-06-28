'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplorerNode, ExplorerNodeType } from '@/lib/explorer/types';

interface ExplorerMapProps {
  nodes: ExplorerNode[];
  activeLayer: ExplorerNodeType | 'all';
  onCitySelect: (citySlug: string) => void;
  onNodeSelect: (nodeId: string) => void;
  selectedNodeId: string | null;
  highlightedIds: string[];
  className?: string;
}

interface City {
  name: string;
  nameAr: string;
  slug: string;
  lat: number;
  lng: number;
  count?: number;
}

const CITIES: City[] = [
  { name: 'Sharm El Sheikh', nameAr: 'شرم الشيخ', slug: 'sharm-el-sheikh', lat: 27.92, lng: 34.33, count: 4 },
];

const ROUTES: [string, string][] = [];

const SVG_W = 840;
const SVG_H = 720;
const EGYPT_BOUNDS = { minLat: 22, maxLat: 32, minLng: 25, maxLng: 37 };
const PAD = 40;
const VIEW_W = SVG_W - PAD * 2;
const VIEW_H = SVG_H - PAD * 2;

function toSvg(lat: number, lng: number) {
  const x = PAD + ((lng - EGYPT_BOUNDS.minLng) / (EGYPT_BOUNDS.maxLng - EGYPT_BOUNDS.minLng)) * VIEW_W;
  const y = PAD + ((EGYPT_BOUNDS.maxLat - lat) / (EGYPT_BOUNDS.maxLat - EGYPT_BOUNDS.minLat)) * VIEW_H;
  return { x, y };
}

const EGYPT_OUTLINE = [
  { lat: 31.5, lng: 32.5 }, { lat: 31.5, lng: 34.5 }, { lat: 31.0, lng: 35.5 },
  { lat: 30.0, lng: 36.0 }, { lat: 29.0, lng: 36.0 }, { lat: 28.0, lng: 35.5 },
  { lat: 27.0, lng: 35.0 }, { lat: 26.0, lng: 34.5 }, { lat: 25.0, lng: 34.0 },
  { lat: 24.0, lng: 33.5 }, { lat: 23.0, lng: 33.0 }, { lat: 22.5, lng: 32.0 },
  { lat: 22.5, lng: 31.0 }, { lat: 22.5, lng: 30.0 }, { lat: 23.0, lng: 29.0 },
  { lat: 23.5, lng: 28.0 }, { lat: 24.0, lng: 27.0 }, { lat: 24.5, lng: 26.0 },
  { lat: 25.0, lng: 25.5 }, { lat: 26.0, lng: 25.5 }, { lat: 27.0, lng: 26.0 },
  { lat: 28.0, lng: 26.0 }, { lat: 29.0, lng: 25.5 }, { lat: 30.0, lng: 25.5 },
  { lat: 31.0, lng: 26.0 }, { lat: 31.5, lng: 27.5 }, { lat: 31.5, lng: 29.0 },
  { lat: 31.5, lng: 30.5 }, { lat: 31.5, lng: 32.0 },
];

const COLOR: Record<ExplorerNodeType, string> = {
  city: '#D4A24C', experience: '#3B82F6', story: '#8B5CF6', food: '#F97316', ambassador: '#10B981',
};

const RADIUS: Record<ExplorerNodeType, number> = {
  city: 9, experience: 6, story: 5, food: 5, ambassador: 6,
};

export default function ExplorerMap({
  nodes, activeLayer, onCitySelect, onNodeSelect, selectedNodeId, highlightedIds, className = '',
}: ExplorerMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOrigin = useRef({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = containerWidth ? containerWidth / SVG_W : 0.5;
  const effectiveZoom = zoom * scale;

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(prev => Math.max(1, Math.min(3, prev - e.deltaY * 0.001)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      panOrigin.current = { ...pan };
    }
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({ x: panOrigin.current.x + e.clientX - panStart.current.x, y: panOrigin.current.y + e.clientY - panStart.current.y });
  }, [isPanning]);

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const shapePoints = EGYPT_OUTLINE.map(p => { const { x, y } = toSvg(p.lat, p.lng); return `${x},${y}`; }).join(' ');

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    nodes.filter(n => n.type !== 'city').forEach(n => { counts[n.citySlug] = (counts[n.citySlug] || 0) + 1; });
    return counts;
  }, [nodes]);

  const visibleNonCities = useMemo(() => nodes.filter(n => n.type !== 'city'), [nodes]);

  const hoveredNode = useMemo(() => {
    if (!hoveredId) return null;
    return nodes.find(n => n.id === hoveredId || `city-${n.citySlug}` === hoveredId) || null;
  }, [hoveredId, nodes]);

  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-theme-border bg-gradient-to-br from-theme-bg via-theme-surface/30 to-theme-bg ${className}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
     
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-full"
        style={{
          transform: `scale(${effectiveZoom}) translate(${pan.x / effectiveZoom}px, ${pan.y / effectiveZoom}px)`,
          transformOrigin: 'center center',
          transition: isPanning ? 'none' : 'transform 0.3s ease',
        }}
      >
        <defs>
          <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A24C" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4A24C" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <polygon points={shapePoints} fill="rgba(212,162,76,0.03)" stroke="rgba(212,162,76,0.2)" strokeWidth="1.5" />

        {CITIES.length > 1 && ROUTES.map(([from, to]) => {
          const f = CITIES.find(c => c.slug === from);
          const t = CITIES.find(c => c.slug === to);
          if (!f || !t) return null;
          const p1 = toSvg(f.lat, f.lng);
          const p2 = toSvg(t.lat, t.lng);
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2 - 30;
          return (
            <g key={`route-${from}-${to}`}>
              <path
                d={`M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`}
                fill="none"
                stroke="rgba(212,162,76,0.1)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <path
                d={`M${p1.x},${p1.y} Q${mx},${my} ${p2.x},${p2.y}`}
                fill="none"
                stroke="rgba(212,162,76,0.3)"
                strokeWidth="0.5"
                strokeDasharray="2 4"
                className="animate-dash"
              />
            </g>
          );
        })}

        <text x={PAD} y={PAD + 14} fill="rgba(255,255,255,0.15)" fontSize={11} fontFamily="Cairo" fontWeight="bold" letterSpacing="2">
          EGYPT
        </text>

        {CITIES.map(city => {
          const { x, y } = toSvg(city.lat, city.lng);
          const markerCity = nodes.find(n => n.type === 'city' && n.citySlug === city.slug);
          const isSelected = selectedNodeId === markerCity?.id;
          const isHovered = hoveredId === `city-${city.slug}`;
          const isHighlighted = highlightedIds.includes(city.slug);
          const count = cityCounts[city.slug] || 0;
          const hasContent = activeLayer === 'all' || nodes.some(n => n.type === activeLayer && n.citySlug === city.slug);

          if (!hasContent) return null;

          return (
            <g
              key={city.slug}
              onClick={() => markerCity && onCitySelect?.(city.slug)}
              onMouseEnter={() => setHoveredId(`city-${city.slug}`)}
              onMouseLeave={() => setHoveredId(null)}
             
            >
              {(isSelected || isHovered) && (
                <circle cx={x} cy={y} r={RADIUS.city + 12} fill="url(#pulse)">
                  <animate attributeName="r" values={`${RADIUS.city + 10};${RADIUS.city + 20};${RADIUS.city + 10}`} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={x} cy={y}
                r={isSelected ? RADIUS.city + 5 : isHovered ? RADIUS.city + 3 : RADIUS.city}
                fill={COLOR.city}
                opacity={isHighlighted ? 1 : 0.9}
                stroke="var(--gold)"
                strokeWidth={isSelected ? 2.5 : 1}
                filter={isSelected || isHovered ? 'url(#glowStrong)' : 'url(#glow)'}
              />
              <circle cx={x} cy={y} r={RADIUS.city + 8} fill="none" stroke="var(--gold)" strokeWidth={0.5} opacity={0.3}>
                <animate attributeName="r" values={`${RADIUS.city + 6};${RADIUS.city + 14};${RADIUS.city + 6}`} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              {count > 0 && (
                <circle cx={x + RADIUS.city + 4} cy={y - RADIUS.city - 4} r="7" fill="var(--gold)" stroke="#1a1a2e" strokeWidth="1.5">
                  <animate attributeName="r" values="7;8;7" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              {count > 0 && (
                <text x={x + RADIUS.city + 4} y={y - RADIUS.city - 1} textAnchor="middle" fill="#1a1a2e" fontSize="8" fontWeight="bold" fontFamily="Cairo">
                  {count}
                </text>
              )}
              <text
                x={x} y={y - RADIUS.city - 8}
                textAnchor="middle"
                fill={isSelected ? '#D4A24C' : isHovered ? '#fff' : 'rgba(255,255,255,0.7)'}
                fontSize={isSelected ? 12 : 10}
                fontWeight={isSelected ? 'bold' : 'normal'}
                fontFamily="Cairo"
                filter={isSelected || isHovered ? 'url(#glow)' : undefined}
              >
                {city.nameAr}
              </text>
            </g>
          );
        })}

        {visibleNonCities.map(node => {
          const { x, y } = toSvg(node.coordinates.lat, node.coordinates.lng);
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredId === node.id;
          const color = COLOR[node.type] || '#D4A24C';

          return (
            <g
              key={node.id}
              onClick={() => onNodeSelect(node.id)}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
             
            >
              {isSelected && (
                <circle cx={x} cy={y} r={RADIUS[node.type] + 8} fill="none" stroke={color} strokeWidth="1" opacity={0.3}>
                  <animate attributeName="r" values={`${RADIUS[node.type] + 6};${RADIUS[node.type] + 14};${RADIUS[node.type] + 6}`} dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={x} cy={y}
                r={isSelected ? RADIUS[node.type] + 4 : isHovered ? RADIUS[node.type] + 2 : RADIUS[node.type]}
                fill={color}
                opacity={0.85}
                stroke={color}
                strokeWidth={isSelected ? 2 : 0.5}
                filter={isSelected || isHovered ? 'url(#glowStrong)' : undefined}
              />
              {isHovered && (
                <text x={x} y={y - RADIUS[node.type] - 5} textAnchor="middle" fill={color} fontSize={9} fontFamily="Cairo" filter="url(#glow)">
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-theme-card/90 backdrop-blur-xl border border-theme-gold/20 rounded-xl px-4 py-2.5 shadow-2xl shadow-black/20 flex items-center gap-3"
          >
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-cairo font-semibold ${
              hoveredNode.type === 'city' ? 'bg-theme-gold/15 text-theme-gold' :
              hoveredNode.type === 'experience' ? 'bg-blue-500/15 text-blue-400' :
              hoveredNode.type === 'story' ? 'bg-purple-500/15 text-purple-400' :
              hoveredNode.type === 'food' ? 'bg-orange-500/15 text-orange-400' :
              'bg-emerald-500/15 text-emerald-400'
            }`}>
              {hoveredNode.type}
            </span>
            <span className="text-sm font-bold text-theme font-cairo">{hoveredNode.label}</span>
            <span className="text-[10px] text-theme-secondary font-cairo">{hoveredNode.city}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {[
          { label: '+', action: () => setZoom(prev => Math.min(3, prev + 0.25)) },
          { label: '−', action: () => setZoom(prev => Math.max(1, prev - 0.25)) },
          { label: '⟲', action: resetView },
        ].map(btn => (
          <button
            key={btn.label}
            onClick={btn.action}
            className="w-8 h-8 rounded-xl bg-theme-card/80 backdrop-blur-sm border border-theme-gold/15 flex items-center justify-center text-theme-gold text-sm hover:bg-theme-gold/10 hover:border-theme-gold/30 transition-all active:scale-95"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

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
}

const CITIES: City[] = [
  { name: 'Cairo', nameAr: 'القاهرة', slug: 'cairo', lat: 30.04, lng: 31.24 },
  { name: 'Alexandria', nameAr: 'الإسكندرية', slug: 'alexandria', lat: 31.20, lng: 29.92 },
  { name: 'Luxor', nameAr: 'الأقصر', slug: 'luxor', lat: 25.69, lng: 32.64 },
  { name: 'Aswan', nameAr: 'أسوان', slug: 'aswan', lat: 24.09, lng: 32.90 },
  { name: 'Sharm', nameAr: 'شرم الشيخ', slug: 'sharm-el-sheikh', lat: 27.92, lng: 34.33 },
  { name: 'Hurghada', nameAr: 'الغردقة', slug: 'hurghada', lat: 27.26, lng: 33.81 },
  { name: 'Dahab', nameAr: 'دهب', slug: 'dahab', lat: 28.50, lng: 34.52 },
  { name: 'Siwa', nameAr: 'سيوة', slug: 'siwa', lat: 29.20, lng: 25.51 },
];

const SVG_W = 800;
const SVG_H = 700;

const EGYPT_BOUNDS = { minLat: 22, maxLat: 32, minLng: 25, maxLng: 37 };

function toSvgCoords(lat: number, lng: number) {
  const x = ((lng - EGYPT_BOUNDS.minLng) / (EGYPT_BOUNDS.maxLng - EGYPT_BOUNDS.minLng)) * SVG_W;
  const y = ((EGYPT_BOUNDS.maxLat - lat) / (EGYPT_BOUNDS.maxLat - EGYPT_BOUNDS.minLat)) * SVG_H;
  return { x, y };
}

const EGYPT_SHAPE = [
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

const MARKER_COLORS: Record<ExplorerNodeType, string> = {
  city: '#D4A24C',
  experience: '#3B82F6',
  story: '#8B5CF6',
  food: '#F97316',
  ambassador: '#10B981',
};

const MARKER_RADII: Record<ExplorerNodeType, number> = {
  city: 8,
  experience: 6,
  story: 5,
  food: 5,
  ambassador: 6,
};

export default function ExplorerMap({
  nodes,
  activeLayer,
  onCitySelect,
  onNodeSelect,
  selectedNodeId,
  highlightedIds,
  className = '',
}: ExplorerMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
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
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = containerWidth ? containerWidth / SVG_W : 0.5;
  const effectiveZoom = zoom * Math.max(0.3, Math.min(1.5, scale));

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(prev => {
      const next = prev - e.deltaY * 0.001;
      return Math.max(1, Math.min(3, next));
    });
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
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setPan({ x: panOrigin.current.x + dx, y: panOrigin.current.y + dy });
  }, [isPanning]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const visibleMarkers = useMemo(() => {
    const cityNodes = nodes.filter(n => n.type === 'city');
    if (activeLayer === 'all') return nodes;
    const layerNodes = nodes.filter(n => n.type === activeLayer || n.type === 'city');
    return layerNodes;
  }, [nodes, activeLayer]);

  const shapePoints = EGYPT_SHAPE.map(p => {
    const { x, y } = toSvgCoords(p.lat, p.lng);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-xl border border-theme-border bg-theme-bg ${className}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isPanning ? 'grabbing' : 'grab', height: '100%', minHeight: 500 }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-full"
        style={{ transform: `scale(${effectiveZoom}) translate(${pan.x / effectiveZoom}px, ${pan.y / effectiveZoom}px)`, transformOrigin: 'center center' }}
      >
        <polygon
          points={shapePoints}
          fill="rgba(212,162,76,0.04)"
          stroke="rgba(212,162,76,0.25)"
          strokeWidth="1.5"
        />

        <path
          d="M0,0 L800,0 L800,700 L0,700 Z"
          fill="none"
          stroke="rgba(212,162,76,0.08)"
          strokeWidth="0.5"
        />

        <line x1="400" y1="0" x2="400" y2="700" stroke="rgba(212,162,76,0.04)" strokeWidth="0.5" />
        <line x1="0" y1="350" x2="800" y2="350" stroke="rgba(212,162,76,0.04)" strokeWidth="0.5" />

        <text x="30" y="30" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="Cairo">مصر</text>

        {CITIES.map(city => {
          const { x, y } = toSvgCoords(city.lat, city.lng);
          const marker = visibleMarkers.find(n => n.type === 'city' && n.citySlug === city.slug);
          const isSelected = selectedNodeId === `city-${city.slug}`;
          const isHovered = hoveredId === `city-${city.slug}`;
          const isHighlighted = highlightedIds.includes(`city-${city.slug}`);

          return (
            <g
              key={city.slug}
              onClick={() => onCitySelect(city.slug)}
              onMouseEnter={() => setHoveredId(`city-${city.slug}`)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r={MARKER_RADII.city + 8}
                  fill="none"
                  stroke="#D4A24C"
                  strokeWidth="1.5"
                  opacity={0.3}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? MARKER_RADII.city + 4 : isHovered ? MARKER_RADII.city + 3 : MARKER_RADII.city}
                fill={MARKER_COLORS.city}
                opacity={isHighlighted ? 1 : 0.85}
                stroke="#D4A24C"
                strokeWidth={isSelected ? 2 : 1}
                style={{ filter: isHovered || isSelected ? 'drop-shadow(0 0 8px rgba(212,162,76,0.6))' : 'none' }}
              />
              <circle
                cx={x}
                cy={y}
                r={MARKER_RADII.city + 6}
                fill="none"
                stroke="#D4A24C"
                strokeWidth={0.5}
                opacity={0.4}
              >
                <animate attributeName="r" values={`${MARKER_RADII.city + 4};${MARKER_RADII.city + 12};${MARKER_RADII.city + 4}`} dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <text
                x={x}
                y={y - MARKER_RADII.city - 6}
                textAnchor="middle"
                fill={isSelected ? '#D4A24C' : 'rgba(255,255,255,0.8)'}
                fontSize={isSelected ? 12 : 10}
                fontWeight={isSelected ? 'bold' : 'normal'}
                fontFamily="Cairo"
              >
                {city.nameAr}
              </text>
            </g>
          );
        })}

        {visibleMarkers
          .filter(n => n.type !== 'city')
          .map(node => {
            const { x, y } = toSvgCoords(node.coordinates.lat, node.coordinates.lng);
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredId === node.id;
            const isHighlighted = highlightedIds.includes(node.id);
            const color = MARKER_COLORS[node.type];

            return (
              <g
                key={node.id}
                onClick={() => onNodeSelect(node.id)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: 'pointer' }}
              >
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r={MARKER_RADII[node.type] + 6}
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    opacity={0.3}
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? MARKER_RADII[node.type] + 3 : isHovered ? MARKER_RADII[node.type] + 2 : MARKER_RADII[node.type]}
                  fill={color}
                  opacity={isHighlighted ? 1 : 0.75}
                  stroke={color}
                  strokeWidth={isSelected ? 2 : 0.5}
                />
                {isHovered && (
                  <text
                    x={x}
                    y={y - MARKER_RADII[node.type] - 4}
                    textAnchor="middle"
                    fill={color}
                    fontSize={9}
                    fontFamily="Cairo"
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
      </svg>

      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-theme-card/90 backdrop-blur-md border border-theme-gold/20 rounded-lg px-4 py-2 shadow-lg"
          >
            <p className="text-sm text-theme font-cairo">
              {hoveredId.startsWith('city-')
                ? CITIES.find(c => `city-${c.slug}` === hoveredId)?.nameAr
                : nodes.find(n => n.id === hoveredId)?.label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-3 left-3 flex flex-col gap-1">
        <button
          onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
          className="w-7 h-7 rounded bg-theme-card border border-theme-gold/20 flex items-center justify-center text-theme-gold text-sm hover:bg-theme-gold/10 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(1, prev - 0.2))}
          className="w-7 h-7 rounded bg-theme-card border border-theme-gold/20 flex items-center justify-center text-theme-gold text-sm hover:bg-theme-gold/10 transition-colors"
        >
          -
        </button>
        <button
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="w-7 h-7 rounded bg-theme-card border border-theme-gold/20 flex items-center justify-center text-theme-gold text-xs hover:bg-theme-gold/10 transition-colors"
        >
          ⟲
        </button>
      </div>
    </div>
  );
}

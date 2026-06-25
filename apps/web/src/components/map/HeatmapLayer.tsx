'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeatRegion {
  id: string;
  name: string;
  x: string;
  y: string;
  w: string;
  h: string;
  intensity: number;
  color: string;
}

const regions: HeatRegion[] = [
  { id: 'cairo', name: 'Cairo', x: '44%', y: '21%', w: '16%', h: '12%', intensity: 0.95, color: 'rgba(212, 60, 60, 0.85)' },
  { id: 'alex', name: 'Alexandria', x: '35%', y: '11%', w: '12%', h: '8%', intensity: 0.7, color: 'rgba(212, 120, 60, 0.7)' },
  { id: 'luxor', name: 'Luxor', x: '42%', y: '44%', w: '12%', h: '10%', intensity: 0.85, color: 'rgba(212, 80, 50, 0.8)' },
  { id: 'aswan', name: 'Aswan', x: '39%', y: '64%', w: '12%', h: '10%', intensity: 0.75, color: 'rgba(212, 140, 60, 0.7)' },
  { id: 'sharm', name: 'Sharm El Sheikh', x: '60%', y: '50%', w: '14%', h: '12%', intensity: 0.9, color: 'rgba(212, 70, 50, 0.85)' },
  { id: 'hurghada', name: 'Hurghada', x: '52%', y: '46%', w: '12%', h: '10%', intensity: 0.8, color: 'rgba(212, 110, 55, 0.75)' },
  { id: 'siwa', name: 'Siwa', x: '22%', y: '25%', w: '14%', h: '10%', intensity: 0.5, color: 'rgba(100, 160, 212, 0.55)' },
  { id: 'dahab', name: 'Dahab', x: '62%', y: '44%', w: '12%', h: '8%', intensity: 0.65, color: 'rgba(140, 180, 212, 0.6)' },
  { id: 'marsa', name: 'Marsa Alam', x: '52%', y: '60%', w: '14%', h: '10%', intensity: 0.55, color: 'rgba(120, 170, 212, 0.55)' },
  { id: 'abu-simbel', name: 'Abu Simbel', x: '36%', y: '78%', w: '12%', h: '8%', intensity: 0.6, color: 'rgba(160, 150, 212, 0.6)' },
];

function getHeatColor(intensity: number): string {
  const r = Math.round(212 - intensity * 100);
  const g = Math.round(162 - intensity * 120);
  const b = Math.round(76 - intensity * 40);
  const alpha = 0.25 + intensity * 0.45;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function HeatmapLayer() {
  const [enabled, setEnabled] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <>
      <div className="absolute top-4 right-4 z-20">
        <motion.button
          onClick={() => setEnabled((p) => !p)}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-english font-bold transition-all border ${
            enabled
              ? 'bg-theme-gold/10 border-theme-gold/25 text-theme-gold shadow-[0_0_10px_rgba(212,162,76,0.1)]'
              : 'bg-[#0a1020]/80 backdrop-blur-sm border-theme-gold/[0.06] text-white/50 hover:text-white/70'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full transition-all ${enabled ? 'bg-theme-gold' : 'bg-white/20'}`} />
          حرارة الوجهات
        </motion.button>
      </div>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[2] pointer-events-none"
          >
            {regions.map((region) => {
              const isHovered = hoveredRegion === region.id;
              return (
                <div
                  key={region.id}
                  className="absolute rounded-[40%] pointer-events-auto transition-all duration-300"
                  style={{
                    left: region.x,
                    top: region.y,
                    width: region.w,
                    height: region.h,
                    background: `radial-gradient(ellipse at center, ${getHeatColor(region.intensity)} 0%, transparent 70%)`,
                    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                  }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
              );
            })}

            <div className="absolute bottom-14 left-3 z-20 bg-[#0F1525]/90 backdrop-blur-md rounded-xl border border-theme-gold/20 p-3 shadow-xl">
              <p className="text-[10px] font-bold text-white font-english mb-2">نشاط الوجهات</p>
              <div className="flex flex-col gap-1">
                {[
                  { label: 'مرتفع', color: '#D43C3C' },
                  { label: 'متوسط', color: '#D48C3C' },
                  { label: 'منخفض', color: '#64A0D4' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-[9px] text-white/60 font-english">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

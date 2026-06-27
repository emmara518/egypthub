'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from '@/components/Icons';

const governorates = [
  { name: 'Cairo', x: '52%', y: '28%', color: '#D4A24C', desc: 'Capital — Pyramids, Museum', experiences: 48 },
  { name: 'Giza', x: '49%', y: '30%', color: '#D4A24C', desc: 'Great Pyramids & Sphinx', experiences: 32 },
  { name: 'Luxor', x: '48%', y: '50%', color: '#A78BFA', desc: 'Valley of Kings & Temples', experiences: 28 },
  { name: 'Aswan', x: '44%', y: '68%', color: '#41BEDC', desc: 'Nile & Nubian culture', experiences: 22 },
  { name: 'Alexandria', x: '40%', y: '16%', color: '#6B7280', desc: 'Mediterranean & Library', experiences: 18 },
  { name: 'Sharm El Sheikh', x: '66%', y: '55%', color: '#10B981', desc: 'Diving & Beaches', experiences: 35 },
  { name: 'Hurghada', x: '58%', y: '52%', color: '#10B981', desc: 'Resorts & Water sports', experiences: 30 },
  { name: 'Siwa', x: '24%', y: '30%', color: '#D4A24C', desc: 'Desert Oasis', experiences: 12 },
  { name: 'Abu Simbel', x: '40%', y: '82%', color: '#A78BFA', desc: 'Ramses II Temples', experiences: 8 },
  { name: 'Fayoum', x: '39%', y: '34%', color: '#41BEDC', desc: 'Waterfalls & Whales', experiences: 14 },
];

const categoryColors: Record<string, string> = { Capital: '#D4A24C', Nile: '#41BEDC', Adventure: '#10B981', History: '#A78BFA', City: '#6B7280' };

interface Props {
  onSelect?: (name: string) => void;
}

export default function GovernoratesMap({ onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setSelected(name);
    onSelect?.(name);
  };

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[440px]">
          <svg viewBox="0 0 320 440" className="w-full h-full opacity-[0.04]">
            <path d="M160 20L280 120L290 300L200 420L120 420L30 300L40 120Z" fill="var(--gold)" />
          </svg>

          {governorates.map((g) => {
            const isActive = selected === g.name || hovered === g.name;
            const px = parseFloat(g.x);
            const py = parseFloat(g.y);
            const left = `${(px / 100) * 220 + 30}px`;
            const top = `${(py / 100) * 320 + 40}px`;

            return (
              <motion.button
                key={g.name}
                onClick={() => handleClick(g.name)}
                onMouseEnter={() => setHovered(g.name)}
                onMouseLeave={() => setHovered(null)}
                className="absolute z-10 touch-target"
                style={{ left, top, transform: 'translate(-50%, -50%)' }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={g.name}
              >
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isActive ? 'scale-150' : ''
                }`} style={{
                  backgroundColor: isActive ? g.color : `${g.color}40`,
                  borderColor: g.color,
                  boxShadow: isActive ? `0 0 12px ${g.color}60` : 'none',
                }} />
                <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span className="text-[8px] font-bold font-english text-white bg-theme-bg/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-theme-gold/20">{g.name}</span>
                </div>
              </motion.button>
            );
          })}

          {/* Info card for selected */}
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-theme-surface/95 backdrop-blur-xl rounded-xl border border-theme-gold/20 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-[200px]"
            >
              {(() => {
                const g = governorates.find(g => g.name === selected)!;
                return (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: g.color }} />
                      <h4 className="text-sm font-bold font-english text-white">{g.name}</h4>
                    </div>
                    <p className="text-[10px] text-white/50 font-english">{g.desc}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={9} />
                      <span className="text-[10px] font-bold text-theme-gold">{g.experiences} experiences</span>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

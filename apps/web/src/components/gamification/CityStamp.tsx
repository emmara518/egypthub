'use client';

import { motion } from 'framer-motion';

interface CityStampProps {
  city: string;
  region?: string;
  visited: boolean;
  date?: string;
}

const regionColors: Record<string, { bg: string; border: string; text: string }> = {
  cairo: { bg: 'rgba(212,162,76,0.15)', border: '#D4A24C', text: '#D4A24C' },
  alexandria: { bg: 'rgba(14,143,148,0.15)', border: '#0E8F94', text: '#0E8F94' },
  luxor: { bg: 'rgba(139,92,246,0.15)', border: '#8B5CF6', text: '#8B5CF6' },
  aswan: { bg: 'rgba(244,162,97,0.15)', border: '#F4A261', text: '#F4A261' },
  'sharm-el-sheikh': { bg: 'rgba(59,130,246,0.15)', border: '#3B82F6', text: '#3B82F6' },
  hurghada: { bg: 'rgba(236,72,153,0.15)', border: '#EC4899', text: '#EC4899' },
  dahab: { bg: 'rgba(16,185,129,0.15)', border: '#10B981', text: '#10B981' },
  siwa: { bg: 'rgba(249,115,22,0.15)', border: '#F97316', text: '#F97316' },
};

const defaultColor = { bg: 'rgba(212,162,76,0.15)', border: '#D4A24C', text: '#D4A24C' };

export default function CityStamp({ city, region = 'cairo', visited, date }: CityStampProps) {
  const colors = regionColors[region] || defaultColor;

  if (!visited) {
    return (
      <div className="w-24 h-24 rounded-full border-2 border-dashed border-theme-border flex items-center justify-center opacity-40">
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="50" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-theme-muted" />
          <path d="M20 80 Q20 55 50 55 Q80 55 80 80" fill="none" stroke="currentColor" strokeWidth="2" className="text-theme-muted" />
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 2, rotate: -15, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative"
    >
      <svg viewBox="0 0 120 140" className="w-28 h-32 drop-shadow-lg">
        <defs>
          <filter id={`stamp-shadow-${region}`}>
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>
        <g filter={`url(#stamp-shadow-${region})`}>
          <circle cx="60" cy="60" r="50" fill={colors.bg} stroke={colors.border} strokeWidth="2" />
          <circle cx="60" cy="60" r="44" fill="none" stroke={colors.border} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
          <text x="60" y="48" textAnchor="middle" fontSize="12" fontWeight="bold" fill={colors.text} fontFamily="Cairo">مصر</text>
          <text x="60" y="65" textAnchor="middle" fontSize="20" fontWeight="bold" fill={colors.text} fontFamily="Playfair Display">✈</text>
          <text x="60" y="82" textAnchor="middle" fontSize="9" fill={colors.text} opacity="0.7" fontFamily="Cairo">{city}</text>
          {date && (
            <text x="60" y="98" textAnchor="middle" fontSize="7" fill={colors.text} opacity="0.5" fontFamily="Cairo">
              {new Date(date).toLocaleDateString('ar-EG')}
            </text>
          )}
        </g>
      </svg>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { getQuickSuggestions } from '@/lib/zainab/suggestionEngine';

interface QuickIntentsProps {
  onSelect: (intent: string) => void;
}

export default function QuickIntents({ onSelect }: QuickIntentsProps) {
  const suggestions = getQuickSuggestions();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((s, i) => (
        <motion.button
          key={s.intent}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(s.intent)}
          className="px-4 py-2 rounded-full border border-theme-gold/20 bg-theme-card hover:bg-theme-gold/10 hover:border-theme-gold/40 text-theme text-sm font-cairo transition-all"
        >
          {s.label}
        </motion.button>
      ))}
    </div>
  );
}

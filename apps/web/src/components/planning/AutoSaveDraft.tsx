'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { CheckSimple } from '@/components/Icons';

interface AutoSaveDraftProps {
  draftKey: string;
  data: any;
  children?: ReactNode;
}

export default function AutoSaveDraft({ draftKey, data, children }: AutoSaveDraftProps) {
  const { saveDraft } = useAppStore();
  const [saved, setSaved] = useState(false);
  const prevRef = useRef<string>('');

  useEffect(() => {
    const current = JSON.stringify(data);
    if (current === prevRef.current) return;
    prevRef.current = current;

    const timer = setInterval(() => {
      saveDraft(draftKey, data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 30000);

    return () => clearInterval(timer);
  }, [draftKey, data, saveDraft]);

  return (
    <>
      {children}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-gold/10 border border-theme-gold/20 backdrop-blur-lg"
          >
            <CheckSimple size={14} />
            <span className="text-xs font-cairo text-theme-gold">تم الحفظ تلقائياً</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

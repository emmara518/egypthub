'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (isReduced) {
    return <>{children}</>;
  }

  const ease = [0.25, 0.1, 0.25, 1] as const;

  return (
    <div className="relative flex-1 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8, scale: 0.98, filter: 'blur(2px)' }}
          animate={{
            opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
            transition: { duration: 0.28, ease, opacity: { duration: 0.22 }, scale: { duration: 0.3, ease }, filter: { duration: 0.2 } },
          }}
          exit={{
            opacity: 0, y: -6, scale: 0.97, filter: 'blur(3px)',
            transition: { duration: 0.18, ease },
          }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

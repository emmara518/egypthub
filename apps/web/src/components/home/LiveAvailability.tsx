'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LiveAvailability() {
  const [count, setCount] = useState(3);
  const [booked, setBooked] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => Math.max(1, c + (Math.random() > 0.5 ? -1 : 0)));
      setBooked(b => b + (Math.random() > 0.7 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 text-[10px] font-english">
      <div className="flex items-center gap-1.5 border border-green-500/20 bg-green-500/5 px-2.5 py-1 rounded-full">
        <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-green-400 font-bold">{count}</span>
        <span className="text-white/40">spots left</span>
      </div>
      <span className="text-white/30">{booked}+ booked today</span>
    </div>
  );
}

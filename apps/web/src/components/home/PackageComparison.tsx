'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, Check, Star } from '@/components/Icons';

const packages = [
  { name: 'Essential', price: '$299', features: ['3 Days / 2 Nights', 'Cairo Visit', 'Standard Hotel', 'Group Guide', 'Airport Transfer'], rating: 4.5, popular: false },
  { name: 'Premium', price: '$599', features: ['5 Days / 4 Nights', 'Cairo + Luxor', '4★ Hotel', 'Private Guide', 'Airport Transfer', 'Nile Dinner Cruise', 'Temple Tours'], rating: 4.8, popular: true },
  { name: 'Royal', price: '$1,299', features: ['7 Days / 6 Nights', 'Cairo + Luxor + Aswan', '5★ Hotel / Nile Cruise', 'Private Egyptologist', 'VIP Airport + Domestic Flights', 'All Meals Included', 'Abu Simbel Tour', 'Hot Air Balloon'], rating: 4.9, popular: false },
];

export default function PackageComparison() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-full gold-btn text-xs font-bold shadow-[0_4px_12px_rgba(212,162,76,0.2)]"
        aria-label="Compare packages"
      >
        <span>Compare Packages</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl overflow-hidden max-w-[750px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">COMPARE PACKAGES</span>
                  <h3 className="text-lg font-bold font-display text-white mt-0.5">Find Your Perfect Trip</h3>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={16} /></button>
              </div>

              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="p-4 text-[11px] font-english text-white/40 font-semibold w-[180px]">Features</th>
                      {packages.map(pkg => (
                        <th key={pkg.name} className={`p-4 text-center relative ${pkg.popular ? 'bg-theme-gold/[0.04]' : ''}`}>
                          {pkg.popular && (
                            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 bg-theme-gold text-[8px] text-theme-bg font-bold font-english px-3 py-0.5 rounded-b-full tracking-[0.1em]">MOST POPULAR</div>
                          )}
                          <p className="text-sm font-bold font-english text-white">{pkg.name}</p>
                          <p className="text-xl font-bold font-display text-theme-gold mt-1">{pkg.price}</p>
                          <div className="flex items-center justify-center gap-0.5 mt-1">
                            <Star size={11} />
                            <span className="text-[11px] font-bold text-theme-gold">{pkg.rating}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {packages[0].features.map((_, fi) => (
                      <tr key={fi} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 text-[12px] text-white/60 font-english pl-4">{packages[0].features[fi] || packages[1].features[fi] || packages[2].features[fi]}</td>
                        {packages.map(pkg => (
                          <td key={pkg.name} className={`p-3 text-center ${pkg.popular ? 'bg-theme-gold/[0.02]' : ''}`}>
                            <span className={pkg.features[fi] ? 'text-green-400' : 'text-white/20'}>
                              {pkg.features[fi] ? <Check size={16} className="mx-auto" /> : '—'}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className="p-3" />
                      {packages.map(pkg => (
                        <td key={pkg.name} className={`p-3 text-center ${pkg.popular ? 'bg-theme-gold/[0.02]' : ''}`}>
                          <button className={`px-4 py-2 rounded-xl text-xs font-bold font-english transition-all ${
                            pkg.popular ? 'gold-btn shadow-[0_4px_12px_rgba(212,162,76,0.2)]' : 'border border-theme-gold/25 text-theme-gold hover:bg-theme-gold/[0.06]'
                          }`}>
                            Select
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

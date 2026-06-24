'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import Link from 'next/link';

const groups = [
  {
    title: 'استكشف',
    links: ['الوجهات', 'التجارب', 'القصص', 'العروض'],
  },
  {
    title: 'الشركة',
    links: ['عن مصر هب', 'المدونة', 'اتصل بنا'],
  },
  {
    title: 'الدعم',
    links: ['مركز المساعدة', 'الأمان', 'الإلغاء'],
  },
];

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <footer className="bg-[#080C18] border-t border-white/[0.04] pt-6 pb-6">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Accordion — mobile only */}
        <div className="md:hidden">
          {groups.map((group, i) => (
            <div key={group.title} className="border-b border-white/[0.04]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full py-3 text-sm text-white/70 font-cairo touch-target"
              >
                {group.title}
                <HiChevronDown className={`w-4 h-4 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-3 space-y-2">
                      {group.links.map((link) => (
                        <Link key={link} href="#" className="block text-sm text-white/40 hover:text-white/60 font-cairo py-1">
                          {link}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Desktop row */}
        <div className="hidden md:flex items-center justify-between gap-8 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-bold font-poppins"><span className="text-white">EGYPT</span><span className="text-theme-gold">HUB</span></span>
          </Link>
          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-bold text-white/60 font-cairo mb-2">{group.title}</h4>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs text-white/30 hover:text-white/50 font-cairo">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-white/[0.04]">
          <p className="text-[11px] md:text-xs text-white/30 font-cairo text-center">
            &copy; {new Date().getFullYear()} EGYPTHUB. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] md:text-xs text-white/30">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

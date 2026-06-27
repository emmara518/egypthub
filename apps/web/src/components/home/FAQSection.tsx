'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from '@/components/Icons';

const faqs = [
  { q: 'How do I book a trip on EgyptHub?', a: 'Simply select your destination and dates, choose from curated experiences, and complete your booking with our AI Concierge guiding you through every step.' },
  { q: 'Can I customize my itinerary?', a: 'Absolutely! Our AI Concierge builds a personalized itinerary based on your preferences, budget, and travel style. You can modify any part of it.' },
  { q: 'Are the guides certified?', a: 'Yes. Every guide on EgyptHub is certified, vetted, and rated by travelers. We maintain a 4.9 average rating across 15K+ reviews.' },
  { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, Amex, Fawry, and Vodafone Cash. All payments are processed securely with 256-bit encryption.' },
  { q: 'Can I cancel or modify my booking?', a: 'Yes. Free cancellation up to 48 hours before your experience. Our 24/7 support team is always available to help with changes.' },
  { q: 'Is EgyptHub available in multiple languages?', a: 'Currently available in English and Arabic. More languages coming soon. Our AI Concierge can communicate in your preferred language.' },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-theme-bg py-8 md:py-14">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
              <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">FAQ</p>
              <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
            </div>
            <h2 className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold font-display text-white mb-2 gold-underline-center" style={{ paddingBottom: '8px' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-white/40 text-sm">Everything you need to know about EgyptHub.</p>
          </div>

          <div className="space-y-2 glass-card">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-theme-gold/[0.06] bg-theme-surface/40 overflow-hidden hover:border-theme-gold/15 transition-all"
              >
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 md:px-5 py-3.5 text-left touch-target ripple-modern"
                  aria-expanded={openIdx === i} aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-sm font-bold font-english text-white pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div id={`faq-answer-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-4 md:px-5 pb-3.5 text-[12px] text-white/50 font-english leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

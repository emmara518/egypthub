'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from '@/components/Icons';

const reviews = [
  { name: 'Sarah M.', avatar: '/assets/home/avatar-woman-freckles.jpg?w=96&q=80', location: 'United Kingdom', rating: 5, text: 'EgyptHub made our trip absolutely magical. The AI concierge recommended hidden gems we never would have found. Every detail was perfect.', date: 'March 2026' },
  { name: 'Ahmed K.', avatar: '/assets/home/avatar-man-beard.jpg?w=96&q=80', location: 'Saudi Arabia', rating: 5, text: 'Best travel platform for Egypt. The local guides were incredible and the booking process was seamless. Highly recommend the Luxor package.', date: 'February 2026' },
  { name: 'Emma L.', avatar: '/assets/home/avatar-woman-brown-hair.jpg?w=96&q=80', location: 'Australia', rating: 5, text: 'From the pyramids to the Red Sea, every moment was curated beautifully. The attention to detail and cultural authenticity sets EgyptHub apart.', date: 'January 2026' },
  { name: 'Marco R.', avatar: '/assets/home/avatar-man-suit.jpg?w=96&q=80', location: 'Italy', rating: 4, text: 'An unforgettable experience in Egypt. The private Nile dinner was the highlight of our trip. Would definitely book again.', date: 'December 2025' },
];

export default function ReviewsSection() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveIdx((prev) => (prev + 1) % reviews.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setActiveIdx((p) => (p - 1 + reviews.length) % reviews.length);
  const next = () => setActiveIdx((p) => (p + 1) % reviews.length);

  return (
    <section className="bg-[#080C18] py-8 md:py-14">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
              <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">REVIEWS</p>
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold font-display leading-[1.1] text-white gold-underline">
              What Travelers Say
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className={s <= Math.round(Number(avgRating)) ? '' : 'opacity-30'} />
                ))}
              </div>
              <span className="text-sm font-bold font-english text-theme-gold">{avgRating}</span>
              <span className="text-[11px] text-white/40 font-english">({reviews.length} reviews)</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={prev} className="w-8 h-8 rounded-full border border-theme-gold/20 flex items-center justify-center text-theme-gold hover:bg-theme-gold/10 transition-all touch-target" aria-label="Previous review"><ChevronLeft size={16} /></button>
            <button onClick={next} className="w-8 h-8 rounded-full border border-theme-gold/20 flex items-center justify-center text-theme-gold hover:bg-theme-gold/10 transition-all touch-target" aria-label="Next review"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-4 md:gap-4">
          {reviews.map((review, i) => (
            <motion.div key={review.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="bg-[#0F1525]/50 rounded-xl border border-theme-gold/[0.08] hover:border-theme-gold/25 p-4 md:p-5 hover:shadow-[0_0_30px_rgba(212,162,76,0.12)] transition-all duration-500 glass-card neon-gold"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
                  <Image src={review.avatar} alt={review.name} fill sizes="36px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold font-english text-white">{review.name}</p>
                  <p className="text-[9px] text-white/40 font-english">{review.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className={s <= review.rating ? '' : 'opacity-30'} />
                ))}
                <span className="text-[9px] text-white/30 font-english ml-1">{review.date}</span>
              </div>
              <p className="text-[11px] text-white/60 font-english leading-relaxed">&ldquo;{review.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>

        <div aria-live="polite" className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}
              className="bg-[#0F1525]/50 rounded-xl border border-theme-gold/[0.08] p-4 glass-card neon-gold"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
                  <Image src={reviews[activeIdx].avatar} alt={reviews[activeIdx].name} fill sizes="36px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold font-english text-white">{reviews[activeIdx].name}</p>
                  <p className="text-[9px] text-white/40 font-english">{reviews[activeIdx].location}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className={s <= reviews[activeIdx].rating ? '' : 'opacity-30'} />
                ))}
                <span className="text-[9px] text-white/30 font-english ml-1">{reviews[activeIdx].date}</span>
              </div>
              <p className="text-[11px] text-white/60 font-english leading-relaxed">&ldquo;{reviews[activeIdx].text}&rdquo;</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {reviews.map((_, i) => (
              <button key={i} onClick={() => setActiveIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all touch-target ${i === activeIdx ? 'bg-theme-gold w-4' : 'bg-white/20'}`} aria-label={`Review ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

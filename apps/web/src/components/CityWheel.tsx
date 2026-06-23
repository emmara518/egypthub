'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
  { name: 'شرم الشيخ', nameEn: 'Sharm El Sheikh', slug: 'sharm-el-sheikh', image: '/egypthub/images/destinations/dahab.svg', rating: 4.8, desc: 'غوص عالمي وحياة ليلية' },
  { name: 'الغردقة', nameEn: 'Hurghada', slug: 'hurghada', image: '/egypthub/images/destinations/hurghada.svg', rating: 4.8, desc: 'شواطئ ذهبية ورياضات مائية' },
  { name: 'القاهرة', nameEn: 'Cairo', slug: 'cairo', image: '/egypthub/images/destinations/cairo.svg', rating: 4.5, desc: 'مدينة الألف مئذنة' },
  { name: 'الأقصر', nameEn: 'Luxor', slug: 'luxor', image: '/egypthub/images/destinations/luxor.svg', rating: 4.9, desc: 'معابد فرعونية ووادي الملوك' },
  { name: 'الإسكندرية', nameEn: 'Alexandria', slug: 'alexandria', image: '/egypthub/images/destinations/alexandria.svg', rating: 4.6, desc: 'عروس البحر الأبيض المتوسط' },
  { name: 'أسوان', nameEn: 'Aswan', slug: 'aswan', image: '/egypthub/images/destinations/aswan.svg', rating: 4.7, desc: 'سحر النيل وروحانياته' },
  { name: 'سيوة', nameEn: 'Siwa', slug: 'siwa', image: '/egypthub/images/destinations/hurghada.svg', rating: 4.7, desc: 'واحة الأحلام' },
  { name: 'دهب', nameEn: 'Dahab', slug: 'dahab', image: '/egypthub/images/destinations/dahab.svg', rating: 4.6, desc: 'مغامرات البدو والغوص' },
];

const CARD_WIDTH = 280;
const CARD_GAP = 24;
const VISIBLE_OFFSET = CARD_WIDTH + CARD_GAP;

export default function CityWheel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef(0);
  const dragOffset = useRef(0);
  const momentumRef = useRef(0);

  const totalCards = cities.length;

  const goTo = useCallback((idx: number) => {
    const wrapped = ((idx % totalCards) + totalCards) % totalCards;
    setActiveIdx(wrapped);
    setDragX(0);
    dragOffset.current = 0;
  }, [totalCards]);

  const next = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);
  const prev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') prev();
      if (e.key === 'ArrowLeft') next();
      if (e.key === 'Escape' && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, lightboxOpen]);

  // Touch / Mouse drag handlers
  const onDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStart.current = clientX;
    momentumRef.current = 0;
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStart.current;
    momentumRef.current = delta;
    setDragX(delta + dragOffset.current);
  };

  const onDragEnd = () => {
    setIsDragging(false);
    const absDrag = Math.abs(momentumRef.current);
    if (absDrag > 60) {
      if (momentumRef.current > 0) prev();
      else next();
    } else {
      setDragX(0);
      dragOffset.current = 0;
    }
  };

  const getCardTransform = (index: number) => {
    const diff = index - activeIdx;
    const abs = Math.abs(diff);
    const isActive = diff === 0;
    const translateX = diff * VISIBLE_OFFSET + dragX;

    return {
      x: translateX,
      scale: isActive ? 1.08 : Math.max(0.75, 1 - abs * 0.12),
      opacity: isActive ? 1 : Math.max(0.3, 1 - abs * 0.25),
      rotateY: diff < 0 ? -15 : diff > 0 ? 15 : 0,
      zIndex: totalCards - abs,
      transition: isDragging ? { duration: 0 } : { type: 'spring' as const, stiffness: 300, damping: 30 },
    };
  };

  const openLightbox = (img: string) => {
    setLightboxImg(img);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-theme-bg overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">الوجهات</p>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
                أبرز <span className="text-theme-gold">الوجهات</span>
              </h2>
              <p className="text-theme-secondary mt-3 font-cairo max-w-xl">
                اختر وجهتك واستعد لمغامرة لا تُنسى في مصر.
              </p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-theme-gold/30 flex items-center justify-center text-theme-gold hover:bg-theme-gold/10 transition-all duration-200"
                aria-label="السابق"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-theme-gold/30 flex items-center justify-center text-theme-gold hover:bg-theme-gold/10 transition-all duration-200"
                aria-label="التالي"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* 3D Carousel */}
          <div
            ref={containerRef}
            className="relative h-[500px] flex items-center justify-center perspective-[1200px]"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
          >
            {cities.map((city, i) => {
              const transform = getCardTransform(i);
              return (
                <motion.div
                  key={city.slug}
                  animate={transform}
                  className="absolute cursor-pointer"
                  style={{ width: CARD_WIDTH, transformStyle: 'preserve-3d' }}
                  onClick={() => {
                    if (Math.abs(momentumRef.current) < 10) {
                      if (i === activeIdx) openLightbox(city.image);
                      else goTo(i);
                    }
                  }}
                >
                  <div className="relative w-[280px] aspect-[4/5] rounded-xl overflow-hidden border border-theme-border bg-theme-card shadow-elevation">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${city.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-1 mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#F2A00A" stroke="#F2A00A" strokeWidth="1">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-accent-orange text-sm font-semibold">{city.rating}</span>
                      </div>
                      <h3 className="text-xl font-bold font-playfair text-white mb-1">{city.name}</h3>
                      <p className="text-white/60 text-sm font-cairo">{city.desc}</p>
                    </div>
                  </div>

                  {/* Reflection */}
                  {i === activeIdx && (
                    <div
                      className="absolute -bottom-6 left-0 right-0 h-24 pointer-events-none"
                      style={{
                        transform: 'scaleY(-1)',
                        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
                      }}
                    >
                      <div
                        className="w-full h-full rounded-xl opacity-30"
                        style={{
                          backgroundImage: `url(${city.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {cities.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIdx ? 'w-8 h-2.5 bg-theme-gold' : 'w-2.5 h-2.5 bg-theme-border hover:bg-theme-gold/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 left-4 text-white/70 hover:text-white text-2xl z-10"
              aria-label="إغلاق"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              key={lightboxImg}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImg}
              alt=""
              className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { name: 'Sarah M.', avatar: '/images/avatars/avatar-1.svg', text: 'EgyptHub made planning my trip to Luxor effortless. The AI concierge recommended hidden gems I would never have found on my own!', rating: 5, location: 'London, UK' },
  { name: 'Ahmed K.', avatar: '/images/avatars/avatar-2.svg', text: 'كمنصة مصرية، EgyptHub فخري الحقيقي. سهلت علينا السفر الداخلي وخليتنا نكتشف أماكن جديدة في بلدنا.', rating: 5, location: 'Cairo, Egypt' },
  { name: 'Elena V.', avatar: '/images/avatars/avatar-3.svg', text: 'The Red Sea diving package was incredible. Everything was organized perfectly. Can\'t wait to book my next trip!', rating: 5, location: 'Moscow, Russia' },
  { name: 'James W.', avatar: '/images/avatars/avatar-4.svg', text: 'From the pyramids to Siwa Oasis, every detail was taken care of. This is how travel should be.', rating: 4, location: 'New York, USA' },
  { name: 'Nour A.', avatar: '/images/avatars/avatar-5.svg', text: 'تجربة رائعة! حجزت رحلة الغردقة وكان كل شيء تمام. أنصح الكل يجرب.', rating: 5, location: 'Riyadh, KSA' },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">آراء المسافرين</p>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
            ماذا يقول <span className="text-theme-gold">المسافرون</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-full border-2 border-primary-500/40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${testimonials[active].avatar})` }}
                />
              </div>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < testimonials[active].rating ? '#F2A00A' : 'none'} stroke="#F2A00A" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p               className="text-theme/80 text-lg md:text-xl leading-relaxed mb-6 font-cairo">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>
              <p className="text-theme font-bold font-playfair">{testimonials[active].name}</p>
              <p className="text-theme-secondary text-sm">{testimonials[active].location}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === active ? 'w-8 h-2.5 bg-theme-gold' : 'w-2.5 h-2.5 bg-theme hover:bg-theme-gold/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';

export default function AIMapSection() {
  return (
    <section className="py-24 bg-theme-surface">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">خريطة ذكية</p>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
            خريطة <span className="text-theme-gold">تفاعلية</span>
          </h2>
          <p className="text-theme-secondary mt-3 font-cairo max-w-xl mx-auto">
            استكشف روائع مصر على خريطتنا الذكية. ماذا يمكننا أن نخطط لك؟
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden border border-theme bg-theme-card backdrop-blur-[12px] saturate-[160%] h-[400px] md:h-[500px] flex items-center justify-center"
          style={{ background: 'rgba(var(--card-rgb, 20,27,45), 0.8)' }}
        >
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 800 500" className="w-full h-full" fill="none">
              <path d="M200 100 L250 80 L300 120 L350 90 L400 130" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
              <circle cx="250" cy="80" r="4" fill="var(--gold)" />
              <circle cx="350" cy="90" r="4" fill="var(--gold)" />
              <circle cx="450" cy="150" r="4" fill="var(--gold)" />
              <circle cx="550" cy="200" r="4" fill="var(--gold)" />
              <circle cx="300" cy="300" r="4" fill="var(--gold)" />
              <circle cx="500" cy="350" r="4" fill="var(--gold)" />
              <circle cx="400" cy="250" r="5" fill="var(--gold)" opacity="0.6" />
            </svg>
          </div>

          <div className="relative z-10 text-center px-6">
            <div className="w-20 h-20 rounded-full bg-theme-gold/10 border border-theme-gold/30 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="text-theme text-2xl md:text-3xl font-bold font-playfair mb-4">
              ماذا يمكننا أن <span className="text-theme-gold">نخطط</span> لك؟
            </p>
            <p className="text-theme-secondary font-cairo mb-8 max-w-md mx-auto">
              أخبرنا باهتماماتك وسيبني ذكاؤنا الاصطناعي رحلة مخصصة لك في جميع أنحاء مصر.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-theme-gold hover:bg-theme-gold/80 text-[#0A0E17] font-bold transition-all duration-200 font-cairo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              ابدأ التخطيط
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3">
            {['Cairo', 'Luxor', 'Sharm', 'Aswan'].map((city) => (
              <span key={city} className="px-3 py-1 rounded-full text-xs bg-theme-bg/80 text-theme-gold border border-theme-gold/30 font-cairo">
                {city}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

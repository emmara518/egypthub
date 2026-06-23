'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AIConciergeWidget() {
  return (
    <section className="py-24 bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden border border-theme backdrop-blur-[12px] saturate-[160%]"
          style={{
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--card) 50%, var(--surface) 100%)',
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)' }} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-10 lg:p-16">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-theme-card border-2 border-theme-gold/50 flex items-center justify-center overflow-hidden">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-accent-amber flex items-center justify-center text-xs font-bold text-[#0A0E17]">
                  AI
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-right">
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-2 font-poppins">المساعد الذكي</p>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-theme mb-3">
                تعرّف على <span className="text-theme-gold">زينب</span>
              </h2>
              <p className="text-theme-secondary font-cairo mb-6 max-w-lg leading-relaxed">
                مساعدتك الشخصية للسفر في مصر. زينب تعرف مصر من الداخل — 
                من مقاهي القاهرة الخفية إلى أفضل مواقع الغطس في البحر الأحمر.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="/ai-concierge"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-theme-gold hover:bg-theme-gold/80 text-[#0A0E17] font-bold transition-all duration-200 font-cairo"
                >
                  تحدث مع زينب
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-theme-gold/40 text-theme-gold hover:bg-theme-gold/10 transition-all duration-200 font-cairo text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 8 14 2 18 6 12 12 20 10 22 14 15 19 11 22 5 20 8 16 3 12 8 10 5 6" />
                  </svg>
                  المساعد الصوتي
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-theme-card border border-theme bg-cover bg-center"
                  style={{ backgroundImage: `url(/egypthub/images/avatars/avatar-${i + 10}.svg)` }}
                />
              ))}
              <span className="text-theme-secondary text-xs font-cairo mr-2">+2.4K محادثة اليوم</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

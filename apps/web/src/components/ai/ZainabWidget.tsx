'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ZainabWidget() {
  return (
    <section className="py-24 bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden border border-theme-gold/25 backdrop-blur-[12px] saturate-[160%]"
          style={{
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--card) 50%, var(--surface) 100%)',
          }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 opacity-15 pointer-events-none">
            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)' }} />
          </div>

          <div className="absolute bottom-0 left-0 w-40 h-40 opacity-10 pointer-events-none">
            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)' }} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-10 lg:p-16">
            <div className="flex-shrink-0">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-theme-gold to-theme-gold/40 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0A0E17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </motion.div>
                </motion.div>
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(212,162,76,0.3)',
                      '0 0 40px rgba(212,162,76,0.5)',
                      '0 0 20px rgba(212,162,76,0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-theme-gold flex items-center justify-center text-[10px] font-bold text-dark-900"
                >
                  AI
                </motion.div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-right">
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-2 font-poppins">
                المساعد الذكي
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-theme mb-3">
                زينب جاهزة <span className="text-theme-gold">تخطط رحلتك</span>
              </h2>
              <p className="text-theme-secondary font-cairo mb-6 max-w-lg leading-relaxed">
                مساعدتك الشخصية الذكية لاستكشاف مصر. زينب تعرف كل حاجة عن مصر
                — من أحسن أماكن الغطس في دهب لأشهى الأكلات في القاهرة.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="/zainab"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-theme-gold hover:bg-theme-gold/80 text-[#0A0E17] font-bold transition-all duration-200 font-cairo"
                >
                  اسأل زينب ✨
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/ai-concierge"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-theme-gold/40 text-theme-gold hover:bg-theme-gold/10 transition-all duration-200 font-cairo text-sm"
                >
                  المزيد من التوصيات
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-theme-card border border-theme-gold/20 flex items-center justify-center"
                >
                  <span className="text-xs">
                    {['🧕', '👳', '🧕'][i - 1]}
                  </span>
                </div>
              ))}
              <span className="text-theme-secondary text-xs font-cairo mr-2">+2.4KConversation اليوم</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

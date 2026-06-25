import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PromotionalBanner() {
  return (
    <section className="py-24 bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden border border-theme backdrop-blur-[12px] saturate-[160%]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-theme-surface via-theme-card to-theme-surface" />
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 1200 300" className="w-full h-full">
              <path d="M0 150 Q 150 50 300 150 T 600 150 T 900 150 T 1200 150" stroke="var(--gold)" strokeWidth="2" fill="none" />
              <path d="M0 200 Q 150 100 300 200 T 600 200 T 900 200 T 1200 200" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.5" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 lg:p-16">
            <div className="flex-1 text-center md:text-right">
              <p className="text-accent-amber text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">لفترة محدودة</p>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-theme mb-3">
                تخفيضات الصيف — <span className="text-theme-gold">حتى 40% خصم</span>
              </h2>
              <p className="text-theme-secondary font-cairo mb-2 max-w-lg leading-relaxed">
                احجز مغامرتك الصيفية في مصر الآن واستمتع بخصومات حصرية على الفنادق 
                والجولات والتجارب في جميع أنحاء البلاد.
              </p>
              <div className="flex items-center gap-4 justify-center md:justify-start mt-2 mb-6">
                <div className="flex -space-x-2">
                  {['Visa', 'MC', 'Meeza', 'Fawry', 'Apple'].map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded text-[10px] font-bold bg-theme-card text-theme-secondary border border-theme">
                      {p}
                    </span>
                  ))}
                </div>
                <span className="text-theme-secondary text-xs font-cairo">دفع آمن</span>
              </div>
              <Link
                href="/offers"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-theme-gold hover:bg-theme-gold/80 text-[#0A0E17] font-bold transition-all duration-200"
              >
                عرض العروض
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="flex-shrink-0 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-40 h-40 rounded-full border-2 border-theme-gold/30 bg-theme-card flex items-center justify-center"
              >
                <div className="text-center">
                  <p className="text-4xl font-bold font-playfair text-theme-gold">40%</p>
                  <p className="text-theme-secondary text-xs font-cairo">OFF</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

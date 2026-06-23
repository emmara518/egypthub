'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const updates = [
  {
    title: 'جديد: إطلاق مخطط الرحلات الذكي',
    date: '15 يونيو 2026',
    category: 'ميزة جديدة',
    excerpt: 'المساعد الذكي زينب يمكنها الآن بناء خطط يومية كاملة.',
  },
  {
    title: 'عودة عرض الليل في معبد الأقصر',
    date: '12 يونيو 2026',
    category: 'حدث',
    excerpt: 'عرض الصوت والضوء المذهل في معبد الأقصر عاد من جديد.',
  },
  {
    title: 'مبادرة الحفاظ على الشعاب المرجانية في البحر الأحمر',
    date: '8 يونيو 2026',
    category: 'استدامة',
    excerpt: 'EgyptHub تتعاون مع منظمات محلية للحفاظ على الشعاب المرجانية.',
  },
  {
    title: 'شريك جديد: نزل سيوة البيئية',
    date: '5 يونيو 2026',
    category: 'شراكة',
    excerpt: 'أماكن إقامة صحراوية مستدامة متاحة الآن للحجز.',
  },
];

export default function LatestUpdates() {
  return (
    <section className="py-24 bg-theme-surface">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">آخر المستجدات</p>
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
              آخر <span className="text-theme-gold">التحديثات</span>
            </h2>
            <p className="text-theme-secondary mt-3 font-cairo max-w-xl">
              ابقَ على اطلاع بكل جديد على EgyptHub وفي جميع أنحاء مصر.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-md border border-theme-gold/40 text-theme-gold hover:bg-theme-gold/10 transition-all duration-200 font-cairo text-sm"
          >
            عرض الكل
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {updates.map((update, idx) => (
            <motion.div
              key={update.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href="#"
                className="group block rounded-xl border border-theme bg-theme-card p-6 hover:border-theme-gold/40 transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow),0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-theme-gold/10 text-theme-gold border border-theme-gold/20 uppercase tracking-wider">
                    {update.category}
                  </span>
                  <span className="text-theme-secondary text-xs font-cairo">{update.date}</span>
                </div>
                <h3 className="text-lg font-bold font-playfair text-theme mb-2 group-hover:text-theme-gold transition-colors">
                  {update.title}
                </h3>
                <p className="text-theme-secondary text-sm font-cairo leading-relaxed">
                  {update.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

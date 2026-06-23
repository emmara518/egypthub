'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const iconPaths: Record<string, string> = {
  beaches: 'M14 2l6 6v14a2 2 0 01-2 2H6a2 2 0 01-2-2V8l6-6m-4 12h16M8 12l2-2 2 2 2-2 2 2',
  history: 'M12 2C8 6 6 12 6 16c0 3 3 6 6 6s6-3 6-6c0-4-2-10-6-14z M12 22V2',
  safari: 'M3 21l18-6-6-3-3 9-9-3z M3 21l6-15 6 6-6 15M12 12l3-3',
  cruises: 'M2 12l2-2 8 2 8-2 2 2M4 16l2-2 6 2 6-2 2 2M22 12v4M2 12v4M12 2v20',
  food: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3',
  shopping: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
  wellness: 'M12 2C8 7 2 10 2 15c0 4 4 7 10 7s10-3 10-7c0-5-6-8-10-13z M12 8v8M8 12h8',
  adventure: 'M4 4l4 16 4-8 8-4-16 4zM12 12l8-8M8 20l4-4',
};

const categories = [
  { name: 'الشواطئ والغوص', slug: 'beaches', count: '120+ موقع' },
  { name: 'المواقع التاريخية', slug: 'history', count: '85+ موقع' },
  { name: 'رحلات السفاري', slug: 'safari', count: '45+ رحلة' },
  { name: 'رحلات النيل', slug: 'cruises', count: '60+ رحلة' },
  { name: 'المأكولات المحلية', slug: 'food', count: '200+ مطعم' },
  { name: 'التسوق', slug: 'shopping', count: '150+ سوق' },
  { name: 'الاستجمام', slug: 'wellness', count: '40+ منتجع' },
  { name: 'المغامرات', slug: 'adventure', count: '70+ نشاط' },
];

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-dark-800">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">التصنيفات</p>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
            تصفح حسب <span className="text-theme-gold">التصنيف</span>
          </h2>
          <p className="text-theme-secondary mt-3 font-cairo max-w-xl mx-auto">
            اعثر بالضبط على ما تبحث عنه، من عجائب التاريخ إلى مغامرات العصر.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-theme-card border border-theme hover:border-theme-gold/40 transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow),0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={iconPaths[cat.slug]} />
                </svg>
                <div className="text-center">
                  <h3 className="text-theme font-cairo font-semibold text-sm">{cat.name}</h3>
                  <p className="text-theme-secondary text-xs mt-1">{cat.count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

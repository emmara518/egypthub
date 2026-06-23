'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const validSlugs = ['historical', 'adventure', 'cultural', 'luxury', 'beach'];

const categoryNames: Record<string, string> = {
  historical: 'رحلات تاريخية',
  adventure: 'مغامرات',
  cultural: 'أنشطة ثقافية',
  luxury: 'تجارب فاخرة',
  beach: 'شواطئ وجزر',
};

export default function CategoryClient({ slug }: { slug: string }) {
  if (!validSlugs.includes(slug)) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
          <p className="text-theme text-lg font-cairo mb-8">هذا التصنيف غير موجود</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg pt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-theme-gold font-cairo mb-8 hover:underline">
          ← العودة للرئيسية
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-theme mb-4">{categoryNames[slug]}</h1>
          <p className="text-theme/70 font-cairo">تصفح جميع الأنشطة في هذا التصنيف...</p>
        </motion.div>
      </div>
    </div>
  );
}

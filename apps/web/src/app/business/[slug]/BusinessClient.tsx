'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const validSlugs = ['abou-el-ala-fool', 'deep-dive-center', 'rizk-el-bahr-seafood'];

const businessNames: Record<string, string> = {
  'abou-el-ala-fool': 'أبو العلا فول وفلافل',
  'deep-dive-center': 'Deep Dive Center',
  'rizk-el-bahr-seafood': 'مطعم رزق البحر',
};

export default function BusinessClient({ slug }: { slug: string }) {
  if (!validSlugs.includes(slug)) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
          <p className="text-theme text-lg font-cairo mb-8">النشاط التجاري غير موجود</p>
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
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-theme mb-4">{businessNames[slug]}</h1>
          <p className="text-theme/70 font-cairo">صفحة النشاط التجاري قيد التحميل...</p>
        </motion.div>
      </div>
    </div>
  );
}

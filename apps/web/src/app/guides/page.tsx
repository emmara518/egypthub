'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const cities = ['الكل', 'القاهرة', 'شرم الشيخ', 'الأقصر', 'اسوان', 'الغردقة'];
const languages = ['الكل', 'العربية', 'الإنجليزية', 'الفرنسية', 'الألمانية'];
const priceRanges = ['الكل', 'أقل من 500', '500 - 1000', 'أكثر من 1000'];

const guides = [
  {
    id: 1,
    name: 'أحمد حسن',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviews: 128,
    specialties: ['آثار', 'تاريخ', 'ثقافة'],
    languages: ['العربية', 'الإنجليزية'],
    price: 800,
    city: 'القاهرة',
    bio: 'مرشد سياحي معتمد منذ 10 سنوات',
  },
  {
    id: 2,
    name: 'سارة عبد الله',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviews: 96,
    specialties: ['غوص', 'بحر', 'مغامرات'],
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    price: 1200,
    city: 'شرم الشيخ',
    bio: 'متخصصة في رحلات الغوص والمغامرات البحرية',
  },
  {
    id: 3,
    name: 'محمد فتحي',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviews: 74,
    specialties: ['معابد', 'نيل', 'تراث'],
    languages: ['العربية', 'الألمانية'],
    price: 650,
    city: 'الأقصر',
    bio: 'خبير في آثار وادي الملوك والمعابد الفرعونية',
  },
  {
    id: 4,
    name: 'نورا إبراهيم',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviews: 112,
    specialties: ['ثقافة', 'طبخ', 'حرف يدوية'],
    languages: ['العربية', 'الإنجليزية', 'الألمانية'],
    price: 950,
    city: 'القاهرة',
    bio: 'مرشدة سياحية متخصصة في الثقافة المصرية المعاصرة',
  },
  {
    id: 5,
    name: 'خالد علي',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    reviews: 58,
    specialties: ['صحراء', ' BEDOUIN', 'نجوم'],
    languages: ['العربية', 'الإنجليزية'],
    price: 700,
    city: 'اسوان',
    bio: 'خبير في رحلات الصحراء والحياة البدوية',
  },
  {
    id: 6,
    name: 'هدى سعيد',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviews: 89,
    specialties: ['غوص', 'سنوركلينج', 'تصوير'],
    languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
    price: 1100,
    city: 'الغردقة',
    bio: 'مرشدة غوص معتمدة ومصورة بحرية',
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`w-3.5 h-3.5 ${filled ? 'text-theme-gold' : 'text-theme-border'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function GuidesPage() {
  const [selectedCity, setSelectedCity] = useState('الكل');
  const [selectedLanguage, setSelectedLanguage] = useState('الكل');
  const [selectedPrice, setSelectedPrice] = useState('الكل');

  const filtered = guides.filter(g => {
    if (selectedCity !== 'الكل' && g.city !== selectedCity) return false;
    if (selectedLanguage !== 'الكل' && !g.languages.includes(selectedLanguage)) return false;
    if (selectedPrice === 'أقل من 500' && g.price >= 500) return false;
    if (selectedPrice === '500 - 1000' && (g.price < 500 || g.price > 1000)) return false;
    if (selectedPrice === 'أكثر من 1000' && g.price <= 1000) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          العودة للرئيسية
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-playfair">الدليل السياحي</h1>
          <p className="text-theme-muted font-cairo mt-1">اكتشف أفضل المرشدين السياحيين في مصر</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <div>
            <label className="text-xs text-theme-muted font-cairo block mb-1.5">المدينة</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
              className="bg-theme-card border border-theme-border text-white text-sm font-cairo rounded-xl px-4 py-2.5 focus:outline-none focus:border-theme-gold/30 appearance-none cursor-pointer min-w-[140px]">
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-theme-muted font-cairo block mb-1.5">اللغة</label>
            <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}
              className="bg-theme-card border border-theme-border text-white text-sm font-cairo rounded-xl px-4 py-2.5 focus:outline-none focus:border-theme-gold/30 appearance-none cursor-pointer min-w-[140px]">
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-theme-muted font-cairo block mb-1.5">نطاق السعر</label>
            <select value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)}
              className="bg-theme-card border border-theme-border text-white text-sm font-cairo rounded-xl px-4 py-2.5 focus:outline-none focus:border-theme-gold/30 appearance-none cursor-pointer min-w-[140px]">
              {priceRanges.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((guide, idx) => (
            <motion.div key={guide.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden hover:border-theme-gold/25 transition-all group">
              <div className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-theme-gold p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${guide.avatar})` }} />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#141B2D] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white font-cairo mb-1 group-hover:text-theme-gold transition-colors">{guide.name}</h3>
                <p className="text-xs text-theme-muted font-cairo mb-3">{guide.bio}</p>

                <div className="flex items-center justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= Math.floor(guide.rating)} />)}
                  <span className="text-xs text-white font-english mr-1">{guide.rating}</span>
                  <span className="text-[10px] text-theme-muted font-cairo">({guide.reviews})</span>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {guide.specialties.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-full bg-theme-gold/10 text-theme-gold text-[10px] font-cairo border border-theme-gold/20">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {guide.languages.map(l => (
                    <span key={l} className="px-2 py-0.5 rounded bg-theme-surface text-theme-secondary text-[10px] font-cairo">
                      {l}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-theme-muted font-cairo">السعر للساعة</span>
                  <span className="text-lg font-bold text-theme-gold font-english">EGP {guide.price}</span>
                </div>

                <button className="w-full py-3 rounded-xl bg-gradient-to-l from-theme-gold to-theme-gold text-theme-bg text-sm font-cairo font-bold hover:shadow-lg transition-all" style={{ boxShadow: '0 0 15px var(--gold-glow)' }}>
                  احجز الآن
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto rounded-full bg-theme-gold/8 border border-theme-gold/15 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-theme-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white font-cairo mb-2">لا يوجد مرشدون مطابقون</h3>
            <p className="text-sm text-theme-muted font-cairo">جرّب تعديل الفلاتر للحصول على نتائج أفضل</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { ArrowRight } from '@/components/Icons';

const travelerLabels: Record<string, string> = {
  adventurer: 'المغامر',
  culture: 'عاشق الثقافة',
  beach: 'عاشق الشواطئ',
  history: 'عاشق التاريخ',
  foodie: 'عاشق الطعام',
  luxury: 'عاشق الرفاهية',
};

export default function PersonalizedHomeSection() {
  const { travelDna, continuePlanning } = useAppStore();
  const isComplete = travelDna.completed;

  const draftKeys = Object.keys(continuePlanning);
  const hasDrafts = draftKeys.length > 0;

  return (
    <>
      {hasDrafts && (
        <section className="py-8 border-b border-theme-gold/[0.04]">
          <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
              <p className="text-[10px] font-bold font-english tracking-[0.2em] text-theme-gold">CONTINUE PLANNING</p>
            </div>
            <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-bold font-display text-white mb-4">
              متابعة التخطيط
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {draftKeys.slice(0, 4).map((key) => {
                const draft = continuePlanning[key];
                const progress = draft?.progress || 0;
                const title = draft?.title || key;
                return (
                  <Link
                    key={key}
                    href="/planning"
                    className="shrink-0 w-64 p-4 rounded-2xl border border-theme-gold/10 bg-theme-card hover:border-theme-gold/30 transition-all group"
                  >
                    <p className="text-sm font-bold text-white font-cairo mb-2 group-hover:text-theme-gold transition-colors">
                      {title}
                    </p>
                    <div className="w-full h-1.5 rounded-full bg-white/10 mb-2">
                      <div
                        className="h-full rounded-full bg-theme-gold transition-all"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-theme-muted font-cairo">
                        {Math.round(progress)}% مكتمل
                      </span>
                      <span className="text-[10px] text-theme-gold font-cairo">متابعة</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {isComplete ? (
        <section className="py-10 md:py-14 border-b border-theme-gold/[0.04]">
          <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
              <p className="text-[10px] font-bold font-english tracking-[0.2em] text-theme-gold">PERSONALIZED FOR YOU</p>
            </div>
            <h2 className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold font-display text-white gold-underline mb-2" style={{ paddingBottom: '6px' }}>
              مصممة خصيصًا ليك
            </h2>
            <p className="text-sm text-theme-muted font-cairo mb-6">
              بناءً على شخصيتك السياحية: {travelerLabels[travelDna.travelerType] || travelDna.travelerType}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { title: 'رحلات موصى بها', desc: 'بناءً على اهتماماتك', link: '/experiences', icon: '🌟' },
                { title: 'وجهات مناسبة', desc: 'تلائم ميزانيتك ومدتك', link: '/destinations', icon: '📍' },
                { title: 'تجارب محلية', desc: 'مختارة خصيصاً لك', link: '/experiences', icon: '🎯' },
                { title: 'عروض حصرية', desc: 'خصومات تصل إلى ٣٠٪', link: '/offers', icon: '🏷️' },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Link
                    href={item.link}
                    className="block p-4 rounded-2xl border border-theme-gold/10 bg-theme-card hover:border-theme-gold/30 hover:shadow-[0_0_25px_rgba(212,162,76,0.08)] transition-all group h-full"
                  >
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <h3 className="text-sm font-bold text-white font-cairo mb-0.5 group-hover:text-theme-gold transition-colors">{item.title}</h3>
                    <p className="text-[11px] text-theme-muted font-cairo">{item.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <Link
              href="/travel-dna"
              className="inline-flex items-center gap-1 text-xs text-theme-gold font-cairo mt-4 hover:underline"
            >
              عرض ملفي السياحي
              <ArrowRight size={12} />
            </Link>
          </div>
        </section>
      ) : (
        <section className="py-6 border-b border-theme-gold/[0.04]">
          <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
            <Link
              href="/travel-dna"
              className="group flex items-center justify-between p-4 rounded-2xl border border-theme-gold/15 bg-gradient-to-r from-theme-gold/5 to-transparent hover:from-theme-gold/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧬</span>
                <div>
                  <p className="text-sm font-bold text-white font-cairo group-hover:text-theme-gold transition-colors">
                    اكتشف شخصيتك السياحية
                  </p>
                  <p className="text-xs text-theme-muted font-cairo mt-0.5">
                    أجب على ٥ أسئلة واحصل على توصيات مخصصة
                  </p>
                </div>
              </div>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

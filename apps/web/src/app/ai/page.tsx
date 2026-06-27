'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiChat, HiMicrophone, HiCalendar, HiClock, HiLightningBolt,
  HiChevronLeft, HiSparkles, HiUserGroup, HiCurrencyDollar,
} from 'react-icons/hi';

const quickActions = [
  { icon: HiSparkles, label: 'خطة جديدة', href: '/ai/planner', color: 'from-theme-gold to-accent-amber', desc: 'أنشئ رحلة مخصصة لك' },
  { icon: HiMicrophone, label: 'تحدث صوتيًا', href: '/ai/voice', color: 'from-cyan-500 to-blue-600', desc: 'اسأل زينب بصوتك' },
  { icon: HiCalendar, label: 'رحلات مقترحة', href: '/ai/recommendations', color: 'from-emerald-500 to-teal-600', desc: 'اقتراحات ذكية لرحلتك' },
  { icon: HiClock, label: 'رحلاتي الحالية', href: '/ai/history', color: 'from-purple-500 to-violet-600', desc: 'استكمل حيث توقفت' },
];

export default function AIHomePage() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-8">
          <HiChevronLeft className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
              <div className="w-full h-full rounded-full bg-theme-card flex items-center justify-center">
                <HiChat className="w-8 h-8 text-theme-gold" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme mb-2">مرحبًا بك في زينب</h1>
          <p className="text-theme-secondary font-cairo text-sm max-w-lg mx-auto">مساعدتك الذكية لاستكشاف مصر. خطط رحلتك، احصل على توصيات، وتحدث مع مرشد سياحي ذكي.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <motion.div key={action.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={action.href} className="block group">
                <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5 hover:border-theme-gold/40 hover:shadow-gold-glow transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-base text-theme font-cairo">{action.label}</h3>
                      <p className="text-xs text-theme-muted font-cairo">{action.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="rounded-2xl border border-theme-gold/20 bg-theme-card overflow-hidden shadow-gold-border">
          <div className="p-5 border-b border-theme-gold/10">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm text-theme font-cairo">ابدأ محادثة مع زينب</h2>
              <Link href="/ai/chat" className="text-xs text-theme-gold font-cairo hover:underline">فتح المحادثة الكاملة</Link>
            </div>
          </div>

          <div className="p-5">
            <div className="space-y-3 mb-4">
              {[
                'أفضل وقت لزيارة شرم الشيخ؟',
                'عايز أخطط رحلة 3 أيام في الغردقة',
                'اقترح لي مطاعم في الأقصر',
                'إيه أحسن أنشطة ممكن أعملها في دهب؟',
              ].map((s, i) => (
                <Link key={i} href={`/ai/chat?q=${encodeURIComponent(s)}`}
                  className="block p-3 rounded-xl bg-theme-surface border border-theme-gold/10 hover:border-theme-gold/20 hover:bg-theme-elevated transition-all text-right">
                  <p className="text-sm text-theme-secondary font-cairo">{s}</p>
                </Link>
              ))}
            </div>

            <Link href="/ai/chat"
              className="flex items-center gap-2 w-full p-3 rounded-xl bg-theme-gold/10 border border-theme-gold/20 text-theme-gold hover:bg-theme-gold/20 transition-all text-sm font-cairo font-bold justify-center">
              <HiChat className="w-4 h-4" />
              اكتب رسالتك...
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: HiUserGroup, label: 'أسرية', href: '/ai/planner?type=family' },
            { icon: HiCurrencyDollar, label: 'اقتصادية', href: '/ai/planner?type=budget' },
            { icon: HiLightningBolt, label: 'مغامرات', href: '/ai/planner?type=adventure' },
            { icon: HiSparkles, label: 'فاخرة', href: '/ai/planner?type=luxury' },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-theme-surface border border-theme-gold/10 hover:border-theme-gold/20 hover:shadow-gold-border transition-all text-center">
              <item.icon className="w-5 h-5 text-theme-gold" />
              <span className="text-xs text-theme-secondary font-cairo">{item.label}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getNetworkStats } from '@/lib/network/networkAnalytics';

export default function AdminPage() {
  const stats = getNetworkStats();

  const statCards = [
    { label: 'الشركاء', value: stats.totalPartners, icon: '🏪', href: '/admin/network', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
    { label: 'السفراء', value: stats.totalAmbassadors, icon: '🎓', href: '/admin/network', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30' },
    { label: 'الإحالات', value: stats.totalReferrals, icon: '🔗', href: '/admin/network', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30' },
    { label: 'العمولات', value: `${stats.totalCommissions} ج.م`, icon: '💰', href: '/admin/network', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30' },
  ];

  return (
    <div className="min-h-screen bg-theme-bg pt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme mb-2">لوحة الأدمن</h1>
          <p className="text-theme-secondary font-cairo mb-8">إدارة منصة مصر هب — شبكة السفراء الرقمية</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {statCards.map((card, i) => (
              <Link key={i} href={card.href}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={`rounded-2xl border ${card.color} bg-theme-card p-5 transition-all hover:brightness-110`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{card.icon}</span>
                    <svg className="w-5 h-5 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-theme font-english">{card.value}</p>
                  <p className="text-sm text-theme-secondary font-cairo mt-1">{card.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6">
              <h2 className="text-lg font-bold text-theme font-cairo mb-4">إدارة سريعة</h2>
              <div className="space-y-3">
                {[
                  { label: 'إدارة الشركاء', href: '/admin/network', desc: 'عرض وإدارة الشركاء والمنشآت' },
                  { label: 'إدارة السفراء', href: '/admin/network', desc: 'عرض وإدارة السفراء والعمولات' },
                  { label: 'إعدادات النظام', href: '/admin/network', desc: 'إعدادات العمولات والمدن' },
                ].map(item => (
                  <Link key={item.label} href={item.href}
                    className="flex items-center justify-between p-4 rounded-xl bg-theme-surface border border-theme-border hover:border-theme-gold/20 transition-all group">
                    <div>
                      <p className="text-sm font-bold text-theme font-cairo">{item.label}</p>
                      <p className="text-xs text-theme-muted font-cairo">{item.desc}</p>
                    </div>
                    <svg className="w-5 h-5 text-theme-muted group-hover:text-theme-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6">
              <h2 className="text-lg font-bold text-theme font-cairo mb-4">مركز المساعدة</h2>
              <div className="space-y-3">
                {[
                  { label: 'دليل الاستخدام', desc: 'تعلم كيفية استخدام لوحة الأدمن' },
                  { label: 'تقارير الأداء', desc: 'عرض إحصائيات المنصة والأداء' },
                  { label: 'الدعم الفني', desc: 'تواصل مع فريق الدعم الفني' },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-xl bg-theme-surface border border-theme-border">
                    <p className="text-sm font-bold text-theme font-cairo">{item.label}</p>
                    <p className="text-xs text-theme-muted font-cairo">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

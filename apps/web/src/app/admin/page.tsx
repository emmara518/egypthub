'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getNetworkStats } from '@/lib/network/networkAnalytics';
import { getPartnerAnalytics, getAmbassadorAnalytics, getLeadAnalytics, getRevenueAnalytics, getTopCities, getTopCategories } from '@/lib/network/networkAnalytics';
import { getAllPartners } from '@/lib/network/partnerEngine';
import { getAllAmbassadors } from '@/lib/network/ambassadorEngine';

const COLORS = [
  'from-emerald-500 to-emerald-600',
  'from-blue-500 to-blue-600',
  'from-amber-500 to-amber-600',
  'from-purple-500 to-purple-600',
  'from-rose-500 to-rose-600',
  'from-cyan-500 to-cyan-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function StatCard({ label, value, sub, icon, color, trend }: {
  label: string; value: string | number; sub?: string; icon: JSX.Element; color: string; trend?: { value: string; positive: boolean };
}) {
  return (
    <motion.div variants={itemVariants}
      className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 hover:border-theme-gold/25 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        {trend && (
          <span className={`flex items-center gap-0.5 text-[10px] font-bold font-cairo ${trend.positive ? 'text-emerald-400' : 'text-red-400'}`}>
            <svg className={`w-3 h-3 ${trend.positive ? '' : 'rotate-180'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-bold font-playfair text-theme mb-0.5">{typeof value === 'number' ? value.toLocaleString('ar-EG') : value}</p>
      <p className="text-xs text-theme-muted font-cairo">{label}</p>
      {sub && <p className="text-[10px] text-theme-muted/50 font-cairo mt-0.5">{sub}</p>}
    </motion.div>
  );
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="h-1.5 rounded-full bg-theme-surface overflow-hidden flex-1">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full rounded-full bg-gradient-to-l ${color}`}
      />
    </div>
  );
}

export default function AdminDashboard() {
  const stats = useMemo(() => getNetworkStats(), []);
  const partnerAnalytics = useMemo(() => getPartnerAnalytics(), []);
  const ambassadorAnalytics = useMemo(() => getAmbassadorAnalytics(), []);
  const leadAnalytics = useMemo(() => getLeadAnalytics(), []);
  const revenueAnalytics = useMemo(() => getRevenueAnalytics(), []);
  const topCities = useMemo(() => getTopCities(), []);
  const topCategories = useMemo(() => getTopCategories(), []);
  const partners = useMemo(() => getAllPartners(), []);
  const ambassadors = useMemo(() => getAllAmbassadors(), []);
  const [date] = useState(() => new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

  const totalLeadsAll = leadAnalytics.funnel.new + leadAnalytics.funnel.contacted + leadAnalytics.funnel.qualified + leadAnalytics.funnel.proposalSent + leadAnalytics.funnel.converted + leadAnalytics.funnel.closed + leadAnalytics.funnel.lost;

  const funnelData = [
    { label: 'جديد', value: leadAnalytics.funnel.new, color: 'from-blue-500 to-blue-600' },
    { label: 'تم التواصل', value: leadAnalytics.funnel.contacted, color: 'from-amber-500 to-amber-600' },
    { label: 'مؤهل', value: leadAnalytics.funnel.qualified, color: 'from-purple-500 to-purple-600' },
    { label: 'تم التحويل', value: leadAnalytics.funnel.converted, color: 'from-emerald-500 to-emerald-600' },
    { label: 'مغلق', value: leadAnalytics.funnel.closed, color: 'from-cyan-500 to-cyan-600' },
    { label: 'ضائع', value: leadAnalytics.funnel.lost, color: 'from-rose-500 to-rose-600' },
  ];

  const maxFunnel = Math.max(...funnelData.map((d) => d.value), 1);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">لوحة التحكم</h1>
            <p className="text-sm text-theme-muted font-cairo">{date}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-theme-surface border border-theme-border">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400 font-cairo font-bold">النظام نشط</span>
            </div>
            <Link href="/admin/founder-dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-gold/10 text-theme-gold border border-theme-gold/20 text-xs font-bold font-cairo hover:bg-theme-gold/20 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
              لوحة المؤسسين
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="إجمالي الشركاء"
          value={stats.totalPartners}
          sub={`${stats.approvedPartners} معتمد`}
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
          color="from-blue-500 to-blue-600"
          trend={{ value: `${partnerAnalytics.avgRating.toFixed(1)} ★`, positive: true }}
        />
        <StatCard
          label="السفراء"
          value={stats.totalAmbassadors}
          sub={`${ambassadorAnalytics.active} نشط`}
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>}
          color="from-amber-500 to-amber-600"
          trend={{ value: `${ambassadorAnalytics.avgRating.toFixed(1)} ★`, positive: true }}
        />
        <StatCard
          label="إجمالي العملاء المحتملين"
          value={totalLeadsAll}
          sub={`${leadAnalytics.funnel.converted} تحويل`}
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
          color="from-purple-500 to-purple-600"
          trend={{ value: `${(leadAnalytics.conversionRate * 100).toFixed(1)}%`, positive: leadAnalytics.conversionRate > 0.3 }}
        />
        <StatCard
          label="الإيرادات"
          value={`${revenueAnalytics.actual.toLocaleString('ar-EG')} ج.م`}
          sub={`المتوقع ${revenueAnalytics.projected.toLocaleString('ar-EG')} ج.م`}
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
          color="from-emerald-500 to-emerald-600"
          trend={{ value: `${stats.totalCommissions} عمولة`, positive: true }}
        />
      </div>

      {/* Secondary Stats Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'الإحالات', value: stats.totalReferrals, icon: '🔗', color: 'border-cyan-500/30 bg-cyan-500/5' },
          { label: 'العمولات المعلقة', value: stats.pendingCommissions, icon: '⏳', color: 'border-amber-500/30 bg-amber-500/5' },
          { label: 'معدل التحويل', value: `${(leadAnalytics.conversionRate * 100).toFixed(1)}%`, icon: '📈', color: 'border-emerald-500/30 bg-emerald-500/5' },
          { label: 'متوسط التقييم', value: partnerAnalytics.avgRating.toFixed(1), icon: '⭐', color: 'border-purple-500/30 bg-purple-500/5' },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl border ${s.color} p-4 text-center`}>
            <p className="text-xl mb-1">{s.icon}</p>
            <p className="text-lg font-bold font-english text-theme">{s.value}</p>
            <p className="text-[10px] text-theme-muted font-cairo">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Lead Funnel */}
        <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold font-cairo text-theme">مسار العملاء</h2>
            <span className="text-[10px] text-theme-muted font-cairo">{totalLeadsAll} إجمالي</span>
          </div>
          <div className="space-y-3">
            {funnelData.map((d) => {
              const pct = maxFunnel > 0 ? Math.round((d.value / maxFunnel) * 100) : 0;
              return (
                <div key={d.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-theme font-cairo">{d.label}</span>
                    <span className="text-xs text-theme-muted font-cairo">{d.value}</span>
                  </div>
                  <MiniBar value={d.value} max={maxFunnel} color={d.color} />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Cities */}
        <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold font-cairo text-theme">أفضل المدن</h2>
            <span className="text-[10px] text-theme-muted font-cairo">{topCities.length} مدينة</span>
          </div>
          <div className="space-y-2">
            {topCities.slice(0, 7).map((c, i) => {
              const max = topCities[0]?.partners || 1;
              return (
                <div key={c.city} className="flex items-center gap-3">
                  <span className="w-6 text-center text-[10px] text-theme-muted font-english">{i + 1}</span>
                  <span className="text-xs text-theme font-cairo flex-1 truncate">{c.city}</span>
                  <span className="text-[10px] text-theme-muted font-english">{c.partners}</span>
                  <MiniBar value={c.partners} max={max} color={COLORS[i % COLORS.length]} />
                </div>
              );
            })}
            {topCities.length === 0 && (
              <p className="text-xs text-theme-muted font-cairo text-center py-4">لا توجد مدن بعد</p>
            )}
          </div>
        </motion.div>

        {/* Top Categories */}
        <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold font-cairo text-theme">أفضل التصنيفات</h2>
            <span className="text-[10px] text-theme-muted font-cairo">{topCategories.length} تصنيف</span>
          </div>
          <div className="space-y-2">
            {topCategories.slice(0, 7).map((c, i) => {
              const max = topCategories[0]?.partners || 1;
              return (
                <div key={c.category} className="flex items-center gap-3">
                  <span className="w-6 text-center text-[10px] text-theme-muted font-english">{i + 1}</span>
                  <span className="text-xs text-theme font-cairo flex-1 truncate">{c.category}</span>
                  <span className="text-[10px] text-theme-muted font-english">{c.partners}</span>
                  <MiniBar value={c.partners} max={max} color={COLORS[(i + 3) % COLORS.length]} />
                </div>
              );
            })}
            {topCategories.length === 0 && (
              <p className="text-xs text-theme-muted font-cairo text-center py-4">لا توجد تصنيفات بعد</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Partners */}
        <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold font-cairo text-theme">آخر الشركاء</h2>
            <Link href="/admin/network" className="text-[10px] text-theme-gold font-cairo hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-2">
            {partners.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-theme-surface border border-theme-border">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    p.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                    p.status === 'pending-review' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-theme-border text-theme-muted'
                  }`}>
                    {p.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-theme font-cairo truncate">{p.name}</p>
                    <p className="text-[10px] text-theme-muted font-cairo">{p.city} · {p.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-theme-gold">★</span>
                  <span className="text-theme-muted font-english">{p.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
            {partners.length === 0 && (
              <p className="text-xs text-theme-muted font-cairo text-center py-4">لا يوجد شركاء بعد</p>
            )}
          </div>
        </motion.div>

        {/* Recent Ambassadors */}
        <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold font-cairo text-theme">آخر السفراء</h2>
            <Link href="/admin/network" className="text-[10px] text-theme-gold font-cairo hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-2">
            {ambassadors.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between p-2.5 rounded-xl bg-theme-surface border border-theme-border">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center text-amber-400 text-xs font-bold">
                    {a.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-theme font-cairo truncate">{a.name}</p>
                    <p className="text-[10px] text-theme-muted font-cairo">{a.city} · {a.totalReferrals} إحالة</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {a.verified ? (
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">موثق</span>
                  ) : (
                    <span className="text-[10px] text-theme-muted bg-theme-surface px-1.5 py-0.5 rounded">غير موثق</span>
                  )}
                </div>
              </div>
            ))}
            {ambassadors.length === 0 && (
              <p className="text-xs text-theme-muted font-cairo text-center py-4">لا يوجد سفراء بعد</p>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="lg:col-span-1 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">إجراءات سريعة</h2>
          <div className="space-y-2">
            {[
              { label: 'إدارة الشبكة', desc: 'الشركاء، السفراء، العملاء', href: '/admin/network', icon: '🌐' },
              { label: 'لوحة المؤسسين', desc: 'مراقبة المنصة في الوقت الفعلي', href: '/admin/founder-dashboard', icon: '📊' },
              { label: 'إدارة المدن', desc: 'إضافة وتعديل المدن', href: '/admin/network', icon: '🏙️' },
              { label: 'إعدادات النظام', desc: 'تعديل إعدادات المنصة', href: '/admin/network', icon: '⚙️' },
            ].map((action) => (
              <Link key={action.label} href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-theme-surface border border-theme-border hover:border-theme-gold/20 transition-all group">
                <span className="text-lg">{action.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-theme font-cairo">{action.label}</p>
                  <p className="text-[10px] text-theme-muted font-cairo">{action.desc}</p>
                </div>
                <svg className="w-4 h-4 text-theme-muted group-hover:text-theme-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lead Sources */}
      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold font-cairo text-theme">مصادر العملاء</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(leadAnalytics.bySource).map(([source, count], i) => {
            const total = Object.values(leadAnalytics.bySource).reduce((a, b) => a + b, 0);
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            const icons: Record<string, string> = { explorer: '🔍', zainab: '🤖', referral: '🔗', direct: '⬇️', 'partner-page': '🏪' };
            return (
              <div key={source} className="text-center p-3 rounded-xl bg-theme-surface border border-theme-border">
                <p className="text-2xl mb-1">{icons[source] || '📋'}</p>
                <p className="text-lg font-bold font-english text-theme">{count}</p>
                <p className="text-[10px] text-theme-muted font-cairo">{source}</p>
                <p className="text-[10px] text-theme-gold font-english">{pct}%</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

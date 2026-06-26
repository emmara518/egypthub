'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  getAllPartners,
  getLeadFunnel,
  getLeadsByPartner,
  getCommissionStats,
  getAllAmbassadors,
} from '@/lib/network';

const cityLabels: Record<string, string> = {
  cairo: 'القاهرة',
  alexandria: 'الإسكندرية',
  luxor: 'الأقصر',
  aswan: 'أسوان',
  hurghada: 'الغردقة',
  'sharm-el-sheikh': 'شرم الشيخ',
  dahab: 'دهب',
  siwa: 'سيوة',
};

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-theme-gold/15 bg-theme-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-cairo text-theme-muted">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold font-playfair text-theme">{value}</p>
    </motion.div>
  );
}

function FunnelBar({ label, count, max, color }: { label: string; count: number; max: number; color: string }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs font-cairo">
        <span className="text-theme">{label}</span>
        <span className="text-theme-muted">{count}</span>
      </div>
      <div className="h-2.5 rounded-full bg-theme-bg overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

export default function PartnerDashboardPage() {
  const partners = useMemo(() => getAllPartners(), []);
  const funnel = useMemo(() => getLeadFunnel(), []);
  const commissionStats = useMemo(() => getCommissionStats(), []);
  const ambassadors = useMemo(() => getAllAmbassadors(), []);

  const totalLeads = Object.values(funnel).reduce((a, b) => a + b, 0);
  const totalViews = partners.reduce((s, p) => s + p.totalLeads * 3 + p.totalReferrals * 5, 0);
  const convertedLeads = funnel.converted;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0.0';
  const performanceScore = Math.min(
    100,
    Math.round(
      (partners.reduce((s, p) => s + p.rating, 0) / Math.max(partners.length, 1)) * 10 +
      parseFloat(conversionRate) * 0.5 +
      Math.min(commissionStats.paid / 5, 20)
    )
  );

  const funnelMax = Math.max(...Object.values(funnel), 1);

  const topAmbassadors = useMemo(() => {
    return [...ambassadors]
      .sort((a, b) => b.totalConversions - a.totalConversions)
      .slice(0, 5);
  }, [ambassadors]);

  const recentLeads = useMemo(() => {
    const allLeads = partners.flatMap((p) => getLeadsByPartner(p.id));
    return allLeads.slice(0, 6);
  }, [partners]);

  const funnelStages: { label: string; count: number; color: string }[] = [
    { label: 'جديد', count: funnel.new, color: 'bg-blue-500' },
    { label: 'تم التواصل', count: funnel.contacted, color: 'bg-cyan-500' },
    { label: 'مؤهل', count: funnel.qualified, color: 'bg-yellow-500' },
    { label: 'عرض مقدم', count: funnel.proposalSent, color: 'bg-orange-500' },
    { label: 'تم التحويل', count: funnel.converted, color: 'bg-green-500' },
    { label: 'مغلق', count: funnel.closed, color: 'bg-purple-500' },
    { label: 'خاسر', count: funnel.lost, color: 'bg-red-500' },
  ];

  const topCities = useMemo(() => {
    const map: Record<string, number> = {};
    partners.forEach((p) => { map[p.city] = (map[p.city] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [partners]);

  return (
    <div className="min-h-screen bg-theme-bg pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 text-theme-muted text-sm font-cairo mb-2">
            <Link href="/" className="hover:text-theme-gold transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-theme">لوحة تحكم الشركاء</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme">لوحة تحكم الشركاء</h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="إجمالي المشاهدات"
            value={totalViews.toLocaleString()}
            color="bg-blue-500/15"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
          />
          <StatCard
            label="إجمالي العملاء المتوقعين"
            value={totalLeads}
            color="bg-cyan-500/15"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>}
          />
          <StatCard
            label="معدل التحويل"
            value={`${conversionRate}%`}
            color="bg-green-500/15"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>}
          />
          <StatCard
            label="أفضل السفراء"
            value={topAmbassadors.length}
            color="bg-amber-500/15"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl border border-theme-gold/15 bg-theme-card p-6"
          >
            <h2 className="text-lg font-bold font-playfair text-theme mb-5">مسار العملاء المتوقعين</h2>
            <div className="space-y-4">
              {funnelStages.map((stage) => (
                <FunnelBar
                  key={stage.label}
                  label={stage.label}
                  count={stage.count}
                  max={funnelMax}
                  color={stage.color}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6"
          >
            <h2 className="text-lg font-bold font-playfair text-theme mb-5">مؤشر الأداء</h2>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-theme-gold/20 to-theme-card border-4 border-theme-gold/30 flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-3xl font-bold font-playfair text-theme-gold">{performanceScore}</span>
              </motion.div>
              <p className="text-xs font-cairo text-theme-muted mb-3">من 100</p>
              <div className="h-2 rounded-full bg-theme-bg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${performanceScore}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-theme-gold"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl border border-theme-gold/15 bg-theme-card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold font-playfair text-theme">آخر العملاء المتوقعين</h2>
              <span className="text-[10px] text-theme-muted font-cairo">{recentLeads.length} عميل</span>
            </div>
            {recentLeads.length === 0 ? (
              <p className="text-center text-theme-muted text-sm font-cairo py-6">لا يوجد عملاء متوقعون حالياً</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-theme-gold/10">
                      <th className="pb-3 text-[10px] font-bold text-theme-muted font-cairo uppercase tracking-wider">الاسم</th>
                      <th className="pb-3 text-[10px] font-bold text-theme-muted font-cairo uppercase tracking-wider">البريد</th>
                      <th className="pb-3 text-[10px] font-bold text-theme-muted font-cairo uppercase tracking-wider">الحالة</th>
                      <th className="pb-3 text-[10px] font-bold text-theme-muted font-cairo uppercase tracking-wider">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-theme-gold/5">
                        <td className="py-3 text-sm font-cairo text-theme">{lead.clientName}</td>
                        <td className="py-3 text-sm font-cairo text-theme-muted">{lead.clientEmail}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-cairo ${
                            lead.status === 'new' ? 'bg-blue-500/15 text-blue-500' :
                            lead.status === 'contacted' ? 'bg-cyan-500/15 text-cyan-500' :
                            lead.status === 'qualified' ? 'bg-yellow-500/15 text-yellow-500' :
                            lead.status === 'converted' ? 'bg-green-500/15 text-green-500' :
                            'bg-gray-500/15 text-gray-400'
                          }`}>
                            {lead.status === 'new' ? 'جديد' :
                             lead.status === 'contacted' ? 'تم التواصل' :
                             lead.status === 'qualified' ? 'مؤهل' :
                             lead.status === 'proposal-sent' ? 'عرض' :
                             lead.status === 'converted' ? 'محول' :
                             lead.status === 'closed' ? 'مغلق' : 'خاسر'}
                          </span>
                        </td>
                        <td className="py-3 text-xs font-cairo text-theme-muted">
                          {new Date(lead.createdAt).toLocaleDateString('ar-EG')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6"
          >
            <h2 className="text-lg font-bold font-playfair text-theme mb-5">أفضل السفراء</h2>
            <div className="space-y-3">
              {topAmbassadors.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-theme-gold/15 flex items-center justify-center text-[10px] font-bold text-theme-gold font-cairo shrink-0">
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-theme-gold/20 to-theme-card flex items-center justify-center text-xs font-bold text-theme shrink-0">
                    {a.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold font-cairo text-theme truncate">{a.name}</p>
                    <p className="text-[10px] font-cairo text-theme-muted">{a.totalConversions} تحويل</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#F2A00A" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-accent-amber text-xs font-semibold">{a.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6"
          >
            <h2 className="text-lg font-bold font-playfair text-theme mb-5">أفضل المدن</h2>
            <div className="space-y-3">
              {topCities.map(([city, count], i) => (
                <div key={city} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-theme-gold/15 flex items-center justify-center text-[10px] font-bold text-theme-gold font-cairo shrink-0">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-cairo text-theme">{cityLabels[city] || city}</span>
                  <span className="text-xs font-cairo text-theme-muted">{count} شريك</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6"
          >
            <h2 className="text-lg font-bold font-playfair text-theme mb-5">ملخص العمولات</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-theme-bg p-4 text-center">
                <p className="text-2xl font-bold font-playfair text-theme">{commissionStats.total}</p>
                <p className="text-[10px] font-cairo text-theme-muted mt-1">إجمالي العمولات</p>
              </div>
              <div className="rounded-xl bg-theme-bg p-4 text-center">
                <p className="text-2xl font-bold font-playfair text-green-500">{commissionStats.paid}</p>
                <p className="text-[10px] font-cairo text-theme-muted mt-1">مدفوعة</p>
              </div>
              <div className="rounded-xl bg-theme-bg p-4 text-center">
                <p className="text-2xl font-bold font-playfair text-yellow-500">{commissionStats.pending}</p>
                <p className="text-[10px] font-cairo text-theme-muted mt-1">معلقة</p>
              </div>
              <div className="rounded-xl bg-theme-bg p-4 text-center">
                <p className="text-2xl font-bold font-playfair text-theme">
                  {commissionStats.totalAmount.toLocaleString()}
                </p>
                <p className="text-[10px] font-cairo text-theme-muted mt-1">المبلغ الإجمالي</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

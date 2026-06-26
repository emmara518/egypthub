'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiClipboardCopy, HiQrcode, HiTrendingUp, HiUserGroup, HiEye, HiStar, HiCurrencyDollar, HiChevronRight, HiArrowUp, HiArrowDown, HiBadgeCheck } from 'react-icons/hi';
import { getAllAmbassadors, getTopAmbassadors, getAmbassadorStats } from '@/lib/network/ambassadorEngine';
import { generateReferralLink, getReferralStats, getReferralsByAmbassador } from '@/lib/network/referralEngine';
import { getCommissionsByAmbassador } from '@/lib/network/commissionEngine';
import { getLeadsByAmbassador } from '@/lib/network/leadPipelineEngine';
import { generateQRData } from '@/lib/network/qrEngine';
import { getPartnersByAmbassador } from '@/lib/network/partnerEngine';
import type { NetworkAmbassador } from '@/lib/network/types';

const demoAmbassadorId = 'ambassador-001';
const ambassador = getAllAmbassadors().find((a) => a.id === demoAmbassadorId);

export default function AmbassadorDashboardPage() {
  const [copied, setCopied] = useState(false);
  const [qrCopied, setQrCopied] = useState(false);

  if (!ambassador) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
          <p className="text-theme text-lg font-cairo mb-8">لوحة التحكم غير متاحة</p>
          <Link href="/ambassadors" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            العودة للمرشدين
          </Link>
        </div>
      </div>
    );
  }

  const stats = getReferralStats(ambassador.id);
  const referrals = getReferralsByAmbassador(ambassador.id);
  const leads = getLeadsByAmbassador(ambassador.id);
  const commissions = getCommissionsByAmbassador(ambassador.id);
  const partners = getPartnersByAmbassador(ambassador.id);
  const referralLink = generateReferralLink(ambassador.id, '/');
  const qrData = generateQRData(ambassador.id, '/');

  const totalRevenue = commissions.reduce((sum, c) => sum + c.amount, 0);
  const projectedRevenue = totalRevenue * 1.3;
  const pendingCommission = commissions.filter((c) => c.status === 'pending');
  const pendingAmount = pendingCommission.reduce((sum, c) => sum + c.amount, 0);

  const recentLeads = leads.slice(-5).reverse();
  const recentCommissions = commissions.slice(-5).reverse();

  const destinationStats = (() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      if (l.destination) map[l.destination] = (map[l.destination] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count, percentage: leads.length > 0 ? Math.round((count / leads.length) * 100) : 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  })();

  const topPartners = [...partners]
    .sort((a, b) => b.totalReferrals - a.totalReferrals)
    .slice(0, 5);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyQr = () => {
    navigator.clipboard.writeText(qrData);
    setQrCopied(true);
    setTimeout(() => setQrCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        <Link href="/ambassadors" className="inline-flex items-center gap-2 text-theme-gold font-cairo mb-6 hover:underline">
          <HiChevronRight className="w-4 h-4" />
          العودة للمرشدين
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-theme">لوحة تحكم المرشد</h1>
            <p className="text-theme-secondary font-cairo mt-1">مرحباً، {ambassador.name}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-gold/10 border border-theme-gold/20">
            <HiBadgeCheck className="text-theme-gold" />
            <span className="text-sm text-theme-gold font-cairo font-medium">{ambassador.referralCode}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'نقرات الإحالة', value: stats.clicks, icon: HiEye, change: '+12%', up: true, color: 'from-blue-500/10 to-blue-500/5' },
            { label: 'الزوار', value: stats.visits, icon: HiUserGroup, change: '+8%', up: true, color: 'from-purple-500/10 to-purple-500/5' },
            { label: 'العملاء المتوقعون', value: stats.leads, icon: HiTrendingUp, change: '+15%', up: true, color: 'from-cyan-500/10 to-cyan-500/5' },
            { label: 'التحويلات', value: stats.conversions, icon: HiStar, change: '+5%', up: true, color: 'from-green-500/10 to-green-500/5' },
            { label: 'الإيرادات المتوقعة', value: `EGP ${projectedRevenue.toLocaleString()}`, icon: HiCurrencyDollar, change: `${totalRevenue > 0 ? Math.round(((projectedRevenue - totalRevenue) / totalRevenue) * 100) : 0}%`, up: true, color: 'from-theme-gold/10 to-accent-amber/5' },
          ].map((card, idx) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`rounded-2xl border border-theme-gold/10 bg-theme-card p-5 bg-gradient-to-br ${card.color}`}>
              <div className="flex items-center justify-between mb-3">
                <card.icon className="w-5 h-5 text-theme-gold" />
                <span className={`flex items-center gap-0.5 text-xs font-english font-bold ${card.up ? 'text-green-400' : 'text-red-400'}`}>
                  {card.up ? <HiArrowUp className="w-3 h-3" /> : <HiArrowDown className="w-3 h-3" />}{card.change}
                </span>
              </div>
              <p className="text-lg font-bold text-theme font-english">{card.value}</p>
              <p className="text-xs text-theme-muted font-cairo mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <h2 className="text-lg font-bold font-playfair text-theme mb-4">رابط الإحالة</h2>
            <div className="flex items-center gap-2 bg-theme-surface rounded-xl p-3 border border-theme mb-4">
              <span className="flex-1 text-sm text-theme-secondary font-cairo truncate ltr">{referralLink}</span>
              <button onClick={handleCopyLink}
                className="p-2 rounded-lg bg-theme-gold/10 hover:bg-theme-gold/20 text-theme-gold transition-all shrink-0">
                {copied ? <HiBadgeCheck className="w-5 h-5" /> : <HiClipboardCopy className="w-5 h-5" />}
              </button>
            </div>
            {copied && <p className="text-xs text-green-400 font-cairo -mt-3 mb-3">تم نسخ الرابط!</p>}

            <div className="flex items-center gap-2 bg-theme-surface rounded-xl p-3 border border-theme">
              <span className="flex-1 text-sm text-theme-secondary font-cairo truncate">{qrData}</span>
              <button onClick={handleCopyQr}
                className="p-2 rounded-lg bg-theme-gold/10 hover:bg-theme-gold/20 text-theme-gold transition-all shrink-0">
                {qrCopied ? <HiBadgeCheck className="w-5 h-5" /> : <HiQrcode className="w-5 h-5" />}
              </button>
            </div>
            {qrCopied && <p className="text-xs text-green-400 font-cairo mt-2">تم نسخ بيانات QR!</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <h2 className="text-lg font-bold font-playfair text-theme mb-4">الوجهات الأكثر طلباً</h2>
            {destinationStats.length > 0 ? (
              <div className="space-y-3">
                {destinationStats.map((d, i) => (
                  <div key={d.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-theme font-cairo text-xs">{d.name}</span>
                      <span className="text-theme-muted font-english text-xs">{d.count} ({d.percentage}%)</span>
                    </div>
                    <div className="w-full bg-theme-elevated rounded-full h-1.5">
                      <div className="bg-theme-gold h-1.5 rounded-full transition-all" style={{ width: `${d.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-theme-muted text-sm font-cairo text-center py-6">لا توجد بيانات بعد</p>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-playfair text-theme">آخر العملاء المتوقعين</h2>
              <span className="text-xs text-theme-muted font-cairo">{leads.length} إجمالي</span>
            </div>
            {recentLeads.length > 0 ? (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2 text-xs text-theme-muted font-cairo pb-2 border-b border-theme-gold/10">
                  <span>الاسم</span>
                  <span>الوجهة</span>
                  <span>الميزانية</span>
                  <span>الحالة</span>
                </div>
                {recentLeads.map((l) => (
                  <div key={l.id} className="grid grid-cols-4 gap-2 text-xs py-2.5 border-b border-theme/5 font-cairo">
                    <span className="text-theme font-medium truncate">{l.clientName}</span>
                    <span className="text-theme-secondary truncate">{l.destination}</span>
                    <span className="text-theme-muted">{l.budget}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-center ${
                      l.status === 'converted' ? 'bg-green-500/15 text-green-400' :
                      l.status === 'new' ? 'bg-blue-500/15 text-blue-400' :
                      l.status === 'contacted' ? 'bg-yellow-500/15 text-yellow-400' :
                      'bg-theme-elevated text-theme-muted'
                    }`}>{l.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-theme-muted text-sm font-cairo text-center py-6">لا يوجد عملاء متوقعون بعد</p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-playfair text-theme">سجل العمولات</h2>
              <span className="text-xs text-theme-muted font-cairo">المعلق: {pendingCommission.length}</span>
            </div>
            {recentCommissions.length > 0 ? (
              <div className="space-y-2">
                {recentCommissions.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme">
                    <div>
                      <p className="text-xs font-bold text-theme font-cairo">{c.referenceId || c.id.slice(0, 12)}</p>
                      <p className="text-[10px] text-theme-muted font-cairo mt-0.5">{new Date(c.createdAt).toLocaleDateString('ar-EG')}</p>
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-bold font-english ${c.status === 'paid' ? 'text-green-400' : c.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                        EGP {c.amount.toLocaleString()}
                      </p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        c.status === 'paid' ? 'bg-green-500/15 text-green-400' :
                        c.status === 'approved' ? 'bg-blue-500/15 text-blue-400' :
                        c.status === 'pending' ? 'bg-yellow-500/15 text-yellow-400' :
                        'bg-red-500/15 text-red-400'
                      }`}>{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-theme-muted text-sm font-cairo text-center py-6">لا توجد عمولات بعد</p>
            )}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-playfair text-theme">أفضل التجارب والشركاء</h2>
            <span className="text-xs text-theme-muted font-cairo">{partners.length} شريك</span>
          </div>
          {topPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {topPartners.map((p, i) => (
                <Link key={p.id} href={`/business/${p.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-theme-surface border border-theme hover:border-theme-gold/30 transition-all group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-theme-gold/10 text-theme-gold text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-theme font-cairo truncate group-hover:text-theme-gold transition-colors">{p.name}</p>
                    <p className="text-[10px] text-theme-muted font-cairo">{p.city} · {p.category}</p>
                  </div>
                  <span className="text-xs text-theme-muted font-english">{p.totalReferrals}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-theme-muted text-sm font-cairo text-center py-6">لا يوجد شركاء بعد</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiStar, HiBadgeCheck, HiLocationMarker, HiClipboardCopy, HiAcademicCap, HiPhotograph, HiChevronRight, HiUserGroup } from 'react-icons/hi';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { getAmbassadorById, getAmbassadorsByCity } from '@/lib/network/ambassadorEngine';
import { getPartnersByAmbassador } from '@/lib/network/partnerEngine';
import { getReferralStats } from '@/lib/network/referralEngine';
import { getCommissionsByAmbassador } from '@/lib/network/commissionEngine';

const cityLabels: Record<string, string> = {
  cairo: 'القاهرة', alexandria: 'الإسكندرية', luxor: 'الأقصر',
  aswan: 'أسوان', 'sharm-el-sheikh': 'شرم الشيخ', hurghada: 'الغردقة',
  dahab: 'دهب', siwa: 'سيوة',
};

export default function AmbassadorClient({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const ambassador = getAmbassadorById(slug);

  if (!ambassador) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
          <p className="text-theme text-lg font-cairo mb-8">المرشد غير موجود</p>
          <Link href="/ambassadors" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            العودة للمرشدين
          </Link>
        </div>
      </div>
    );
  }

  const statsData = getReferralStats(ambassador.id);
  const partners = getPartnersByAmbassador(ambassador.id);
  const commissions = getCommissionsByAmbassador(ambassador.id);
  const cityAmbassadors = getAmbassadorsByCity(ambassador.city).filter((a) => a.id !== ambassador.id).slice(0, 3);
  const totalEarned = commissions.reduce((sum, c) => sum + c.amount, 0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ambassador.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-theme-bg pt-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        <Link href="/ambassadors" className="inline-flex items-center gap-2 text-theme-gold font-cairo mb-8 hover:underline">
          <HiChevronRight className="w-4 h-4" />
          العودة للمرشدين
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="rounded-2xl border border-theme-gold/20 bg-theme-card overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-theme-gold/10 to-amber-500/5">
                <div className="absolute inset-0 opacity-[0.04]">
                  <svg viewBox="0 0 1440 400" className="w-full h-full">
                    <path d="M0 200 Q 200 100 400 200 T 800 200 T 1200 200 T 1440 200" stroke="var(--gold)" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              </div>
              <div className="px-6 pb-6 -mt-16 relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-theme-gold to-amber-500 p-[3px]">
                      <div className="w-full h-full rounded-full bg-theme-bg flex items-center justify-center overflow-hidden">
                        <span className="text-4xl font-bold text-theme-gold font-playfair">{ambassador.name.charAt(0)}</span>
                      </div>
                    </div>
                    {ambassador.verified && (
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-theme-gold flex items-center justify-center shadow-lg">
                        <HiBadgeCheck className="w-4 h-4 text-dark-900" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pt-16 sm:pt-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-3xl md:text-4xl font-bold font-playfair text-theme">{ambassador.name}</h1>
                      {ambassador.verified && (
                        <span className="px-3 py-1 rounded-full text-xs bg-theme-gold/15 text-theme-gold border border-theme-gold/30 font-cairo">موثق</span>
                      )}
                    </div>
                    <p className="text-lg text-theme-gold font-cairo mt-1">{ambassador.role}</p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-sm text-theme-secondary font-cairo">
                        <HiLocationMarker className="w-4 h-4 text-theme-gold" />
                        {cityLabels[ambassador.city] || ambassador.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <HiStar className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-400 font-bold">{ambassador.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold text-theme font-cairo mb-2">نبذة عني</h3>
                  <p className="text-theme-secondary text-sm font-cairo leading-relaxed">{ambassador.bio}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold text-theme font-cairo mb-3">التخصصات</h3>
                  <div className="flex flex-wrap gap-2">
                    {ambassador.specialties.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-lg text-xs bg-theme-gold/10 text-theme-gold border border-theme-gold/20 font-cairo">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-bold text-theme font-cairo mb-3">اللغات</h3>
                  <div className="flex flex-wrap gap-2">
                    {ambassador.languages.map((l) => (
                      <span key={l} className="px-3 py-1.5 rounded-lg text-xs bg-theme-bg text-theme-secondary border border-theme font-cairo">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">الأداء والإحصائيات</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'الإحالات', value: ambassador.totalReferrals, icon: HiUserGroup, color: 'text-blue-400 bg-blue-500/10' },
                  { label: 'العملاء المتوقعون', value: ambassador.totalLeads, icon: HiAcademicCap, color: 'text-purple-400 bg-purple-500/10' },
                  { label: 'التحويلات', value: ambassador.totalConversions, icon: HiStar, color: 'text-green-400 bg-green-500/10' },
                  { label: 'الأرباح', value: `EGP ${totalEarned.toLocaleString()}`, icon: HiPhotograph, color: 'text-theme-gold bg-theme-gold/10' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-theme-bg border border-theme p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xl font-bold text-theme">{stat.value}</p>
                    <p className="text-xs text-theme-secondary font-cairo mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: 'نقرات', value: statsData.clicks },
                  { label: 'زيارات', value: statsData.visits },
                  { label: 'تحويلات', value: statsData.conversions },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-lg bg-theme-bg border border-theme">
                    <p className="text-sm font-bold text-theme">{s.value}</p>
                    <p className="text-[10px] text-theme-secondary font-cairo">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {partners.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
                <h2 className="text-lg font-bold font-playfair text-theme mb-4">الشركاء المتعاون معهم</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {partners.map((p) => (
                    <Link key={p.id} href={`/partners/${p.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/30 transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-theme-gold/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-theme-gold">{p.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-theme font-cairo truncate group-hover:text-theme-gold transition-colors">{p.name}</p>
                        <p className="text-[10px] text-theme-secondary font-cairo">{p.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {cityAmbassadors.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
                <h2 className="text-lg font-bold font-playfair text-theme mb-4">مرشدون آخرون في {cityLabels[ambassador.city] || ambassador.city}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {cityAmbassadors.map((a) => (
                    <Link key={a.id} href={`/ambassadors/${a.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/30 transition-all group">
                      <div className="w-10 h-10 rounded-full bg-theme-gold/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-theme-gold">{a.name.charAt(0)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-theme font-cairo truncate group-hover:text-theme-gold transition-colors">{a.name}</p>
                        <p className="text-[10px] text-theme-secondary font-cairo">{a.role}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
              <h3 className="text-sm font-bold text-theme font-cairo mb-4">كود الإحالة</h3>
              <div className="flex items-center gap-2 bg-theme-bg rounded-xl p-3 border border-theme">
                <span className="flex-1 text-lg font-bold text-theme-gold tracking-wider text-center ltr">{ambassador.referralCode}</span>
                <button onClick={handleCopyCode}
                  className="p-2 rounded-lg bg-theme-gold/10 hover:bg-theme-gold/20 text-theme-gold transition-all">
                  {copied ? <HiBadgeCheck className="w-5 h-5" /> : <HiClipboardCopy className="w-5 h-5" />}
                </button>
              </div>
              {copied && <p className="text-xs text-green-400 font-cairo mt-2 text-center">تم النسخ!</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
              <h3 className="text-sm font-bold text-theme font-cairo mb-4">وسائل التواصل</h3>
              <div className="space-y-3">
                {ambassador.socialLinks.instagram && (
                  <a href={ambassador.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/30 transition-all group">
                    <FaInstagram className="text-lg text-pink-400" />
                    <span className="text-sm text-theme-secondary font-cairo group-hover:text-theme-gold transition-colors">Instagram</span>
                  </a>
                )}
                {ambassador.socialLinks.facebook && (
                  <a href={ambassador.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/30 transition-all group">
                    <FaFacebook className="text-lg text-blue-500" />
                    <span className="text-sm text-theme-secondary font-cairo group-hover:text-theme-gold transition-colors">Facebook</span>
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <a href={`https://wa.me/?text=${encodeURIComponent(`تواصل مع المرشد ${ambassador.name} عبر إيجبتهب: ${ambassador.referralCode}`)}`} target="_blank" rel="noopener noreferrer"
                className="block w-full py-4 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold font-cairo text-center transition-all duration-200">
                تواصل مع المرشد
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
              <div className="space-y-3 text-sm text-theme-secondary font-cairo">
                <div className="flex justify-between items-center py-2 border-b border-theme-gold/10">
                  <span>انضم في</span>
                  <span className="text-theme">{new Date(ambassador.joinedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long' })}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>إجمالي الإحالات</span>
                  <span className="text-theme font-bold">{ambassador.totalReferrals}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

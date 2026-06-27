'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

interface ReferralEntry {
  name: string;
  date: string;
  earned: number;
}

function generateReferralCode(): string {
  if (typeof window === 'undefined') return 'EGYPTHUB-XXXX';
  const stored = localStorage.getItem('egypthub-ref-code');
  if (stored) return stored;
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'EGYPTHUB-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  localStorage.setItem('egypthub-ref-code', code);
  return code;
}

const SHARE_BASE = typeof window !== 'undefined' ? window.location.origin : 'https://egypthub.com';

const StarIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const CashIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const StepIcon = ({ step }: { step: number }) => (
  <div className="w-10 h-10 rounded-full bg-theme-gold/10 border border-theme-gold/20 flex items-center justify-center shrink-0">
    <span className="text-sm font-bold text-theme-gold">{step}</span>
  </div>
);

export default function ReferralPage() {
  const [refCode] = useState(generateReferralCode);
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<ReferralEntry[]>([]);
  const addXp = useAppStore((s) => s.addXp);
  const xp = useAppStore((s) => s.gamification.xp);
  const trackEvent = useAppStore((s) => s.trackEvent);

  const refLink = `${SHARE_BASE}/r/${refCode}`;

  useEffect(() => {
    const stored = localStorage.getItem('egypthub-referral-list');
    if (stored) setReferrals(JSON.parse(stored));
  }, []);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(refCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      addXp(10);
      trackEvent('Referral', '/referral');
    } catch { }
  }, [refCode, addXp, trackEvent]);

  const share = useCallback((platform: string) => {
    const text = `انضم إلى مصر هب واستخدم كود الدعوة: ${refCode} — ${refLink}`;
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      copy: refLink,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(refLink);
      return;
    }
    window.open(urls[platform], '_blank', 'noopener');
    trackEvent('ReferralShare', platform);
  }, [refCode, refLink, trackEvent]);

  const totalEarned = referrals.reduce((sum, r) => sum + r.earned, 0);

  return (
    <div className="min-h-screen bg-theme-bg pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-4 inline-block"
          >
            <StarIcon />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">ادعُ صديقك</h1>
          <p className="text-sm text-white/60">ادعي أصحابك واكسب نقاط إضافية</p>
        </motion.div>

        {/* Referral Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-theme-surface border border-theme-gold/[0.08] rounded-2xl p-6 mb-4"
        >
          <p className="text-xs text-white/50 mb-3 text-center">كود الدعوة الخاص بك</p>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="text-2xl font-bold tracking-widest text-theme-gold">{refCode}</span>
            <button
              onClick={copyCode}
              className="px-4 py-2 rounded-xl bg-theme-gold/10 border border-theme-gold/30 text-theme-gold text-xs font-bold hover:bg-theme-gold/20 transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  تم النسخ
                </>
              ) : (
                <>
                  <CopyIcon />
                  انسخ الكود
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => share('copy')}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-theme-gold to-theme-gold text-theme-bg font-bold text-sm mb-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <ShareIcon />
            انسخ رابط الدعوة
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => share('whatsapp')}
              className="flex-1 px-3 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon />
              واتساب
            </button>
            <button
              onClick={() => share('facebook')}
              className="flex-1 px-3 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <FacebookIcon />
              فيسبوك
            </button>
            <button
              onClick={() => share('twitter')}
              className="flex-1 px-3 py-2.5 rounded-xl bg-[#000000] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <TwitterIcon />
              تويتر
            </button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          <div className="bg-theme-surface border border-theme-gold/[0.08] rounded-2xl p-5 text-center">
            <div className="flex justify-center mb-2">
              <UsersIcon />
            </div>
            <p className="text-2xl font-bold text-white">{referrals.length}</p>
            <p className="text-xs text-white/50 mt-1">أصدقاء مدعوين</p>
          </div>
          <div className="bg-theme-surface border border-theme-gold/[0.08] rounded-2xl p-5 text-center">
            <div className="flex justify-center mb-2">
              <CashIcon />
            </div>
            <p className="text-2xl font-bold text-theme-gold">{totalEarned} XP</p>
            <p className="text-xs text-white/50 mt-1">نقاط مكتسبة</p>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-theme-surface border border-theme-gold/[0.08] rounded-2xl p-6 mb-4"
        >
          <h2 className="text-sm font-bold text-theme-gold mb-4">كيف يعمل؟</h2>
          <div className="space-y-4">
            {[
              { title: 'شارك الكود', desc: 'أرسل كود الدعوة الخاص بك لأصدقائك' },
              { title: ' يسجل صديقك', desc: 'يلتحق صديقك بالمنصة باستخدام الكود' },
              { title: 'اكسب مكافآت', desc: 'احصل على نقاط إضافية مع كل صديق ينضم' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <StepIcon step={i + 1} />
                <div>
                  <p className="text-sm font-bold text-white">{step.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Referrals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-theme-surface border border-theme-gold/[0.08] rounded-2xl p-5"
        >
          <h2 className="text-sm font-bold text-theme-gold mb-3">الأصدقاء المدعوين</h2>
          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" className="mx-auto mb-3 opacity-30">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              <p className="text-sm text-white/40">لا يوجد أصدقاء بعد</p>
              <p className="text-xs text-white/30 mt-1">ابدأ بدعوة أصدقائك!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {referrals.map((ref, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-theme-bg border border-white/[0.05]"
                >
                  <span className="text-sm text-white">{ref.name}</span>
                  <span className="text-xs text-theme-gold font-bold">+{ref.earned} XP</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import Link from 'next/link';

interface TripStory {
  title: string;
  content: string;
  rating: number;
  submitted: boolean;
}

export default function FollowUpPage() {
  const { continuePlanning, travelDna, addXp } = useAppStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [story, setStory] = useState<TripStory>({ title: '', content: '', rating: 0, submitted: false });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [shared, setShared] = useState(false);

  const tripData = useMemo(() => {
    const draft = continuePlanning['trip'] || continuePlanning['itinerary'] || {};
    return {
      city: draft.city || travelDna.interests?.[0] || 'مصر',
      duration: draft.duration || travelDna.tripDuration || '٧ أيام',
      date: draft.date || 'الشهر الماضي',
      companions: draft.companions || 'أنت',
    };
  }, [continuePlanning, travelDna]);

  const handleSubmitRating = () => {
    if (rating === 0) return;
    setStory(prev => ({ ...prev, rating, submitted: true }));
    addXp(50);
    setFeedbackSent(true);
  };

  const handleShareStory = () => {
    setShared(true);
    addXp(30);
  };

  const discountCode = useMemo(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'EGYPT25';
    for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }, []);

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-16">
      <div className="max-w-[800px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="text-5xl block mb-4">🎉</span>
          <h1 className="text-4xl font-bold font-playfair text-theme mb-3">
            كيف كانت <span className="text-theme-gold">رحلتك؟</span>
          </h1>
          <p className="text-theme-secondary font-cairo">أخبرنا عن تجربتك في مصر — تقييمك بيفرق في تحسين الخدمة</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <h2 className="text-lg font-bold font-cairo text-theme mb-4">🗺️ ملخص رحلتك</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'الوجهة', value: tripData.city },
                { label: 'المدة', value: tripData.duration },
                { label: 'التاريخ', value: tripData.date },
                { label: 'برفقة', value: tripData.companions },
              ].map((item, i) => (
                <div key={i} className="bg-theme-bg rounded-xl p-3 border border-theme-gold/10 text-center">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-theme font-cairo">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <h2 className="text-lg font-bold font-cairo text-theme mb-4">⭐ قيم تجربتك</h2>
            {feedbackSent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6">
                <span className="text-4xl block mb-3">❤️</span>
                <p className="text-lg font-bold text-theme-gold font-cairo mb-1">شكراً على تقييمك!</p>
                <p className="text-sm text-theme-secondary font-cairo">تقييمك بيساعدنا نحسن الخدمة +٥٠ نقطة خبرة</p>
              </motion.div>
            ) : (
              <>
                <p className="text-sm text-theme-secondary font-cairo mb-4">كيف كانت تجربتك في مصر؟</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map(star => (
                    <motion.button key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill={star <= (hoverRating || rating) ? '#D4A24C' : 'none'}
                        stroke="#D4A24C" strokeWidth="1.5" className="transition-all">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={handleSubmitRating} disabled={rating === 0}
                  className="w-full py-3 rounded-xl bg-gradient-gold text-dark-900 font-bold font-cairo text-sm disabled:opacity-40 transition-all">
                  إرسال التقييم
                </motion.button>
              </>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <h2 className="text-lg font-bold font-cairo text-theme mb-4">📝 شارك قصتك</h2>
            {shared ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6">
                <span className="text-4xl block mb-3">📖</span>
                <p className="text-lg font-bold text-theme-gold font-cairo mb-1">قصتك وصلت!</p>
                <p className="text-sm text-theme-secondary font-cairo">شكراً على مشاركة تجربتك +٣٠ نقطة خبرة</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <input value={story.title} onChange={e => setStory(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="عنوان قصتك"
                  className="w-full bg-theme-bg rounded-xl px-4 py-2.5 text-sm border border-theme focus:border-theme-gold/40 outline-none placeholder:text-theme-muted text-theme font-cairo" />
                <textarea value={story.content} onChange={e => setStory(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="احكيلنا عن أجمل لحظة في رحلتك... أكل عجبك؟ مكان حبيته؟ موقف ضحكك؟"
                  rows={4}
                  className="w-full bg-theme-bg rounded-xl px-4 py-3 text-sm border border-theme focus:border-theme-gold/40 outline-none resize-none placeholder:text-theme-muted text-theme font-cairo" />
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={handleShareStory} disabled={!story.title.trim() || !story.content.trim()}
                  className="w-full py-3 rounded-xl border border-theme-gold/30 text-theme-gold hover:bg-theme-gold/10 font-bold font-cairo text-sm disabled:opacity-40 transition-all">
                  شارك قصتك
                </motion.button>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl border border-theme-gold/20 bg-gradient-to-l from-theme-gold/10 to-transparent p-6 text-center">
            <span className="text-4xl block mb-3">🎫</span>
            <h2 className="text-lg font-bold font-playfair text-theme mb-2">ارجع لمصر تاني!</h2>
            <p className="text-sm text-theme-secondary font-cairo mb-4">استخدم الكود ده واحصل على خصم ٢٥٪ على رحلتك القادمة مع مصر هب</p>
            <div className="inline-flex items-center gap-3 bg-theme-bg rounded-xl px-6 py-3 border border-theme-gold/30">
              <span className="text-xl font-bold font-mono text-theme-gold tracking-wider">{discountCode}</span>
              <button onClick={() => { navigator.clipboard.writeText(discountCode); }}
                className="p-2 rounded-lg hover:bg-theme-gold/10 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
              </button>
            </div>
            <p className="text-[10px] text-theme-muted font-cairo mt-3">الكود صالح لمدة ٦ شهور · حد أقصى ٤ أشخاص</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex gap-3 justify-center">
            <Link href="/destinations"
              className="px-6 py-3 rounded-xl border border-theme-gold/30 text-theme-gold hover:bg-theme-gold/10 font-bold font-cairo text-sm transition-all">
              اكتشف وجهات جديدة
            </Link>
            <Link href="/zainab"
              className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:bg-theme-gold/80 transition-all">
              كلم زينب للترحيب
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

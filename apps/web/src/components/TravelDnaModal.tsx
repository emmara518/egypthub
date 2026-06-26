'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Close, Check } from '@/components/Icons';

const steps = [
  {
    title: 'نوع المسافر',
    subtitle: 'اختر نوع الرحلة المناسب لك',
    key: 'travelerType',
    multi: false,
    options: [
      { value: 'adventurer', label: 'مغامر', icon: '🏔️', desc: 'عش الإثارة والمغامرة' },
      { value: 'culture', label: 'عاشق ثقافة', icon: '🏛️', desc: 'استكشف التاريخ والحضارة' },
      { value: 'beach', label: 'شاطئ', icon: '🏖️', desc: 'استرخِ على الشواطئ الخلابة' },
      { value: 'history', label: 'عاشق تاريخ', icon: '📜', desc: 'اغوص في أعماق الماضي' },
      { value: 'foodie', label: 'عاشق طعام', icon: '🍽️', desc: 'تذوق أشهى المأكولات' },
      { value: 'luxury', label: 'رفاهية', icon: '💎', desc: 'تمتع بأفخم التجارب' },
    ],
  },
  {
    title: 'الاهتمامات',
    subtitle: 'اختر ما تستمتع به',
    key: 'interests',
    multi: true,
    options: [
      { value: 'history', label: 'تاريخ', icon: '📜' },
      { value: 'food', label: 'طعام', icon: '🍽️' },
      { value: 'diving', label: 'غوص', icon: '🤿' },
      { value: 'desert', label: 'صحراء', icon: '🏜️' },
      { value: 'nile', label: 'نيل', icon: '🚢' },
      { value: 'shopping', label: 'تسوق', icon: '🛍️' },
      { value: 'nightlife', label: 'حياة ليلية', icon: '🌙' },
      { value: 'photography', label: 'تصوير', icon: '📷' },
    ],
  },
  {
    title: 'الميزانية',
    subtitle: 'حدد ميزانيتك للرحلة',
    key: 'budget',
    multi: false,
    options: [
      { value: 'budget', label: 'اقتصادية', icon: '💰', desc: 'أقل من ١٠٠٠ دولار' },
      { value: 'mid', label: 'متوسطة', icon: '💵', desc: 'بين ١٠٠٠ - ٣٠٠٠ دولار' },
      { value: 'luxury', label: 'فاخرة', icon: '💎', desc: 'أكثر من ٣٠٠٠ دولار' },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TravelDnaModal({ isOpen, onClose }: Props) {
  const { travelDna, setTravelDna, addXp } = useAppStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    travelerType: '',
    interests: [],
    budget: '',
  });

  const isComplete = travelDna.completed;

  const handleSelect = (value: string) => {
    const current = steps[step];
    if (current.multi) {
      const arr: string[] = answers[current.key] || [];
      setAnswers((prev) => ({
        ...prev,
        [current.key]: arr.includes(value) ? arr.filter((v: string) => v !== value) : [...arr, value],
      }));
    } else {
      setAnswers((prev) => ({ ...prev, [current.key]: value }));
    }
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setTravelDna({ ...answers, completed: true });
      addXp(100);
      onClose();
    }
  };

  const shouldSkip = () => {
    const current = steps[step];
    const val = answers[current.key];
    if (current.multi) return Array.isArray(val) && val.length > 0;
    return !!val;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F1525] border border-theme-gold/20 shadow-[0_32px_64px_rgba(0,0,0,0.6)] p-6 md:p-8"
          >
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-theme-gold/10 flex items-center justify-center text-white/50 hover:text-white transition-all touch-target">
              <Close size={16} />
            </button>

            {isComplete ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-theme-gold/10 border border-theme-gold/30 flex items-center justify-center">
                  <span className="text-4xl">🧬</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">اكتملت شخصيتك!</h3>
                <p className="text-sm text-theme-secondary font-cairo mb-6">
                  {travelDna.travelerType === 'adventurer' && 'أنت مغامر حقيقي! مصر تنتظر تحدياتك.'}
                  {travelDna.travelerType === 'culture' && 'عاشق الثقافة! مصر وجهتك المثالية.'}
                  {travelDna.travelerType === 'beach' && 'عاشق الشواطئ! البحر الأحمر في انتظارك.'}
                  {travelDna.travelerType === 'history' && 'عاشق التاريخ! آثار مصر تناديك.'}
                  {travelDna.travelerType === 'foodie' && 'عاشق الطعام! مطاعم مصر تنتظرك.'}
                  {travelDna.travelerType === 'luxury' && 'عاشق الرفاهية! أفخم تجارب مصر في انتظارك.'}
                  {!travelDna.travelerType && 'شخصيتك جاهزة! استعد لاكتشاف مصر.'}
                </p>
                <button onClick={() => { setTravelDna({ completed: false }); setStep(0); setAnswers({ travelerType: '', interests: [], budget: '' }); }}
                  className="px-6 py-3 rounded-xl gold-btn text-sm font-bold font-cairo">
                  أعد الاختبار
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-0.5 h-3 bg-theme-gold rounded-full" />
                  <span className="text-[9px] font-bold tracking-[0.2em] text-theme-gold font-english">TRAVEL DNA</span>
                </div>
                <div className="flex gap-1 mb-6">
                  {steps.map((_, i) => (
                    <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-theme-gold' : 'bg-white/10'}`} />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    <h3 className="text-xl font-bold font-display text-white mb-1">{steps[step].title}</h3>
                    <p className="text-sm text-theme-secondary font-cairo mb-5">{steps[step].subtitle}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {steps[step].options.map((opt) => {
                        const val = answers[steps[step].key];
                        const isSelected = steps[step].multi ? Array.isArray(val) && val.includes(opt.value) : val === opt.value;
                        return (
                          <button key={opt.value} onClick={() => handleSelect(opt.value)}
                            className={`relative text-right p-4 rounded-2xl border transition-all touch-target ${
                              isSelected
                                ? 'border-theme-gold/50 bg-theme-gold/10 shadow-[0_0_20px_rgba(212,162,76,0.1)]'
                                : 'border-theme-border bg-theme-surface hover:border-theme-gold/20'
                            }`}
                          >
                            {isSelected && steps[step].multi && (
                              <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-theme-gold flex items-center justify-center">
                                <Check size={10} className="text-theme-bg" />
                              </div>
                            )}
                            <span className="text-2xl block mb-2">{opt.icon}</span>
                            <p className="text-sm font-bold text-white font-cairo">{opt.label}</p>
                            {'desc' in opt && opt.desc && <p className="text-[10px] text-theme-secondary font-cairo mt-0.5">{opt.desc}</p>}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-6">
                  <button onClick={() => step > 0 ? setStep(step - 1) : onClose()}
                    className="px-4 py-2.5 text-sm text-white/50 hover:text-white transition-all font-cairo">
                    {step === 0 ? 'إلغاء' : 'السابق'}
                  </button>
                  <button onClick={nextStep} disabled={!shouldSkip()}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold font-cairo transition-all ${
                      shouldSkip() ? 'gold-btn shadow-[0_4px_12px_rgba(212,162,76,0.2)]' : 'bg-white/5 text-white/30 cursor-not-allowed'
                    }`}>
                    {step < steps.length - 1 ? 'التالي' : 'اظهار النتيجة ✨'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

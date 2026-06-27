'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { ArrowRight, Check } from '@/components/Icons';

const steps = [
  {
    title: 'نوع المسافر',
    subtitle: 'اختر نوع الرحلة المناسب لك',
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
    subtitle: 'اختر ما تستمتع به (اختيارات متعددة)',
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
    options: [
      { value: 'budget', label: 'اقتصادية', icon: '💰', desc: 'أقل من ١٠٠٠ دولار' },
      { value: 'mid', label: 'متوسطة', icon: '💵', desc: 'بين ١٠٠٠ - ٣٠٠٠ دولار' },
      { value: 'luxury', label: 'فاخرة', icon: '💎', desc: 'أكثر من ٣٠٠٠ دولار' },
    ],
  },
  {
    title: 'الإيقاع',
    subtitle: 'اختر وتيرة رحلتك المفضلة',
    options: [
      { value: 'relaxed', label: 'هاديء', icon: '😌', desc: 'تمهل واستمتع بكل لحظة' },
      { value: 'balanced', label: 'متوازن', icon: '⚖️', desc: 'مزيج من الاسترخاء والنشاط' },
      { value: 'fast', label: 'سريع', icon: '🏃', desc: 'غطس في أقصى قدر من التجارب' },
    ],
  },
  {
    title: 'مدة الرحلة',
    subtitle: 'كم تريد أن تمكث؟',
    options: [
      { value: 'weekend', label: 'عطلة نهاية أسبوع', icon: '🌅', desc: '٢-٣ أيام' },
      { value: 'week', label: 'أسبوع', icon: '📅', desc: '٧ أيام' },
      { value: 'two_weeks', label: 'أسبوعين', icon: '📆', desc: '١٤ يوماً' },
      { value: 'month', label: 'شهر فأكثر', icon: '🗓️', desc: '٣٠ يوماً+' },
    ],
  },
];

const travelerTypeColors: Record<string, string> = {
  adventurer: '#E8C97A',
  culture: '#D4A24C',
  beach: '#4FC3F7',
  history: '#A67B5B',
  foodie: '#FF8A65',
  luxury: '#E1BEE7',
};

const dnaHelixColors = ['#D4A24C', '#E8C97A', '#4FC3F7', '#A67B5B', '#FF8A65', '#E1BEE7'];

export default function TravelDnaPage() {
  const { travelDna, setTravelDna, resetTravelDna, addXp } = useAppStore();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    travelerType: travelDna.travelerType || '',
    interests: travelDna.interests || [],
    budget: travelDna.budget || '',
    pace: travelDna.pace || '',
    tripDuration: travelDna.tripDuration || '',
  });
  const [showResults, setShowResults] = useState(false);

  const isMultiSelect = step === 1;
  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const selectOption = (value: string) => {
    if (isMultiSelect) {
      const current = answers.interests as string[];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, interests: updated });
    } else {
      setAnswers({ ...answers, [getKeyForStep(step)]: value });
    }
  };

  function getKeyForStep(s: number): string {
    const keys = ['travelerType', 'interests', 'budget', 'pace', 'tripDuration'];
    return keys[s];
  }

  const canProceed = () => {
    if (isMultiSelect) return answers.interests.length > 0;
    return !!answers[getKeyForStep(step)];
  };

  const nextStep = () => {
    if (isLastStep) {
      setTravelDna({ ...answers, completed: true });
      addXp(50);
      setShowResults(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  if (travelDna.completed && !showResults) {
    return (
      <div className="min-h-screen bg-theme-bg">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber animate-glow-pulse" />
              <div className="absolute inset-1 rounded-full bg-theme-bg flex items-center justify-center">
                <span className="text-4xl">🧬</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white font-playfair mb-2">حمضك السياحي</h1>
            <p className="text-theme-muted font-cairo mb-8">اكتشف شخصيتك السياحية الفريدة</p>

            <div className="bg-theme-card/50 border border-theme-gold/10 rounded-2xl p-8 mb-8">
              <div className="flex justify-center gap-2 mb-6">
                {dnaHelixColors.map((c, i) => (
                  <div
                    key={i}
                    className="w-3 h-12 rounded-full opacity-80"
                    style={{ backgroundColor: c, transform: `rotate(${i % 2 === 0 ? 15 : -15}deg)` }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-right">
                <div className="bg-theme-surface/50 rounded-xl p-4">
                  <span className="text-xs text-theme-muted block font-cairo">نوع المسافر</span>
                  <span className="text-white font-bold font-cairo text-lg">
                    {steps[0].options.find((o) => o.value === travelDna.travelerType)?.label}
                  </span>
                </div>
                <div className="bg-theme-surface/50 rounded-xl p-4">
                  <span className="text-xs text-theme-muted block font-cairo">الميزانية</span>
                  <span className="text-white font-bold font-cairo text-lg">
                    {steps[2].options.find((o) => o.value === travelDna.budget)?.label}
                  </span>
                </div>
                <div className="bg-theme-surface/50 rounded-xl p-4">
                  <span className="text-xs text-theme-muted block font-cairo">الإيقاع</span>
                  <span className="text-white font-bold font-cairo text-lg">
                    {steps[3].options.find((o) => o.value === travelDna.pace)?.label}
                  </span>
                </div>
                <div className="bg-theme-surface/50 rounded-xl p-4">
                  <span className="text-xs text-theme-muted block font-cairo">المدة</span>
                  <span className="text-white font-bold font-cairo text-lg">
                    {steps[4].options.find((o) => o.value === travelDna.tripDuration)?.label}
                  </span>
                </div>
              </div>

              {travelDna.interests.length > 0 && (
                <div className="mt-4 bg-theme-surface/50 rounded-xl p-4">
                  <span className="text-xs text-theme-muted block font-cairo mb-2">الاهتمامات</span>
                  <div className="flex flex-wrap gap-2">
                    {travelDna.interests.map((i) => (
                      <span key={i} className="text-xs bg-theme-gold/10 text-theme-gold px-3 py-1 rounded-full font-cairo">
                        {steps[1].options.find((o) => o.value === i)?.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => { resetTravelDna(); setStep(0); setAnswers({ travelerType: '', interests: [], budget: '', pace: '', tripDuration: '' }); }}
              className="px-6 py-3 rounded-xl border border-theme-gold/30 text-theme-gold font-cairo hover:bg-theme-gold/10 transition-all"
            >
              إعادة الاختبار
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-8">
          <ArrowRight size={16} />
          العودة للرئيسية
        </Link>

        <div className="flex gap-2 mb-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-theme-gold' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold text-white font-playfair mb-2">{currentStep.title}</h1>
            <p className="text-theme-muted font-cairo">{currentStep.subtitle}</p>
          </motion.div>

          <motion.div
            key={`options-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`grid gap-3 mb-10 ${
              isMultiSelect
                ? 'grid-cols-2 md:grid-cols-4'
                : currentStep.options.length <= 4
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-3'
            }`}
          >
            {currentStep.options.map((opt) => {
              const isSelected = isMultiSelect
                ? (answers.interests as string[]).includes(opt.value)
                : answers[getKeyForStep(step)] === opt.value;

              return (
                <motion.button
                  key={opt.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectOption(opt.value)}
                  className={`relative p-5 rounded-2xl border text-right transition-all duration-300 ${
                    isSelected
                      ? 'border-theme-gold bg-theme-gold/10 shadow-[0_0_20px_rgba(212,162,76,0.15)]'
                      : 'border-white/10 bg-theme-card/50 hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-theme-gold flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                  <span className="text-2xl block mb-2">{opt.icon}</span>
                  <span className="block text-white font-bold font-cairo text-sm">{opt.label}</span>
                  {'desc' in opt && opt.desc && (
                    <span className="block text-theme-muted text-xs font-cairo mt-1">{opt.desc}</span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="px-6 py-3 rounded-xl border border-white/10 text-theme-secondary font-cairo disabled:opacity-30 hover:border-white/20 transition-all"
          >
            السابق
          </button>

          <span className="text-sm text-theme-muted font-cairo">{step + 1} / {steps.length}</span>

          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="px-8 py-3 rounded-xl bg-gradient-gold text-dark-900 font-bold font-cairo disabled:opacity-40 hover:brightness-110 transition-all"
          >
            {isLastStep ? 'عرض نتيجتي' : 'التالي'}
          </button>
        </div>
      </div>
    </div>
  );
}

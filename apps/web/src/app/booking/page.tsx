'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCalendar, HiUsers, HiEye, HiCreditCard,
  HiChevronRight, HiClock,
  HiLocationMarker, HiStar, HiShieldCheck, HiPlus, HiMinus,
  HiTicket, HiInformationCircle, HiX,
} from 'react-icons/hi';

interface ExperienceData {
  id: string;
  slug: string;
  titleAr: string;
  titleEn?: string;
  descriptionAr: string;
  descriptionEn?: string;
  category: string;
  locationCity: string;
  durationHours: number | null;
  maxParticipants: number | null;
  priceEgp: number;
  images: string[];
  averageRating: number;
  totalReviews: number;
  included: string[];
  excluded: string[];
  provider: {
    id: string;
    businessNameAr: string;
    businessNameEn: string | null;
    locationCity: string | null;
  };
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
];

const dayNames = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];

const paymentMethods = [
  { id: 'card', label: 'بطاقة ائتمان', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
  { id: 'fawry', label: 'فوري', icon: '🏦' },
  { id: 'vodafone_cash', label: 'فودافون كاش', icon: '📱' },
  { id: 'instapay', label: 'انستاباي', icon: '⚡' },
  { id: 'cash', label: 'الدفع نقداً', icon: '💰' },
];

const MONTH_NAMES = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

function generateCalendarMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const days: { date: Date; day: number; available: boolean }[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const isPast = date <= now;
    const isWeekend = date.getDay() === 5 || date.getDay() === 6;
    const available = !isPast && !isWeekend && Math.random() > 0.25;
    days.push({ date, day: i, available });
  }

  return { days, firstDayOfWeek, year, month };
}

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const experienceSlug = searchParams.get('experience');

  const [experience, setExperience] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponState, setCouponState] = useState<{
    validating: boolean;
    valid: boolean;
    discountAmount: number;
    discountType?: string;
    discountValue?: number;
    message: string;
  }>({ validating: false, valid: false, discountAmount: 0, message: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    if (!experienceSlug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/experiences/${experienceSlug}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) {
          setError('حدث خطأ أثناء تحميل بيانات التجربة');
          return;
        }
        const data: ExperienceData = await res.json();
        setExperience(data);
      } catch {
        setError('حدث خطأ أثناء تحميل بيانات التجربة');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [experienceSlug]);

  const calendar = useMemo(() => generateCalendarMonth(), []);

  const totalParticipants = adults + children;
  const basePrice = experience?.priceEgp ?? 0;
  const totalBeforeDiscount = basePrice * totalParticipants;
  const totalPrice = Math.max(0, totalBeforeDiscount - couponState.discountAmount);

  const canProceedFromStep0 = experience !== null;
  const canProceedFromStep1 = selectedDate !== null && selectedTime !== null;
  const canProceedFromStep2 = totalParticipants > 0;
  const canProceedFromStep3 = true;
  const canProceedFromStep4 = paymentMethod !== '' && !submitting;

  const validateCoupon = useCallback(async () => {
    if (!couponCode.trim()) return;
    setCouponState(prev => ({ ...prev, validating: true, message: '' }));
    try {
      const res = await fetch('/api/offers/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), bookingValue: totalBeforeDiscount }),
      });
      const data = await res.json();
      if (data.valid) {
        setCouponState({
          validating: false, valid: true,
          discountAmount: data.discountAmount,
          discountType: data.discountType,
          discountValue: data.discountValue,
          message: data.message || 'الكود صالح',
        });
      } else {
        setCouponState({
          validating: false, valid: false, discountAmount: 0, message: data.message || 'الكود غير صالح',
        });
      }
    } catch {
      setCouponState({ validating: false, valid: false, discountAmount: 0, message: 'فشل التحقق من الكود' });
    }
  }, [couponCode, totalBeforeDiscount]);

  const removeCoupon = () => {
    setCouponCode('');
    setCouponState({ validating: false, valid: false, discountAmount: 0, message: '' });
  };

  const handleSubmit = async () => {
    if (!experience || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    setSubmitError(null);

    const formattedDate = selectedDate.toISOString().split('T')[0];

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experienceId: experience.id,
          providerId: experience.provider.id,
          bookingDate: formattedDate,
          bookingTime: selectedTime,
          participants: totalParticipants,
          paymentMethod,
          offerCode: couponState.valid ? couponCode.trim() : undefined,
          notes: undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setSubmitError(err.error || 'حدث خطأ أثناء تأكيد الحجز');
        return;
      }

      const booking = await res.json();
      router.push(`/booking/confirmation?ref=${booking.bookingReference}&id=${booking.id}`);
    } catch {
      setSubmitError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-gold/20 border-t-theme-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
          <p className="text-theme text-lg font-cairo mb-2">التجربة غير موجودة</p>
          <p className="text-theme-secondary text-sm font-cairo mb-8">يرجى اختيار تجربة صالحة للحجز</p>
          <Link href="/experiences" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            العودة للتجارب
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-theme text-lg font-cairo mb-8">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!experience) return null;

  const steps = [
    { num: '01', title: 'التجربة', icon: HiTicket },
    { num: '02', title: 'التاريخ والوقت', icon: HiCalendar },
    { num: '03', title: 'المسافرين', icon: HiUsers },
    { num: '04', title: 'المراجعة', icon: HiEye },
    { num: '05', title: 'الدفع', icon: HiCreditCard },
  ];

  const selectedDateStr = selectedDate
    ? `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    : '';

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href={experienceSlug ? `/experiences/${experienceSlug}` : '/'} className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronRight className="w-4 h-4" />
          العودة
        </Link>

        <div className="flex gap-6">
          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
                <span className="text-[10px] font-bold text-theme-gold block mb-1 font-english">حجز</span>
                <h2 className="text-lg font-bold font-playfair text-theme mb-1">حجز تجربة</h2>
                <p className="text-theme-secondary text-xs font-cairo mb-3">Booking Flow</p>
                <p className="text-theme-muted text-xs leading-relaxed font-cairo">
                  رحلة حجز سهلة وبسيطة — من اختيار التجربة حتى تأكيد الحجز والدفع.
                </p>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {steps.map((s, i) => (
                  <button key={i} onClick={() => setStep(i)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-right transition-all ${
                      step === i ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-theme-secondary hover:text-theme hover:bg-theme-elevated'
                    }`}>
                    <span className={`w-6 h-6 rounded text-[9px] font-bold flex items-center justify-center font-english ${
                      step === i ? 'bg-theme-gold text-dark-900' : i < step ? 'bg-green-500/20 text-green-400' : 'bg-theme-elevated text-theme-muted'
                    }`}>{i < step ? '✓' : s.num}</span>
                    <span className="text-xs truncate font-cairo">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">01</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">نظرة عامة على التجربة</h2>

                    <div className="relative rounded-xl overflow-hidden h-52 mb-6">
                      {experience.images?.[0] ? (
                        <Image src={experience.images[0]} alt={experience.titleAr} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      ) : (
                        <div className="w-full h-full bg-theme-elevated flex items-center justify-center">
                          <HiTicket className="text-4xl text-theme-muted" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/30 to-transparent" />
                    </div>

                    <h3 className="text-2xl font-bold font-playfair text-theme mb-2">{experience.titleAr}</h3>
                    <p className="text-theme-secondary text-sm font-cairo mb-4 leading-relaxed">{experience.descriptionAr}</p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      <div className="bg-theme-surface rounded-xl p-3 border border-theme-border text-center">
                        <HiLocationMarker className="text-theme-gold text-lg mx-auto mb-1" />
                        <p className="text-[10px] text-theme-muted font-cairo">الموقع</p>
                        <p className="text-xs font-bold text-theme font-cairo">{experience.locationCity}</p>
                      </div>
                      <div className="bg-theme-surface rounded-xl p-3 border border-theme-border text-center">
                        <HiClock className="text-theme-gold text-lg mx-auto mb-1" />
                        <p className="text-[10px] text-theme-muted font-cairo">المدة</p>
                        <p className="text-xs font-bold text-theme font-cairo">{experience.durationHours ? `${experience.durationHours} ساعات` : 'غير محدد'}</p>
                      </div>
                      <div className="bg-theme-surface rounded-xl p-3 border border-theme-border text-center">
                        <HiUsers className="text-theme-gold text-lg mx-auto mb-1" />
                        <p className="text-[10px] text-theme-muted font-cairo">الحد الأقصى</p>
                        <p className="text-xs font-bold text-theme font-cairo">{experience.maxParticipants ?? 'غير محدد'} أشخاص</p>
                      </div>
                      <div className="bg-theme-surface rounded-xl p-3 border border-theme-border text-center">
                        <HiStar className="text-theme-gold text-lg mx-auto mb-1" />
                        <p className="text-[10px] text-theme-muted font-cairo">التقييم</p>
                        <p className="text-xs font-bold text-theme font-cairo">{experience.averageRating.toFixed(1)} ({experience.totalReviews})</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 rounded-xl p-4 border border-theme-gold/20 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-theme font-cairo">السعر للفرد</span>
                        <span className="text-2xl font-bold text-theme-gold font-english">EGP {experience.priceEgp.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        احجز الآن
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">02</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">اختيار التاريخ والوقت</h2>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold font-cairo text-theme">{MONTH_NAMES[calendar.month]} {calendar.year}</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {dayNames.map(d => (
                        <span key={d} className="text-xs text-theme-muted text-center py-2 font-cairo">{d}</span>
                      ))}
                      {Array.from({ length: calendar.firstDayOfWeek }).map((_, i) => (
                        <div key={`e${i}`} />
                      ))}
                      {calendar.days.map(d => (
                        <button key={d.day} onClick={() => d.available && setSelectedDate(d.date)}
                          disabled={!d.available}
                          className={`text-sm py-3 rounded-xl transition-all font-cairo ${
                            selectedDate && selectedDate.getTime() === d.date.getTime()
                              ? 'bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold'
                              : d.available
                                ? 'text-theme hover:bg-theme-elevated cursor-pointer'
                                : 'text-theme-muted line-through cursor-not-allowed'
                          }`}>
                          {d.day}
                        </button>
                      ))}
                    </div>

                    {selectedDate && (
                      <div className="mb-6">
                        <p className="text-sm font-bold text-theme mb-3 font-cairo">اختر الوقت</p>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map(t => {
                            const hour = parseInt(t.split(':')[0]);
                            const label = hour < 12 ? `${t} صباحاً` : hour === 12 ? '12:00 ظهراً' : `${t} مساءً`;
                            return (
                              <button key={t} onClick={() => setSelectedTime(t)}
                                className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-cairo text-sm transition-all ${
                                  selectedTime === t
                                    ? 'border-theme-gold bg-theme-gold/10 text-theme-gold'
                                    : 'border-theme-border bg-theme-surface text-theme-secondary hover:border-theme-gold/30'
                                }`}>
                                <HiClock className="text-sm" />{label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      {selectedDate ? (
                        <p className="text-theme-muted text-sm font-cairo">التاريخ المختار: <span className="text-theme font-bold">{selectedDateStr}</span></p>
                      ) : (
                        <p className="text-theme-muted text-sm font-cairo">اختر تاريخاً متاحاً</p>
                      )}
                      <div className="flex gap-3">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(0)}
                          className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                          السابق
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => canProceedFromStep1 && setStep(2)}
                          disabled={!canProceedFromStep1}
                          className={`px-8 py-3 rounded-xl font-bold text-sm font-cairo transition-all ${
                            canProceedFromStep1
                              ? 'bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900'
                              : 'bg-theme-elevated text-theme-muted cursor-not-allowed'
                          }`}>
                          التالي
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">03</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">تحديد المسافرين</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-theme-surface border border-theme-border">
                        <div>
                          <p className="font-bold text-theme font-cairo">بالغين</p>
                          <p className="text-xs text-theme-muted font-cairo">13 سنة فأكثر</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.button whileTap={{ scale: 0.9 }}
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-9 h-9 rounded-lg bg-theme-elevated text-theme-secondary hover:bg-theme-hover transition-colors flex items-center justify-center">
                            <HiMinus className="text-sm" />
                          </motion.button>
                          <span className="text-lg font-bold text-theme font-english w-6 text-center">{adults}</span>
                          <motion.button whileTap={{ scale: 0.9 }}
                            onClick={() => (!experience.maxParticipants || adults + children < experience.maxParticipants) && setAdults(adults + 1)}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              experience.maxParticipants && adults + children >= experience.maxParticipants
                                ? 'bg-theme-elevated text-theme-muted cursor-not-allowed'
                                : 'bg-theme-gold/15 text-theme-gold hover:bg-theme-gold/25'
                            }`}>
                            <HiPlus className="text-sm" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-theme-surface border border-theme-border">
                        <div>
                          <p className="font-bold text-theme font-cairo">أطفال</p>
                          <p className="text-xs text-theme-muted font-cairo">2 - 12 سنة</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.button whileTap={{ scale: 0.9 }}
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-9 h-9 rounded-lg bg-theme-elevated text-theme-secondary hover:bg-theme-hover transition-colors flex items-center justify-center">
                            <HiMinus className="text-sm" />
                          </motion.button>
                          <span className="text-lg font-bold text-theme font-english w-6 text-center">{children}</span>
                          <motion.button whileTap={{ scale: 0.9 }}
                            onClick={() => (!experience.maxParticipants || adults + children < experience.maxParticipants) && setChildren(children + 1)}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              experience.maxParticipants && adults + children >= experience.maxParticipants
                                ? 'bg-theme-elevated text-theme-muted cursor-not-allowed'
                                : 'bg-theme-gold/15 text-theme-gold hover:bg-theme-gold/25'
                            }`}>
                            <HiPlus className="text-sm" />
                          </motion.button>
                        </div>
                      </div>

                      {experience.maxParticipants && (
                        <p className="text-xs text-theme-muted font-cairo text-center">
                          الحد الأقصى للمشاركين: {experience.maxParticipants} أشخاص
                        </p>
                      )}
                    </div>

                    <div className="bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 rounded-xl p-4 border border-theme-gold/20 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-theme-muted font-cairo">إجمالي المسافرين</p>
                          <p className="text-sm font-bold text-theme font-cairo">{totalParticipants} {totalParticipants === 1 ? 'شخص' : 'أشخاص'}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-theme-muted font-cairo">السعر الإجمالي</p>
                          <p className="text-xl font-bold text-theme-gold font-english">EGP {(basePrice * totalParticipants).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div />
                      <div className="flex gap-3">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(1)}
                          className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                          السابق
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => canProceedFromStep2 && setStep(3)}
                          disabled={!canProceedFromStep2}
                          className={`px-8 py-3 rounded-xl font-bold text-sm font-cairo transition-all ${
                            canProceedFromStep2
                              ? 'bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900'
                              : 'bg-theme-elevated text-theme-muted cursor-not-allowed'
                          }`}>
                          التالي
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">04</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">مراجعة الحجز</h2>

                    <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-xs text-theme-muted font-cairo">التجربة</span>
                        <span className="text-sm text-theme font-cairo font-medium">{experience.titleAr}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-theme-muted font-cairo">التاريخ</span>
                        <span className="text-sm text-theme font-cairo font-medium">{selectedDateStr}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-theme-muted font-cairo">الوقت</span>
                        <span className="text-sm text-theme font-cairo font-medium">{selectedTime && `${selectedTime} ${parseInt(selectedTime.split(':')[0]) < 12 ? 'صباحاً' : parseInt(selectedTime.split(':')[0]) === 12 ? 'ظهراً' : 'مساءً'}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-theme-muted font-cairo">المسافرون</span>
                        <span className="text-sm text-theme font-cairo font-medium">{adults} بالغين{children > 0 ? ` + ${children} أطفال` : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-theme-muted font-cairo">الموقع</span>
                        <span className="text-sm text-theme font-cairo font-medium">{experience.locationCity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-theme-muted font-cairo">المدة</span>
                        <span className="text-sm text-theme font-cairo font-medium">{experience.durationHours ? `${experience.durationHours} ساعات` : 'غير محدد'}</span>
                      </div>
                    </div>

                    <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-theme font-cairo">سعر الفرد</span>
                        <span className="text-sm font-bold text-theme font-english">EGP {basePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-theme font-cairo">عدد المشاركين</span>
                        <span className="text-sm font-bold text-theme font-english">{totalParticipants}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-theme font-cairo">الإجمالي</span>
                        <span className="text-sm font-bold text-theme font-english">EGP {(basePrice * totalParticipants).toLocaleString()}</span>
                      </div>
                      {couponState.valid && (
                        <div className="flex justify-between">
                          <span className="text-sm text-green-400 font-cairo">الخصم</span>
                          <span className="text-sm font-bold text-green-400 font-english">-EGP {couponState.discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-t border-theme-border pt-2">
                        <div className="flex justify-between">
                          <span className="text-base font-bold text-theme font-cairo">المجموع النهائي</span>
                          <span className="text-xl font-bold text-theme-gold font-english">EGP {totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-medium text-theme mb-2 font-cairo">كود الخصم</label>
                      <div className="flex gap-2">
                        <input type="text" value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value); if (couponState.valid) removeCoupon(); }}
                          placeholder="أدخل كود الخصم"
                          className="flex-1 bg-theme-surface rounded-xl px-4 py-3 text-sm border border-theme-border focus:border-theme-gold/40 outline-none font-cairo placeholder:text-theme-muted text-theme" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={validateCoupon}
                          disabled={couponState.validating || !couponCode.trim()}
                          className={`px-6 py-3 rounded-xl font-cairo text-sm font-bold transition-all ${
                            couponState.valid
                              ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                              : 'bg-theme-surface border border-theme-gold/30 text-theme-gold hover:bg-theme-gold/5'
                          }`}>
                          {couponState.validating ? '...' : couponState.valid ? '✓' : 'تطبيق'}
                        </motion.button>
                      </div>
                      {couponState.message && (
                        <p className={`text-xs mt-1 font-cairo ${couponState.valid ? 'text-green-400' : 'text-red-400'}`}>
                          {couponState.message}
                        </p>
                      )}
                      {couponState.valid && (
                        <button onClick={removeCoupon} className="text-xs text-theme-muted mt-1 hover:text-theme-gold transition-colors font-cairo flex items-center gap-1">
                          <HiX className="text-xs" /> إزالة الكود
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(2)}
                        className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                        السابق
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => canProceedFromStep3 && setStep(4)}
                        disabled={!canProceedFromStep3}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        متابعة للدفع
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">05</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">الدفع</h2>

                    <div className="flex items-center gap-2 mb-6">
                      <HiShieldCheck className="text-green-400" />
                      <span className="text-xs text-green-400 font-cairo">اتصال آمن ومشفر</span>
                    </div>

                    <p className="text-sm font-bold text-theme mb-3 font-cairo">اختر طريقة الدفع</p>
                    <div className="space-y-3 mb-6">
                      {paymentMethods.map(m => (
                        <div key={m.id} onClick={() => setPaymentMethod(m.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            paymentMethod === m.id ? 'border-theme-gold/30 bg-theme-gold/5' : 'border-theme-border bg-theme-surface hover:border-theme-gold/20'
                          }`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === m.id ? 'border-theme-gold' : 'border-theme-border'}`}>
                            {paymentMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-theme-gold" />}
                          </div>
                          <span className="text-xl">{m.icon}</span>
                          <span className="text-sm font-bold text-theme font-cairo">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-theme-muted font-cairo">التجربة</span>
                        <span className="text-theme font-cairo font-medium">{experience.titleAr}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-theme-muted font-cairo">التاريخ</span>
                        <span className="text-theme font-cairo font-medium">{selectedDateStr}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-theme-muted font-cairo">المسافرون</span>
                        <span className="text-theme font-cairo font-medium">{totalParticipants} {totalParticipants === 1 ? 'شخص' : 'أشخاص'}</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 rounded-xl p-4 border border-theme-gold/20 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-theme-muted font-cairo">المبلغ المستحق</p>
                          {couponState.valid && <p className="text-xs text-green-400 font-cairo">بعد الخصم</p>}
                        </div>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-theme-gold font-english">EGP {totalPrice.toLocaleString()}</p>
                          {couponState.valid && (
                            <p className="text-xs text-theme-muted font-cairo line-through">EGP {(basePrice * totalParticipants).toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                        <HiInformationCircle className="text-red-400 shrink-0" />
                        <p className="text-sm text-red-400 font-cairo">{submitError}</p>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(3)}
                        disabled={submitting}
                        className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                        السابق
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={!canProceedFromStep4}
                        className={`px-8 py-3 rounded-xl font-bold text-sm font-cairo flex items-center gap-2 transition-all ${
                          canProceedFromStep4 && !submitting
                            ? 'bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900'
                            : 'bg-theme-elevated text-theme-muted cursor-not-allowed'
                        }`}>
                        {submitting ? (
                          <><div className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" /> جارٍ التأكيد</>
                        ) : (
                          'تأكيد الحجز'
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              {[0, 1, 2, 3, 4].map(i => (
                <button key={i} onClick={() => setStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    step === i ? 'bg-theme-gold w-8' : 'bg-theme-border hover:bg-theme-muted'
                  }`} />
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-theme-border bg-theme-card p-4 mt-6 flex items-center justify-center gap-6">
              {['VISA', 'mastercard', 'Meeza', 'فوري', 'Apple Pay'].map(m => (
                <span key={m} className="text-xs text-theme-muted font-english font-bold opacity-50 hover:opacity-100 transition-opacity cursor-pointer">{m}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

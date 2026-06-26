'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCalendar, HiClock, HiChevronRight, HiUser, HiLocationMarker,
  HiCheck, HiX, HiExclamation, HiCreditCard, HiCurrencyDollar,
  HiMail, HiPhone, HiTrash,
} from 'react-icons/hi';

interface BookingUser {
  name: string;
  email: string;
  phone: string;
}

interface ExperienceSummary {
  titleAr: string;
  slug: string;
  images: string[];
  locationCity: string;
  durationHours: number | null;
}

interface ProviderSummary {
  businessNameAr: string;
}

interface BookingData {
  id: string;
  bookingReference: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDED';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
  paymentMethod: string | null;
  bookingDate: string;
  bookingTime: string | null;
  participants: number;
  totalPriceEgp: number;
  discountAmount: number;
  currency: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user: BookingUser;
  experience: ExperienceSummary;
  provider: ProviderSummary;
}

const statusConfig: Record<string, { label: string; class: string }> = {
  PENDING: { label: 'قيد الانتظار', class: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  CONFIRMED: { label: 'مؤكد', class: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
  CANCELLED: { label: 'ملغي', class: 'bg-red-500/15 text-red-400 border-red-500/20' },
  COMPLETED: { label: 'مكتمل', class: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
  REFUNDED: { label: 'مسترد', class: 'bg-purple-500/15 text-purple-400 border-purple-500/20' },
};

const paymentStatusConfig: Record<string, { label: string; class: string }> = {
  UNPAID: { label: 'غير مدفوع', class: 'bg-amber-500/15 text-amber-400' },
  PAID: { label: 'مدفوع', class: 'bg-emerald-500/15 text-emerald-400' },
  REFUNDED: { label: 'مسترد', class: 'bg-purple-500/15 text-purple-400' },
  PARTIALLY_REFUNDED: { label: 'مسترد جزئياً', class: 'bg-blue-500/15 text-blue-400' },
};

const timelineSteps = [
  { key: 'CREATED', label: 'تم الإنشاء' },
  { key: 'CONFIRMED', label: 'تم التأكيد' },
  { key: 'COMPLETED', label: 'تم الإكمال' },
  { key: 'CANCELLED', label: 'تم الإلغاء' },
];

function getTimelineStatus(booking: BookingData, step: string) {
  const statusOrder = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'REFUNDED'];
  const currentIdx = statusOrder.indexOf(booking.status);

  if (booking.status === 'CANCELLED' || booking.status === 'REFUNDED') {
    if (step === 'CREATED') return 'done';
    if (step === 'CONFIRMED' && currentIdx >= 1) return 'done';
    if (step === 'CANCELLED') return 'current';
    return step === 'COMPLETED' ? 'skipped' : 'pending';
  }

  if (step === 'CREATED') return 'done';
  if (step === 'CONFIRMED') {
    if (booking.status === 'CONFIRMED' || booking.status === 'COMPLETED') return 'done';
    return 'current';
  }
  if (step === 'COMPLETED') {
    if (booking.status === 'COMPLETED') return 'done';
    return 'pending';
  }
  return 'pending';
}

function getTimelineIcon(stepKey: string) {
  switch (stepKey) {
    case 'CREATED': return HiCalendar;
    case 'CONFIRMED': return HiCheck;
    case 'COMPLETED': return HiExclamation;
    case 'CANCELLED': return HiX;
    default: return HiCalendar;
  }
}

export default function BookingDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [cancelError, setCancelError] = useState('');

  const fetchBooking = useCallback(async () => {
    if (!id) {
      setLoading(false);
      setError(true);
      return;
    }
    try {
      const res = await fetch(`/api/bookings/${id}`);
      if (!res.ok) {
        setError(true);
        return;
      }
      const data = await res.json();
      setBooking(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const handleCancel = async () => {
    if (!booking) return;
    setCancelling(true);
    setCancelError('');
    try {
      const res = await fetch(`/api/bookings/${booking.id}/cancel`, { method: 'POST' });
      if (!res.ok) {
        const err = await res.json();
        setCancelError(err.error || 'فشل الإلغاء');
        return;
      }
      setCancelSuccess(true);
      await fetchBooking();
      setTimeout(() => {
        setShowCancelDialog(false);
        setCancelSuccess(false);
      }, 2000);
    } catch {
      setCancelError('حدث خطأ في الاتصال');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-2 border-theme-gold/30 border-t-theme-gold rounded-full" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-theme-gold/10 flex items-center justify-center mb-6">
            <HiExclamation className="text-4xl text-theme-gold" />
          </div>
          <h2 className="text-2xl font-bold font-playfair text-theme mb-2">الحجز غير موجود</h2>
          <p className="text-theme-secondary text-sm font-cairo mb-6">لم نتمكن من العثور على هذا الحجز</p>
          <Link href="/bookings"
            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo hover:opacity-90 transition-all">
            عرض كل الحجوزات
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = statusConfig[booking.status] || { label: booking.status, class: 'bg-theme-elevated text-theme-muted' };
  const paymentInfo = paymentStatusConfig[booking.paymentStatus] || { label: booking.paymentStatus, class: 'bg-theme-elevated text-theme-muted' };
  const bookingDate = new Date(booking.bookingDate);
  const formattedDate = bookingDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  const experienceImage = booking.experience.images?.[0] || '/egypthub/images/activities/diving.svg';

  const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED';
  const isCancelled = booking.status === 'CANCELLED' || booking.status === 'REFUNDED';

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/bookings" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronRight className="w-4 h-4" />
          العودة للحجوزات
        </Link>

        <div className="flex gap-6">
          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
                <h1 className="text-lg font-bold font-playfair text-theme mb-1">تفاصيل الحجز</h1>
                <p className="text-theme-secondary text-xs font-cairo mb-3">عرض تفاصيل الحجز والإلغاء</p>
                <div className="flex gap-2 flex-wrap">
                  {['الرحلة', 'المسافر', 'الدفع', 'الإلغاء'].map(f => (
                    <span key={f} className="flex items-center gap-1 text-[9px] text-theme-muted">
                      <div className="w-1 h-1 rounded-full bg-theme-gold" />{f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {[
                  { id: 'details', label: 'التفاصيل' },
                  { id: 'timeline', label: 'الجدول الزمني' },
                  { id: 'cancellation', label: 'الإلغاء' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-all ${
                      activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-theme-secondary hover:text-theme hover:bg-theme-elevated'
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'details' && (
                <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold font-playfair text-theme mb-2">تفاصيل الحجز</h2>
                      <p className="text-sm text-theme-secondary font-cairo">{booking.bookingReference}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${statusInfo.class}`}>{statusInfo.label}</span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden h-48 mb-6">
                    <img src={experienceImage} alt={booking.experience.titleAr} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent" />
                    <div className="absolute bottom-3 right-3">
                      <p className="text-xl font-bold text-theme font-cairo">{booking.experience.titleAr}</p>
                      <p className="text-sm text-theme-gold font-english">{booking.provider.businessNameAr}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-xs text-theme-muted font-cairo mb-2">تفاصيل الرحلة</p>
                      <div className="bg-theme-surface rounded-xl p-4 border border-theme-border space-y-3">
                        <div className="flex items-center gap-3">
                          <HiCalendar className="text-theme-gold" />
                          <div>
                            <p className="text-xs text-theme-muted font-cairo">التاريخ</p>
                            <p className="text-sm text-theme font-cairo font-medium">{formattedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <HiClock className="text-theme-gold" />
                          <div>
                            <p className="text-xs text-theme-muted font-cairo">الوقت</p>
                            <p className="text-sm text-theme font-cairo font-medium">{booking.bookingTime || 'غير محدد'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <HiLocationMarker className="text-theme-gold" />
                          <div>
                            <p className="text-xs text-theme-muted font-cairo">الموقع</p>
                            <p className="text-sm text-theme font-cairo font-medium">{booking.experience.locationCity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <HiClock className="text-theme-gold" />
                          <div>
                            <p className="text-xs text-theme-muted font-cairo">المدة</p>
                            <p className="text-sm text-theme font-cairo font-medium">
                              {booking.experience.durationHours ? `${booking.experience.durationHours} ساعات` : 'غير محدد'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-theme-muted font-cairo mb-2">بيانات المسافر</p>
                      <div className="bg-theme-surface rounded-xl p-4 border border-theme-border space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-theme-gold/15 flex items-center justify-center">
                            <HiUser className="text-theme-gold text-sm" />
                          </div>
                          <div>
                            <p className="text-sm text-theme font-cairo font-medium">{booking.user.name}</p>
                            <p className="text-xs text-theme-muted font-cairo">المسؤول عن الحجز</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-theme-gold/15 flex items-center justify-center">
                            <HiMail className="text-theme-gold text-sm" />
                          </div>
                          <div>
                            <p className="text-sm text-theme font-cairo font-medium" dir="ltr">{booking.user.email}</p>
                            <p className="text-xs text-theme-muted font-cairo">البريد الإلكتروني</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-theme-gold/15 flex items-center justify-center">
                            <HiPhone className="text-theme-gold text-sm" />
                          </div>
                          <div>
                            <p className="text-sm text-theme font-cairo font-medium" dir="ltr">{booking.user.phone || 'غير متوفر'}</p>
                            <p className="text-xs text-theme-muted font-cairo">رقم الهاتف</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-6">
                    <p className="text-xs text-theme-muted font-cairo mb-3">تفاصيل الدفع</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-theme font-cairo">عدد المشاركين</span>
                      <span className="text-sm font-bold text-theme font-english">{booking.participants}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-theme font-cairo">طريقة الدفع</span>
                      <span className="text-sm text-theme font-english">{booking.paymentMethod || 'غير محدد'}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-theme font-cairo">حالة الدفع</span>
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${paymentInfo.class}`}>{paymentInfo.label}</span>
                    </div>
                    {booking.discountAmount > 0 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-green-400 font-cairo">الخصم</span>
                        <span className="text-sm font-bold text-green-400 font-english">-EGP {booking.discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-theme-border pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-theme font-cairo font-bold">الإجمالي</span>
                        <span className="text-xl font-bold text-theme-gold font-english">
                          {booking.currency.toUpperCase() === 'USD' ? '$' : 'EGP'} {booking.totalPriceEgp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-6">
                      <p className="text-xs text-theme-muted font-cairo mb-1">ملاحظات</p>
                      <p className="text-sm text-theme font-cairo">{booking.notes}</p>
                    </div>
                  )}

                  {canCancel && (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCancelDialog(true)}
                      className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-cairo font-bold text-sm hover:bg-red-500/5 transition-all flex items-center justify-center gap-2">
                      <HiTrash className="text-lg" />
                      إلغاء الحجز
                    </motion.button>
                  )}

                  {isCancelled && (
                    <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/15 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-red-500/15 flex items-center justify-center mb-3">
                        <HiX className="text-xl text-red-400" />
                      </div>
                      <p className="text-lg font-bold text-red-400 font-cairo mb-1">تم الإلغاء</p>
                      <p className="text-sm text-theme-secondary font-cairo">
                        في {new Date(booking.updatedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'timeline' && (
                <motion.div key="timeline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">الجدول الزمني للحجز</h2>
                  <div className="relative pr-5">
                    {timelineSteps.map((step, i) => {
                      const status = getTimelineStatus(booking, step.key);
                      const Icon = getTimelineIcon(step.key);
                      return (
                        <div key={step.key} className="flex gap-4 relative pb-8 last:pb-0">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                              status === 'done' ? 'bg-emerald-500/15 text-emerald-400' :
                              status === 'current' ? 'bg-theme-gold/15 text-theme-gold animate-pulse' :
                              status === 'skipped' ? 'bg-red-500/15 text-red-400' :
                              'bg-theme-elevated text-theme-muted border border-theme-border'
                            }`}>
                              <Icon className="text-lg" />
                            </div>
                            {i < timelineSteps.length - 1 && (
                              <div className={`w-0.5 flex-1 mt-1 ${
                                status === 'done' ? 'bg-emerald-400/30' :
                                status === 'current' ? 'bg-theme-gold/30' :
                                status === 'skipped' ? 'bg-red-400/30' :
                                'bg-theme-border'
                              }`} />
                            )}
                          </div>
                          <div className="pb-2 pt-1">
                            <p className={`text-sm font-cairo font-medium ${
                              status === 'done' ? 'text-emerald-400' :
                              status === 'current' ? 'text-theme-gold font-bold' :
                              status === 'skipped' ? 'text-red-400' :
                              'text-theme-muted'
                            }`}>{step.label}</p>
                            {status === 'current' && (
                              <p className="text-xs text-theme-muted font-cairo mt-1">المرحلة الحالية</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'cancellation' && (
                <motion.div key="cancellation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">سياسة الإلغاء</h2>

                  <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-6">
                    <p className="text-sm text-theme font-cairo leading-relaxed">
                      يمكنك إلغاء الحجز في أي وقت قبل 24 ساعة من موعد الرحلة لاسترداد كامل المبلغ.
                      في حال الإلغاء خلال أقل من 24 ساعة، يتم استرداد 50% من قيمة الحجز.
                      بعد بدء الرحلة، لا يمكن استرداد المبلغ.
                    </p>
                  </div>

                  {isCancelled ? (
                    <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/15 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-red-500/15 flex items-center justify-center mb-3">
                        <HiX className="text-xl text-red-400" />
                      </div>
                      <p className="text-lg font-bold text-red-400 font-cairo mb-1">تم إلغاء هذا الحجز</p>
                      <p className="text-sm text-theme-secondary font-cairo">
                        في {new Date(booking.updatedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  ) : canCancel ? (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCancelDialog(true)}
                      className="w-full py-3 rounded-xl bg-gradient-to-l from-red-500 to-red-600 text-white font-cairo font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <HiTrash className="text-lg" />
                      إلغاء الحجز
                    </motion.button>
                  ) : (
                    <div className="bg-theme-surface rounded-xl p-4 border border-theme-border text-center">
                      <p className="text-sm text-theme-muted font-cairo">لا يمكن إلغاء هذا الحجز في هذه المرحلة</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showCancelDialog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-theme-card border border-theme-border rounded-2xl p-6 max-w-sm w-full">
              {cancelSuccess ? (
                <div className="text-center py-4">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-4">
                    <HiCheck className="text-3xl text-green-400" />
                  </motion.div>
                  <p className="text-lg font-bold text-green-400 font-cairo mb-1">تم إلغاء الحجز بنجاح</p>
                  <p className="text-sm text-theme-secondary font-cairo">سيتم معالجة المبلغ المسترد وفقاً لسياسة الإلغاء</p>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 mx-auto rounded-full bg-red-500/15 flex items-center justify-center mb-4">
                    <HiTrash className="text-2xl text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold font-playfair text-theme text-center mb-2">تأكيد إلغاء الحجز</h3>
                  <p className="text-sm text-theme-secondary font-cairo text-center mb-6">
                    هل أنت متأكد من إلغاء الحجز <span className="text-theme-gold font-bold font-english">{booking.bookingReference}</span>؟
                    {booking.paymentStatus === 'PAID' && ' سيتم استرداد المبلغ وفقاً لسياسة الإلغاء.'}
                  </p>
                  {cancelError && (
                    <p className="text-sm text-red-400 font-cairo text-center mb-4 bg-red-500/10 rounded-xl p-3">{cancelError}</p>
                  )}
                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => { setShowCancelDialog(false); setCancelError(''); }}
                      disabled={cancelling}
                      className="flex-1 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all disabled:opacity-50">
                      تراجع
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-l from-red-500 to-red-600 text-white font-cairo font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                      {cancelling ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      ) : 'تأكيد الإلغاء'}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

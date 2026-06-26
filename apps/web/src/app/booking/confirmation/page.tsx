'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiCheckCircle, HiLocationMarker, HiCalendar, HiClock,
  HiUser, HiChevronRight, HiStar,
} from 'react-icons/hi';

interface BookingData {
  id: string;
  bookingReference: string;
  status: string;
  bookingDate: string;
  bookingTime: string | null;
  participants: number;
  totalPriceEgp: number;
  discountAmount: number;
  paymentMethod: string | null;
  experience: {
    titleAr: string;
    slug: string;
    images: string[];
    locationCity: string;
  };
  provider: {
    businessNameAr: string;
  };
}

export default function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref) {
      router.replace('/bookings');
      return;
    }

    const fetchBooking = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/bookings');
        if (!res.ok) {
          setError('حدث خطأ أثناء تحميل بيانات الحجز');
          return;
        }
        const data = await res.json();
        const bookings: BookingData[] = data.bookings || [];
        const found = bookings.find(b => b.bookingReference === ref);
        if (!found) {
          setError('لم يتم العثور على الحجز');
          return;
        }
        setBooking(found);
      } catch {
        setError('حدث خطأ أثناء تحميل بيانات الحجز');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [ref, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-theme-gold/20 border-t-theme-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-theme text-lg font-cairo mb-8">{error}</p>
          <Link href="/bookings" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            الذهاب للحجوزات
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const formatTime = (time: string | null) => {
    if (!time) return '';
    const hour = parseInt(time.split(':')[0]);
    const min = time.split(':')[1];
    const period = hour < 12 ? 'صباحاً' : hour === 12 ? 'ظهراً' : 'مساءً';
    return `${time} ${period}`;
  };

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-500/15 text-yellow-400',
    CONFIRMED: 'bg-green-500/15 text-green-400',
    CANCELLED: 'bg-red-500/15 text-red-400',
    COMPLETED: 'bg-blue-500/15 text-blue-400',
    REFUNDED: 'bg-purple-500/15 text-purple-400',
  };

  const statusLabels: Record<string, string> = {
    PENDING: 'قيد الانتظار',
    CONFIRMED: 'مؤكد',
    CANCELLED: 'ملغي',
    COMPLETED: 'مكتمل',
    REFUNDED: 'مسترجع',
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8 text-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-4">
            <HiCheckCircle className="text-4xl text-green-400" />
          </motion.div>
          <h1 className="text-2xl font-bold font-playfair text-theme mb-2">تم تأكيد حجزك بنجاح!</h1>
          <p className="text-theme-secondary font-cairo text-sm mb-1">رقم الحجز</p>
          <p className="text-3xl font-bold text-theme-gold font-english mb-6">{booking.bookingReference}</p>

          <div className="relative rounded-xl overflow-hidden h-44 mb-6">
            {booking.experience.images?.[0] ? (
              <img src={booking.experience.images[0]} alt={booking.experience.titleAr} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-theme-elevated flex items-center justify-center">
                <HiCheckCircle className="text-4xl text-theme-muted" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent" />
            <div className="absolute bottom-3 right-3 text-right">
              <p className="text-xl font-bold text-theme font-cairo">{booking.experience.titleAr}</p>
              <p className="text-sm text-theme-gold font-english">{booking.provider.businessNameAr}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${statusColors[booking.status] || 'bg-theme-elevated text-theme-muted'}`}>
              {statusLabels[booking.status] || booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="bg-theme-surface rounded-xl p-3 border border-theme-border">
              <HiCalendar className="text-theme-gold text-lg mb-1 mx-auto" />
              <p className="text-xs text-theme-muted font-cairo">التاريخ</p>
              <p className="text-sm font-bold text-theme font-cairo">{formatDate(booking.bookingDate)}</p>
            </div>
            <div className="bg-theme-surface rounded-xl p-3 border border-theme-border">
              <HiClock className="text-theme-gold text-lg mb-1 mx-auto" />
              <p className="text-xs text-theme-muted font-cairo">الوقت</p>
              <p className="text-sm font-bold text-theme font-cairo">{formatTime(booking.bookingTime)}</p>
            </div>
            <div className="bg-theme-surface rounded-xl p-3 border border-theme-border">
              <HiUser className="text-theme-gold text-lg mb-1 mx-auto" />
              <p className="text-xs text-theme-muted font-cairo">المسافرون</p>
              <p className="text-sm font-bold text-theme font-cairo">{booking.participants} {booking.participants === 1 ? 'شخص' : 'أشخاص'}</p>
            </div>
            <div className="bg-theme-surface rounded-xl p-3 border border-theme-border">
              <HiLocationMarker className="text-theme-gold text-lg mb-1 mx-auto" />
              <p className="text-xs text-theme-muted font-cairo">الموقع</p>
              <p className="text-sm font-bold text-theme font-cairo">{booking.experience.locationCity}</p>
            </div>
          </div>

          <div className="bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 rounded-xl p-4 border border-theme-gold/20 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-theme font-cairo">إجمالي المبلغ</span>
              <span className="text-2xl font-bold text-theme-gold font-english">EGP {booking.totalPriceEgp.toLocaleString()}</span>
            </div>
            {booking.discountAmount > 0 && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-green-400 font-cairo">الخصم</span>
                <span className="text-xs text-green-400 font-english">{booking.discountAmount.toLocaleString()} EGP</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Link href={`/booking/details?id=${booking.id}`}
              className="flex-1 py-3 rounded-xl border border-theme-gold/30 text-theme-gold text-sm font-cairo font-bold text-center hover:bg-theme-gold/5 transition-all">
              عرض الحجز
            </Link>
            <Link href="/bookings"
              className="flex-1 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 text-sm font-cairo font-bold text-center hover:opacity-90 transition-all">
              الذهاب للحجوزات
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

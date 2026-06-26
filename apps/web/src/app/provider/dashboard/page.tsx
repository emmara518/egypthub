'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';

interface ProviderProfile {
  id: string;
  businessNameAr: string;
  businessNameEn: string | null;
  category: string | null;
  averageRating: number;
  totalReviews: number;
  isVerified: boolean;
  isActive: boolean;
  images: string[];
  _count: {
    experiences: number;
    bookings: number;
  };
  experiences: ProviderExperience[];
  bookings: ProviderBooking[];
}

interface ProviderExperience {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string | null;
  priceEgp: number;
  category: string;
  isActive: boolean;
  averageRating: number;
  totalReviews: number;
  images: string[];
  createdAt: string;
}

interface ProviderBooking {
  id: string;
  bookingReference: string;
  user: { name: string };
  experience: { titleAr: string };
  bookingDate: string;
  totalPriceEgp: number;
  status: string;
  paymentStatus: string;
  participants: number;
  createdAt: string;
}

type MenuItem = 'dashboard' | 'experiences' | 'bookings' | 'settings';

const menuItems: { id: MenuItem; label: string }[] = [
  { id: 'dashboard', label: 'لوحة التحكم' },
  { id: 'experiences', label: 'التجارب' },
  { id: 'bookings', label: 'الحجوزات' },
  { id: 'settings', label: 'الإعدادات' },
];

const statusColors: Record<string, string> = {
  CONFIRMED: 'bg-[#10B981]/15 text-[#10B981]',
  PENDING: 'bg-[#D4A24C]/15 text-theme-gold',
  CANCELLED: 'bg-[#EF4444]/15 text-[#EF4444]',
  COMPLETED: 'bg-[#3B82F6]/15 text-[#3B82F6]',
};

const statusLabels: Record<string, string> = {
  CONFIRMED: 'مؤكد',
  PENDING: 'قيد الانتظار',
  CANCELLED: 'ملغي',
  COMPLETED: 'مكتمل',
};

function Spinner() {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-theme-gold border-t-transparent rounded-full" />
    </div>
  );
}

function StatCard({ value, label, icon }: { value: string | number; label: string; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-theme-bg rounded-2xl border border-theme-border p-5 hover:border-theme-gold/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#D4A24C]/10 flex items-center justify-center text-theme-gold">
          {icon}
        </div>
      </div>
      <p className="text-2xl lg:text-3xl font-bold font-english text-white">{value}</p>
      <p className="text-xs text-theme-secondary mt-1">{label}</p>
    </motion.div>
  );
}

export default function ProviderDashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading, checkAuth } = useAuthStore();
  const [profile, setProfile] = useState<ProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/provider/profile');
        if (res.status === 404) {
          setProfile(null);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error('فشل تحميل بيانات الملف الشخصي');
        const json = await res.json();
        setProfile(json.data || json);
      } catch (err: any) {
        setError(err.message || 'حدث خطأ');
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, isAuthenticated]);

  const toggleStatus = async (id: string, current: boolean) => {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/provider/experiences/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      if (!res.ok) throw new Error('فشل التحديث');
      setProfile((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          experiences: prev.experiences.map((e) =>
            e.id === id ? { ...e, isActive: !current } : e
          ),
        };
      });
    } catch {
      // silently fail
    } finally {
      setTogglingId(null);
    }
  };

  if (authLoading || loading) return <Spinner />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair font-bold text-theme mb-4">يرجى تسجيل الدخول</h1>
          <Link href="/auth/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-theme-gold/10 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h1 className="text-2xl font-playfair font-bold text-theme mb-3">ليس لديك ملف مقدم خدمة</h1>
          <p className="text-theme-secondary font-cairo mb-8">قم بإنشاء ملف مقدم خدمة جديد للبدء في عرض تجاربك</p>
          <Link href="/provider/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90">
            إنشاء ملف مقدم خدمة
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  const totalExperiences = profile._count?.experiences ?? profile.experiences?.length ?? 0;
  const totalBookings = profile._count?.bookings ?? profile.bookings?.length ?? 0;

  return (
    <div className="min-h-screen bg-theme-bg text-white font-cairo">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 bg-theme-bg border-l border-theme-border sticky top-0 h-screen overflow-y-auto">
          <div className="p-5 border-b border-theme-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                  <div className="w-full h-full rounded-full bg-theme-bg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
                {profile.isVerified && (
                  <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 rounded-full bg-[#10B981] border-2 border-[#0C1120] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{profile.businessNameAr}</p>
                {profile.category && (
                  <p className="text-[10px] text-theme-gold font-cairo">{profile.category}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(profile.averageRating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="text-[10px] text-theme-gold font-english">{profile.averageRating.toFixed(1)}</span>
            </div>
          </div>

          <nav className="flex-1 p-3">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#D4A24C]/10 text-theme-gold font-medium border border-theme-gold/20'
                      : 'text-theme-secondary hover:text-white hover:bg-[#1A2235]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div layoutId="activeIndicator" className="mr-auto w-1.5 h-1.5 rounded-full bg-[#D4A24C]" />
                  )}
                </motion.button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-theme-border">
            <Link href="/providers" className="flex items-center gap-2 text-[10px] text-theme-muted hover:text-theme-gold transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>العودة للسوق</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-8">
          <div className="px-6 pt-6 lg:pt-8 pb-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl lg:text-3xl font-bold">
                مرحباً <span className="text-theme-gold">{profile.businessNameAr}</span>
              </h1>
              <p className="text-sm text-theme-secondary mt-1">
                {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>
          </div>

          <div className="px-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard value={totalExperiences} label="إجمالي التجارب" icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              } />
              <StatCard value={totalBookings} label="إجمالي الحجوزات" icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              } />
              <StatCard value={profile.averageRating.toFixed(1)} label="التقييم" icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              } />
              <StatCard value={profile.totalReviews} label="التقييمات" icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              } />
            </div>

            {/* My Experiences */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">التجارب</h2>
                <Link
                  href="/provider/experiences/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4A24C] text-dark-900 text-sm font-bold transition-all hover:bg-[#D4A24C]/90"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  إضافة تجربة جديدة
                </Link>
              </div>

              {profile.experiences && profile.experiences.length > 0 ? (
                <div className="space-y-3">
                  {profile.experiences.map((exp, i) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[#0F1420] border border-theme-border hover:border-theme-gold/20 transition-all"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-theme-gold/10 to-[#0F1420]">
                        {exp.images?.[0] ? (
                          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${exp.images[0]})` }} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center opacity-30">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{exp.titleAr}</p>
                        <p className="text-theme-gold text-sm font-english mt-0.5">{exp.priceEgp.toLocaleString()} ج.م</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStatus(exp.id, exp.isActive)}
                          disabled={togglingId === exp.id}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                            exp.isActive
                              ? 'bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25'
                              : 'bg-[#EF4444]/15 text-[#EF4444] hover:bg-[#EF4444]/25'
                          }`}
                        >
                          {togglingId === exp.id ? '...' : exp.isActive ? 'نشط' : 'غير نشط'}
                        </button>
                        <Link
                          href={`/provider/experiences/${exp.id}/edit`}
                          className="px-3 py-1.5 rounded-lg bg-[#D4A24C]/10 text-theme-gold text-[10px] font-bold hover:bg-[#D4A24C]/20 transition-all"
                        >
                          تعديل
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-theme-border bg-theme-bg">
                  <p className="text-theme-secondary text-sm font-cairo mb-4">لا توجد تجارب بعد</p>
                  <Link href="/provider/experiences/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4A24C] text-dark-900 text-sm font-bold transition-all hover:bg-[#D4A24C]/90">
                    إضافة تجربة جديدة
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Bookings */}
            <div>
              <h2 className="text-lg font-bold mb-5">الحجوزات الأخيرة</h2>
              {profile.bookings && profile.bookings.length > 0 ? (
                <div className="space-y-3">
                  {profile.bookings.slice(0, 10).map((booking, i) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[#0F1420] border border-theme-border hover:border-theme-gold/20 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{booking.experience?.titleAr || booking.bookingReference}</p>
                        <p className="text-[11px] text-theme-muted mt-1">
                          {booking.user?.name} • {new Date(booking.bookingDate).toLocaleDateString('ar-EG')}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold font-english text-theme-gold">{booking.totalPriceEgp.toLocaleString()} ج.م</p>
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold mt-1 ${statusColors[booking.status] || 'bg-[#5A6478]/15 text-theme-muted'}`}>
                          {statusLabels[booking.status] || booking.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-theme-border bg-theme-bg">
                  <p className="text-theme-secondary text-sm font-cairo">لا توجد حجوزات بعد</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-theme-bg/95 backdrop-blur-lg border-t border-theme-border">
        <div className="flex items-center justify-around px-2 py-2">
          {menuItems.slice(0, 4).map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveMenu(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${isActive ? 'text-theme-gold' : 'text-theme-muted'}`}
              >
                <span className="text-[9px]">{item.label}</span>
                {isActive && <motion.div layoutId="mobileIndicator" className="w-1 h-1 rounded-full bg-[#D4A24C]" />}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface FounderData {
  summary: {
    totalUsers: number;
    totalBookings: number;
    totalProviders: number;
    totalExperiences: number;
    totalReviews: number;
    totalStories: number;
    totalRevenueEgp: number;
    activeNotifications: number;
    totalEvents: number;
  };
  today: {
    bookings: number;
    users: number;
    revenueEgp: number;
  };
  bookings: {
    byStatus: { status: string; count: number }[];
    byPaymentStatus: { status: string; count: number }[];
    successRate: number;
    recent: {
      id: string; reference: string; user: string; experience: string;
      status: string; paymentStatus: string; totalEgp: number; createdAt: string;
    }[];
  };
  users: {
    total: number;
    distribution: { role: string; count: number }[];
    recent: { id: string; name: string; email: string; role: string; createdAt: string }[];
  };
  apiHealth: {
    endpoints: { name: string; status: string; responseTimeMs: number; error?: string }[];
    healthyCount: number;
    totalCount: number;
    avgResponseTimeMs: number;
    overallStatus: string;
  };
  events: {
    total: number;
    recentErrors: { event: string; page?: string; userId?: string; timestamp: string }[];
    recent: { event: string; page?: string; userId?: string; timestamp: string }[];
  };
  timestamp: string;
}

const STATUS_COLORS: Record<string, string> = {
  healthy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  degraded: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  critical: 'text-red-400 bg-red-500/10 border-red-500/30',
  down: 'text-red-400 bg-red-500/10 border-red-500/30',
};

const BOOKING_STATUS: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'معلق', color: 'text-amber-400 bg-amber-500/10' },
  CONFIRMED: { label: 'مؤكد', color: 'text-emerald-400 bg-emerald-500/10' },
  CANCELLED: { label: 'ملغي', color: 'text-red-400 bg-red-500/10' },
  COMPLETED: { label: 'مكتمل', color: 'text-blue-400 bg-blue-500/10' },
  REFUNDED: { label: 'مسترجع', color: 'text-purple-400 bg-purple-500/10' },
};

const PAYMENT_STATUS: Record<string, { label: string; color: string }> = {
  UNPAID: { label: 'غير مدفوع', color: 'text-amber-400 bg-amber-500/10' },
  PAID: { label: 'مدفوع', color: 'text-emerald-400 bg-emerald-500/10' },
  REFUNDED: { label: 'مسترجع', color: 'text-purple-400 bg-purple-500/10' },
  PARTIALLY_REFUNDED: { label: 'مسترجع جزئياً', color: 'text-orange-400 bg-orange-500/10' },
};

const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'أدمن', TRAVELER: 'مسافر', TOURIST: 'سائح',
  PROVIDER: 'مزود خدمة', PARTNER: 'شريك', AMBASSADOR: 'سفير', GUIDE: 'مرشد',
};

function StatCard({ label, value, sub, icon, color }: { label: string; value: string | number; sub?: string; icon: string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border ${color} bg-theme-card p-5`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl md:text-3xl font-bold font-playfair text-theme mb-1">{typeof value === 'number' ? value.toLocaleString('ar-EG') : value}</p>
      <p className="text-xs text-theme-muted font-cairo">{label}</p>
      {sub && <p className="text-[10px] text-theme-muted/60 font-cairo mt-1">{sub}</p>}
    </motion.div>
  );
}

function HealthBadge({ status }: { status: string }) {
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${STATUS_COLORS[status] || 'text-theme-muted bg-theme-surface border-theme-border'}`}>
      {status === 'healthy' ? 'سليم' : status === 'degraded' ? 'متأثر' : status === 'critical' ? 'حرج' : 'معطل'}
    </span>
  );
}

export default function FounderDashboardPage() {
  const [data, setData] = useState<FounderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch('/api/founder/dashboard');
      if (res.status === 401 || res.status === 403) {
        setError('Unauthorized — Admin access required');
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-theme-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-theme-muted font-cairo text-sm">جاري تحميل لوحة المؤسسين...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <p className="text-theme font-cairo mb-2">حدث خطأ</p>
          <p className="text-theme-muted text-sm font-cairo mb-4">{error}</p>
          <button onClick={fetchDashboard} className="px-6 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:opacity-90 transition-opacity">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const overallHealth = data.apiHealth.overallStatus;
  const healthLabel = overallHealth === 'healthy' ? 'صحية' : overallHealth === 'degraded' ? 'متأثرة' : 'حرجة';
  const healthColor = overallHealth === 'healthy' ? 'text-emerald-400' : overallHealth === 'degraded' ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme mb-1">لوحة المؤسسين</h1>
              <p className="text-theme-muted font-cairo text-sm">Founder Dashboard — مراقبة المنصة في الوقت الفعلي</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-theme-surface border border-theme-border">
                <div className={`w-2 h-2 rounded-full ${healthColor} bg-current`} />
                <span className={`text-xs font-bold font-cairo ${healthColor}`}>{healthLabel}</span>
              </div>
              {lastRefresh && (
                <span className="text-[10px] text-theme-muted font-cairo">
                  {lastRefresh.toLocaleTimeString('ar-EG')}
                </span>
              )}
              <button onClick={fetchDashboard} className="px-4 py-2 rounded-xl bg-theme-gold/10 text-theme-gold border border-theme-gold/20 text-xs font-bold font-cairo hover:bg-theme-gold/20 transition-all">
                تحديث
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          <StatCard label="إجمالي المستخدمين" value={data.summary.totalUsers} sub={`+${data.today.users} اليوم`} icon="👥" color="from-blue-500/20 to-blue-600/10 border-blue-500/30" />
          <StatCard label="إجمالي الحجوزات" value={data.summary.totalBookings} sub={`+${data.today.bookings} اليوم`} icon="📋" color="from-emerald-500/20 to-emerald-600/10 border-emerald-500/30" />
          <StatCard label="مزودي الخدمة" value={data.summary.totalProviders} icon="🏪" color="from-amber-500/20 to-amber-600/10 border-amber-500/30" />
          <StatCard label="التجارب" value={data.summary.totalExperiences} icon="🎯" color="from-purple-500/20 to-purple-600/10 border-purple-500/30" />
          <StatCard label="الإيرادات" value={`${data.summary.totalRevenueEgp.toLocaleString('ar-EG')} ج.م`} sub={`+${data.today.revenueEgp.toLocaleString('ar-EG')} ج.م اليوم`} icon="💰" color="from-green-500/20 to-green-600/10 border-green-500/30" />
          <StatCard label="نسبة نجاح" value={`${data.bookings.successRate}%`} icon="📈" color="from-cyan-500/20 to-cyan-600/10 border-cyan-500/30" />
          <StatCard label="مدة الاستجابة" value={`${data.apiHealth.avgResponseTimeMs}ms`} icon="⚡" color="from-rose-500/20 to-rose-600/10 border-rose-500/30" />
          <StatCard label="صحة الـ APIs" value={`${data.apiHealth.healthyCount}/${data.apiHealth.totalCount}`} icon="🟢" color="from-teal-500/20 to-teal-600/10 border-teal-500/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* API Health */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-1 rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="text-sm font-bold font-cairo text-theme mb-4">صحة الـ APIs</h2>
            <div className="space-y-2">
              {data.apiHealth.endpoints.map((ep, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-theme-surface border border-theme-border">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ep.status === 'healthy' ? 'bg-emerald-400' : ep.status === 'degraded' ? 'bg-amber-400' : 'bg-red-400'}`} />
                    <span className="text-xs text-theme font-cairo truncate">{ep.name}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-mono ${ep.responseTimeMs > 1000 ? 'text-red-400' : ep.responseTimeMs > 500 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {ep.responseTimeMs}ms
                    </span>
                    <HealthBadge status={ep.status} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Bookings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold font-cairo text-theme">آخر الحجوزات</h2>
              <span className="text-[10px] text-theme-muted font-cairo">{data.bookings.recent.length} حجز</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-theme-border">
                    <th className="pb-2 text-[10px] text-theme-muted font-cairo font-medium px-2">المرجع</th>
                    <th className="pb-2 text-[10px] text-theme-muted font-cairo font-medium px-2">المستخدم</th>
                    <th className="pb-2 text-[10px] text-theme-muted font-cairo font-medium px-2">التجربة</th>
                    <th className="pb-2 text-[10px] text-theme-muted font-cairo font-medium px-2">الحالة</th>
                    <th className="pb-2 text-[10px] text-theme-muted font-cairo font-medium px-2">الدفع</th>
                    <th className="pb-2 text-[10px] text-theme-muted font-cairo font-medium px-2">المبلغ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bookings.recent.map((b) => (
                    <tr key={b.id} className="border-b border-theme-border/50 hover:bg-theme-surface/50 transition-colors">
                      <td className="py-2.5 px-2 text-xs text-theme-gold font-mono">{b.reference}</td>
                      <td className="py-2.5 px-2 text-xs text-theme font-cairo">{b.user}</td>
                      <td className="py-2.5 px-2 text-xs text-theme font-cairo truncate max-w-[120px]">{b.experience}</td>
                      <td className="py-2.5 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${BOOKING_STATUS[b.status]?.color || 'text-theme-muted bg-theme-surface'}`}>
                          {BOOKING_STATUS[b.status]?.label || b.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${PAYMENT_STATUS[b.paymentStatus]?.color || 'text-theme-muted bg-theme-surface'}`}>
                          {PAYMENT_STATUS[b.paymentStatus]?.label || b.paymentStatus}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-xs text-theme font-cairo">{b.totalEgp.toLocaleString('ar-EG')} ج.م</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Booking Status Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="text-sm font-bold font-cairo text-theme mb-4">حالة الحجوزات</h2>
            <div className="space-y-3">
              {data.bookings.byStatus.map((s) => {
                const total = data.bookings.byStatus.reduce((a, b) => a + b.count, 0);
                const pct = total > 0 ? Math.round((s.count / total) * 100) : 0;
                const info = BOOKING_STATUS[s.status] || { label: s.status, color: 'text-theme-muted bg-theme-surface' };
                return (
                  <div key={s.status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold font-cairo ${info.color.split(' ')[0]}`}>{info.label}</span>
                      <span className="text-xs text-theme-muted font-cairo">{s.count} ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-theme-surface overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${info.color.split(' ')[1]?.replace('bg-', 'bg-') || 'bg-theme-gold'}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* User Distribution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="text-sm font-bold font-cairo text-theme mb-4">توزيع المستخدمين</h2>
            <div className="space-y-3">
              {data.users.distribution.map((r) => {
                const total = data.users.distribution.reduce((a, b) => a + b.count, 0);
                const pct = total > 0 ? Math.round((r.count / total) * 100) : 0;
                const colors = ['from-blue-500 to-blue-600', 'from-emerald-500 to-emerald-600', 'from-amber-500 to-amber-600', 'from-purple-500 to-purple-600', 'from-rose-500 to-rose-600', 'from-cyan-500 to-cyan-600', 'from-orange-500 to-orange-600'];
                const ci = data.users.distribution.indexOf(r) % colors.length;
                return (
                  <div key={r.role}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-theme font-cairo">{ROLE_LABELS[r.role] || r.role}</span>
                      <span className="text-xs text-theme-muted font-cairo">{r.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-theme-surface overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-l ${colors[ci]}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Recent Users + Latest Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="text-sm font-bold font-cairo text-theme mb-4">آخر المستخدمين</h2>
            <div className="space-y-2">
              {data.users.recent.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-2.5 rounded-xl bg-theme-surface border border-theme-border">
                  <div>
                    <p className="text-xs text-theme font-cairo font-medium">{u.name}</p>
                    <p className="text-[10px] text-theme-muted font-cairo">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-theme-gold/10 text-theme-gold">
                      {ROLE_LABELS[u.role] || u.role}
                    </span>
                    <span className="text-[10px] text-theme-muted font-cairo">
                      {new Date(u.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <h2 className="text-sm font-bold font-cairo text-theme mb-4">آخر الأحداث</h2>
            <div className="space-y-2">
              {data.events.recent.map((e, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-theme-surface border border-theme-border">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${e.event.toLowerCase().includes('error') ? 'bg-red-400' : 'bg-emerald-400'}`} />
                    <span className="text-xs text-theme font-cairo truncate">{e.event}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {e.page && <span className="text-[10px] text-theme-muted font-mono">{e.page}</span>}
                    <span className="text-[10px] text-theme-muted font-cairo">
                      {new Date(e.timestamp).toLocaleTimeString('ar-EG')}
                    </span>
                  </div>
                </div>
              ))}
              {data.events.recent.length === 0 && (
                <p className="text-xs text-theme-muted font-cairo text-center py-4">لا توجد أحداث بعد</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer Timestamp */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-theme-muted/40 font-cairo">
            آخر تحديث: {new Date(data.timestamp).toLocaleString('ar-EG')} — التحديث التلقائي كل ٣٠ ثانية
          </p>
        </div>
      </div>
    </div>
  );
}

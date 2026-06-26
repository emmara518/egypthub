'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const FUNNEL_STEPS = ['Home', 'Search', 'View', 'Book', 'Confirm'];
const STEP_LABELS: Record<string, string> = {
  Home: 'الرئيسية', Search: 'بحث', View: 'عرض', Book: 'حجز', Confirm: 'تأكيد',
};

export default function AnalyticsPage() {
  const funnelEvents = useAppStore((s) => s.funnelEvents);

  const funnelData = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const step of FUNNEL_STEPS) {
      counts[step] = funnelEvents.filter((e) => e.name === step).length;
    }
    const total = counts[FUNNEL_STEPS[0]] || 1;
    const steps = FUNNEL_STEPS.map((name, i) => {
      const count = counts[name] || 0;
      const dropOff = i > 0 ? ((1 - count / (counts[FUNNEL_STEPS[i - 1]] || 1)) * 100).toFixed(1) : '0';
      return { name, label: STEP_LABELS[name], count, percentage: ((count / total) * 100).toFixed(1), dropOff };
    });
    return steps;
  }, [funnelEvents]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, number> = {};
    for (const ev of funnelEvents) {
      const date = new Date(ev.timestamp).toLocaleDateString('ar-EG');
      groups[date] = (groups[date] || 0) + 1;
    }
    return Object.entries(groups).slice(-7);
  }, [funnelEvents]);

  const maxFunnel = Math.max(...funnelData.map((s) => s.count), 1);
  const maxDate = Math.max(...groupedByDate.map(([, c]) => c), 1);

  const timelineData = useMemo(() => {
    return funnelEvents.slice(-50).map((e) => ({
      time: new Date(e.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      name: e.name,
      page: e.page,
    }));
  }, [funnelEvents]);

  const cardClass = "bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5";

  return (
    <div className="min-h-screen bg-theme-bg pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-cairo mb-2">تحليلات المسار</h1>
          <p className="text-sm text-white/60 font-cairo">تتبع رحلة المستخدم من البداية للحجز</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cardClass}>
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-4">مسار التحويل</h2>
            <div className="space-y-3">
              {funnelData.map((step, i) => (
                <div key={step.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white font-cairo">{step.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/70 font-english">{step.count}</span>
                      <span className="text-[10px] text-white/40 font-english">{step.percentage}%</span>
                      {i > 0 && (
                        <span className={`text-[10px] ${Number(step.dropOff) > 30 ? 'text-red-400' : 'text-yellow-400'} font-cairo`}>
                          -{step.dropOff}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(step.count / maxFunnel) * 100}%` }}
                      className={`h-full rounded-full ${i === funnelData.length - 1 ? 'bg-green-400' : 'bg-theme-gold'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClass}>
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-4">النشاط اليومي</h2>
            <div className="flex items-end gap-2 h-32">
              {groupedByDate.map(([date, count], i) => (
                <div key={date} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(count / maxDate) * 100}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-theme-gold/40 to-theme-gold"
                    style={{ minHeight: 4 }}
                  />
                  <span className="text-[8px] text-white/40 font-cairo truncate w-full text-center">{date.slice(0, 5)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardClass}>
          <h2 className="text-sm font-bold text-theme-gold font-cairo mb-4">الجدول الزمني للجلسة</h2>
          {timelineData.length === 0 ? (
            <p className="text-sm text-white/40 font-cairo text-center py-4">لا توجد أحداث بعد</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {timelineData.map((ev, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
                  <span className="text-[10px] text-theme-gold w-14 font-english">{ev.time}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-cairo ${
                    ev.name === 'Confirm' ? 'bg-green-500/20 text-green-400' :
                    ev.name === 'Book' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-white/10 text-white/80'
                  }`}>{STEP_LABELS[ev.name] || ev.name}</span>
                  <span className="text-[10px] text-white/40 font-cairo truncate">{ev.page}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4 text-center">
          <p className="text-[10px] text-white/30 font-cairo">إجمالي الأحداث المسجلة: {funnelEvents.length}</p>
        </motion.div>
      </div>
    </div>
  );
}

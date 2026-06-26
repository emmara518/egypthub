'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiChartBar, HiUsers, HiCash, HiEye, HiGlobe, HiDatabase,
  HiShieldCheck, HiTrendingUp, HiDocumentReport, HiServer,
  HiCheckCircle, HiExclamation, HiCog, HiSearch, HiBell,
  HiAdjustments, HiLightningBolt, HiCloudUpload, HiClock, HiUser,
} from 'react-icons/hi';

/* ───── Data ───── */
const globalKpis = [
  { label: 'إجمالي الإيرادات', value: 'EGP 145.2M', change: '+24%', changeType: 'positive', icon: HiCash },
  { label: 'الحجوزات النشطة', value: '12,450', change: '+18%', changeType: 'positive', icon: HiGlobe },
  { label: 'الشركاء المسجلين', value: '8,234', change: '+5%', changeType: 'positive', icon: HiUsers },
  { label: 'معدل التحويل', value: '4.8%', change: '-2%', changeType: 'negative', icon: HiTrendingUp },
];

const systemHealth = [
  { service: 'قاعدة البيانات الرئيسة', status: 'مستقر', uptime: '99.99%', ping: '45ms', load: '42%' },
  { service: 'خوادم API', status: 'مستقر', uptime: '99.98%', ping: '32ms', load: '65%' },
  { service: 'نظام الدفع', status: 'تحذير', uptime: '99.95%', ping: '120ms', load: '88%' },
  { service: 'خدمات AI (زينب)', status: 'مستقر', uptime: '99.99%', ping: '15ms', load: '25%' },
];

const recentAuditLogs = [
  { action: 'تغيير صلاحيات النظام', user: 'admin_ahmed', ip: '192.168.1.1', time: '10:45 ص', level: 'critical' },
  { action: 'تصدير تقرير مالي', user: 'fin_sara', ip: '192.168.1.5', time: '09:30 ص', level: 'info' },
  { action: 'تحديث بيانات بنكية', user: 'partner_452', ip: '45.32.1.8', time: '08:15 ص', level: 'warning' },
];

const regionalData = [
  { region: 'القاهرة والجيزة', revenue: 'EGP 65M', bookings: '45%' },
  { region: 'البحر الأحمر', revenue: 'EGP 42M', bookings: '30%' },
  { region: 'الأقصر وأسوان', revenue: 'EGP 28M', bookings: '15%' },
  { region: 'الساحل ومطروح', revenue: 'EGP 10M', bookings: '10%' },
];

const sidebarItems = [
  { icon: HiChartBar, label: 'النظرة العامة' },
  { icon: HiGlobe, label: 'الأداء الإقليمي' },
  { icon: HiDatabase, label: 'البيانات والتقارير' },
  { icon: HiShieldCheck, label: 'الأمان والتدقيق' },
  { icon: HiServer, label: 'حالة النظام' },
  { icon: HiUsers, label: 'إدارة المستخدمين' },
  { icon: HiCog, label: 'إعدادات المنصة' },
];

/* ───── Component ───── */
export default function Screen8_SuperAdminDashboard() {
  const [activeSidebar, setActiveSidebar] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-arabic">
      <div className="flex h-screen overflow-hidden">
        {/* ─── Sidebar ─── */}
        <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          className="w-64 shrink-0 bg-[#0F1420] border-l border-[#1E2A3D] p-4 flex flex-col h-full overflow-y-auto">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
              <span className="text-[#0A0E17] font-bold text-lg">م</span>
            </div>
            <div>
              <p className="font-bold font-english text-sm">EGYPTHUB</p>
              <p className="text-[10px] text-theme-gold font-bold">الإدارة العليا (Super Admin)</p>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item, i) => (
              <button key={i} onClick={() => setActiveSidebar(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  activeSidebar === i ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'text-[#8B95A5] hover:text-white hover:bg-[#1A2235]'
                }`}>
                <item.icon className="text-lg" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* System Status Mini Indicator */}
          <div className="mt-6 p-4 rounded-2xl bg-[#141B2D] border border-[#1E2A3D]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[10px] text-[#8B95A5]">حالة النظام</p>
            </div>
            <p className="text-sm font-bold text-green-400 font-english mb-1">99.98% Uptime</p>
            <p className="text-[9px] text-[#5A6478]">جميع الأنظمة تعمل بكفاءة</p>
          </div>
        </motion.aside>

        {/* ─── Main Content ─── */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Header */}
          <header className="h-16 border-b border-[#1E2A3D] bg-[#0F1420] flex items-center justify-between px-6 shrink-0">
            <div>
              <h2 className="text-sm font-bold">النظرة العامة العالمية</h2>
              <p className="text-[10px] text-[#8B95A5]">آخر تحديث: منذ دقيقتين</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478]" />
                <input placeholder="بحث في النظام..." className="bg-[#141B2D] border border-[#1E2A3D] rounded-lg pr-9 pl-4 py-1.5 text-xs w-64 outline-none focus:border-theme-gold/40" />
              </div>
              <button className="relative w-8 h-8 rounded-full bg-[#141B2D] border border-[#1E2A3D] flex items-center justify-center text-[#8B95A5] hover:text-theme-gold transition-colors">
                <HiBell />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
              </button>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* 01 - KPIs */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english font-bold px-2 py-1 rounded-md bg-theme-gold/10 text-theme-gold">01</span>
                <h3 className="font-bold text-sm">نظرة عامة على المؤشرات</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
              {globalKpis.map((kpi, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1A2235] flex items-center justify-center">
                      <kpi.icon className="text-theme-gold text-xl" />
                    </div>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold font-english ${
                      kpi.changeType === 'positive' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold font-english mb-1">{kpi.value}</p>
                  <p className="text-xs text-[#8B95A5]">{kpi.label}</p>
                </motion.div>
              ))}
            </div>
            </div>

            {/* 02 - Financial & Regional */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english font-bold px-2 py-1 rounded-md bg-theme-gold/10 text-theme-gold">02</span>
                <h3 className="font-bold text-sm">التحليلات المالية والأداء الإقليمي</h3>
              </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Financial Chart Area */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="xl:col-span-2 bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-sm">التدفق المالي والأرباح</h3>
                    <p className="text-[10px] text-[#5A6478]">مقارنة الإيرادات بالمصروفات للعام الحالي</p>
                  </div>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1A2235] text-xs text-[#8B95A5]">
                    <span>2024</span>
                    <HiAdjustments className="text-sm" />
                  </button>
                </div>
                {/* Simulated Complex Chart */}
                <div className="flex-1 relative min-h-[250px] border-b border-l border-[#1E2A3D] pb-2 pl-2">
                  <div className="absolute inset-0 flex flex-col justify-between pt-2">
                    {[100, 75, 50, 25, 0].map(v => (
                      <div key={v} className="border-t border-[#1E2A3D]/50 w-full relative">
                        <span className="absolute -left-6 -top-2 text-[8px] text-[#5A6478] font-english">{v}M</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-end justify-between px-4 pb-0 z-10">
                    {/* Bars */}
                    {[45, 60, 35, 75, 55, 90, 85, 110, 95, 120, 105, 130].map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 group">
                        <div className="flex items-end gap-1">
                          <motion.div initial={{ height: 0 }} animate={{ height: `${h * 0.7}%` }} transition={{ duration: 1, delay: i * 0.05 }}
                            className="w-3 rounded-t-sm bg-theme-gold" />
                          <motion.div initial={{ height: 0 }} animate={{ height: `${h * 0.4}%` }} transition={{ duration: 1, delay: i * 0.05 + 0.2 }}
                            className="w-3 rounded-t-sm bg-accent-orange" />
                        </div>
                        <span className="text-[8px] text-[#5A6478] font-english mt-2 group-hover:text-white transition-colors">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-theme-gold" /><span className="text-xs text-[#8B95A5]">الإيرادات</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accent-orange" /><span className="text-xs text-[#8B95A5]">الأرباح الصافية</span></div>
                </div>
              </motion.div>

              {/* Regional Performance */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
                <h3 className="font-bold text-sm mb-1">الأداء الإقليمي</h3>
                <p className="text-[10px] text-[#5A6478] mb-6">توزيع الحجوزات والإيرادات حسب المنطقة</p>
                <div className="space-y-4">
                  {regionalData.map((r, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold">{r.region}</span>
                        <span className="text-xs text-theme-gold font-english font-bold">{r.revenue}</span>
                      </div>
                      <div className="h-2 w-full bg-[#1A2235] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: r.bookings }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="h-full bg-gradient-to-l from-theme-gold to-accent-orange rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 relative h-32 rounded-xl overflow-hidden border border-[#1E2A3D] flex items-center justify-center bg-[#0F1420]">
                  <HiGlobe className="text-[100px] text-[#1A2235] absolute" />
                  <div className="relative z-10 text-center">
                    <p className="text-2xl font-bold font-english text-theme-gold">4</p>
                    <p className="text-[10px] text-[#8B95A5]">مناطق نشطة رئيسية</p>
                  </div>
                </div>
              </motion.div>
            </div>
            </div>

            {/* 03 - System Health & Audit */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english font-bold px-2 py-1 rounded-md bg-theme-gold/10 text-theme-gold">03</span>
                <h3 className="font-bold text-sm">صحة الأنظمة والبنية التحتية</h3>
              </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Health */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-sm">صحة الأنظمة والبنية التحتية</h3>
                  <button className="text-[10px] text-theme-gold hover:underline">عرض التفاصيل التقنية</button>
                </div>
                <div className="space-y-3">
                  {systemHealth.map((sys, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <HiServer className="text-[#8B95A5]" />
                          <span className="text-xs font-medium">{sys.service}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                          sys.status === 'مستقر' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>{sys.status}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center"><p className="text-[10px] text-[#5A6478] mb-0.5 font-english">Uptime</p><p className="text-xs font-bold font-english">{sys.uptime}</p></div>
                        <div className="text-center"><p className="text-[10px] text-[#5A6478] mb-0.5 font-english">Ping</p><p className="text-xs font-bold font-english">{sys.ping}</p></div>
                        <div className="text-center"><p className="text-[10px] text-[#5A6478] mb-0.5 font-english">Load</p><p className="text-xs font-bold font-english">{sys.load}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Security & Audit Logs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-sm">سجل التدقيق الأمني (Audit Logs)</h3>
                  <button className="text-[10px] text-theme-gold hover:underline">تصدير السجل</button>
                </div>
                <div className="space-y-3">
                  {recentAuditLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        log.level === 'critical' ? 'bg-red-500/10 text-red-400' :
                        log.level === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {log.level === 'critical' ? <HiExclamation /> : log.level === 'warning' ? <HiLightningBolt /> : <HiShieldCheck />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium mb-1">{log.action}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-[#5A6478] font-english">
                          <span className="flex items-center gap-1"><HiUser /> {log.user}</span>
                          <span className="flex items-center gap-1"><HiGlobe /> {log.ip}</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-[#5A6478] shrink-0 whitespace-nowrap">{log.time}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 rounded-xl border border-[#1E2A3D] text-xs text-[#8B95A5] hover:text-white hover:bg-[#1A2235] transition-colors">
                  عرض جميع السجلات
                </button>
              </motion.div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

const VISA_TYPES = [
  { name: 'سياحية', desc: 'للسفر والاستكشاف والترفيه', period: 'صالحة لمدة 30 يوم', price: '25 دولار', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'تجارية', desc: 'لأعمال الشركات والاجتماعات', period: 'صالحة لمدة 90 يوم', price: '60 دولار', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'عبور (ترانزيت)', desc: 'للمسافرين عبر مطارات مصر', period: 'صالحة لمدة 72 ساعة', price: '15 دولار', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
];

const REQUIREMENTS = [
  'جواز سفر ساري المفعول لمدة 6 أشهر على الأقل',
  'صور شخصية حديثة (4 × 6 سم)',
  'نموذج طلب التأشيرة مكتمل',
  'حجز فندق مؤكد',
  'تذكرة طيران ذهاب وعودة',
  'إثبات القدرة المالية',
  'تأمين صحي للسفر',
];

const STEPS = [
  'تعبئة نموذج الطلب إلكترونياً',
  'دفع رسوم التأشيرة',
  'تقديم المستندات المطلوبة',
  'مقابلة شخصية في السفارة (إن لزم)',
  'انتظار المعالجة (5-7 أيام عمل)',
  'استلام جواز السفر مع التأشيرة',
];

const FEES = [
  { type: 'دخول واحد (سياحة)', amount: '25 دولار', time: '30 يوم' },
  { type: 'دخول متعدد (سياحة)', amount: '60 دولار', time: '90 يوم' },
  { type: 'دخول واحد (تجارية)', amount: '60 دولار', time: '90 يوم' },
  { type: 'دخول متعدد (تجارية)', amount: '100 دولار', time: '180 يوم' },
  { type: 'عبور (ترانزيت)', amount: '15 دولار', time: '72 ساعة' },
];

export default function VisaPage() {
  const cardClass = "bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5";

  return (
    <div className="min-h-screen bg-[#080C18] pt-24 pb-12 px-4" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-cairo mb-2">مساعد التأشيرات</h1>
          <p className="text-sm text-white/60 font-cairo">كل ما تحتاج معرفته عن تأشيرة مصر</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {VISA_TYPES.map((v) => (
            <div key={v.name} className={cardClass + " text-center"}>
              <svg className="mx-auto mb-3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={v.icon} /></svg>
              <h3 className="text-sm font-bold text-white font-cairo mb-1">{v.name}</h3>
              <p className="text-xs text-white/60 font-cairo mb-2">{v.desc}</p>
              <p className="text-[10px] text-white/40 font-cairo">{v.period}</p>
              <p className="text-sm text-theme-gold font-english font-bold mt-2">{v.price}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className={cardClass}>
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">المستندات المطلوبة</h2>
            <ol className="space-y-2">
              {REQUIREMENTS.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-white/80 font-cairo">
                  <span className="text-theme-gold mt-0.5">•</span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
          <div className={cardClass}>
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">خطوات التقديم</h2>
            <ol className="space-y-3">
              {STEPS.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-theme-gold/10 text-theme-gold text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                  <span className="text-xs text-white/80 font-cairo pt-1">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={cardClass + " mb-6"}>
          <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">رسوم التأشيرات</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-2 text-xs text-white/50 font-cairo">النوع</th>
                  <th className="pb-2 text-xs text-white/50 font-cairo">الرسوم</th>
                  <th className="pb-2 text-xs text-white/50 font-cairo">المدة</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 text-sm text-white font-cairo">{f.type}</td>
                    <td className="py-2 text-sm text-theme-gold font-english">{f.amount}</td>
                    <td className="py-2 text-xs text-white/60 font-cairo">{f.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://visa2egypt.gov.eg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-xl bg-gradient-gold text-[#0A0E17] font-cairo font-bold text-sm hover:brightness-110 transition-all"
          >
            قدم الآن — Visa2Egypt
          </a>
        </div>
      </div>
    </div>
  );
}

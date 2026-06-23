'use client';

import { useState } from 'react';
import { HiCog, HiCheck, HiCash, HiUserGroup, HiStar, HiShieldCheck, HiMail } from 'react-icons/hi';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    partnerCommission: '10',
    ambassadorCommission: '7',
    minWithdrawal: '100',
    withdrawalFeeWallet: '5',
    withdrawalFeeBank: '10',
    contactEmail: 'admin@egypthub.com',
    contactPhone: '0223456789',
    enableAmbassadors: true,
    enablePartnerReferrals: true,
    requireApproval: true,
    maxBusinessesPerPartner: '5',
    bookingLeadTime: '2',
    cancellationPolicy: '24',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">الإعدادات</h1>
        <p className="text-gray-500">إعدادات المنصة الرئيسية</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-50 text-primary-500 rounded-xl p-3"><HiCash className="text-xl" /></div>
              <div>
                <h2 className="font-bold text-primary-500">إعدادات العمولات</h2>
                <p className="text-sm text-gray-500">تحديد نسب العمولات</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">نسبة عمولة الشريك (%)</label>
                <input type="number" value={settings.partnerCommission} onChange={(e) => setSettings({ ...settings, partnerCommission: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">نسبة عمولة السفير (%)</label>
                <input type="number" value={settings.ambassadorCommission} onChange={(e) => setSettings({ ...settings, ambassadorCommission: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">أقل مبلغ للسحب (ج)</label>
                <input type="number" value={settings.minWithdrawal} onChange={(e) => setSettings({ ...settings, minWithdrawal: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">حد أقصى منشآت للشريك</label>
                <input type="number" value={settings.maxBusinessesPerPartner} onChange={(e) => setSettings({ ...settings, maxBusinessesPerPartner: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-50 text-amber-500 rounded-xl p-3"><HiMail className="text-xl" /></div>
              <div>
                <h2 className="font-bold text-primary-500">معلومات التواصل</h2>
                <p className="text-sm text-gray-500">بيانات التواصل اللي تظهر للمستخدمين</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني</label>
                <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm ltr text-left" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم التليفون</label>
                <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-50 text-green-500 rounded-xl p-3"><HiShieldCheck className="text-xl" /></div>
              <div>
                <h2 className="font-bold text-primary-500">إعدادات الحجوزات</h2>
                <p className="text-sm text-gray-500">التحكم في سياسة الحجوزات</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">مهلة الحجز المسبق (أيام)</label>
                <input type="number" value={settings.bookingLeadTime} onChange={(e) => setSettings({ ...settings, bookingLeadTime: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">سياسة الإلغاء (ساعة)</label>
                <input type="number" value={settings.cancellationPolicy} onChange={(e) => setSettings({ ...settings, cancellationPolicy: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">رسوم السحب (محفظة)</label>
                <input type="number" value={settings.withdrawalFeeWallet} onChange={(e) => setSettings({ ...settings, withdrawalFeeWallet: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">رسوم السحب (بنك)</label>
                <input type="number" value={settings.withdrawalFeeBank} onChange={(e) => setSettings({ ...settings, withdrawalFeeBank: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-50 text-purple-500 rounded-xl p-3"><HiUserGroup className="text-xl" /></div>
              <div>
                <h2 className="font-bold text-primary-500">إعدادات عامة</h2>
                <p className="text-sm text-gray-500">تفعيل أو تعطيل ميزات المنصة</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'enableAmbassadors', label: 'تفعيل نظام السفراء', desc: 'السماح للمستخدمين بالتسجيل كسفراء' },
                { key: 'enablePartnerReferrals', label: 'تفعيل إحالات الشركاء', desc: 'السماح للشركاء بدعوة شركاء جدد' },
                { key: 'requireApproval', label: 'طلب موافقة على التسجيل', desc: 'الموافقة اليدوية على الحسابات الجديدة' },
              ].map((toggle) => (
                <label key={toggle.key} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 cursor-pointer hover:bg-beige-50 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">{toggle.label}</p>
                    <p className="text-sm text-gray-500">{toggle.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors relative ${settings[toggle.key as keyof typeof settings] ? 'bg-secondary-400' : 'bg-gray-200'}`}>
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings[toggle.key as keyof typeof settings] ? 'right-[1.625rem]' : 'right-0.5'}`} />
                    <input
                      type="checkbox"
                      checked={settings[toggle.key as keyof typeof settings] as boolean}
                      onChange={(e) => setSettings({ ...settings, [toggle.key]: e.target.checked })}
                      className="sr-only"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="bg-primary-500 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-primary-600 transition-colors flex items-center gap-2">
              {saved ? <><HiCheck className="text-lg" /> تم الحفظ</> : 'حفظ الإعدادات'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

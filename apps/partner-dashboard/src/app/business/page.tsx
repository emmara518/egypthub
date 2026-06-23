'use client';

import { useState } from 'react';
import { HiOfficeBuilding, HiLocationMarker, HiPhone, HiClock, HiTag, HiPhotograph, HiCheck } from 'react-icons/hi';

export default function BusinessPage() {
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: 'كشري التحرير',
    nameEn: 'Koshari El-Tahrir',
    category: 'مطاعم',
    city: 'القاهرة',
    address: 'ميدان التحرير، وسط البلد',
    phone: '0223456789',
    whatsapp: '01009876543',
    description: 'أشهر كشري في القاهرة من 1970. نقدم كشري أصيل بأسعار مناسبة للجميع.',
    workingHours: '10:00 ص - 11:00 م',
    featured: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">المنشأة</h1>
        <p className="text-gray-500">بيانات منشأتك وصورها</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
              <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center text-primary-500">
                <HiOfficeBuilding className="text-2xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-lg text-gray-800">{form.name}</p>
                  {form.featured && <span className="bg-secondary-50 text-secondary-500 text-xs px-2 py-0.5 rounded-full">مميز</span>}
                </div>
                <p className="text-sm text-gray-500">{form.category} — {form.city}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم (عربي)</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم (إنجليزي)</label>
                <input type="text" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm ltr text-left" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">التصنيف</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm bg-white">
                  <option>مطاعم</option>
                  <option>فنادق</option>
                  <option>أنشطة سياحية</option>
                  <option>نقل ومواصلات</option>
                  <option>تسوق</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">المدينة</label>
                <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm bg-white">
                  <option>القاهرة</option><option>الإسكندرية</option><option>شرم الشيخ</option><option>الغردقة</option><option>الأقصر</option><option>أسوان</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">العنوان</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5">
                  <HiLocationMarker className="text-gray-400" />
                  <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="flex-1 outline-none text-sm bg-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم التليفون</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5">
                  <HiPhone className="text-gray-400" />
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="flex-1 outline-none text-sm bg-transparent ltr text-left" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">واتساب</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5">
                  <HiPhone className="text-gray-400" />
                  <input type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="flex-1 outline-none text-sm bg-transparent ltr text-left" dir="ltr" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الوصف</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">مواعيد العمل</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5">
                  <HiClock className="text-gray-400" />
                  <input type="text" value={form.workingHours} onChange={(e) => setForm({ ...form, workingHours: e.target.value })} className="flex-1 outline-none text-sm bg-transparent" />
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-5 h-5 accent-secondary-400" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">منشأة مميزة</p>
                    <p className="text-xs text-gray-500">تظهر في أول النتائج والرئيسية</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="font-medium text-gray-700 mb-3">صور المنشأة</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 transition-colors">
                    <HiPhotograph className="text-2xl" />
                  </div>
                ))}
                <div className="aspect-video rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 cursor-pointer hover:border-secondary-400 hover:text-secondary-400 transition-colors">
                  <HiPhotograph className="text-2xl" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="bg-primary-500 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-primary-600 transition-colors">
                {saved ? 'تم الحفظ ✓' : 'حفظ التغييرات'}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-primary-500 mb-4">معلومات سريعة</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">الحالة</span><span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-xs">نشط</span></div>
              <div className="flex justify-between"><span className="text-gray-500">تاريخ الإضافة</span><span className="text-gray-800">١ فبراير ٢٠٢٦</span></div>
              <div className="flex justify-between"><span className="text-gray-500">آخر تحديث</span><span className="text-gray-800">١٥ يونيو ٢٠٢٦</span></div>
              <div className="flex justify-between"><span className="text-gray-500">إجمالي المشاهدات</span><span className="text-gray-800">١,٢٤٧</span></div>
              <div className="flex justify-between"><span className="text-gray-500">التقييم</span><span className="text-gray-800">٤.٥ ⭐</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-primary-500 mb-4">رابط المنشأة</h3>
            <p className="text-sm text-gray-500 mb-3">ده رابط صفحتك على مصر هب:</p>
            <div className="bg-beige-50 rounded-xl p-3 border border-secondary-200">
              <p className="text-sm text-primary-600 font-mono ltr text-left" dir="ltr">https://egypthub.com/business/koshari-el-tahrir</p>
            </div>
            <button className="mt-3 w-full bg-secondary-400 text-primary-800 py-2 rounded-xl text-sm font-semibold hover:bg-secondary-300 transition-colors">
              نسخ الرابط
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

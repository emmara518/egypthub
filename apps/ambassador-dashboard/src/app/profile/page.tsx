'use client';

import { useState } from 'react';
import { HiUser, HiMail, HiPhone, HiCamera, HiCheck, HiIdentification } from 'react-icons/hi';

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'نور شرم',
    email: 'nour@example.com',
    phone: '01001234567',
    nationalId: '12345678901234',
    city: 'شرم الشيخ',
    bio: 'بحب السفر والتصوير وبشتغل مع مصر هب عشان أنشر جمال مصر',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">البروفايل</h1>
        <p className="text-gray-500">البيانات الشخصية بتاعتك</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-500 text-3xl font-bold">
                  {form.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 bg-secondary-400 text-primary-800 rounded-full p-2 shadow-sm hover:bg-secondary-300 transition-colors">
                  <HiCamera className="text-sm" />
                </button>
              </div>
              <div>
                <p className="font-bold text-lg text-gray-800">{form.name}</p>
                <p className="text-sm text-gray-500">كود السفير: NORSHARM</p>
                <p className="text-sm text-secondary-500 font-medium">سفير نشط</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم بالكامل</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                  <HiUser className="text-gray-400 text-lg" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="flex-1 outline-none bg-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">البريد الإلكتروني</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                  <HiMail className="text-gray-400 text-lg" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="flex-1 outline-none bg-transparent text-sm ltr text-left"
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم التليفون</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                  <HiPhone className="text-gray-400 text-lg" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="flex-1 outline-none bg-transparent text-sm ltr text-left"
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الرقم القومي</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                  <HiIdentification className="text-gray-400 text-lg" />
                  <input
                    type="text"
                    value={form.nationalId}
                    onChange={(e) => setForm({ ...form, nationalId: e.target.value })}
                    className="flex-1 outline-none bg-transparent text-sm ltr text-left"
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">المدينة</label>
                <select
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm bg-white"
                >
                  <option>شرم الشيخ</option>
                  <option>القاهرة</option>
                  <option>الإسكندرية</option>
                  <option>الأقصر</option>
                  <option>الغردقة</option>
                  <option>أسوان</option>
                  <option>مرسى علم</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">نبذة عني</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                className="bg-primary-500 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-primary-600 transition-colors"
              >
                {saved ? 'تم الحفظ ✓' : 'حفظ التغييرات'}
              </button>
              <button
                type="button"
                className="px-8 py-2.5 rounded-xl font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-primary-500 mb-4">إحصائيات سريعة</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">تاريخ التسجيل</span>
                <span className="font-medium text-gray-800">15 يناير 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">إجمالي الحجوزات</span>
                <span className="font-medium text-gray-800">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">تقييم السفير</span>
                <span className="font-medium text-secondary-500">4.8 ⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-primary-500 mb-4">تغيير كلمة السر</h3>
            <div className="space-y-3">
              <input type="password" placeholder="كلمة السر القديمة" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              <input type="password" placeholder="كلمة السر الجديدة" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              <input type="password" placeholder="تأكيد كلمة السر" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" />
              <button className="w-full bg-gray-100 text-gray-600 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm">
                تحديث كلمة السر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

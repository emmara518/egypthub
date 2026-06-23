'use client';

import { useState } from 'react';
import { HiStar, HiSearch, HiCheck, HiX, HiEye } from 'react-icons/hi';

const ambassadorsData = [
  { id: 1, name: 'نور شرم', code: 'NORSHARM', email: 'nour@example.com', phone: '01001234567', city: 'شرم الشيخ', referrals: 5, earnings: 310, status: 'active', joinedAt: '2026-01-15' },
  { id: 2, name: 'أحمد النور', code: 'AHMEDN', email: 'ahmed@example.com', phone: '01007654321', city: 'القاهرة', referrals: 12, earnings: 840, status: 'active', joinedAt: '2026-02-20' },
  { id: 3, name: 'مريم عادل', code: 'MARIAM', email: 'mariam@example.com', phone: '01005555555', city: 'الإسكندرية', referrals: 3, earnings: 210, status: 'pending', joinedAt: '2026-06-18' },
  { id: 4, name: 'خالد محمود', code: 'KHALED', email: 'khaled@example.com', phone: '01009999999', city: 'الأقصر', referrals: 0, earnings: 0, status: 'suspended', joinedAt: '2026-03-10' },
];

export default function AmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState(ambassadorsData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filtered = ambassadors.filter((a) => {
    if (filter !== 'all' && a.status !== filter) return false;
    if (search && !a.name.includes(search) && !a.code.includes(search)) return false;
    return true;
  });

  const updateStatus = (id: number, status: string) => {
    setAmbassadors(ambassadors.map((a) => a.id === id ? { ...a, status } : a));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">السفراء</h1>
        <p className="text-gray-500">إدارة سفراء مصر هب</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">الكل</p>
          <p className="text-2xl font-bold text-primary-500">{ambassadors.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">في الانتظار</p>
          <p className="text-2xl font-bold text-amber-600">{ambassadors.filter((a) => a.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">نشط</p>
          <p className="text-2xl font-bold text-green-600">{ambassadors.filter((a) => a.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">إجمالي الإحالات</p>
          <p className="text-2xl font-bold text-secondary-500">{ambassadors.reduce((s, a) => s + a.referrals, 0)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-72">
            <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث باسم السفير أو الكود" className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-secondary-400" />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'active', 'suspended'].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filter === s ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {s === 'all' ? 'الكل' : s === 'pending' ? 'في الانتظار' : s === 'active' ? 'نشط' : 'موقوف'}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <HiStar className="text-4xl mx-auto mb-2 text-gray-300" />
            <p>مفيش سفراء</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-sm text-gray-500 font-medium">السفير</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الكود</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">المدينة</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الإحالات</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الأرباح</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الحالة</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((amb) => (
                  <tr key={amb.id} className="border-b border-gray-50 hover:bg-beige-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-secondary-500 font-bold text-sm">{amb.name.charAt(0)}</div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{amb.name}</p>
                          <p className="text-xs text-gray-400">{amb.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-mono text-primary-500">{amb.code}</td>
                    <td className="py-4 text-sm text-gray-700">{amb.city}</td>
                    <td className="py-4 text-sm font-medium text-gray-800">{amb.referrals}</td>
                    <td className="py-4 text-sm font-semibold text-green-600">{amb.earnings} ج</td>
                    <td className="py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        amb.status === 'active' ? 'bg-green-50 text-green-600' :
                        amb.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'
                      }`}>
                        {amb.status === 'active' ? 'نشط' : amb.status === 'pending' ? 'في الانتظار' : 'موقوف'}
                      </span>
                    </td>
                    <td className="py-4 text-sm">
                      <div className="flex items-center gap-1">
                        {amb.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(amb.id, 'active')} className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-colors"><HiCheck className="text-lg" /></button>
                            <button onClick={() => updateStatus(amb.id, 'suspended')} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><HiX className="text-lg" /></button>
                          </>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-primary-500 transition-colors"><HiEye className="text-lg" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

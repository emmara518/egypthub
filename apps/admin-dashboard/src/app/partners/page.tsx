'use client';

import { useState } from 'react';
import { HiUserGroup, HiCheck, HiX, HiSearch, HiEye } from 'react-icons/hi';

const allPartners = [
  { id: 1, name: 'فول وفلافل أبو العلا', owner: 'محمد أبو العلا', email: 'abouelalla@example.com', phone: '01011111111', category: 'مطاعم', city: 'القاهرة', status: 'pending', registeredAt: '2026-06-19' },
  { id: 2, name: 'فندق الأهرام', owner: 'أحمد السيد', email: 'ahmed@pyramids.com', phone: '01022222222', category: 'فنادق', city: 'الجيزة', status: 'active', registeredAt: '2026-05-01' },
  { id: 3, name: 'كشري التحرير', owner: 'علي كشري', email: 'ali@koshari.com', phone: '01033333333', category: 'مطاعم', city: 'القاهرة', status: 'active', registeredAt: '2026-04-15' },
  { id: 4, name: 'رحلة النيل', owner: 'نورا سعيد', email: 'nora@nile.com', phone: '01044444444', category: 'أنشطة سياحية', city: 'الأقصر', status: 'suspended', registeredAt: '2026-06-10' },
  { id: 5, name: 'مطعم السمك', owner: 'جمال بحري', email: 'gamal@fish.com', phone: '01055555555', category: 'مطاعم', city: 'الإسكندرية', status: 'pending', registeredAt: '2026-06-20' },
];

export default function PartnersPage() {
  const [partners, setPartners] = useState(allPartners);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filtered = partners.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (search && !p.name.includes(search) && !p.owner.includes(search)) return false;
    return true;
  });

  const updateStatus = (id: number, status: string) => {
    setPartners(partners.map((p) => p.id === id ? { ...p, status } : p));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">الشركاء</h1>
        <p className="text-gray-500">إدارة طلبات الشركاء والمنشآت</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">الكل</p>
          <p className="text-2xl font-bold text-primary-500">{partners.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">في الانتظار</p>
          <p className="text-2xl font-bold text-amber-600">{partners.filter((p) => p.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">نشط</p>
          <p className="text-2xl font-bold text-green-600">{partners.filter((p) => p.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">موقوف</p>
          <p className="text-2xl font-bold text-red-500">{partners.filter((p) => p.status === 'suspended').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-72">
            <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث باسم الشريك أو المنشأة" className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-secondary-400" />
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
            <HiUserGroup className="text-4xl mx-auto mb-2 text-gray-300" />
            <p>مفيش شركاء</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((partner) => (
              <div key={partner.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-secondary-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500 font-bold">{partner.name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{partner.name}</p>
                    <p className="text-xs text-gray-500">{partner.owner} — {partner.category} — {partner.city}</p>
                    <p className="text-xs text-gray-400">{partner.email} | {partner.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {partner.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(partner.id, 'active')} className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center gap-1"><HiCheck className="text-sm" /> وافقت</button>
                      <button onClick={() => updateStatus(partner.id, 'suspended')} className="bg-red-400 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-500 transition-colors flex items-center gap-1"><HiX className="text-sm" /> مرفوض</button>
                    </>
                  )}
                  {partner.status !== 'pending' && (
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      partner.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                    }`}>
                      {partner.status === 'active' ? 'نشط' : 'موقوف'}
                    </span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors"><HiEye className="text-lg" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

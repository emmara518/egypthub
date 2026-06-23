'use client';

import { useState } from 'react';
import { HiCash, HiFilter, HiArrowDown, HiArrowUp, HiClipboardCopy } from 'react-icons/hi';

const earningsData = [
  { id: 1, date: '2026-06-20', business: 'كشري التحرير', amount: 35, type: 'commission', status: 'pending' },
  { id: 2, date: '2026-06-19', business: 'فندق الأهرام', amount: 120, type: 'commission', status: 'paid' },
  { id: 3, date: '2026-06-18', business: 'رحلة الأقصر', amount: 50, type: 'bonus', status: 'paid' },
  { id: 4, date: '2026-06-17', business: 'كشري التحرير', amount: 35, type: 'commission', status: 'paid' },
  { id: 5, date: '2026-06-15', business: 'مطعم السمك', amount: 70, type: 'commission', status: 'paid' },
];

export default function EarningsPage() {
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const totalEarnings = earningsData.reduce((sum, e) => sum + e.amount, 0);
  const pendingAmount = earningsData.filter((e) => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);

  const filtered = filter === 'all' ? earningsData : earningsData.filter((e) => e.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">أرباحي</h1>
        <p className="text-gray-500">متتبع أرباحك وعمولاتك من الحجوزات</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">إجمالي الأرباح</p>
          <p className="text-3xl font-bold text-primary-500">{totalEarnings} ج</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">المدفوع</p>
          <p className="text-3xl font-bold text-green-600">{totalEarnings - pendingAmount} ج</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">قيد الانتظار</p>
          <p className="text-3xl font-bold text-amber-600">{pendingAmount} ج</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-primary-500">سجل الأرباح</h2>
          <div className="flex gap-2">
            {(['all', 'paid', 'pending'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  filter === f ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'الكل' : f === 'paid' ? 'مدفوع' : 'معلق'}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <HiCash className="text-4xl mx-auto mb-2 text-gray-300" />
            <p>لسه مفيش أرباح</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-sm text-gray-500 font-medium">التاريخ</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">المنشأة</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">المبلغ</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">النوع</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((earning) => (
                  <tr key={earning.id} className="border-b border-gray-50 hover:bg-beige-50 transition-colors">
                    <td className="py-4 text-sm text-gray-700">{new Date(earning.date).toLocaleDateString('ar-EG')}</td>
                    <td className="py-4 text-sm text-gray-700">{earning.business}</td>
                    <td className="py-4 text-sm font-semibold text-primary-500">{earning.amount} ج</td>
                    <td className="py-4 text-sm">
                      <span className={`flex items-center gap-1 ${earning.type === 'commission' ? 'text-blue-600' : 'text-green-600'}`}>
                        {earning.type === 'commission' ? <HiArrowDown className="text-xs" /> : <HiArrowUp className="text-xs" />}
                        {earning.type === 'commission' ? 'عمولة' : 'مكافأة'}
                      </span>
                    </td>
                    <td className="py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        earning.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {earning.status === 'paid' ? 'مدفوع' : 'معلق'}
                      </span>
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

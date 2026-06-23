'use client';

import { useState } from 'react';
import { HiCalendar, HiCheck, HiX, HiEye, HiSearch } from 'react-icons/hi';

const bookingsData = [
  { id: 'BK-001', guest: 'أحمد علي', business: 'كشري التحرير', date: '2026-06-22', time: '13:00', guests: 2, status: 'confirmed', amount: 120 },
  { id: 'BK-002', guest: 'مريم حسن', business: 'كشري التحرير', date: '2026-06-21', time: '14:30', guests: 4, status: 'completed', amount: 240 },
  { id: 'BK-003', guest: 'خالد عمر', business: 'كشري التحرير', date: '2026-06-25', time: '12:00', guests: 3, status: 'pending', amount: 180 },
  { id: 'BK-004', guest: 'سارة محمد', business: 'كشري التحرير', date: '2026-06-20', time: '15:00', guests: 2, status: 'cancelled', amount: 120 },
  { id: 'BK-005', guest: 'يوسف إبراهيم', business: 'كشري التحرير', date: '2026-06-23', time: '13:30', guests: 5, status: 'confirmed', amount: 300 },
];

export default function BookingsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = bookingsData.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search && !b.guest.includes(search) && !b.id.includes(search)) return false;
    return true;
  });

  const totalBookings = bookingsData.length;
  const todayCount = bookingsData.filter((b) => b.date === new Date().toISOString().slice(0, 10)).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">حجوزاتي</h1>
        <p className="text-gray-500">عرض وإدارة كل الحجوزات الواردة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">كل الحجوزات</p>
          <p className="text-2xl font-bold text-primary-500">{totalBookings}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">حجوزات النهاردة</p>
          <p className="text-2xl font-bold text-green-600">{todayCount}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">قيد الانتظار</p>
          <p className="text-2xl font-bold text-amber-600">{bookingsData.filter((b) => b.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">ملغية</p>
          <p className="text-2xl font-bold text-red-500">{bookingsData.filter((b) => b.status === 'cancelled').length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالضيف أو رقم الحجز"
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-secondary-400"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  statusFilter === s ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s === 'all' ? 'الكل' : s === 'pending' ? 'معلق' : s === 'confirmed' ? 'مؤكد' : s === 'completed' ? 'تم' : 'ملغي'}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <HiCalendar className="text-4xl mx-auto mb-2 text-gray-300" />
            <p>مفيش حجوزات تطابق البحث</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-sm text-gray-500 font-medium">رقم الحجز</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الضيف</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">التاريخ</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الوقت</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">عدد الضيوف</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">المبلغ</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الحالة</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-beige-50 transition-colors">
                    <td className="py-4 text-sm font-medium text-primary-500">{booking.id}</td>
                    <td className="py-4 text-sm text-gray-700">{booking.guest}</td>
                    <td className="py-4 text-sm text-gray-700">{new Date(booking.date).toLocaleDateString('ar-EG')}</td>
                    <td className="py-4 text-sm text-gray-700">{booking.time}</td>
                    <td className="py-4 text-sm text-gray-700">{booking.guests}</td>
                    <td className="py-4 text-sm font-semibold text-gray-800">{booking.amount} ج</td>
                    <td className="py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' ? 'bg-blue-50 text-blue-600' :
                        booking.status === 'completed' ? 'bg-green-50 text-green-600' :
                        booking.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'
                      }`}>
                        {booking.status === 'confirmed' ? 'مؤكد' :
                         booking.status === 'completed' ? 'تم' :
                         booking.status === 'pending' ? 'معلق' : 'ملغي'}
                      </span>
                    </td>
                    <td className="py-4 text-sm">
                      <button
                        onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                        className="text-primary-500 hover:text-primary-700 transition-colors"
                      >
                        <HiEye className="text-lg" />
                      </button>
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

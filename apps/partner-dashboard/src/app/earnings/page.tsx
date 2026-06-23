'use client';

import { HiCash, HiChartBar } from 'react-icons/hi';

const earningsData = [
  { month: 'يناير', bookings: 8, revenue: 960, commission: 96 },
  { month: 'فبراير', bookings: 12, revenue: 1440, commission: 144 },
  { month: 'مارس', bookings: 15, revenue: 1800, commission: 180 },
  { month: 'أبريل', bookings: 10, revenue: 1200, commission: 120 },
  { month: 'مايو', bookings: 18, revenue: 2160, commission: 216 },
  { month: 'يونيو', bookings: 14, revenue: 1680, commission: 168 },
];

export default function PartnerEarningsPage() {
  const totalRevenue = earningsData.reduce((s, e) => s + e.revenue, 0);
  const totalCommission = earningsData.reduce((s, e) => s + e.commission, 0);
  const totalBookings = earningsData.reduce((s, e) => s + e.bookings, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">الأرباح</h1>
        <p className="text-gray-500">إيرادات وعمولات منشأتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-50 text-green-600 rounded-xl p-3"><HiCash className="text-xl" /></div>
          </div>
          <p className="text-sm text-gray-500 mb-1">إجمالي الإيرادات</p>
          <p className="text-3xl font-bold text-primary-500">{totalRevenue.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-50 text-amber-600 rounded-xl p-3"><HiCash className="text-xl" /></div>
          </div>
          <p className="text-sm text-gray-500 mb-1">إجمالي العمولات</p>
          <p className="text-3xl font-bold text-secondary-500">{totalCommission.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-50 text-blue-600 rounded-xl p-3"><HiChartBar className="text-xl" /></div>
          </div>
          <p className="text-sm text-gray-500 mb-1">إجمالي الحجوزات</p>
          <p className="text-3xl font-bold text-primary-500">{totalBookings}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary-500 mb-6">الإيرادات الشهرية</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-sm text-gray-500 font-medium">الشهر</th>
                <th className="pb-3 text-sm text-gray-500 font-medium">الحجوزات</th>
                <th className="pb-3 text-sm text-gray-500 font-medium">الإيرادات</th>
                <th className="pb-3 text-sm text-gray-500 font-medium">عمولة مصر هب (10%)</th>
                <th className="pb-3 text-sm text-gray-500 font-medium">صافي الربح</th>
              </tr>
            </thead>
            <tbody>
              {earningsData.map((row) => (
                <tr key={row.month} className="border-b border-gray-50 hover:bg-beige-50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-800">{row.month}</td>
                  <td className="py-4 text-sm text-gray-700">{row.bookings}</td>
                  <td className="py-4 text-sm font-semibold text-gray-800">{row.revenue.toLocaleString()} ج</td>
                  <td className="py-4 text-sm text-amber-600">{row.commission.toLocaleString()} ج</td>
                  <td className="py-4 text-sm font-semibold text-green-600">{(row.revenue - row.commission).toLocaleString()} ج</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-primary-100">
                <td className="pt-4 text-sm font-bold text-primary-500">الإجمالي</td>
                <td className="pt-4 text-sm font-bold text-primary-500">{totalBookings}</td>
                <td className="pt-4 text-sm font-bold text-primary-500">{totalRevenue.toLocaleString()} ج</td>
                <td className="pt-4 text-sm font-bold text-primary-500">{totalCommission.toLocaleString()} ج</td>
                <td className="pt-4 text-sm font-bold text-primary-500">{(totalRevenue - totalCommission).toLocaleString()} ج</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { HiCash, HiChartBar } from 'react-icons/hi';

const transactions = [
  { id: 'TRX-001', date: '2026-06-20', from: 'كشري التحرير', type: 'partner_commission', amount: 180, status: 'paid' },
  { id: 'TRX-002', date: '2026-06-20', from: 'نور شرم', type: 'ambassador_commission', amount: 35, status: 'paid' },
  { id: 'TRX-003', date: '2026-06-19', from: 'فندق الأهرام', type: 'partner_commission', amount: 450, status: 'paid' },
  { id: 'TRX-004', date: '2026-06-19', from: 'أحمد النور', type: 'ambassador_commission', amount: 120, status: 'pending' },
  { id: 'TRX-005', date: '2026-06-18', from: 'رحلة النيل', type: 'partner_commission', amount: 300, status: 'paid' },
  { id: 'TRX-006', date: '2026-06-18', from: 'مريم عادل', type: 'ambassador_commission', amount: 50, status: 'pending' },
];

export default function CommissionsPage() {
  const totalCommissions = transactions.reduce((s, t) => s + t.amount, 0);
  const paid = transactions.filter((t) => t.status === 'paid').reduce((s, t) => s + t.amount, 0);
  const pending = transactions.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  const partnerCommissions = transactions.filter((t) => t.type === 'partner_commission').reduce((s, t) => s + t.amount, 0);
  const ambassadorCommissions = transactions.filter((t) => t.type === 'ambassador_commission').reduce((s, t) => s + t.amount, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">العمولات</h1>
        <p className="text-gray-500">تتبع العمولات والأرباح</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">إجمالي العمولات</p>
          <p className="text-2xl font-bold text-primary-500">{totalCommissions.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">المدفوع</p>
          <p className="text-2xl font-bold text-green-600">{paid.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">قيد الانتظار</p>
          <p className="text-2xl font-bold text-amber-600">{pending.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">عدد المعاملات</p>
          <p className="text-2xl font-bold text-secondary-500">{transactions.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-primary-500 mb-4">عمولات الشركاء</h2>
          <p className="text-3xl font-bold text-primary-500">{partnerCommissions.toLocaleString()} ج</p>
          <p className="text-sm text-gray-500 mt-1">نسبة 10% من كل حجز</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-primary-500 mb-4">عمولات السفراء</h2>
          <p className="text-3xl font-bold text-secondary-500">{ambassadorCommissions.toLocaleString()} ج</p>
          <p className="text-sm text-gray-500 mt-1">نسبة 7% من كل حجز عن طريق السفير</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary-500 mb-6">سجل المعاملات</h2>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <HiCash className="text-4xl mx-auto mb-2 text-gray-300" />
            <p>مفيش معاملات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-sm text-gray-500 font-medium">رقم المعاملة</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">التاريخ</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">من</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">النوع</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">المبلغ</th>
                  <th className="pb-3 text-sm text-gray-500 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx) => (
                  <tr key={trx.id} className="border-b border-gray-50 hover:bg-beige-50 transition-colors">
                    <td className="py-4 text-sm font-medium text-primary-500">{trx.id}</td>
                    <td className="py-4 text-sm text-gray-700">{new Date(trx.date).toLocaleDateString('ar-EG')}</td>
                    <td className="py-4 text-sm text-gray-700">{trx.from}</td>
                    <td className="py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        trx.type === 'partner_commission' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {trx.type === 'partner_commission' ? 'عمولة شريك' : 'عمولة سفير'}
                      </span>
                    </td>
                    <td className="py-4 text-sm font-semibold text-gray-800">{trx.amount.toLocaleString()} ج</td>
                    <td className="py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        trx.status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {trx.status === 'paid' ? 'مدفوع' : 'معلق'}
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

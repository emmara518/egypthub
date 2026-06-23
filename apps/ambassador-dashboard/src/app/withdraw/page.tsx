'use client';

import { useState } from 'react';
import { HiCreditCard, HiCash, HiCheck, HiClock, HiExclamation } from 'react-icons/hi';

const withdrawalHistory = [
  { id: 1, amount: 200, date: '2026-06-01', status: 'completed', method: 'محفظة إلكترونية' },
  { id: 2, amount: 150, date: '2026-05-15', status: 'completed', method: 'تحويل بنكي' },
  { id: 3, amount: 100, date: '2026-06-10', status: 'processing', method: 'محفظة إلكترونية' },
];

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('wallet');
  const [submitted, setSubmitted] = useState(false);
  const availableBalance = 310;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(amount) < 100) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">طلب سحب</h1>
        <p className="text-gray-500">اسحب أرباحك لما توصل للحد الأدنى</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-primary-500">طلب سحب جديد</h2>
            <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-medium">
              المتاح: {availableBalance} ج
            </div>
          </div>

          {submitted ? (
            <div className="bg-green-50 text-green-700 rounded-xl p-6 text-center">
              <HiCheck className="text-5xl mx-auto mb-3 text-green-500" />
              <p className="text-lg font-semibold mb-1">تم إرسال طلب السحب!</p>
              <p className="text-sm">هنتواصل معاك في خلال 24 ساعة</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المبلغ (أقل مبلغ 100 ج)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={100}
                  max={availableBalance}
                  placeholder="أدخل المبلغ"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-400 transition-colors"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  الحد الأدنى: 100 ج — الحد الأقصى: {availableBalance} ج
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">طريقة السحب</label>
                <div className="space-y-3">
                  {[
                    { value: 'wallet', label: 'محفظة إلكترونية', desc: 'فودافون كاش أو إنستاباي' },
                    { value: 'bank', label: 'تحويل بنكي', desc: 'بنك مصر أو بنك الإسكندرية' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        method === opt.value ? 'border-secondary-400 bg-beige-50' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={opt.value}
                        checked={method === opt.value}
                        onChange={(e) => setMethod(e.target.value)}
                        className="accent-secondary-400"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{opt.label}</p>
                        <p className="text-xs text-gray-500">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {method === 'wallet' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم المحفظة</label>
                  <input
                    type="text"
                    placeholder="01xxxxxxxxx"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-400 transition-colors ltr text-left"
                    dir="ltr"
                    required
                  />
                </div>
              )}

              {method === 'bank' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم البنك</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-400 transition-colors">
                      <option>بنك مصر</option>
                      <option>بنك الإسكندرية</option>
                      <option>البنك الأهلي المصري</option>
                      <option>CIB</option>
                      <option>HSBC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الحساب</label>
                    <input
                      type="text"
                      placeholder="أدخل رقم الحساب"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-400 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">صاحب الحساب</label>
                    <input
                      type="text"
                      placeholder="الاسم كما في البطاقة"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-400 transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={Number(amount) < 100 || Number(amount) > availableBalance}
                className="w-full bg-secondary-400 text-primary-800 py-3 rounded-xl font-bold hover:bg-secondary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                تأكيد طلب السحب
              </button>
            </form>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-primary-500 mb-4">سجل السحوبات</h2>
          {withdrawalHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <HiCreditCard className="text-4xl mx-auto mb-2 text-gray-300" />
              <p>لسه معملتش سحوبات</p>
            </div>
          ) : (
            <div className="space-y-3">
              {withdrawalHistory.map((w) => (
                <div key={w.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-800">{w.amount} ج</p>
                    <p className="text-xs text-gray-500">{new Date(w.date).toLocaleDateString('ar-EG')} - {w.method}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
                    w.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {w.status === 'completed' ? <HiCheck className="text-xs" /> : <HiClock className="text-xs" />}
                    {w.status === 'completed' ? 'تم' : 'قيد التنفيذ'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
        <HiExclamation className="text-amber-500 text-xl mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-amber-800">شروط السحب</p>
          <p className="text-sm text-amber-700">أقل مبلغ للسحب 100 ج. بنحول المبالغ خلال 1-3 أيام عمل. عمولة التحويل 5 ج للمحفظة الإلكترونية و 10 ج للتحويل البنكي.</p>
        </div>
      </div>
    </div>
  );
}

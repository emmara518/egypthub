'use client';

import { useState } from 'react';
import { HiTag, HiPlus, HiPencil, HiTrash, HiSwitchHorizontal } from 'react-icons/hi';

const initialOffers = [
  { id: 1, title: 'خصم 20% على الكشري', business: 'كشري التحرير', discount: '20%', validUntil: '2026-07-15', status: 'active', uses: 12 },
  { id: 2, title: 'وجبة مجانية مع 2', business: 'كشري التحرير', discount: 'وجبة مجانية', validUntil: '2026-06-30', status: 'active', uses: 8 },
  { id: 3, title: 'عرض الصيف', business: 'كشري التحرير', discount: '15%', validUntil: '2026-05-01', status: 'expired', uses: 45 },
];

export default function OffersPage() {
  const [offers, setOffers] = useState(initialOffers);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', discount: '', validUntil: '' });

  const openNew = () => {
    setEditingId(null);
    setForm({ title: '', discount: '', validUntil: '' });
    setShowForm(true);
  };

  const openEdit = (offer: typeof initialOffers[0]) => {
    setEditingId(offer.id);
    setForm({ title: offer.title, discount: offer.discount, validUntil: offer.validUntil });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setOffers(offers.map((o) => o.id === editingId ? { ...o, ...form } : o));
    } else {
      setOffers([...offers, { id: Date.now(), ...form, business: 'كشري التحرير', status: 'active', uses: 0 }]);
    }
    setShowForm(false);
  };

  const toggleStatus = (id: number) => {
    setOffers(offers.map((o) => o.id === id ? { ...o, status: o.status === 'active' ? 'paused' : 'active' } : o));
  };

  const deleteOffer = (id: number) => {
    setOffers(offers.filter((o) => o.id !== id));
  };

  const activeOffers = offers.filter((o) => o.status === 'active').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">عروضي</h1>
          <p className="text-gray-500">إدارة العروض والتخفيضات بتاعتك</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-secondary-400 text-primary-800 px-5 py-2.5 rounded-xl font-semibold hover:bg-secondary-300 transition-colors"
        >
          <HiPlus className="text-lg" />
          عرض جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">العروض النشطة</p>
          <p className="text-2xl font-bold text-green-600">{activeOffers}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">إجمالي الاستخدام</p>
          <p className="text-2xl font-bold text-primary-500">{offers.reduce((s, o) => s + o.uses, 0)}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">منتهية الصلاحية</p>
          <p className="text-2xl font-bold text-red-500">{offers.filter((o) => o.status === 'expired').length}</p>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border-2 border-secondary-200">
          <h2 className="text-lg font-bold text-primary-500 mb-4">{editingId ? 'تعديل العرض' : 'عرض جديد'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">اسم العرض</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-secondary-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">نسبة/قيمة الخصم</label>
                <input
                  type="text"
                  value={form.discount}
                  onChange={(e) => setForm({ ...form, discount: e.target.value })}
                  placeholder="مثال: 20% أو وجبة مجانية"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-secondary-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">صالح حتى</label>
                <input
                  type="date"
                  value={form.validUntil}
                  onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm focus:border-secondary-400"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="bg-primary-500 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-600 transition-colors">
                {editingId ? 'حفظ التعديلات' : 'إضافة العرض'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary-500 mb-4">كل العروض</h2>
        {offers.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <HiTag className="text-4xl mx-auto mb-2 text-gray-300" />
            <p>مفيش عروض دلوقتي. اضف أول عرض!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div key={offer.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-secondary-200 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800">{offer.title}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-xs ${
                      offer.status === 'active' ? 'bg-green-50 text-green-600' :
                      offer.status === 'paused' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {offer.status === 'active' ? 'نشط' : offer.status === 'paused' ? 'موقف' : 'منتهي'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">خصم: {offer.discount} — صالح حتى {new Date(offer.validUntil).toLocaleDateString('ar-EG')} — مستخدم {offer.uses} مرة</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(offer)} className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                    <HiPencil className="text-lg" />
                  </button>
                  {offer.status !== 'expired' && (
                    <button onClick={() => toggleStatus(offer.id)} className="p-2 text-gray-400 hover:text-amber-500 transition-colors">
                      <HiSwitchHorizontal className="text-lg" />
                    </button>
                  )}
                  <button onClick={() => deleteOffer(offer.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <HiTrash className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

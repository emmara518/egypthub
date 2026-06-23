'use client';

import { useState } from 'react';
import { HiTag, HiPlus, HiPencil, HiTrash } from 'react-icons/hi';

const initialCategories = [
  { id: 1, name: 'مطاعم', nameEn: 'Restaurants', icon: '🍽️', businesses: 3, color: '#F4A261' },
  { id: 2, name: 'فنادق', nameEn: 'Hotels', icon: '🏨', businesses: 1, color: '#0D3B66' },
  { id: 3, name: 'أنشطة سياحية', nameEn: 'Tourist Activities', icon: '🎯', businesses: 1, color: '#E9C46A' },
  { id: 4, name: 'نقل ومواصلات', nameEn: 'Transportation', icon: '🚗', businesses: 0, color: '#2A9D8F' },
  { id: 5, name: 'تسوق', nameEn: 'Shopping', icon: '🛍️', businesses: 0, color: '#E76F51' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', nameEn: '', icon: '📌' });

  const openNew = () => { setEditingId(null); setForm({ name: '', nameEn: '', icon: '📌' }); setShowForm(true); };
  const openEdit = (cat: typeof initialCategories[0]) => { setEditingId(cat.id); setForm({ name: cat.name, nameEn: cat.nameEn, icon: cat.icon }); setShowForm(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCategories(categories.map((c) => c.id === editingId ? { ...c, ...form } : c));
    } else {
      setCategories([...categories, { id: Date.now(), ...form, businesses: 0, color: '#0D3B66' }]);
    }
    setShowForm(false);
  };

  const deleteCategory = (id: number) => {
    if (categories.find((c) => c.id === id)?.businesses && categories.find((c) => c.id === id)!.businesses > 0) return;
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">التصنيفات</h1>
          <p className="text-gray-500">إدارة تصنيفات المنشآت</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-secondary-400 text-primary-800 px-5 py-2.5 rounded-xl font-semibold hover:bg-secondary-300 transition-colors">
          <HiPlus className="text-lg" /> تصنيف جديد
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border-2 border-secondary-200">
          <h2 className="text-lg font-bold text-primary-500 mb-4">{editingId ? 'تعديل التصنيف' : 'تصنيف جديد'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم (عربي)</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم (إنجليزي)</label>
                <input type="text" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm ltr text-left" dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الأيقونة</label>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5">
                  <span className="text-lg">{form.icon || '📌'}</span>
                  <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="flex-1 outline-none text-sm" placeholder="ضع ايموجي" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-primary-500 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-600">{editingId ? 'حفظ' : 'إضافة'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 border border-gray-200 hover:bg-gray-50">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-secondary-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-beige-50 flex items-center justify-center text-lg">{cat.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800">{cat.name}</p>
                  <p className="text-xs text-gray-400">{cat.nameEn} — {cat.businesses} منشآت</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(cat)} className="p-1.5 text-gray-400 hover:text-primary-500 transition-colors"><HiPencil className="text-lg" /></button>
                <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><HiTrash className="text-lg" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

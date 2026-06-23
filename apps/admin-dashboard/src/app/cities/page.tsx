'use client';

import { useState } from 'react';
import { HiLocationMarker, HiPlus, HiPencil, HiTrash, HiSearch } from 'react-icons/hi';

const initialCities = [
  { id: 1, name: 'القاهرة', nameEn: 'Cairo', businesses: 2, ambassadors: 1 },
  { id: 2, name: 'الإسكندرية', nameEn: 'Alexandria', businesses: 1, ambassadors: 1 },
  { id: 3, name: 'شرم الشيخ', nameEn: 'Sharm El-Sheikh', businesses: 1, ambassadors: 1 },
  { id: 4, name: 'الغردقة', nameEn: 'Hurghada', businesses: 0, ambassadors: 0 },
  { id: 5, name: 'الأقصر', nameEn: 'Luxor', businesses: 1, ambassadors: 1 },
  { id: 6, name: 'أسوان', nameEn: 'Aswan', businesses: 0, ambassadors: 0 },
  { id: 7, name: 'مرسى علم', nameEn: 'Marsa Alam', businesses: 0, ambassadors: 0 },
  { id: 8, name: 'الجيزة', nameEn: 'Giza', businesses: 0, ambassadors: 0 },
];

export default function CitiesPage() {
  const [cities, setCities] = useState(initialCities);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', nameEn: '' });

  const filtered = cities.filter((c) => c.name.includes(search) || c.nameEn.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => { setEditingId(null); setForm({ name: '', nameEn: '' }); setShowForm(true); };
  const openEdit = (city: typeof initialCities[0]) => { setEditingId(city.id); setForm({ name: city.name, nameEn: city.nameEn }); setShowForm(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCities(cities.map((c) => c.id === editingId ? { ...c, name: form.name, nameEn: form.nameEn } : c));
    } else {
      setCities([...cities, { id: Date.now(), ...form, businesses: 0, ambassadors: 0 }]);
    }
    setShowForm(false);
  };

  const deleteCity = (id: number) => {
    if (cities.find((c) => c.id === id)?.businesses && cities.find((c) => c.id === id)!.businesses > 0) return;
    setCities(cities.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary-500">المدن</h1>
          <p className="text-gray-500">إدارة المدن المتاحة على المنصة</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-secondary-400 text-primary-800 px-5 py-2.5 rounded-xl font-semibold hover:bg-secondary-300 transition-colors">
          <HiPlus className="text-lg" /> مدينة جديدة
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border-2 border-secondary-200">
          <h2 className="text-lg font-bold text-primary-500 mb-4">{editingId ? 'تعديل المدينة' : 'مدينة جديدة'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم (عربي)</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم (إنجليزي)</label>
                <input type="text" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none text-sm ltr text-left" dir="ltr" required />
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
        <div className="relative w-full md:w-72 mb-6">
          <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن مدينة" className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((city) => (
            <div key={city.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-secondary-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500">
                  <HiLocationMarker className="text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{city.name}</p>
                  <p className="text-xs text-gray-400">{city.nameEn} — {city.businesses} منشآت، {city.ambassadors} سفراء</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(city)} className="p-1.5 text-gray-400 hover:text-primary-500 transition-colors"><HiPencil className="text-lg" /></button>
                <button onClick={() => deleteCity(city.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><HiTrash className="text-lg" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type UserRole = 'ADMIN' | 'TRAVELER' | 'PROVIDER' | 'PARTNER' | 'AMBASSADOR' | 'GUIDE';
type UserStatus = 'active' | 'banned';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  joinedAt: string;
  avatar: string;
}

const ROLES: UserRole[] = ['ADMIN', 'TRAVELER', 'PROVIDER', 'PARTNER', 'AMBASSADOR', 'GUIDE'];

const cities = ['القاهرة', 'الإسكندرية', 'الأقصر', 'أسوان', 'شرم الشيخ', 'الغردقة', 'دهب', 'سيوة'];

const mockUsers: AdminUser[] = Array.from({ length: 35 }, (_, i) => ({
  id: `usr-${String(i + 1).padStart(3, '0')}`,
  name: ['أحمد', 'محمود', 'سارة', 'نورة', 'خالد', 'مريم', 'يوسف', 'دينا', 'عمر', 'ليلى', 'كريم', 'هند', 'محمد', 'فاطمة', 'علي', 'منى', 'حسن', 'وفاء', 'صابر', 'شيماء', 'طارق', 'إيمان', 'إبراهيم', 'سمية', 'وائل', 'رشا', 'جمال', 'عبير', 'هشام', 'نادية', 'أكرم', 'نوال', 'باسم', 'سحر', 'مجدي'][i % 35] + ' ' + ['عبدالله', 'محسن', 'جابر', 'رفعت', 'سالم', 'ناجي', 'فوزي', 'عاطف', 'لطفي', 'ممدوح'][i % 10],
  email: `user${i + 1}@example.com`,
  role: (['TRAVELER', 'TRAVELER', 'PROVIDER', 'TRAVELER', 'PARTNER', 'ADMIN', 'AMBASSADOR', 'GUIDE', 'TRAVELER', 'PROVIDER'] as UserRole[])[i % 10],
  status: i % 7 === 0 ? 'banned' : 'active',
  phone: `+2010${String(90000000 + i).slice(0, 8)}`,
  joinedAt: new Date(2025, i % 12, (i * 3) % 28 + 1).toISOString(),
  avatar: `/images/avatars/avatar-${(i % 54) + 1}.svg`,
}));

const roleColors: Record<UserRole, string> = {
  ADMIN: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  TRAVELER: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  PROVIDER: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  PARTNER: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  AMBASSADOR: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  GUIDE: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

const roleLabels: Record<UserRole, string> = {
  ADMIN: 'أدمن',
  TRAVELER: 'مسافر',
  PROVIDER: 'مزود خدمة',
  PARTNER: 'شريك',
  AMBASSADOR: 'سفير',
  GUIDE: 'مرشد',
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState<AdminUser | null>(null);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const perPage = 10;

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'TRAVELER' as UserRole, phone: '' });

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === 'active').length,
    newToday: users.filter((u) => new Date(u.joinedAt).toDateString() === new Date().toDateString()).length,
    admins: users.filter((u) => u.role === 'ADMIN').length,
  }), [users]);

  const filtered = useMemo(() => {
    let result = [...users];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((u) => u.name.includes(q) || u.email.includes(q) || u.id.includes(q));
    }
    if (roleFilter) result = result.filter((u) => u.role === roleFilter);
    if (statusFilter) result = result.filter((u) => u.status === statusFilter);
    return result;
  }, [users, search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleCreate = () => {
    const newUser: AdminUser = {
      id: `usr-${String(users.length + 1).padStart(3, '0')}`,
      name: form.name,
      email: form.email,
      role: form.role,
      status: 'active',
      phone: form.phone,
      joinedAt: new Date().toISOString(),
      avatar: '/images/avatars/avatar-01.svg',
    };
    setUsers((prev) => [newUser, ...prev]);
    setShowCreate(false);
    setForm({ name: '', email: '', password: '', role: 'TRAVELER', phone: '' });
  };

  const handleStatusToggle = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u)));
  };

  const handleRoleChange = (id: string, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">المستخدمين</h1>
          <p className="text-sm text-theme-muted font-cairo">إدارة جميع مستخدمي المنصة</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold text-sm font-cairo hover:opacity-90 transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          مستخدم جديد
        </button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'إجمالي المستخدمين', value: stats.total, icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', color: 'from-blue-500 to-blue-600' },
          { label: 'نشط', value: stats.active, icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', color: 'from-emerald-500 to-emerald-600' },
          { label: 'جديد اليوم', value: stats.newToday, icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', color: 'from-amber-500 to-amber-600' },
          { label: 'المشرفين', value: stats.admins, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'from-purple-500 to-purple-600' },
        ].map((s, i) => (
          <motion.div key={i} variants={itemVariants}
            className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d={s.icon} /></svg>
              </div>
            </div>
            <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{s.value}</p>
            <p className="text-xs text-theme-muted font-cairo">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden mb-6">
        <div className="p-4 border-b border-theme-gold/10 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" /></svg>
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="بحث بالاسم، البريد الإلكتروني أو المعرف..."
              className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 pr-10 pl-4 text-sm font-cairo outline-none focus:border-theme-gold/40 transition-all" />
          </div>
          <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value as UserRole | ''); setPage(1); }}
            className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-3 text-sm font-cairo outline-none focus:border-theme-gold/40 transition-all">
            <option value="">كل الأدوار</option>
            {ROLES.map((r) => <option key={r} value={r}>{roleLabels[r]}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as UserStatus | ''); setPage(1); }}
            className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-3 text-sm font-cairo outline-none focus:border-theme-gold/40 transition-all">
            <option value="">كل الحالات</option>
            <option value="active">نشط</option>
            <option value="banned">محظور</option>
          </select>
          <span className="text-xs text-theme-muted font-cairo whitespace-nowrap">{filtered.length} مستخدم</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                <th className="text-right px-4 py-3 font-medium">المعرف</th>
                <th className="text-right px-4 py-3 font-medium">المستخدم</th>
                <th className="text-right px-4 py-3 font-medium">الدور</th>
                <th className="text-right px-4 py-3 font-medium">الحالة</th>
                <th className="text-right px-4 py-3 font-medium">تاريخ الانضمام</th>
                <th className="text-right px-4 py-3 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((u, i) => (
                <motion.tr key={u.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className={`border-b border-theme-gold/5 hover:bg-theme-gold/[0.02] transition-colors ${i % 2 === 0 ? 'bg-theme-surface/30' : ''}`}>
                  <td className="px-4 py-3 font-english text-xs text-theme-muted">{u.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-theme-gold/20 to-theme-gold/5 flex items-center justify-center text-xs font-bold text-theme-gold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <button onClick={() => setShowView(u)} className="text-sm text-theme font-cairo hover:text-theme-gold transition-colors">{u.name}</button>
                        <p className="text-[10px] text-theme-muted font-cairo">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold font-cairo border ${roleColors[u.role]} outline-none cursor-pointer`}>
                      {ROLES.map((r) => <option key={r} value={r}>{roleLabels[r]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold font-cairo ${u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      {u.status === 'active' ? 'نشط' : 'محظور'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-theme-muted font-cairo">{new Date(u.joinedAt).toLocaleDateString('ar-EG')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setShowView(u)}
                        className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      </button>
                      {u.status === 'active' ? (
                        <button onClick={() => handleStatusToggle(u.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-theme-muted hover:text-red-400 transition-all">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        </button>
                      ) : (
                        <button onClick={() => handleStatusToggle(u.id)}
                          className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-theme-muted hover:text-emerald-400 transition-all">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-theme-muted font-cairo text-sm">لا يوجد مستخدمين</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-theme-gold/10">
            <span className="text-xs text-theme-muted font-cairo">{filtered.length} من إجمالي {users.length} مستخدم</span>
            <div className="flex items-center gap-1">
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg text-xs font-cairo bg-theme-surface border border-theme-gold/15 text-theme disabled:opacity-30 hover:border-theme-gold/30 transition-all">السابق</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-english font-bold transition-all ${page === i + 1 ? 'bg-theme-gold text-dark-900' : 'bg-theme-surface border border-theme-gold/15 text-theme hover:border-theme-gold/30'}`}>
                  {i + 1}
                </button>
              ))}
              <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg text-xs font-cairo bg-theme-surface border border-theme-gold/15 text-theme disabled:opacity-30 hover:border-theme-gold/30 transition-all">التالي</button>
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowCreate(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-theme-gold/20 bg-theme-card p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">مستخدم جديد</h2>
                <button onClick={() => setShowCreate(false)} className="text-theme-muted hover:text-theme transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="space-y-4">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="الاسم الكامل" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="البريد الإلكتروني" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  type="password" placeholder="كلمة المرور" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="رقم الهاتف" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                  className="w-full bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40">
                  {ROLES.map((r) => <option key={r} value={r}>{roleLabels[r]}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button onClick={handleCreate}
                  className="flex-1 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold text-sm font-cairo hover:opacity-90 transition-all">إنشاء المستخدم</button>
                <button onClick={() => setShowCreate(false)}
                  className="px-5 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showView && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowView(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-theme-gold/20 bg-theme-card p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">بيانات المستخدم</h2>
                <button onClick={() => setShowView(null)} className="text-theme-muted hover:text-theme transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-theme-surface border border-theme-gold/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-theme-gold/30 to-theme-gold/10 flex items-center justify-center text-xl font-bold text-theme-gold">
                  {showView.name.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-bold font-cairo text-theme">{showView.name}</p>
                  <p className="text-xs text-theme-muted font-cairo">{showView.email}</p>
                  <p className="text-xs text-theme-muted font-cairo">{showView.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1">المعرف</p>
                  <p className="text-sm font-english text-theme">{showView.id}</p>
                </div>
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1">الدور</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-cairo ${roleColors[showView.role]}`}>{roleLabels[showView.role]}</span>
                </div>
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1">الحالة</p>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold font-cairo ${showView.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${showView.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    {showView.status === 'active' ? 'نشط' : 'محظور'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1">تاريخ الانضمام</p>
                  <p className="text-sm text-theme font-cairo">{new Date(showView.joinedAt).toLocaleDateString('ar-EG')}</p>
                </div>
              </div>
              <button onClick={() => setShowView(null)}
                className="w-full py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-cairo hover:bg-theme-gold/10 transition-all">إغلاق</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

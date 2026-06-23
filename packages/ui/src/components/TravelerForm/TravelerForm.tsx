'use client';

import { cn } from '../../utils/cn';
import type { TravelerFormProps } from './TravelerForm.types';

export function TravelerForm({ index, type, value = { firstName: '', lastName: '' }, onChange, className }: TravelerFormProps) {
  const update = (field: keyof typeof value, val: string) => onChange({ ...value, [field]: val });

  return (
    <div className={cn('bg-surface border border-border rounded-xl p-5 space-y-4', className)} role="group" aria-label={`بيانات المسافر ${index + 1}`}>
      <h4 className="text-body-md font-semibold text-text-primary">المسافر {index + 1} — {type}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-caption text-text-muted block mb-1">الاسم الأول</label>
          <input value={value.firstName} onChange={(e) => update('firstName', e.target.value)} className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="الاسم الأول" />
        </div>
        <div>
          <label className="text-caption text-text-muted block mb-1">اسم العائلة</label>
          <input value={value.lastName} onChange={(e) => update('lastName', e.target.value)} className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="اسم العائلة" />
        </div>
        <div>
          <label className="text-caption text-text-muted block mb-1">البريد الإلكتروني</label>
          <input value={value.email || ''} onChange={(e) => update('email', e.target.value)} className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="email@example.com" />
        </div>
        <div>
          <label className="text-caption text-text-muted block mb-1">رقم الجواز</label>
          <input value={value.passport || ''} onChange={(e) => update('passport', e.target.value)} className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="رقم الجواز" />
        </div>
      </div>
    </div>
  );
}

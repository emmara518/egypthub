'use client';

import { cn } from '../../utils/cn';
import type { BillingAddressProps } from './BillingAddress.types';

const countries = ['السعودية', 'الإمارات', 'قطر', 'الكويت', 'عمان', 'البحرين', 'مصر', 'الأردن'];

export function BillingAddress({ country = '', address = '', city = '', state = '', zip = '', onChange, className }: BillingAddressProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-body-sm font-semibold text-text-primary">عنوان الفوترة</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label htmlFor="ba-country" className="block text-caption text-text-muted mb-1">الدولة</label>
          <select id="ba-country" value={country} onChange={(e) => onChange('country', e.target.value)} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors">
            <option value="">اختر الدولة</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label htmlFor="ba-address" className="block text-caption text-text-muted mb-1">العنوان</label>
          <input id="ba-address" value={address} onChange={(e) => onChange('address', e.target.value)} placeholder="الشارع، رقم المبنى" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" />
        </div>
        <div>
          <label htmlFor="ba-city" className="block text-caption text-text-muted mb-1">المدينة</label>
          <input id="ba-city" value={city} onChange={(e) => onChange('city', e.target.value)} placeholder="المدينة" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" />
        </div>
        <div>
          <label htmlFor="ba-state" className="block text-caption text-text-muted mb-1">المنطقة</label>
          <input id="ba-state" value={state} onChange={(e) => onChange('state', e.target.value)} placeholder="المنطقة" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" />
        </div>
        <div>
          <label htmlFor="ba-zip" className="block text-caption text-text-muted mb-1">الرمز البريدي</label>
          <input id="ba-zip" value={zip} onChange={(e) => onChange('zip', e.target.value)} placeholder="00000" className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" />
        </div>
      </div>
    </div>
  );
}

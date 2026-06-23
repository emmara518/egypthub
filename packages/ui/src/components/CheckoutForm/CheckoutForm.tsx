'use client';

import { useState, useCallback, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { CheckoutFormProps } from './CheckoutForm.types';

export function CheckoutForm({ fields, onSubmit, submitLabel = 'إتمام الدفع', isLoading, className }: CheckoutFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const { [name]: _, ...rest } = prev; return rest; });
  }, [errors]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => { if (f.required && !values[f.name]?.trim()) newErrors[f.name] = `${f.label} مطلوب`; });
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    onSubmit(values);
  }, [fields, values, onSubmit]);

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-caption text-text-muted mb-1">{field.label}{field.required && <span className="text-error mr-1">*</span>}</label>
          {field.type === 'select' ? (
            <select id={field.name} value={values[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors">
              <option value="">اختر...</option>
              {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) : (
            <input id={field.name} type={field.type || 'text'} value={values[field.name] || ''} onChange={(e) => handleChange(field.name, e.target.value)} placeholder={field.placeholder} className="w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" />
          )}
          {errors[field.name] && <p className="text-caption text-error mt-1">{errors[field.name]}</p>}
        </div>
      ))}
      <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full py-3 bg-gold text-text-inverse rounded-xl text-body-md font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {isLoading ? 'جاري المعالجة...' : submitLabel}
      </motion.button>
    </form>
  );
}

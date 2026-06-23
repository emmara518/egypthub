'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { HiEye, HiEyeOff, HiMail, HiLockClosed, HiUser, HiPhone, HiChevronRight, HiBadgeCheck } from 'react-icons/hi';
import { PyramidIcon } from '@/components/EgyptianIcons';

const steps = [
  { num: '01', title: 'المعلومات الأساسية' },
  { num: '02', title: 'بيانات الحساب' },
  { num: '03', title: 'التأكيد' },
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!name.trim()) newErrors.name = 'الاسم مطلوب';
      if (!phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
      else if (!/^\+?\d{7,15}$/.test(phone)) newErrors.phone = 'رقم الهاتف غير صحيح';
    } else if (step === 1) {
      if (!email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'البريد الإلكتروني غير صحيح';
      if (!password) newErrors.password = 'كلمة المرور مطلوبة';
      else if (password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      if (password !== confirmPassword) newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(s => Math.min(s + 1, 2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { handleNext(); return; }
    if (!agreeTerms) { setErrors({ agree: 'يجب الموافقة على الشروط' }); return; }
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  const socialButtons = [
    { icon: FaGoogle, label: 'Google', color: '#EA4335' },
    { icon: FaFacebook, label: 'Facebook', color: '#1877F2' },
    { icon: FaApple, label: 'Apple', color: '#FFFFFF' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-theme-bg pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-gold/10 mb-4"
            >
              <PyramidIcon className="w-8 h-8 text-theme-gold" />
            </motion.div>
            <h1 className="text-2xl font-bold font-playfair text-theme">إنشاء حساب جديد</h1>
            <p className="text-theme-secondary mt-1 text-sm font-cairo">انضم إلى EGYPTHUB اليوم</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-english transition-all ${
                  i <= step ? 'bg-theme-gold text-dark-900' : 'bg-theme-elevated text-theme-muted'
                }`}>
                  {i < step ? '✓' : s.num}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 rounded ${i < step ? 'bg-theme-gold' : 'bg-theme-border'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-theme-border" />
            <span className="text-xs text-theme-muted font-cairo">سجل باستخدام</span>
            <div className="flex-1 h-px bg-theme-border" />
          </div>

          <div className="flex items-center gap-3 mb-6">
            {socialButtons.map((btn, i) => (
              <motion.button
                key={btn.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-theme-border bg-theme-elevated hover:bg-theme-hover transition-all"
              >
                <btn.icon className="text-lg" style={{ color: btn.color }} />
                <span className="text-xs text-theme-secondary font-cairo hidden sm:inline">{btn.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-theme-border" />
            <span className="text-xs text-theme-muted font-cairo">أو بالبريد الإلكتروني</span>
            <div className="flex-1 h-px bg-theme-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-theme mb-1.5 font-cairo">الاسم الكامل</label>
                    <div className="relative">
                      <HiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                      <input type="text" value={name} onChange={e => setName(e.target.value)}
                        placeholder="الاسم"
                        className={`w-full bg-theme-surface border rounded-xl pr-10 pl-4 py-3 outline-none transition-all focus:border-theme-gold/40 text-theme placeholder-theme-muted font-cairo ${
                          errors.name ? 'border-error' : 'border-theme-border'
                        }`} />
                    </div>
                    {errors.name && <p className="text-error text-xs mt-1 font-cairo">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme mb-1.5 font-cairo">رقم الهاتف</label>
                    <div className="relative">
                      <HiPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        placeholder="+20 100 000 0000"
                        className={`w-full bg-theme-surface border rounded-xl pr-10 pl-4 py-3 outline-none transition-all focus:border-theme-gold/40 text-theme placeholder-theme-muted font-english ${
                          errors.phone ? 'border-error' : 'border-theme-border'
                        }`} dir="ltr" />
                    </div>
                    {errors.phone && <p className="text-error text-xs mt-1 font-cairo">{errors.phone}</p>}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-theme mb-1.5 font-cairo">البريد الإلكتروني</label>
                    <div className="relative">
                      <HiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className={`w-full bg-theme-surface border rounded-xl pr-10 pl-4 py-3 outline-none transition-all focus:border-theme-gold/40 text-theme placeholder-theme-muted font-cairo ${
                          errors.email ? 'border-error' : 'border-theme-border'
                        }`} dir="ltr" />
                    </div>
                    {errors.email && <p className="text-error text-xs mt-1 font-cairo">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme mb-1.5 font-cairo">كلمة المرور</label>
                    <div className="relative">
                      <HiLockClosed className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full bg-theme-surface border rounded-xl pr-10 pl-10 py-3 outline-none transition-all focus:border-theme-gold/40 text-theme placeholder-theme-muted font-cairo ${
                          errors.password ? 'border-error' : 'border-theme-border'
                        }`} dir="ltr" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-gold transition-colors">
                        {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-error text-xs mt-1 font-cairo">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme mb-1.5 font-cairo">تأكيد كلمة المرور</label>
                    <div className="relative">
                      <HiLockClosed className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                      <input type={showConfirm ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full bg-theme-surface border rounded-xl pr-10 pl-10 py-3 outline-none transition-all focus:border-theme-gold/40 text-theme placeholder-theme-muted font-cairo ${
                          errors.confirmPassword ? 'border-error' : 'border-theme-border'
                        }`} dir="ltr" />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-gold transition-colors">
                        {showConfirm ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-error text-xs mt-1 font-cairo">{errors.confirmPassword}</p>}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4 text-center">
                  <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 mx-auto rounded-full bg-theme-gold/15 flex items-center justify-center">
                    <HiBadgeCheck className="text-4xl text-theme-gold" />
                  </motion.div>
                  <div>
                    <p className="text-lg font-bold font-playfair text-theme">مراجعة البيانات</p>
                    <p className="text-sm text-theme-muted font-cairo">تأكد من صحة بياناتك</p>
                  </div>
                  <div className="bg-theme-surface rounded-xl p-4 border border-theme-border text-right space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-theme-muted font-cairo">الاسم</span>
                      <span className="text-sm text-theme font-cairo">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-theme-muted font-cairo">الهاتف</span>
                      <span className="text-sm text-theme font-english">{phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-theme-muted font-cairo">البريد</span>
                      <span className="text-sm text-theme font-english">{email}</span>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer justify-center">
                    <div onClick={() => setAgreeTerms(!agreeTerms)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        agreeTerms ? 'bg-theme-gold border-theme-gold' : 'border-theme-border'
                      }`}>
                      {agreeTerms && <span className="text-dark-900 text-[8px]">✓</span>}
                    </div>
                    <span className="text-xs text-theme-secondary font-cairo">
                      أوافق على{' '}
                      <button type="button" className="text-theme-gold hover:underline">الشروط والأحكام</button>
                    </span>
                  </label>
                  {errors.agree && <p className="text-error text-xs font-cairo">{errors.agree}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <motion.button type="button" whileHover={{ scale: 1.02 }}
                  onClick={() => setStep(s => s - 1)}
                  className="flex-1 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                  السابق
                </motion.button>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full" />
                ) : step < 2 ? 'التالي' : 'إنشاء حساب'}
              </motion.button>
            </div>
          </form>

          <p className="text-center text-sm text-theme-secondary mt-6 font-cairo">
            عندك حساب؟{' '}
            <Link href="/auth/login" className="text-theme-gold font-semibold hover:text-theme-gold/80 transition-colors">
              سجل دخول
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

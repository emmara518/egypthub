'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { HiEye, HiEyeOff, HiMail, HiLockClosed, HiChevronRight } from 'react-icons/hi';
import { PyramidIcon } from '@/components/EgyptianIcons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'البريد الإلكتروني غير صحيح';
    if (!password) newErrors.password = 'كلمة المرور مطلوبة';
    else if (password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  const socialButtons = [
    { icon: FaGoogle, label: 'Google', color: '#EA4335', bg: 'bg-theme-elevated hover:bg-theme-hover' },
    { icon: FaFacebook, label: 'Facebook', color: '#1877F2', bg: 'bg-theme-elevated hover:bg-theme-hover' },
    { icon: FaApple, label: 'Apple', color: '#FFFFFF', bg: 'bg-theme-elevated hover:bg-theme-hover' },
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
            <h1 className="text-2xl font-bold font-playfair text-theme">تسجيل الدخول</h1>
            <p className="text-theme-secondary mt-1 text-sm font-cairo">أهلاً بعودتك إلى EGYPTHUB</p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-theme-border" />
            <span className="text-xs text-theme-muted font-cairo">أو سجل باستخدام</span>
            <div className="flex-1 h-px bg-theme-border" />
          </div>

          <div className="flex items-center gap-3 mb-6">
            {socialButtons.map((btn, i) => (
              <motion.button
                key={btn.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-theme-border ${btn.bg} transition-all`}
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
            <div>
              <label className="block text-sm font-medium text-theme mb-1.5 font-cairo">البريد الإلكتروني</label>
              <div className="relative">
                <HiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                  placeholder="example@email.com"
                  className={`w-full bg-theme-surface border rounded-xl pr-10 pl-4 py-3 outline-none transition-all duration-200 focus:border-theme-gold/40 text-theme placeholder-theme-muted font-cairo ${
                    errors.email ? 'border-error' : 'border-theme-border'
                  }`}
                  dir="ltr"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-error text-xs mt-1 font-cairo">{errors.email}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-sm font-medium text-theme mb-1.5 font-cairo">كلمة المرور</label>
              <div className="relative">
                <HiLockClosed className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })); }}
                  placeholder="••••••••"
                  className={`w-full bg-theme-surface border rounded-xl pr-10 pl-10 py-3 outline-none transition-all duration-200 focus:border-theme-gold/40 text-theme placeholder-theme-muted font-cairo ${
                    errors.password ? 'border-error' : 'border-theme-border'
                  }`}
                  dir="ltr"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-gold transition-colors">
                  {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-error text-xs mt-1 font-cairo">{errors.password}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    remember ? 'bg-theme-gold border-theme-gold' : 'border-theme-border'
                  }`}
                >
                  {remember && <span className="text-dark-900 text-[8px]">✓</span>}
                </div>
                <span className="text-xs text-theme-secondary font-cairo">تذكرني</span>
              </label>
              <button type="button" className="text-xs text-theme-gold hover:text-theme-gold/80 font-cairo transition-colors">
                نسيت كلمة المرور؟
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full" />
              ) : (
                <>دخول</>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-theme-secondary mt-6 font-cairo">
            ما عندكش حساب؟{' '}
            <Link href="/auth/register" className="text-theme-gold font-semibold hover:text-theme-gold/80 transition-colors">
              أنشئ حساب جديد
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

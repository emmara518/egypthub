'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PyramidIcon } from '@/components/EgyptianIcons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError('البريد الإلكتروني مطلوب');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('البريد الإلكتروني غير صحيح');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-theme-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-theme-gold/20 bg-theme-surface p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-gold/10 mb-4"
            >
              <PyramidIcon className="w-8 h-8 text-theme-gold" />
            </motion.div>
            <h1 className="text-2xl font-bold font-playfair text-white">نسيت كلمة المرور؟</h1>
            <p className="text-white/60 mt-1 text-sm font-cairo">
              {isSent
                ? 'تم إرسال رمز إعادة التعيين على بريدك الإلكتروني'
                : 'أدخل بريدك الإلكتروني وهنبعتلك رمز إعادة التعيين'
              }
            </p>
          </div>

          {isSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto rounded-full bg-theme-gold/15 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-theme-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </motion.div>

              <div className="bg-white/[0.04] rounded-xl p-4 border border-theme-gold/[0.08]">
                <p className="text-sm text-white/60 font-cairo">
                  تم إرسال رمز إعادة تعيين كلمة المرور إلى{' '}
                  <span className="text-theme-gold font-medium">{email}</span>
                </p>
              </div>

              <Link
                href="/auth/social-login"
                className="inline-flex items-center gap-2 text-theme-gold hover:text-theme-gold/80 transition-colors font-cairo text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                العودة لتسجيل الدخول
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white mb-1.5 font-cairo">البريد الإلكتروني</label>
                <div className="relative">
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                    placeholder="example@email.com"
                    className={`w-full bg-white/[0.04] border rounded-xl pr-10 pl-4 py-3 outline-none transition-all duration-200 focus:border-theme-gold/40 text-white placeholder-white/40 font-cairo ${
                      error ? 'border-red-500' : 'border-theme-gold/[0.08]'
                    }`}
                   
                  />
                </div>
                {error && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1 font-cairo">{error}</motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-l from-theme-gold to-theme-gold text-theme-bg font-bold text-sm font-cairo transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-theme-bg border-t-transparent rounded-full" />
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    إرسال رمز إعادة التعيين
                  </>
                )}
              </motion.button>
            </form>
          )}

          {!isSent && (
            <p className="text-center text-sm text-white/60 mt-6 font-cairo">
              <Link href="/auth/social-login" className="inline-flex items-center gap-2 text-theme-gold hover:text-theme-gold/80 transition-colors font-semibold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                العودة لتسجيل الدخول
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

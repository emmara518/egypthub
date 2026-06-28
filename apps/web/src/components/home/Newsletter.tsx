'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckSimple } from '@/components/Icons';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section className="bg-theme-bg py-12 md:py-16 border-t border-theme-gold/[0.06] glass-card">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
            <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">STAY INSPIRED</p>
            <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
          </div>
          <h2 className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold font-display text-white mb-2 gold-underline-center" style={{ paddingBottom: '8px' }}>
            Join Our Travel Community
          </h2>
          <p className="text-white/40 text-sm mb-6">Get exclusive Egypt travel tips, hidden gems, and special offers delivered weekly.</p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-theme-gold">
              <CheckSimple size={20} />
              <span className="text-sm font-english">You&apos;re subscribed! Welcome to the EgyptHub family.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md mx-auto">
              <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-theme-gold/[0.1] hover:border-theme-gold/25 transition-all">
                <Mail size={16} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required
                  className="bg-transparent text-sm text-white/70 font-english placeholder:text-white/30 w-full outline-none" aria-label="Email for newsletter" />
              </div>
              <button type="submit" className="gold-btn p-2.5 rounded-xl shrink-0 shadow-elevation-gold-1 hover:shadow-[0_4px_20px_rgba(212,162,76,0.35)] transition-all touch-target" aria-label="Subscribe">
                <ArrowRight size={16} className="text-theme-bg" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

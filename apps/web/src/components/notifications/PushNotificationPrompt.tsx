'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PushNotificationPrompt() {
  const [visible, setVisible] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (Notification.permission === 'granted') return;
    if (sessionStorage.getItem('egypthub-notif-denied')) { setDenied(true); return; }
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = async () => {
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        setVisible(false);
      }
    } catch { }
  };

  const handleDeny = () => {
    sessionStorage.setItem('egypthub-notif-denied', '1');
    setDenied(true);
    setVisible(false);
  };

  if (denied) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 left-4 right-4 z-50 max-w-sm mx-auto"
        >
          <div className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0E17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-cairo">هل تريد تلقي العروض والتحديثات؟</h3>
                <p className="text-xs text-white/60 font-cairo">فعل الإشعارات عشان يوصلك كل جديد</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAccept} className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-gold text-[#0A0E17] font-cairo font-bold text-sm">تفعيل</button>
              <button onClick={handleDeny} className="px-4 py-2.5 rounded-xl border border-white/20 text-white/80 font-cairo text-sm">لا الآن</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

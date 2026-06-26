'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

interface Purchase {
  recipient: string;
  amount: number;
  date: string;
}

const DESIGNS = [
  { id: 'pyramid', name: 'الأهرامات', svg: 'M40,80 L50,30 L60,80 Z' },
  { id: 'nile', name: 'النيل', svg: 'M20,50 Q50,30 80,50 Q50,70 20,50' },
  { id: 'lotus', name: 'اللوتس', svg: 'M50,80 Q30,50 50,20 Q70,50 50,80' },
];

export default function GiftCardsPage() {
  const [amount, setAmount] = useState<number>(500);
  const [custom, setCustom] = useState('');
  const [recipient, setRecipient] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [design, setDesign] = useState(DESIGNS[0].id);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const addXp = useAppStore((s) => s.addXp);
  const trackEvent = useAppStore((s) => s.trackEvent);

  const AMOUNTS = [500, 1000, 2000, 5000];

  useEffect(() => {
    const stored = localStorage.getItem('egypthub-gift-purchases');
    if (stored) setPurchases(JSON.parse(stored));
  }, []);

  const handleSend = () => {
    const purchase: Purchase = { recipient: recipient || 'صديق', amount, date: new Date().toISOString() };
    const updated = [...purchases, purchase];
    setPurchases(updated);
    localStorage.setItem('egypthub-gift-purchases', JSON.stringify(updated));
    setShowSuccess(true);
    addXp(25);
    trackEvent('GiftPurchase', '/gift-cards');
    setTimeout(() => setShowSuccess(false), 3000);
    setRecipient('');
    setEmail('');
    setMessage('');
  };

  const displayAmount = custom ? Number(custom) : amount;
  const currentDesign = DESIGNS.find((d) => d.id === design);

  return (
    <div className="min-h-screen bg-[#080C18] pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-cairo mb-2">بطاقات الهدايا</h1>
          <p className="text-sm text-white/60 font-cairo">أرسل هدية لأصدقائك وعائلتك</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-4">معاينة البطاقة</h2>
            <div className="aspect-[3/2] rounded-2xl bg-gradient-to-br from-amber-900/40 to-amber-700/20 border border-theme-gold/30 p-5 flex flex-col items-center justify-center text-center">
              <svg className="mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5">
                <path d={currentDesign?.svg || DESIGNS[0].svg} />
              </svg>
              <p className="text-2xl font-bold text-theme-gold font-english mb-1">{displayAmount.toLocaleString()} EGP</p>
              <p className="text-xs text-white/60 font-cairo">{recipient || 'إلى صديق'}</p>
              {message && <p className="text-[10px] text-white/40 font-cairo mt-2 truncate max-w-full">{message}</p>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-xs text-white/50 font-cairo mb-2">اختر التصميم</p>
              <div className="flex gap-2">
                {DESIGNS.map((d) => (
                  <button key={d.id} onClick={() => setDesign(d.id)} className={`px-3 py-1.5 rounded-lg text-xs font-cairo transition-colors ${design === d.id ? 'bg-theme-gold text-[#0A0E17]' : 'bg-white/10 text-white/80'}`}>{d.name}</button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-white/50 font-cairo mb-2">المبلغ</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {AMOUNTS.map((a) => (
                  <button key={a} onClick={() => { setAmount(a); setCustom(''); }} className={`px-3 py-1.5 rounded-lg text-xs font-english transition-colors ${amount === a && !custom ? 'bg-theme-gold text-[#0A0E17]' : 'bg-white/10 text-white/80'}`}>{a.toLocaleString()} ج.م</button>
                ))}
              </div>
              <input type="number" value={custom} onChange={(e) => { setCustom(e.target.value); }} placeholder="مبلغ مخصص" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30" />
            </div>

            <div>
              <p className="text-xs text-white/50 font-cairo mb-2">البيانات</p>
              <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="اسم المستلم" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-cairo outline-none focus:border-theme-gold/30 mb-2" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد الإلكتروني" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30 mb-2" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="رسالة (اختياري)" rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-cairo outline-none focus:border-theme-gold/30 resize-none" />
            </div>

            <button onClick={handleSend} disabled={!recipient && !email} className="w-full px-4 py-3 rounded-xl bg-gradient-gold text-[#0A0E17] font-cairo font-bold text-sm disabled:opacity-40">
              أرسل كهدية
            </button>
          </motion.div>
        </div>

        {purchases.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5">
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">سجل البطاقات المرسلة</h2>
            <div className="space-y-2">
              {purchases.slice(-5).reverse().map((p, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5">
                  <div>
                    <span className="text-sm text-white font-cairo">{p.recipient}</span>
                    <span className="text-[10px] text-white/40 font-cairo mr-2">{new Date(p.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <span className="text-xs text-theme-gold font-english">{p.amount.toLocaleString()} ج.م</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed bottom-8 left-4 right-4 max-w-sm mx-auto bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center">
            <p className="text-sm text-green-400 font-cairo">تم إرسال الهدية بنجاح! 🎉</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

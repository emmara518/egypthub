'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiPaperAirplane, HiMicrophone, HiSparkles, HiTrash, HiChat, HiPlus } from 'react-icons/hi';

interface Message {
  id: string;
  role: 'user' | 'zainab';
  content: string;
  timestamp: Date;
}

const suggestions = [
  'أفضل وقت لزيارة الأهرامات؟',
  'عايز أخطط رحلة 5 أيام في شرم الشيخ',
  'اقترح لي مطاعم في القاهرة',
  'إيه أحسن أنشطة ممكن أعملها في الغردقة؟',
  'محتاج فندق 5 نجوم في الأقصر',
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const SpeechRecognition = typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput('');

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai-concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10).map(m => ({ role: m.role === 'zainab' ? 'assistant' : 'user', content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.message || data.response || data.text || 'عفواً، حدث خطأ. حاول مرة أخرى.';
      const zainabMsg: Message = { id: `z-${Date.now()}`, role: 'zainab', content: reply, timestamp: new Date() };
      setMessages((prev) => [...prev, zainabMsg]);
    } catch {
      const errorMsg: Message = { id: `z-${Date.now()}`, role: 'zainab', content: 'عذراً، حدث خطأ في الاتصال. تحقق من اتصالك وحاول مرة أخرى.', timestamp: new Date() };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const toggleVoice = () => {
    if (!SpeechRecognition) return;
    if (isListening) { setIsListening(false); return; }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-EG';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event: any) => {
        setInput(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
      setIsListening(true);
    } catch { setIsListening(false); }
  };

  const newChat = () => setMessages([]);

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col">
      <div className="max-w-[1200px] mx-auto w-full px-4 lg:px-6 py-4 flex items-center justify-between border-b border-theme-gold/10">
        <div className="flex items-center gap-3">
          <Link href="/ai" className="text-theme-gold hover:text-theme-gold/80 transition-colors">
            <HiChevronLeft className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber flex items-center justify-center">
            <HiChat className="w-4 h-4 text-dark-900" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-theme font-cairo">زينب</h1>
            <p className="text-[10px] text-green-400 font-cairo">متصلة الآن</p>
          </div>
        </div>
        <button onClick={newChat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-surface border border-theme-gold/10 text-theme-muted hover:text-theme-gold hover:border-theme-gold/20 transition-all text-xs font-cairo">
          <HiPlus className="w-3.5 h-3.5" />
          محادثة جديدة
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 max-w-[800px] mx-auto w-full" ref={(el) => { if (el) el.scrollTop = el.scrollHeight; }}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px] mb-4">
              <div className="w-full h-full rounded-full bg-theme-card flex items-center justify-center">
                <HiSparkles className="w-7 h-7 text-theme-gold" />
              </div>
            </div>
            <h2 className="text-xl font-playfair font-bold text-theme mb-2">كيف أقدر أساعدك؟</h2>
            <p className="text-sm text-theme-muted font-cairo mb-6">اسألني عن أي شيء يخص رحلتك في مصر</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {suggestions.map((s) => (
                <button key={s} onClick={() => { setInput(s); inputRef.current?.focus(); }}
                  className="text-right p-3 rounded-xl bg-theme-surface border border-theme-gold/10 hover:border-theme-gold/20 hover:bg-theme-elevated transition-all text-xs text-theme-secondary font-cairo">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.role === 'zainab'
                      ? 'bg-theme-gold/10 border border-theme-gold/20 rounded-tl-sm'
                      : 'bg-theme-elevated border border-theme-gold/10 rounded-tr-sm'
                  }`}>
                    <p className="text-sm leading-relaxed text-theme font-cairo whitespace-pre-line">{msg.content}</p>
                    <p className="text-[9px] text-theme-muted mt-1 text-left font-cairo">
                      {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                <div className="bg-theme-gold/10 border border-theme-gold/20 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <motion.div key={d} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      className="w-1.5 h-1.5 rounded-full bg-theme-gold" />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      <div className="border-t border-theme-gold/10 bg-theme-bg px-4 lg:px-6 py-3">
        <div className="max-w-[800px] mx-auto w-full flex items-center gap-2">
          <button onClick={toggleVoice}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
              isListening ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-theme-surface border border-theme-gold/10 text-theme-muted hover:text-theme-gold'
            }`}>
            <HiMicrophone className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
          </button>

          <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك..."
            className="flex-1 bg-theme-surface border border-theme-gold/10 rounded-xl px-4 py-2.5 text-sm text-theme placeholder-theme-muted font-cairo outline-none focus:border-theme-gold/40 transition-all" />

          <button onClick={handleSend} disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-theme-gold flex items-center justify-center disabled:opacity-40 transition-all flex-shrink-0">
            <HiPaperAirplane className="w-4 h-4 text-dark-900 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}

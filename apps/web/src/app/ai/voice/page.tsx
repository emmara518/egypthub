'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiMicrophone, HiStop, HiChat, HiSparkles } from 'react-icons/hi';

export default function AIVoicePage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);

  const SpeechRecognition = typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;
  const isSupported = !!SpeechRecognition;
  const isSpeaking = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const speak = (text: string) => {
    if (!isSpeaking) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-EG';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-EG';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;
        setTranscript(text);
      };

      recognition.onend = () => setIsListening(false);
      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
    } catch { setIsListening(false); }
  };

  const handleSendTranscript = () => {
    if (!transcript.trim()) return;
    const newResponses = [...responses, transcript];
    setResponses(newResponses);
    setTranscript('');

    setTimeout(() => {
      const replies = ['فكرة رائعة! دعني أساعدك في التخطيط.', 'ممتاز! هذا وجهة جميلة جدًا.', 'بالتأكيد! سأجهز لك أفضل التوصيات.'];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setResponses((prev) => [...prev, reply]);
      speak(reply);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/ai" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-8">
          <HiChevronLeft className="w-4 h-4" />
          العودة
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isListening ? 'bg-red-500/20 scale-150' : 'bg-theme-gold/10'}`} />
            <button onClick={toggleListening}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all ${
                isListening ? 'bg-red-500 text-white scale-110' : 'bg-theme-gold/10 border border-theme-gold/20 text-theme-gold hover:bg-theme-gold/20'
              }`}>
              {isListening ? <HiStop className="w-8 h-8 animate-pulse" /> : <HiMicrophone className="w-8 h-8" />}
            </button>
          </div>

          <h1 className="text-2xl font-playfair font-bold text-theme mb-2">المساعد الصوتي</h1>
          <p className="text-sm text-theme-muted font-cairo">تحدث مع زينب بصوتك</p>
        </motion.div>

        {!isSupported && (
          <div className="text-center p-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 mb-8">
            <p className="text-sm text-amber-400 font-cairo">المتصفح لا يدعم التعرف الصوتي. استخدم Chrome أو Edge.</p>
          </div>
        )}

        {transcript && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="rounded-2xl bg-theme-gold/10 border border-theme-gold/20 p-4">
              <p className="text-sm text-theme font-cairo mb-2">🎤 نصك:</p>
              <p className="text-base text-theme font-cairo">{transcript}</p>
            </div>
            <button onClick={handleSendTranscript}
              className="mt-3 px-6 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:opacity-90 transition-all">
              إرسال
            </button>
          </motion.div>
        )}

        {responses.length > 0 && (
          <div className="space-y-4">
            {responses.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl px-4 py-3 ${
                  i % 2 === 0
                    ? 'bg-theme-card border border-theme-gold/10 mr-12'
                    : 'bg-theme-gold/10 border border-theme-gold/20 ml-12'
                }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold">
                    {i % 2 === 0 ? '🧑' : '🧕'}
                  </span>
                  <span className="text-[10px] text-theme-muted font-cairo">
                    {i % 2 === 0 ? 'أنت' : 'زينب'}
                  </span>
                </div>
                <p className="text-sm text-theme font-cairo">{r}</p>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/ai/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-surface border border-theme-border text-theme font-cairo text-sm hover:border-theme-gold/20 transition-all">
            <HiChat className="w-4 h-4" />
            الانتقال للمحادثة النصية
          </Link>
        </div>
      </div>
    </div>
  );
}

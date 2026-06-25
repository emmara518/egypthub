'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage, TripPlan, Recommendations } from '@/lib/zainab/types';
import { generateResponse, createSessionMemory } from '@/lib/zainab/conversationEngine';
import ZainabRecommendations from './ZainabRecommendations';
import TripPlannerCard from './TripPlannerCard';
import QuickIntents from './QuickIntents';

const TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: { zainab: 'زينب', online: 'متصلة الآن', newChat: 'بداية جديدة', placeholder: 'اكتب رسالتك...', suggestions: 'اقتراحات سريعة', langToggle: 'EN' },
  en: { zainab: 'Zainab', online: 'Online', newChat: 'New Chat', placeholder: 'Type your message...', suggestions: 'Quick Suggestions', langToggle: 'ع' },
};

let messageIdCounter = 0;

function createMessage(role: 'user' | 'zainab', content: string, extra?: Partial<ChatMessage>): ChatMessage {
  return {
    id: `msg-${++messageIdCounter}`,
    role,
    content,
    timestamp: Date.now(),
    ...extra,
  };
}

export default function AIConciergeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [memory] = useState(() => createSessionMemory());
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const SpeechRecognition = typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;
  const isSpeechSupported = !!SpeechRecognition;

  const toggleVoice = useCallback(() => {
    if (!isSpeechSupported) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'ar' ? 'ar-EG' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  }, [isListening, SpeechRecognition, isSpeechSupported, lang]);

  const t = TRANSLATIONS[lang];

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      const welcome = generateResponse('/start', [], memory);
      setMessages([createMessage('zainab', welcome.text, { recommendations: welcome.recommendations })]);
    }
  }, [memory, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const handleSend = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg = createMessage('user', trimmed);
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false);

    await new Promise(r => setTimeout(r, 400 + Math.random() * 600));

    const response = generateResponse(trimmed, messages, memory);

    setMessages(prev => [...prev, createMessage('zainab', response.text, {
      recommendations: response.recommendations,
      tripPlan: response.tripPlan,
    })]);

    setIsTyping(false);
  }, [isTyping, messages, memory]);

  const handleIntentSelect = useCallback(async (intent: string) => {
    const intentMessages: Record<string, string> = {
      relaxation: 'عاوز مكان هادي للاسترخاء',
      adventure: 'بحب المغامرات والإثارة',
      culture: 'مهتم بالتاريخ والثقافة',
      food: 'عاوز أجرب أكل مصري',
      luxury: 'بحب الفخامة والرفاهية',
      family: 'عاوز رحلة مناسبة للعيلة',
      honeymoon: 'عاوز مكان رومانسي لشهر العسل',
      diving: 'بحب الغوص والمياه',
      photography: 'بحب التصوير الفوتوغرافي',
      'digital-nomad': 'عاوز مكان أشتغل منه وأنا في مصر',
    };
    await handleSend(intentMessages[intent] || `عاوز حاجة ${intent}`);
  }, [handleSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-theme-gold/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-gold to-theme-gold/60 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0E17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-theme-card"
            />
          </div>
          <div>
            <h3 className="font-bold text-sm text-theme font-cairo">{t.zainab}</h3>
            <p className="text-[10px] text-green-400 font-cairo">{t.online}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="text-[10px] px-2 py-1 rounded-lg border border-theme-gold/20 text-theme-gold hover:bg-theme-gold/10 transition-colors font-cairo"
          >
            {t.langToggle}
          </button>
          {messages.length > 1 && (
            <button
              onClick={() => { setMessages([createMessage('zainab', generateResponse('/start', [], memory).text, { recommendations: generateResponse('/start', [], memory).recommendations })]); setShowSuggestions(true); }}
              className="text-[10px] text-theme-secondary hover:text-theme-gold transition-colors px-3 py-1 rounded-lg border border-theme-gold/10 font-cairo"
            >
              {t.newChat}
            </button>
          )}
        </div>
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[90%] space-y-2 ${
                msg.role === 'zainab' ? '' : ''
              }`}>
                <div className={`rounded-2xl px-4 py-2.5 ${
                  msg.role === 'zainab'
                    ? 'bg-theme-gold/10 border border-theme-gold/20 rounded-tl-sm'
                    : 'bg-theme-elevated rounded-tr-sm'
                }`}>
                  <p className="text-sm leading-relaxed text-theme font-cairo whitespace-pre-line">{msg.content}</p>
                </div>

                {msg.recommendations && (
                  <div className="pr-2">
                    <ZainabRecommendations recommendations={msg.recommendations} />
                  </div>
                )}

                {msg.tripPlan && (
                  <div className="pr-2">
                    <TripPlannerCard plan={msg.tripPlan} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end"
          >
            <div className="bg-theme-gold/10 border border-theme-gold/20 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
              {[0, 1, 2].map(d => (
                <motion.div
                  key={d}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, delay: d * 0.15, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-theme-gold"
                />
              ))}
            </div>
          </motion.div>
        )}

        {showSuggestions && messages.length <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-2"
          >
            <p className="text-xs text-theme-secondary text-center mb-3 font-cairo">{t.suggestions}</p>
            <QuickIntents onSelect={handleIntentSelect} />
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-3 border-t border-theme-gold/10">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.placeholder}
            className="flex-1 bg-theme-bg rounded-xl px-4 py-2.5 text-sm border border-theme focus:border-theme-gold/40 outline-none transition-colors placeholder:text-theme-muted text-theme font-cairo"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleVoice}
            disabled={!isSpeechSupported}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 ${isListening ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-theme-elevated border border-theme-gold/30 hover:border-theme-gold/60'}`}
          >
            <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isListening ? '#fff' : '#D4A24C'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              animate={isListening ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.8, repeat: Infinity }}>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </motion.svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-xl bg-theme-gold flex items-center justify-center disabled:opacity-40"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0E17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

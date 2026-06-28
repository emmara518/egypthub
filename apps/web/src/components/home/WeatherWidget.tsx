'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cityWeather: Record<string, { temp: number; condition: string; icon: string; forecast: { day: string; temp: number; icon: string }[] }> = {
  Cairo: { temp: 34, condition: 'Sunny', icon: '☀️', forecast: [
    { day: 'Tue', temp: 35, icon: '☀️' }, { day: 'Wed', temp: 33, icon: '⛅' },
    { day: 'Thu', temp: 32, icon: '🌤' }, { day: 'Fri', temp: 34, icon: '☀️' },
  ]},
  Luxor: { temp: 42, condition: 'Extreme Heat', icon: '🔥', forecast: [
    { day: 'Tue', temp: 43, icon: '🔥' }, { day: 'Wed', temp: 41, icon: '☀️' },
    { day: 'Thu', temp: 40, icon: '☀️' }, { day: 'Fri', temp: 42, icon: '🔥' },
  ]},
  Alexandria: { temp: 29, condition: 'Sea Breeze', icon: '🌊', forecast: [
    { day: 'Tue', temp: 28, icon: '🌤' }, { day: 'Wed', temp: 29, icon: '⛅' },
    { day: 'Thu', temp: 30, icon: '☀️' }, { day: 'Fri', temp: 28, icon: '⛅' },
  ]},
  'Sharm El Sheikh': { temp: 36, condition: 'Beach Perfect', icon: '🏖️', forecast: [
    { day: 'Tue', temp: 37, icon: '☀️' }, { day: 'Wed', temp: 36, icon: '☀️' },
    { day: 'Thu', temp: 35, icon: '🌤' }, { day: 'Fri', temp: 37, icon: '☀️' },
  ]},
};

const cities = Object.keys(cityWeather);

export default function WeatherWidget() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('Cairo');

  const w = cityWeather[city];

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] text-white/50 hover:border-theme-gold/20 hover:text-theme-gold/70 transition-all font-english touch-target"
        aria-label="Weather"
      >
        <span>{cityWeather[city].icon}</span>
        <span>{cityWeather[city].temp}°</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="absolute top-full mt-2 right-0 z-50 bg-theme-surface border border-theme-gold/20 rounded-xl p-4 shadow-elevation-3 w-[260px]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">WEATHER</span>
              <select value={city} onChange={e => setCity(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white/70 font-english outline-none">
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.06]">
              <span className="text-3xl">{w.icon}</span>
              <div>
                <p className="text-2xl font-bold font-english text-white">{w.temp}°C</p>
                <p className="text-xs text-white/50 font-english">{w.condition}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {w.forecast.map(f => (
                <div key={f.day} className="text-center">
                  <p className="text-[9px] text-white/40 font-english">{f.day}</p>
                  <p className="text-base">{f.icon}</p>
                  <p className="text-[10px] font-bold font-english text-white">{f.temp}°</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

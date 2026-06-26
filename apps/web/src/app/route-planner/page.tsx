'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { ChevronRight, Star, Clock, Location, Compass } from '@/components/Icons';

interface City {
  name: string;
  lat: number | null;
  lng: number | null;
}

interface NearbyExperience {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string | null;
  category: string;
  locationCity: string;
  priceEgp: number;
  averageRating: number;
  totalReviews: number;
  images: string[];
  durationHours: number | null;
  distanceKm: number;
}

export default function RoutePlannerPage() {
  const trackEvent = useAppStore((s) => s.trackEvent);
  const visitCity = useAppStore((s) => s.visitCity);

  const [cities, setCities] = useState<City[]>([]);
  const [departure, setDeparture] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [nearby, setNearby] = useState<NearbyExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nearbyLoading, setNearbyLoading] = useState(false);

  useEffect(() => {
    fetch('/api/explorer/cities')
      .then((r) => r.json())
      .then((res) => {
        setCities(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('فشل تحميل المدن');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!destination) {
      setNearby([]);
      return;
    }
    const city = cities.find((c) => c.name === destination);
    if (!city || !city.lat || !city.lng) return;

    setNearbyLoading(true);
    fetch(`/api/explorer/nearby?lat=${city.lat}&lng=${city.lng}&type=all&limit=6`)
      .then((r) => r.json())
      .then((res) => {
        setNearby(res.data || []);
        setNearbyLoading(false);
      })
      .catch(() => {
        setNearby([]);
        setNearbyLoading(false);
      });
  }, [destination, cities]);

  const destCity = cities.find((c) => c.name === destination);
  const depCity = cities.find((c) => c.name === departure);
  const destCoords = destCity?.lat && destCity?.lng ? `${destCity.lat.toFixed(2)}, ${destCity.lng.toFixed(2)}` : null;
  const depCoords = depCity?.lat && depCity?.lng ? `${depCity.lat.toFixed(2)}, ${depCity.lng.toFixed(2)}` : null;

  const handlePlan = () => {
    if (destination) {
      visitCity(destination);
      trackEvent('route_planner_plan', 'route-planner');
    }
  };

  const availableCities = cities.filter((c) => c.name !== departure);

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <ChevronRight size={14} />
          العودة للرئيسية
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold font-playfair text-white">مخطط الرحلة</h1>
            <p className="text-sm text-white/50 font-cairo mt-1">خطط لرحلتك المثالية في مصر</p>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border border-theme-gold/20 bg-[#0F1525]/80 p-5">
              <h2 className="text-sm font-bold text-white font-cairo mb-4">اختر مدنك</h2>

              {loading && (
                <div className="flex items-center gap-3 py-6">
                  <div className="w-5 h-5 border-2 border-theme-gold/30 border-t-theme-gold rounded-full animate-spin" />
                  <span className="text-sm text-white/50 font-cairo">جاري تحميل المدن...</span>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-400 font-cairo py-4">{error}</p>
              )}

              {!loading && !error && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/50 font-cairo mb-1.5 block">مدينة المغادرة</label>
                    <select
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="w-full bg-[#1A2235]/80 border border-theme-gold/15 rounded-xl px-4 py-2.5 text-white text-sm font-cairo focus:outline-none focus:border-theme-gold/40 transition-colors appearance-none"
                    >
                      <option value="">اختر مدينة المغادرة</option>
                      {cities.map((c) => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-white/50 font-cairo mb-1.5 block">الوجهة</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-[#1A2235]/80 border border-theme-gold/15 rounded-xl px-4 py-2.5 text-white text-sm font-cairo focus:outline-none focus:border-theme-gold/40 transition-colors appearance-none"
                    >
                      <option value="">اختر الوجهة</option>
                      {availableCities.map((c) => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {departure && destination && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-theme-gold/5 border border-theme-gold/15 p-4 mt-2"
                    >
                      <div className="flex items-center gap-3 text-sm">
                        <Compass size={18} />
                        <div>
                          <p className="text-white font-cairo font-bold">{departure} <span className="text-white/30 mx-1">→</span> {destination}</p>
                          {depCoords && destCoords && (
                            <p className="text-[10px] text-white/40 font-english mt-0.5">
                              {depCoords} → {destCoords}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {destination && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-theme-gold/20 bg-[#0F1525]/80 p-5 mt-4"
              >
                <h3 className="text-sm font-bold text-white font-cairo mb-3 flex items-center gap-2">
                  <Location size={14} />
                  تجارب قريبة من {destination}
                </h3>

                {nearbyLoading && (
                  <div className="flex items-center gap-3 py-4">
                    <div className="w-4 h-4 border-2 border-theme-gold/30 border-t-theme-gold rounded-full animate-spin" />
                    <span className="text-xs text-white/50 font-cairo">جار التحميل...</span>
                  </div>
                )}

                {!nearbyLoading && nearby.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-white/30 text-xs font-cairo">لا توجد تجارب متاحة في هذه المنطقة</p>
                  </div>
                )}

                {!nearbyLoading && nearby.length > 0 && (
                  <div className="space-y-2">
                    {nearby.map((exp) => (
                      <Link
                        key={exp.id}
                        href={`/experiences/${exp.slug}`}
                        className="flex items-center gap-3 bg-[#1A2235]/60 rounded-xl border border-theme-gold/10 p-3 hover:bg-[#1A2235]/90 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-theme-surface">
                          {exp.images[0] ? (
                            <img src={exp.images[0]} alt={exp.titleAr} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-theme-gold/30 text-xs">📍</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white font-cairo truncate group-hover:text-theme-gold transition-colors">{exp.titleAr}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-0.5">
                              <Star size={10} />
                              <span className="text-[10px] text-theme-gold font-english">{exp.averageRating}</span>
                            </div>
                            <span className="text-[10px] text-white/30 font-english">·</span>
                            <span className="text-[10px] text-white/40 font-english">{exp.distanceKm} كم</span>
                            <span className="text-[10px] text-white/30 font-english">·</span>
                            <span className="text-[10px] text-theme-gold font-cairo font-bold">ج.م {exp.priceEgp.toLocaleString()}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <div className="lg:w-80 shrink-0">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-theme-gold/20 bg-[#0F1525]/80 p-5 text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0F1525] flex items-center justify-center">
                      <span className="text-3xl">🗺️</span>
                    </div>
                  </div>
                </div>
                {destination ? (
                  <>
                    <p className="text-lg font-bold font-playfair text-white mb-1">{destination}</p>
                    <p className="text-xs text-white/50 font-cairo mb-3">الوجهة المختارة</p>
                    {nearby.length > 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <Star size={14} />
                        <span className="text-xl font-bold font-playfair text-theme-gold">{nearby.length}</span>
                        <span className="text-[10px] text-white/50 font-cairo">تجربة قريبة</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold font-playfair text-white mb-1">{cities.length}</p>
                    <p className="text-xs text-white/50 font-cairo">مدينة متاحة</p>
                  </>
                )}
              </div>

              {destination && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handlePlan}
                  className="w-full gold-btn rounded-xl py-3 text-sm font-bold font-cairo flex items-center justify-center gap-2"
                >
                  <Compass size={16} />
                  ابدأ التخطيط
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

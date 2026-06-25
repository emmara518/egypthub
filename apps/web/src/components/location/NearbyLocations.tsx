'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import destinations from '@/data/destinations.json';

interface Place {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  distance?: number;
}

const staticPlaces: Place[] = [
  { id: 'r1', name: 'مطعم أبو شقرا', type: 'مطعم', lat: 30.048, lng: 31.237 },
  { id: 'r2', name: 'مطعم كازا', type: 'مطعم', lat: 30.052, lng: 31.235 },
  { id: 'r3', name: 'مطعم فلفلة', type: 'مطعم', lat: 31.201, lng: 29.915 },
  { id: 'h1', name: 'فندق ماريوت القاهرة', type: 'فندق', lat: 30.056, lng: 31.222 },
  { id: 'h2', name: 'فندق سميراميس', type: 'فندق', lat: 30.042, lng: 31.234 },
  { id: 'h3', name: 'فندق سان ستيفانو', type: 'فندق', lat: 31.205, lng: 29.91 },
  { id: 'a1', name: 'الأهرامات', type: 'معلم سياحي', lat: 29.9792, lng: 31.1342 },
  { id: 'a2', name: 'المتحف المصري', type: 'معلم سياحي', lat: 30.0478, lng: 31.2336 },
  { id: 'a3', name: 'قلعة قايتباي', type: 'معلم سياحي', lat: 31.2135, lng: 29.8854 },
  { id: 'a4', name: 'مكتبة الإسكندرية', type: 'معلم سياحي', lat: 31.2, lng: 29.908 },
];

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getCityFromCoords(lat: number, lng: number): string {
  let minDist = Infinity;
  let nearest = 'القاهرة';
  for (const d of destinations) {
    const dist = haversine(lat, lng, d.coordinates.lat, d.coordinates.lng);
    if (dist < minDist) { minDist = dist; nearest = d.nameAr; }
  }
  return nearest;
}

export default function NearbyLocations() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<(Place & { distance: number })[]>([]);
  const [nearbyExperiences, setNearbyExperiences] = useState<{ name: string; highlights: string[]; distance: number }[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(() => {
    setLoading(true);
    setError('');
    if (!navigator.geolocation) {
      setError('لم نتمكن من تحديد موقعك');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocation(coords);
        const withDist = staticPlaces
          .map((p) => ({ ...p, distance: haversine(coords.lat, coords.lng, p.lat, p.lng) }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 6);
        setNearbyPlaces(withDist);
        const detectedCity = getCityFromCoords(coords.lat, coords.lng);
        const cityDest = destinations.find((d) => d.nameAr === detectedCity);
        if (cityDest) {
          setNearbyExperiences([
            { name: cityDest.nameAr, highlights: cityDest.highlights.slice(0, 3), distance: 0 },
            ...destinations
              .filter((d) => d.nameAr !== detectedCity)
              .map((d) => ({
                name: d.nameAr,
                highlights: d.highlights.slice(0, 2),
                distance: Math.round(haversine(coords.lat, coords.lng, d.coordinates.lat, d.coordinates.lng)),
              }))
              .sort((a, b) => a.distance - b.distance)
              .slice(0, 3),
          ]);
        }
        setLoading(false);
      },
      () => {
        setError('لم نتمكن من تحديد موقعك');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const cities = useMemo(() => destinations.map((d) => d.nameAr), []);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-theme-gold/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          </div>
          <h3 className="text-sm font-bold text-white font-cairo">الأماكن القريبة منك</h3>
        </div>

        {!location && !error && (
          <button
            onClick={getLocation}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl bg-gradient-gold text-[#0A0E17] font-cairo font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.3 8 11.7z" /></svg>
            {loading ? 'جاري التحديد...' : 'حدد موقعك'}
          </button>
        )}

        {error && (
          <div>
            <p className="text-sm text-red-400 font-cairo mb-3">{error}</p>
            <select
              onChange={(e) => {
                const d = destinations.find((x) => x.nameAr === e.target.value);
                if (d) {
                  setLocation(d.coordinates);
                  setError('');
                }
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-cairo outline-none focus:border-theme-gold/30"
            >
              <option value="">اختر مدينة يدوياً</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}

        {nearbyPlaces.length > 0 && (
          <div className="space-y-2 mt-3">
            <p className="text-xs text-theme-gold font-cairo font-bold">أقرب الأماكن لك</p>
            {nearbyPlaces.map((place) => (
              <div key={place.id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5">
                <div>
                  <p className="text-sm text-white font-cairo">{place.name}</p>
                  <p className="text-xs text-white/50 font-cairo">{place.type}</p>
                </div>
                <span className="text-xs text-theme-gold font-cairo">{place.distance.toFixed(1)} كم</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {nearbyExperiences.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5"
        >
          <h3 className="text-sm font-bold text-white font-cairo mb-3">أقرب اليك — تجارب مميزة</h3>
          <div className="space-y-2">
            {nearbyExperiences.map((exp, idx) => (
              <div key={idx} className="px-3 py-2.5 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-white font-cairo font-bold">{exp.name}</p>
                  {exp.distance > 0 && <span className="text-xs text-theme-gold font-cairo">{exp.distance} كم</span>}
                </div>
                <div className="flex flex-wrap gap-1">
                  {exp.highlights.map((h, hi) => (
                    <span key={hi} className="text-[10px] px-2 py-0.5 rounded-full bg-theme-gold/10 text-theme-gold font-cairo">{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

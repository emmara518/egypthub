import type { Destination, Experience, TripPlan, TripPlanDay } from './types';

import destinationsData from '@/data/destinations.json';
import experiencesData from '@/data/experiences.json';

const destinations: Destination[] = destinationsData as Destination[];
const experiences: Experience[] = experiencesData as Experience[];

export interface TripOptions {
  budget?: string;
  travelerType?: string;
  preferences?: Record<string, any>;
}

const TRAVELER_LABELS: Record<string, string> = {
  solo: 'مغامر منفرد',
  couple: 'ثنائي رومانسي',
  family: 'عائلة',
  friends: 'أصدقاء',
  business: 'رجال أعمال',
};

const BUDGET_LABELS: Record<string, string> = {
  budget: 'اقتصادي',
  'mid-range': 'متوسط',
  luxury: 'فاخر',
};

const TRAVEL_TIMES: Record<string, Record<string, string>> = {
  'cairo': { 'alexandria': 'ساعتين ونص', 'luxor': 'ساعة طيران' },
  'alexandria': { 'cairo': 'ساعتين ونص' },
  'luxor': { 'aswan': '٣ ساعات', 'cairo': 'ساعة طيران' },
  'aswan': { 'luxor': '٣ ساعات', 'abu-simbel': '٣ ساعات' },
};

function getTimeEstimate(citySlug: string, targetSlug: string): string | null {
  return TRAVEL_TIMES[citySlug]?.[targetSlug] || TRAVEL_TIMES[targetSlug]?.[citySlug] || null;
}

const CITY_ITINERARIES: Record<string, { day: number; title: string; expIds: string[]; }[]> = {
  'cairo': [
    { day: 1, title: 'اليوم الأول — عظمة الفراعنة', expIds: ['cairo-1', 'cairo-10'] },
    { day: 2, title: 'اليوم التاني — رحلة في التاريخ', expIds: ['cairo-2', 'cairo-8'] },
    { day: 3, title: 'اليوم التالت — ثقافة وأكل', expIds: ['cairo-3', 'cairo-6', 'cairo-9'] },
    { day: 4, title: 'اليوم الرابع — استرخاء واستكشاف', expIds: ['cairo-4', 'cairo-5', 'cairo-7'] },
    { day: 5, title: 'اليوم الخامس — ختام القاهرة', expIds: ['cairo-8', 'cairo-9'] },
  ],
  'alexandria': [
    { day: 1, title: 'اليوم الأول — عروس المتوسط', expIds: ['alexandria-1', 'alexandria-2'] },
    { day: 2, title: 'اليوم التاني — تاريخ وثقافة', expIds: ['alexandria-3', 'alexandria-5', 'alexandria-7'] },
    { day: 3, title: 'اليوم التالت — بحر وأكل', expIds: ['alexandria-4', 'alexandria-6', 'alexandria-10'] },
  ],
  'luxor': [
    { day: 1, title: 'اليوم الأول — البر الغربي', expIds: ['luxor-2', 'luxor-7'] },
    { day: 2, title: 'اليوم التاني — البر الشرقي', expIds: ['luxor-1', 'luxor-4'] },
    { day: 3, title: 'اليوم التالت — كنوز الفراعنة', expIds: ['luxor-5', 'luxor-6', 'luxor-8'] },
    { day: 4, title: 'اليوم الرابع — ختام لا يُنسى', expIds: ['luxor-3', 'luxor-9'] },
  ],
  'aswan': [
    { day: 1, title: 'اليوم الأول — سحر النوبة', expIds: ['aswan-3', 'aswan-4'] },
    { day: 2, title: 'اليوم التاني — معابد خالدة', expIds: ['aswan-1', 'aswan-2', 'aswan-5'] },
    { day: 3, title: 'اليوم التالت — ثقافة وطبيعة', expIds: ['aswan-6', 'aswan-8', 'aswan-10'] },
  ],
  'sharm-el-sheikh': [
    { day: 1, title: 'اليوم الأول — جنة الغوص', expIds: ['sharm-el-sheikh-1', 'sharm-el-sheikh-4'] },
    { day: 2, title: 'اليوم التاني — بحر ورمال', expIds: ['sharm-el-sheikh-3', 'sharm-el-sheikh-6', 'sharm-el-sheikh-10'] },
    { day: 3, title: 'اليوم التالت — ثقافة وترفيه', expIds: ['sharm-el-sheikh-2', 'sharm-el-sheikh-8', 'sharm-el-sheikh-9'] },
    { day: 4, title: 'اليوم الرابع — مغامرة واستجمام', expIds: ['sharm-el-sheikh-5', 'sharm-el-sheikh-7'] },
  ],
  'hurghada': [
    { day: 1, title: 'اليوم الأول — جزر ومرجان', expIds: ['hurghada-1', 'hurghada-4'] },
    { day: 2, title: 'اليوم التاني — صحراء وبحر', expIds: ['hurghada-3', 'hurghada-7', 'hurghada-5'] },
    { day: 3, title: 'اليوم التالت — ثقافة واسترخاء', expIds: ['hurghada-2', 'hurghada-6', 'hurghada-8', 'hurghada-9'] },
  ],
  'dahab': [
    { day: 1, title: 'اليوم الأول — غوص وتحدي', expIds: ['dahab-1', 'dahab-6'] },
    { day: 2, title: 'اليوم التاني — مغامرة في البر', expIds: ['dahab-3', 'dahab-7', 'dahab-5'] },
    { day: 3, title: 'اليوم التالت — استرخاء وثقافة', expIds: ['dahab-2', 'dahab-4', 'dahab-8', 'dahab-9'] },
  ],
  'siwa': [
    { day: 1, title: 'اليوم الأول — واحة الأساطير', expIds: ['siwa-1', 'siwa-4'] },
    { day: 2, title: 'اليوم التاني — أرض العيون', expIds: ['siwa-2', 'siwa-3', 'siwa-5'] },
    { day: 3, title: 'اليوم التالت — ثقافة سيوة', expIds: ['siwa-6', 'siwa-7', 'siwa-8', 'siwa-10'] },
    { day: 4, title: 'اليوم الرابع — نجوم الصحراء', expIds: ['siwa-9'] },
  ],
};

export function planTrip(citySlug: string, days: number, options?: TripOptions): TripPlan | null {
  const city = destinations.find(d => d.slug === citySlug);
  if (!city) return null;

  const budget = options?.budget || 'mid-range';
  const travelerType = options?.travelerType || 'solo';
  const preferences = options?.preferences || {};

  const itinerary = CITY_ITINERARIES[citySlug] || generateAutoItinerary(citySlug, days, preferences);
  const clampedDays = itinerary.slice(0, Math.min(days, itinerary.length));

  const planDays: TripPlanDay[] = clampedDays.map(d => {
    const dayExperiences = d.expIds
      .map(id => experiences.find(e => e.id === id))
      .filter((e): e is Experience => !!e);

    const filteredExps = budget === 'budget'
      ? dayExperiences.filter(e => e.priceRange === 'منخفض' || !e.priceRange)
      : budget === 'luxury'
        ? dayExperiences.filter(e => e.priceRange === 'مرتفع' || !e.priceRange)
        : dayExperiences;

    const finalExps = filteredExps.length > 0 ? filteredExps : dayExperiences.slice(0, 3);

    return {
      day: d.day,
      title: d.title,
      experiences: finalExps,
      description: finalExps.map(e => `${e.name} (${e.duration})`).join(' ← '),
    };
  });

  const dayLabels: Record<number, string> = { 1: 'يوم', 2: 'يومين' };
  const durationLabel = days <= 2 ? dayLabels[days] || `${days} أيام` : `${days} أيام`;

  const budgetLabel = BUDGET_LABELS[budget] || '';
  const travelerLabel = TRAVELER_LABELS[travelerType] || '';

  const nearbyCities: string[] = [];
  for (const [from, tos] of Object.entries(TRAVEL_TIMES)) {
    if (from === citySlug) nearbyCities.push(...Object.keys(tos));
    else {
      for (const to of Object.keys(tos)) {
        if (to === citySlug && !nearbyCities.includes(from)) nearbyCities.push(from);
      }
    }
  }

  return {
    city,
    days: planDays,
    totalDuration: durationLabel,
    budget: budgetLabel || undefined,
    travelerType: travelerLabel || undefined,
    timeEstimates: planDays.length > 1 ? {
      betweenDays: `متوسط وقت التنقل بين الأنشطة: ٣٠-٤٥ دقيقة`,
      travelToCity: nearbyCities.length > 0 ? `مدن قريبة: ${nearbyCities.slice(0, 2).join('، ')}` : undefined,
    } : undefined,
  };
}

function generateAutoItinerary(citySlug: string, days: number, preferences?: Record<string, any>): { day: number; title: string; expIds: string[]; }[] {
  const cityExps = experiences.filter(e => e.citySlug === citySlug);
  const result: { day: number; title: string; expIds: string[]; }[] = [];

  for (let i = 0; i < days; i++) {
    const startIdx = (i * 2) % Math.max(cityExps.length, 1);
    const expIds = cityExps.slice(startIdx, startIdx + 2).map(e => e.id);
    result.push({
      day: i + 1,
      title: `اليوم ${['الأول', 'التاني', 'التالت', 'الرابع', 'الخامس', 'السادس'][i] || `${i + 1}`}`,
      expIds,
    });
  }

  return result;
}

export function getAvailableTripCities(): Destination[] {
  return destinations.filter(d => CITY_ITINERARIES[d.slug] || experiences.some(e => e.citySlug === d.slug));
}

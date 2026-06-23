import type { Destination, Experience, TripPlan, TripPlanDay } from './types';

import destinationsData from '@/data/destinations.json';
import experiencesData from '@/data/experiences.json';

const destinations: Destination[] = destinationsData as Destination[];
const experiences: Experience[] = experiencesData as Experience[];

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

export function planTrip(citySlug: string, days: number): TripPlan | null {
  const city = destinations.find(d => d.slug === citySlug);
  if (!city) return null;

  const itinerary = CITY_ITINERARIES[citySlug] || generateAutoItinerary(citySlug, days);
  const clampedDays = itinerary.slice(0, Math.min(days, itinerary.length));

  const planDays: TripPlanDay[] = clampedDays.map(d => {
    const dayExperiences = d.expIds
      .map(id => experiences.find(e => e.id === id))
      .filter(Boolean) as Experience[];

    return {
      day: d.day,
      title: d.title,
      experiences: dayExperiences,
      description: dayExperiences.map(e => e.name).join(' | '),
    };
  });

  const dayLabels: Record<number, string> = { 1: 'يوم', 2: 'يومين' };
  const durationLabel = days <= 2 ? dayLabels[days] || `${days} أيام` : `${days} أيام`;

  return {
    city,
    days: planDays,
    totalDuration: durationLabel,
  };
}

function generateAutoItinerary(citySlug: string, days: number): { day: number; title: string; expIds: string[]; }[] {
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

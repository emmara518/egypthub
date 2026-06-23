import type { NetworkAmbassador } from './types';
import ambassadorsData from '@/data/network/ambassadors.json';

const ambassadors = ambassadorsData as NetworkAmbassador[];

export function getAllAmbassadors(): NetworkAmbassador[] {
  return [...ambassadors];
}

export function getAmbassadorById(id: string): NetworkAmbassador | undefined {
  return ambassadors.find((a) => a.id === id);
}

export function getAmbassadorsByCity(city: string): NetworkAmbassador[] {
  return ambassadors.filter((a) => a.city.toLowerCase() === city.toLowerCase());
}

export function getAmbassadorsByRole(role: string): NetworkAmbassador[] {
  return ambassadors.filter((a) => a.role.toLowerCase() === role.toLowerCase());
}

export function getVerifiedAmbassadors(): NetworkAmbassador[] {
  return ambassadors.filter((a) => a.verified);
}

export function getTopAmbassadors(limit: number = 10): NetworkAmbassador[] {
  return [...ambassadors].sort((a, b) => b.totalConversions - a.totalConversions).slice(0, limit);
}

export function searchAmbassadors(query: string): NetworkAmbassador[] {
  const q = query.toLowerCase();
  return ambassadors.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.nameEn.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.bio.toLowerCase().includes(q) ||
      a.specialties.some((s) => s.toLowerCase().includes(q)) ||
      a.languages.some((l) => l.toLowerCase().includes(q))
  );
}

export function getAmbassadorByReferralCode(code: string): NetworkAmbassador | undefined {
  return ambassadors.find((a) => a.referralCode === code);
}

export function generateReferralCode(index: number): string {
  const num = String(index + 1).padStart(4, '0');
  return `EGY-AMB-${num}`;
}

export function getAmbassadorStats(): { total: number; byCity: Record<string, number>; byRole: Record<string, number>; avgRating: number; totalVerified: number } {
  const byCity: Record<string, number> = {};
  const byRole: Record<string, number> = {};
  let ratingSum = 0;

  for (const a of ambassadors) {
    byCity[a.city] = (byCity[a.city] || 0) + 1;
    byRole[a.role] = (byRole[a.role] || 0) + 1;
    ratingSum += a.rating;
  }

  return {
    total: ambassadors.length,
    byCity,
    byRole,
    avgRating: ambassadors.length > 0 ? ratingSum / ambassadors.length : 0,
    totalVerified: ambassadors.filter((a) => a.verified).length,
  };
}

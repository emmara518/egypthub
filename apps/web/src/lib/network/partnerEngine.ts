import type { Partner, PartnerCategory, PartnerStatus } from './types';
import partnersData from '@/data/network/partners.json';

const partners = partnersData as Partner[];

function generateId(): string {
  return `prt-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

export function getAllPartners(): Partner[] {
  return [...partners];
}

export function getPartnerById(id: string): Partner | undefined {
  return partners.find((p) => p.id === id);
}

export function getPartnersByCity(city: string): Partner[] {
  return partners.filter((p) => p.city.toLowerCase() === city.toLowerCase());
}

export function getPartnersByCategory(category: PartnerCategory): Partner[] {
  return partners.filter((p) => p.category === category);
}

export function getApprovedPartners(): Partner[] {
  return partners.filter((p) => p.status === 'approved');
}

export function getFeaturedPartners(): Partner[] {
  return partners.filter((p) => p.featured && p.status === 'approved');
}

export function getPartnersByAmbassador(ambassadorId: string): Partner[] {
  return partners.filter((p) => p.ambassadorIds.includes(ambassadorId));
}

export function searchPartners(query: string): Partner[] {
  const q = query.toLowerCase();
  return partners.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.services.some((s) => s.toLowerCase().includes(q))
  );
}

export function getPartnerStats(): { total: number; byCity: Record<string, number>; byCategory: Record<string, number>; avgRating: number } {
  const byCity: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  let ratingSum = 0;

  for (const p of partners) {
    byCity[p.city] = (byCity[p.city] || 0) + 1;
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
    ratingSum += p.rating;
  }

  return {
    total: partners.length,
    byCity,
    byCategory,
    avgRating: partners.length > 0 ? ratingSum / partners.length : 0,
  };
}

export function createPartner(data: Omit<Partner, 'id' | 'status' | 'joinedAt' | 'totalLeads' | 'totalReferrals'>): Partner {
  return {
    ...data,
    id: generateId(),
    status: 'draft',
    totalLeads: 0,
    totalReferrals: 0,
    joinedAt: new Date().toISOString(),
  };
}

export function updatePartnerStatus(id: string, status: PartnerStatus): void {
  const partner = partners.find((p) => p.id === id);
  if (partner) {
    partner.status = status;
  }
}

import type { Referral, ReferralType, ReferralSource } from './types';
import referralsData from '@/data/network/referrals.json';
import { getAmbassadorByReferralCode } from './ambassadorEngine';

const referrals = referralsData as Referral[];

function generateId(): string {
  return `ref-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

export function createReferral(data: Omit<Referral, 'id' | 'createdAt'>): Referral {
  const referral: Referral = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  referrals.push(referral);
  return referral;
}

export function getReferralsByAmbassador(ambassadorId: string): Referral[] {
  return referrals.filter((r) => r.ambassadorId === ambassadorId);
}

export function getReferralsByCode(code: string): Referral[] {
  return referrals.filter((r) => r.referralCode === code);
}

export function getReferralStats(ambassadorId: string): { clicks: number; visits: number; leads: number; conversions: number } {
  const ambassadorReferrals = referrals.filter((r) => r.ambassadorId === ambassadorId);
  return {
    clicks: ambassadorReferrals.filter((r) => r.type === 'click').length,
    visits: ambassadorReferrals.filter((r) => r.type === 'visit').length,
    leads: ambassadorReferrals.filter((r) => r.type === 'lead').length,
    conversions: ambassadorReferrals.filter((r) => r.type === 'conversion').length,
  };
}

export function generateReferralLink(ambassadorId: string, targetPage: string): string {
  const ambassador = getAmbassadorByIdFallback(ambassadorId);
  const code = ambassador?.referralCode ?? ambassadorId;
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://egypthub.com';
  return `${base}/r/${code}?ref=${code}&to=${encodeURIComponent(targetPage)}`;
}

function getAmbassadorByIdFallback(id: string) {
  try {
    return getAmbassadorByReferralCode(id) ?? { referralCode: id };
  } catch {
    return { referralCode: id };
  }
}

export function trackReferralClick(code: string, metadata: Record<string, string>): void {
  createReferral({
    ambassadorId: metadata.ambassadorId || '',
    ambassadorName: metadata.ambassadorName || '',
    referralCode: code,
    type: 'click',
    source: (metadata.source as ReferralSource) || 'link',
    destination: metadata.destination || '',
    targetPage: metadata.targetPage || '',
    leadId: null,
    commissionId: null,
    metadata,
  });
}

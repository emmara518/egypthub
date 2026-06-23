import type { Commission, CommissionType, CommissionStatus } from './types';
import commissionsData from '@/data/network/commissions.json';
import { getLeadById } from './leadPipelineEngine';
import { getPartnerById } from './partnerEngine';
import settingsData from '@/data/network/settings.json';

const commissions = commissionsData as Commission[];
const settings = settingsData as { commissionRates?: { flat?: { rate?: number }; percentage?: { rate?: number }; tier?: { tiers?: { min: number; max: number; rate: number }[] } } };

function generateId(): string {
  return `com-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

function getFlatRate(): number {
  return settings?.commissionRates?.flat?.rate ?? 50;
}

function getPercentageRate(): number {
  return settings?.commissionRates?.percentage?.rate ?? 0.1;
}

function getTierRate(amount: number): number {
  const tiers = settings?.commissionRates?.tier?.tiers ?? [];
  const matched = tiers.find((t) => amount >= t.min && amount <= t.max);
  return matched?.rate ?? 0.05;
}

export function calculateCommission(leadId: string, partnerId: string): { amount: number; type: CommissionType; breakdown: Record<string, number> } {
  const lead = getLeadById(leadId);
  const partner = getPartnerById(partnerId);
  const baseAmount = lead?.budget === 'high' ? 500 : lead?.budget === 'medium' ? 200 : 50;
  const partnerRating = partner?.rating ?? 3;

  const flat = getFlatRate();
  const percentage = Math.round(baseAmount * getPercentageRate());
  const tier = Math.round(baseAmount * getTierRate(baseAmount));
  const ratingBonus = Math.round(partnerRating * 10);

  const type: CommissionType = baseAmount > 300 ? 'tier' : 'flat';
  const amount = type === 'tier' ? tier + ratingBonus : type === 'flat' ? flat + ratingBonus : percentage + ratingBonus;

  return { amount, type, breakdown: { flat, percentage, tier, ratingBonus, baseAmount } };
}

export function createCommission(data: Omit<Commission, 'id' | 'createdAt' | 'status' | 'paidAt'>): Commission {
  const commission: Commission = {
    ...data,
    id: generateId(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    paidAt: null,
  };
  commissions.push(commission);
  return commission;
}

export function getCommissionById(id: string): Commission | undefined {
  return commissions.find((c) => c.id === id);
}

export function getCommissionsByAmbassador(ambassadorId: string): Commission[] {
  return commissions.filter((c) => c.ambassadorId === ambassadorId);
}

export function getCommissionsByPartner(partnerId: string): Commission[] {
  return commissions.filter((c) => c.partnerId === partnerId);
}

export function getPendingCommissions(): Commission[] {
  return commissions.filter((c) => c.status === 'pending');
}

export function approveCommission(id: string): void {
  const commission = commissions.find((c) => c.id === id);
  if (commission && commission.status === 'pending') {
    commission.status = 'approved';
  }
}

export function markCommissionPaid(id: string): void {
  const commission = commissions.find((c) => c.id === id);
  if (commission && commission.status === 'approved') {
    commission.status = 'paid';
    commission.paidAt = new Date().toISOString();
  }
}

export function cancelCommission(id: string): void {
  const commission = commissions.find((c) => c.id === id);
  if (commission && (commission.status === 'pending' || commission.status === 'approved')) {
    commission.status = 'cancelled';
  }
}

export function getCommissionStats(): { total: number; pending: number; paid: number; cancelled: number; totalAmount: number } {
  return {
    total: commissions.length,
    pending: commissions.filter((c) => c.status === 'pending').length,
    paid: commissions.filter((c) => c.status === 'paid').length,
    cancelled: commissions.filter((c) => c.status === 'cancelled').length,
    totalAmount: commissions.reduce((sum, c) => sum + c.amount, 0),
  };
}

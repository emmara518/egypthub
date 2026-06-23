import type { Partner, PartnerStatus } from './types';
import partnersData from '@/data/network/partners.json';
import { createPartner } from './partnerEngine';

const partners = partnersData as Partner[];

function findPartner(id: string): Partner {
  const p = partners.find((p) => p.id === id);
  if (!p) throw new Error(`Partner ${id} not found`);
  return p;
}

export function submitPartnerApplication(data: Omit<Partner, 'id' | 'status' | 'joinedAt' | 'totalLeads' | 'totalReferrals'>): Partner {
  return createPartner(data);
}

export function submitForReview(id: string): Partner {
  const partner = findPartner(id);
  partner.status = 'pending-review';
  return partner;
}

export function approvePartner(id: string): Partner {
  const partner = findPartner(id);
  partner.status = 'approved';
  return partner;
}

export function rejectPartner(id: string, reason: string): Partner {
  const partner = findPartner(id);
  partner.status = 'rejected';
  return partner;
}

export function suspendPartner(id: string, reason: string): Partner {
  const partner = findPartner(id);
  partner.status = 'suspended';
  return partner;
}

export function archivePartner(id: string): Partner {
  const partner = findPartner(id);
  partner.status = 'archived';
  return partner;
}

export function getPartnersByStatus(status: PartnerStatus): Partner[] {
  return partners.filter((p) => p.status === status);
}

export function getLifecycleStats(): { draft: number; pendingReview: number; approved: number; rejected: number; suspended: number; archived: number } {
  return {
    draft: partners.filter((p) => p.status === 'draft').length,
    pendingReview: partners.filter((p) => p.status === 'pending-review').length,
    approved: partners.filter((p) => p.status === 'approved').length,
    rejected: partners.filter((p) => p.status === 'rejected').length,
    suspended: partners.filter((p) => p.status === 'suspended').length,
    archived: partners.filter((p) => p.status === 'archived').length,
  };
}

import type { LeadSource } from './types';
import { getLeadById } from './leadPipelineEngine';
import { getAmbassadorById } from './ambassadorEngine';
import { getPartnerById } from './partnerEngine';
import { getReferralsByAmbassador } from './referralEngine';
import { getCommissionsByAmbassador } from './commissionEngine';
import leadsData from '@/data/network/leads.json';

const leads = leadsData as { source: LeadSource; ambassadorId: string | null; partnerId: string | null }[];

export function attributeLead(leadId: string): { source: LeadSource; ambassadorId: string | null; partnerId: string | null; confidence: number } {
  const lead = getLeadById(leadId);
  if (!lead) throw new Error(`Lead ${leadId} not found`);

  let confidence = 0.5;

  if (lead.source === 'referral') confidence += 0.3;
  if (lead.ambassadorId) confidence += 0.1;
  if (lead.partnerId) confidence += 0.1;

  return {
    source: lead.source,
    ambassadorId: lead.ambassadorId,
    partnerId: lead.partnerId,
    confidence: Math.min(confidence, 1),
  };
}

export function getAttributionChain(leadId: string): {
  lead: ReturnType<typeof getLeadById>;
  ambassador: ReturnType<typeof getAmbassadorById>;
  partner: ReturnType<typeof getPartnerById>;
  referral: ReturnType<typeof getReferralsByAmbassador>;
  commission: ReturnType<typeof getCommissionsByAmbassador>;
} {
  const lead = getLeadById(leadId);
  if (!lead) throw new Error(`Lead ${leadId} not found`);

  return {
    lead,
    ambassador: lead.ambassadorId ? getAmbassadorById(lead.ambassadorId) : undefined,
    partner: lead.partnerId ? getPartnerById(lead.partnerId) : undefined,
    referral: lead.ambassadorId ? getReferralsByAmbassador(lead.ambassadorId) : [],
    commission: lead.ambassadorId ? getCommissionsByAmbassador(lead.ambassadorId) : [],
  };
}

export function getTopAttributionSources(): { source: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const l of leads) {
    counts[l.source] = (counts[l.source] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

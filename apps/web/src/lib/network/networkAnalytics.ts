import type { NetworkStats } from './types';
import { getAllPartners, getApprovedPartners, getPartnerStats } from './partnerEngine';
import { getAllAmbassadors, getTopAmbassadors, getAmbassadorStats } from './ambassadorEngine';
import { getLeadFunnel, getLeadsBySource, searchLeads } from './leadPipelineEngine';
import { getCommissionStats } from './commissionEngine';

export function getNetworkStats(): NetworkStats {
  const allPartners = getAllPartners();
  const approved = getApprovedPartners();
  const allAmbassadors = getAllAmbassadors();
  const funnel = getLeadFunnel();
  const commissionStats = getCommissionStats();
  const partnerStats = getPartnerStats();
  const ambassadorStats = getAmbassadorStats();

  const topCities = Object.entries(partnerStats.byCity)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topCategories = Object.entries(partnerStats.byCategory)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalPartners: allPartners.length,
    approvedPartners: approved.length,
    totalAmbassadors: allAmbassadors.length,
    totalLeads: funnel.new + funnel.contacted + funnel.qualified + funnel.proposalSent + funnel.converted + funnel.closed + funnel.lost,
    convertedLeads: funnel.converted,
    totalReferrals: allAmbassadors.reduce((sum, a) => sum + a.totalReferrals, 0),
    totalCommissions: commissionStats.total,
    pendingCommissions: commissionStats.pending,
    totalRevenue: commissionStats.totalAmount,
    topCities,
    topCategories,
  };
}

export function getPartnerAnalytics(): { views: number; leads: number; conversionRate: number; avgRating: number } {
  const partners = getAllPartners();
  const totalLeads = partners.reduce((sum, p) => sum + p.totalLeads, 0);
  const totalViews = partners.reduce((sum, p) => sum + p.totalReferrals, 0);
  const avgRating = partners.length > 0 ? partners.reduce((sum, p) => sum + p.rating, 0) / partners.length : 0;
  return {
    views: totalViews,
    leads: totalLeads,
    conversionRate: totalViews > 0 ? totalLeads / totalViews : 0,
    avgRating,
  };
}

export function getAmbassadorAnalytics(): { total: number; active: number; avgRating: number; topPerformers: number } {
  const ambassadors = getAllAmbassadors();
  const active = ambassadors.filter((a) => a.totalReferrals > 0).length;
  const avgRating = ambassadors.length > 0 ? ambassadors.reduce((sum, a) => sum + a.rating, 0) / ambassadors.length : 0;
  const topPerformers = getTopAmbassadors(5).length;
  return { total: ambassadors.length, active, avgRating, topPerformers };
}

export function getLeadAnalytics(): { funnel: ReturnType<typeof getLeadFunnel>; bySource: Record<string, number>; conversionRate: number } {
  const funnel = getLeadFunnel();
  const total = funnel.new + funnel.contacted + funnel.qualified + funnel.proposalSent + funnel.converted + funnel.closed + funnel.lost;
  const sources: Record<string, number> = {};
  const allLeads = searchLeads('');
  for (const l of allLeads) {
    sources[l.source] = (sources[l.source] || 0) + 1;
  }
  return {
    funnel,
    bySource: sources,
    conversionRate: total > 0 ? funnel.converted / total : 0,
  };
}

export function getRevenueAnalytics(): { projected: number; actual: number; byPartner: Record<string, number>; byAmbassador: Record<string, number> } {
  const commissionStats = getCommissionStats();
  const actual = commissionStats.totalAmount;
  const projected = actual * 1.3;
  const byPartner: Record<string, number> = {};
  const byAmbassador: Record<string, number> = {};
  const { getCommissionById } = require('./commissionEngine');
  return { projected, actual, byPartner, byAmbassador };
}

export function getTopCities(): { city: string; partners: number; ambassadors: number; leads: number; revenue: number }[] {
  const partnerStats = getPartnerStats();
  const ambassadorStats = getAmbassadorStats();
  const allCities = new Set([...Object.keys(partnerStats.byCity), ...Object.keys(ambassadorStats.byCity)]);
  return Array.from(allCities)
    .map((city) => ({
      city,
      partners: partnerStats.byCity[city] || 0,
      ambassadors: ambassadorStats.byCity[city] || 0,
      leads: 0,
      revenue: 0,
    }))
    .sort((a, b) => b.partners - a.partners);
}

export function getTopCategories(): { category: string; partners: number; leads: number; revenue: number }[] {
  const partnerStats = getPartnerStats();
  return Object.entries(partnerStats.byCategory)
    .map(([category, partners]) => ({
      category,
      partners,
      leads: 0,
      revenue: 0,
    }))
    .sort((a, b) => b.partners - a.partners);
}

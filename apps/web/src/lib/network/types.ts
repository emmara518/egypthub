export type PartnerCategory = 'Hotel' | 'Resort' | 'Restaurant' | 'Dive Center' | 'Tour Operator' | 'Transportation' | 'Shopping' | 'Experience Provider';
export type PartnerStatus = 'draft' | 'pending-review' | 'approved' | 'rejected' | 'suspended' | 'archived';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'converted' | 'closed' | 'lost';
export type CommissionType = 'flat' | 'percentage' | 'tier';
export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'cancelled';
export type ReferralType = 'click' | 'visit' | 'lead' | 'conversion';
export type ReferralSource = 'qr' | 'link' | 'widget';
export type LeadSource = 'explorer' | 'zainab' | 'referral' | 'direct' | 'partner-page';
export type BudgetLevel = 'low' | 'medium' | 'high';

export interface Partner {
  id: string;
  name: string;
  nameEn: string;
  category: PartnerCategory;
  city: string;
  description: string;
  descriptionEn: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  address: string;
  coordinates: { lat: number; lng: number };
  status: PartnerStatus;
  featured: boolean;
  rating: number;
  totalLeads: number;
  totalReferrals: number;
  joinedAt: string;
  services: string[];
  gallery: string[];
  ambassadorIds: string[];
}

export interface NetworkAmbassador {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  bio: string;
  bioEn: string;
  role: string;
  specialties: string[];
  languages: string[];
  rating: number;
  verified: boolean;
  referralCode: string;
  totalReferrals: number;
  totalLeads: number;
  totalConversions: number;
  joinedAt: string;
  avatarUrl: string;
  socialLinks: { instagram?: string; facebook?: string };
}

export interface Lead {
  id: string;
  source: LeadSource;
  ambassadorId: string | null;
  partnerId: string | null;
  status: LeadStatus;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientNotes: string;
  destination: string;
  budget: BudgetLevel;
  timeline: string;
  createdAt: string;
  updatedAt: string;
  history: LeadTimelineEvent[];
}

export interface LeadTimelineEvent {
  action: string;
  timestamp: string;
  details: string;
}

export interface Commission {
  id: string;
  leadId: string;
  ambassadorId: string;
  partnerId: string;
  type: CommissionType;
  amount: number;
  currency: string;
  status: CommissionStatus;
  referenceId: string;
  notes: string;
  createdAt: string;
  paidAt: string | null;
}

export interface Referral {
  id: string;
  ambassadorId: string;
  ambassadorName: string;
  referralCode: string;
  type: ReferralType;
  source: ReferralSource;
  destination: string;
  targetPage: string;
  leadId: string | null;
  commissionId: string | null;
  metadata: Record<string, string>;
  createdAt: string;
}

export interface NetworkSettings {
  commissionRates: { flat: Record<string, unknown>; percentage: Record<string, unknown>; tier: Record<string, unknown> };
  referralCodePrefix: string;
  leadStates: string[];
  partnerStates: string[];
  defaultPartnerStatus: string;
  maxFeaturedPartners: number;
  currency: string;
  platformFee: { type: string; value: number };
}

export interface NetworkStats {
  totalPartners: number;
  approvedPartners: number;
  totalAmbassadors: number;
  totalLeads: number;
  convertedLeads: number;
  totalReferrals: number;
  totalCommissions: number;
  pendingCommissions: number;
  totalRevenue: number;
  topCities: { city: string; count: number }[];
  topCategories: { category: string; count: number }[];
}

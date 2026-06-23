import type { Lead, LeadStatus, LeadSource, BudgetLevel } from './types';
import leadsData from '@/data/network/leads.json';

const leads = leadsData as Lead[];

function generateId(): string {
  return `lead-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

function now(): string {
  return new Date().toISOString();
}

export function createLead(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'history'>): Lead {
  const lead: Lead = {
    ...data,
    id: generateId(),
    createdAt: now(),
    updatedAt: now(),
    history: [{ action: 'created', timestamp: now(), details: 'Lead created' }],
  };
  leads.push(lead);
  return lead;
}

export function getLeadById(id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function getLeadsByAmbassador(ambassadorId: string): Lead[] {
  return leads.filter((l) => l.ambassadorId === ambassadorId);
}

export function getLeadsByPartner(partnerId: string): Lead[] {
  return leads.filter((l) => l.partnerId === partnerId);
}

export function getLeadsByStatus(status: LeadStatus): Lead[] {
  return leads.filter((l) => l.status === status);
}

export function updateLeadStatus(id: string, newStatus: LeadStatus, details: string): Lead {
  const lead = leads.find((l) => l.id === id);
  if (!lead) throw new Error(`Lead ${id} not found`);
  lead.status = newStatus;
  lead.updatedAt = now();
  lead.history.push({ action: `status:${newStatus}`, timestamp: now(), details });
  return lead;
}

export function getLeadFunnel(): { new: number; contacted: number; qualified: number; proposalSent: number; converted: number; closed: number; lost: number } {
  const count = (status: LeadStatus) => leads.filter((l) => l.status === status).length;
  return {
    new: count('new'),
    contacted: count('contacted'),
    qualified: count('qualified'),
    proposalSent: count('proposal-sent'),
    converted: count('converted'),
    closed: count('closed'),
    lost: count('lost'),
  };
}

export function getLeadsBySource(source: LeadSource): Lead[] {
  return leads.filter((l) => l.source === source);
}

export function searchLeads(query: string): Lead[] {
  const q = query.toLowerCase();
  return leads.filter(
    (l) =>
      l.clientName.toLowerCase().includes(q) ||
      l.clientEmail.toLowerCase().includes(q) ||
      l.clientPhone.includes(q) ||
      l.destination.toLowerCase().includes(q) ||
      l.clientNotes.toLowerCase().includes(q)
  );
}

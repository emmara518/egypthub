import type { ReferralSource } from './types';
import { getAmbassadorById } from './ambassadorEngine';
import { createReferral } from './referralEngine';

export function generateQRData(ambassadorId: string, targetPage: string): string {
  const ambassador = getAmbassadorById(ambassadorId);
  const code = ambassador?.referralCode ?? ambassadorId;
  const data = { ambassadorId, referralCode: code, targetPage, t: Date.now() };
  return JSON.stringify(data);
}

export function scanQR(data: string): { ambassadorId: string; targetPage: string; timestamp: string } {
  const parsed = JSON.parse(data) as { ambassadorId: string; referralCode: string; targetPage: string; t: number };
  const timestamp = new Date().toISOString();

  createReferral({
    ambassadorId: parsed.ambassadorId,
    ambassadorName: '',
    referralCode: parsed.referralCode,
    type: 'visit',
    source: 'qr',
    destination: parsed.targetPage,
    targetPage: parsed.targetPage,
    leadId: null,
    commissionId: null,
    metadata: { scannedAt: timestamp, qrGeneratedAt: String(parsed.t) },
  });

  return { ambassadorId: parsed.ambassadorId, targetPage: parsed.targetPage, timestamp };
}

export function getQRStats(ambassadorId: string): { scans: number; leads: number; conversions: number } {
  const { getReferralsByAmbassador } = require('./referralEngine');
  const refs = getReferralsByAmbassador(ambassadorId);
  const qrRefs = refs.filter((r: { source: ReferralSource }) => r.source === 'qr');
  return {
    scans: qrRefs.filter((r: { type: string }) => r.type === 'visit').length,
    leads: qrRefs.filter((r: { type: string }) => r.type === 'lead').length,
    conversions: qrRefs.filter((r: { type: string }) => r.type === 'conversion').length,
  };
}

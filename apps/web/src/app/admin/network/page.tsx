'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HiUsers, HiIdentification, HiMail, HiCash, HiLink,
  HiGlobe, HiStar, HiCheckCircle, HiXCircle, HiClock,
  HiCurrencyDollar, HiTrendingUp, HiUserGroup, HiOfficeBuilding,
  HiAcademicCap, HiLocationMarker, HiSortAscending,
} from 'react-icons/hi';
import { getNetworkStats } from '@/lib/network/networkAnalytics';
import { getAllPartners, getPartnerStats } from '@/lib/network/partnerEngine';
import { getAllAmbassadors, getAmbassadorStats } from '@/lib/network/ambassadorEngine';
import { searchLeads, getLeadFunnel } from '@/lib/network/leadPipelineEngine';
import { getCommissionStats } from '@/lib/network/commissionEngine';

type TabKey = 'partners' | 'ambassadors' | 'leads' | 'referrals' | 'commissions';

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'partners', label: 'Partners', icon: HiOfficeBuilding },
  { key: 'ambassadors', label: 'Ambassadors', icon: HiAcademicCap },
  { key: 'leads', label: 'Leads', icon: HiIdentification },
  { key: 'referrals', label: 'Referrals', icon: HiLink },
  { key: 'commissions', label: 'Commissions', icon: HiCash },
];

export default function AdminNetworkPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('partners');

  const stats = useMemo(() => getNetworkStats(), []);
  const partners = useMemo(() => getAllPartners(), []);
  const ambassadors = useMemo(() => getAllAmbassadors(), []);
  const leads = useMemo(() => searchLeads(''), []);
  const funnel = useMemo(() => getLeadFunnel(), []);
  const commissionStats = useMemo(() => getCommissionStats(), []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white p-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Network Management</h1>
        <p className="text-sm text-[#8B95A5]">Read-only overview of your network ecosystem</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {[
          { icon: HiOfficeBuilding, label: 'Total Partners', value: stats.totalPartners, color: 'from-blue-500 to-blue-600' },
          { icon: HiCheckCircle, label: 'Approved', value: stats.approvedPartners, color: 'from-green-500 to-green-600' },
          { icon: HiUserGroup, label: 'Ambassadors', value: stats.totalAmbassadors, color: 'from-purple-500 to-purple-600' },
          { icon: HiIdentification, label: 'Total Leads', value: stats.totalLeads, color: 'from-orange-500 to-orange-600' },
          { icon: HiTrendingUp, label: 'Converted', value: stats.convertedLeads, color: 'from-emerald-500 to-emerald-600' },
          { icon: HiCurrencyDollar, label: 'Commissions', value: stats.totalCommissions, color: 'from-amber-500 to-amber-600' },
          { icon: HiClock, label: 'Pending', value: stats.pendingCommissions, color: 'from-rose-500 to-rose-600' },
        ].map((stat, i) => (
          <motion.div key={i} variants={item}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4 flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="text-white text-lg" />
            </div>
            <p className="text-xl font-bold font-english">{stat.value}</p>
            <p className="text-[10px] text-[#8B95A5] mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 bg-[#0F1420] rounded-xl p-1 border border-[#1E2A3D] w-fit">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20 shadow-sm'
                : 'text-[#8B95A5] hover:text-white hover:bg-[#1A2235]'
            }`}>
            <tab.icon className="text-sm" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {activeTab === 'partners' && (
          <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E2A3D] text-[#8B95A5] text-[11px] uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">ID</th>
                    <th className="text-left px-4 py-3 font-medium">Name</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-left px-4 py-3 font-medium">City</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {partners.map((p, i) => (
                    <motion.tr key={p.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                      className="border-b border-[#1E2A3D]/50 hover:bg-[#1A2235]/50 transition-colors">
                      <td className="px-4 py-3 font-english text-[#8B95A5] text-xs">{p.id}</td>
                      <td className="px-4 py-3 font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-[#8B95A5]">{p.category}</td>
                      <td className="px-4 py-3">{p.city}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          p.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                          p.status === 'pending-review' ? 'bg-yellow-500/10 text-yellow-400' :
                          p.status === 'rejected' || p.status === 'suspended' ? 'bg-red-500/10 text-red-400' :
                          'bg-[#1E2A3D] text-[#8B95A5]'
                        }`}>
                          {p.status === 'approved' && <HiCheckCircle className="text-xs" />}
                          {p.status === 'rejected' && <HiXCircle className="text-xs" />}
                          {(p.status === 'pending-review' || p.status === 'draft') && <HiClock className="text-xs" />}
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs">
                          <HiStar className="text-theme-gold text-xs" />
                          <span className="font-english font-bold">{p.rating.toFixed(1)}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'ambassadors' && (
          <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E2A3D] text-[#8B95A5] text-[11px] uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">ID</th>
                    <th className="text-left px-4 py-3 font-medium">Name</th>
                    <th className="text-left px-4 py-3 font-medium">City</th>
                    <th className="text-left px-4 py-3 font-medium">Role</th>
                    <th className="text-left px-4 py-3 font-medium">Rating</th>
                    <th className="text-left px-4 py-3 font-medium">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {ambassadors.map((a, i) => (
                    <motion.tr key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                      className="border-b border-[#1E2A3D]/50 hover:bg-[#1A2235]/50 transition-colors">
                      <td className="px-4 py-3 font-english text-[#8B95A5] text-xs">{a.id}</td>
                      <td className="px-4 py-3 font-medium">{a.name}</td>
                      <td className="px-4 py-3">{a.city}</td>
                      <td className="px-4 py-3 text-[#8B95A5]">{a.role}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs">
                          <HiStar className="text-theme-gold text-xs" />
                          <span className="font-english font-bold">{a.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {a.verified
                          ? <HiCheckCircle className="text-green-400 text-base" />
                          : <HiXCircle className="text-red-400/50 text-base" />}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E2A3D] text-[#8B95A5] text-[11px] uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">ID</th>
                    <th className="text-left px-4 py-3 font-medium">Client Name</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Source</th>
                    <th className="text-left px-4 py-3 font-medium">Destination</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l, i) => (
                    <motion.tr key={l.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                      className="border-b border-[#1E2A3D]/50 hover:bg-[#1A2235]/50 transition-colors">
                      <td className="px-4 py-3 font-english text-[#8B95A5] text-xs">{l.id}</td>
                      <td className="px-4 py-3 font-medium">{l.clientName}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          l.status === 'converted' ? 'bg-green-500/10 text-green-400' :
                          l.status === 'lost' ? 'bg-red-500/10 text-red-400' :
                          l.status === 'closed' ? 'bg-blue-500/10 text-blue-400' :
                          l.status === 'qualified' ? 'bg-purple-500/10 text-purple-400' :
                          l.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-[#1E2A3D] text-[#8B95A5]'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#8B95A5]">{l.source}</td>
                      <td className="px-4 py-3">{l.destination}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E2A3D] text-[#8B95A5] text-[11px] uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">ID</th>
                    <th className="text-left px-4 py-3 font-medium">Ambassador</th>
                    <th className="text-left px-4 py-3 font-medium">Type</th>
                    <th className="text-left px-4 py-3 font-medium">Source</th>
                    <th className="text-left px-4 py-3 font-medium">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    ...ambassadors.flatMap((a) => {
                      const refs = a.totalReferrals > 0
                        ? [{ id: `ref-${a.id}`, ambassadorName: a.name, type: 'referral' as const, source: 'link' as const, createdAt: a.joinedAt }]
                        : [];
                      return refs;
                    }),
                    ...leads.filter((l) => l.source === 'referral').map((l) => ({
                      id: `ref-${l.id}`,
                      ambassadorName: ambassadors.find((a) => a.id === l.ambassadorId)?.name ?? 'Unknown',
                      type: 'lead' as const,
                      source: l.source,
                      createdAt: l.createdAt,
                    })),
                  ]).map((r, i) => (
                    <motion.tr key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                      className="border-b border-[#1E2A3D]/50 hover:bg-[#1A2235]/50 transition-colors">
                      <td className="px-4 py-3 font-english text-[#8B95A5] text-xs">{r.id}</td>
                      <td className="px-4 py-3 font-medium">{r.ambassadorName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          r.type === 'lead' ? 'bg-purple-500/10 text-purple-400' :
                          'bg-[#1E2A3D] text-[#8B95A5]'
                        }`}>
                          {r.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#8B95A5]">{r.source}</td>
                      <td className="px-4 py-3 font-english text-xs text-[#8B95A5]">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'commissions' && (
          <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E2A3D] text-[#8B95A5] text-[11px] uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">ID</th>
                    <th className="text-left px-4 py-3 font-medium">Amount</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(commissionStats.total, 1) }, (_, i) => ({
                    id: `com-${i + 1}`,
                    amount: commissionStats.totalAmount / Math.max(commissionStats.total, 1),
                    status: i < commissionStats.pending ? 'pending' as const : i < commissionStats.pending + (commissionStats.total - commissionStats.pending - commissionStats.cancelled) ? 'paid' as const : 'cancelled' as const,
                  })).map((c, i) => (
                    <motion.tr key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                      className="border-b border-[#1E2A3D]/50 hover:bg-[#1A2235]/50 transition-colors">
                      <td className="px-4 py-3 font-english text-[#8B95A5] text-xs">{c.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs">
                          <HiCurrencyDollar className="text-theme-gold text-xs" />
                          <span className="font-english font-bold">${c.amount.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          c.status === 'paid' ? 'bg-green-500/10 text-green-400' :
                          c.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>
                          {c.status === 'paid' && <HiCheckCircle className="text-xs" />}
                          {c.status === 'pending' && <HiClock className="text-xs" />}
                          {c.status === 'cancelled' && <HiXCircle className="text-xs" />}
                          {c.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

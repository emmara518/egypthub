import partnerData from '@/data/network/partners.json';
import PartnerClient from './PartnerClient';
import type { Partner } from '@/lib/network/types';

const partners = partnerData as Partner[];

export function generateStaticParams() {
  return partners.map((p) => ({
    slug: p.nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  }));
}

export default function PartnerPage({ params }: { params: { slug: string } }) {
  return <PartnerClient slug={params.slug} />;
}

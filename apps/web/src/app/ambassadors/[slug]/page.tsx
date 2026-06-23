import ambassadorData from '@/data/network/ambassadors.json';
import AmbassadorClient from './AmbassadorClient';
import type { NetworkAmbassador } from '@/lib/network/types';

const ambassadors = ambassadorData as NetworkAmbassador[];

export function generateStaticParams() {
  return ambassadors.map((a) => ({ slug: a.id }));
}

export default function AmbassadorPage({ params }: { params: { slug: string } }) {
  return <AmbassadorClient slug={params.slug} />;
}

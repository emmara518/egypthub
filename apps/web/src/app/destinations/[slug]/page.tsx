import { destinations } from '@/lib/mock-data';
import DestinationClient from './DestinationClient';

export function generateStaticParams() {
  return destinations.map((dest) => ({ slug: dest.slug }));
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  return <DestinationClient slug={params.slug} />;
}

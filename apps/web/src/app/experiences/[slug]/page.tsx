import { experiences } from '@/lib/mock-data';
import ExperienceClient from './ExperienceClient';

export function generateStaticParams() {
  return experiences.map((exp) => ({ slug: exp.slug }));
}

export default function ExperiencePage({ params }: { params: { slug: string } }) {
  return <ExperienceClient slug={params.slug} />;
}

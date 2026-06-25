import type { Metadata } from 'next';
import CategoryClient from './CategoryClient';
import { categoryDisplayNames } from '@/lib/mock-data';

export function generateStaticParams() {
  return [
    { slug: 'restaurants' }, { slug: 'cafes' }, { slug: 'activities' },
    { slug: 'hotels' }, { slug: 'shopping' }, { slug: 'transport' },
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const name = categoryDisplayNames[params.slug] || params.slug;
  return {
    title: `${name} في شرم الشيخ | EGYPTHUB`,
    description: `أفضل ${name} في شرم الشيخ — اكتشف وتصفح أماكن مميزة مع EgyptHub`,
    openGraph: {
      title: `${name} في شرم الشيخ | EGYPTHUB`,
      description: `أفضل ${name} في شرم الشيخ — اكتشف مع EgyptHub`,
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}

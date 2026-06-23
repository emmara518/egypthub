import CategoryClient from './CategoryClient';

export function generateStaticParams() {
  return [
    { slug: 'historical' },
    { slug: 'adventure' },
    { slug: 'cultural' },
    { slug: 'luxury' },
    { slug: 'beach' },
  ];
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}

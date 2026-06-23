import BusinessClient from './BusinessClient';

export function generateStaticParams() {
  return [
    { slug: 'sample-1' },
    { slug: 'sample-2' },
  ];
}

export default function BusinessPage({ params }: { params: { slug: string } }) {
  return <BusinessClient slug={params.slug} />;
}

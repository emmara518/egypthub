import { stories } from '@/lib/mock-data';
import StoryClient from './StoryClient';

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  return <StoryClient slug={params.slug} />;
}

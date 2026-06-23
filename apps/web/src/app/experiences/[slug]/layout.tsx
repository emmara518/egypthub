import { experiences } from '@/lib/mock-data';

export function generateStaticParams() {
  return experiences.map((exp) => ({ slug: exp.slug }));
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

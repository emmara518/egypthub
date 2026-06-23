import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EGYPTHUB — Screens Gallery',
  description: 'EgyptHub platform screens showcase',
};

export default function ScreensLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-900">
      {children}
    </div>
  );
}

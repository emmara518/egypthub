import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { destinations, experiences } from '@/lib/mock-data';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

describe('Destinations Page', () => {
  it('renders destination names from mock data', async () => {
    const DestinationsPage = (await import('@/app/destinations/page')).default;
    const { container } = render(<DestinationsPage />);

    for (const dest of destinations) {
      const node = container.textContent;
      expect(node).toContain(dest.name);
    }
  });

  it('renders region filter buttons', async () => {
    const DestinationsPage = (await import('@/app/destinations/page')).default;
    const { container } = render(<DestinationsPage />);

    expect(container.textContent).toContain('جميع المناطق');
  });

  it('renders StatsBar, Testimonials, HowItWorks, DownloadApp sections', async () => {
    const DestinationsPage = (await import('@/app/destinations/page')).default;
    const { container } = render(<DestinationsPage />);

    expect(container.textContent).toContain('وجهة');
    expect(container.textContent).toContain('ماذا يقول');
  });
});

describe('Experience Details Page', () => {
  const slug = 'luxury-nile-cruise';

  it('renders experience name and description', async () => {
    const ExperiencePage = (await import('@/app/experiences/[slug]/page')).default;
    const { container } = render(<ExperiencePage params={{ slug }} />);

    expect(container.textContent).toContain('luxury-nile-cruise');
    expect(container.textContent).toContain('تفاصيل التجربة');
  });

  it('renders booking section with price', async () => {
    const ExperiencePage = (await import('@/app/experiences/[slug]/page')).default;
    const { container } = render(<ExperiencePage params={{ slug }} />);

    expect(container.textContent).toContain('العودة للتجارب');
    expect(container.textContent).toContain('تفاصيل التجربة');
  });

  it('renders itinerary items', async () => {
    const ExperiencePage = (await import('@/app/experiences/[slug]/page')).default;
    const { container } = render(<ExperiencePage params={{ slug }} />);

    expect(container.textContent).toContain('luxury-nile-cruise');
  });

  it('renders includes and excludes', async () => {
    const ExperiencePage = (await import('@/app/experiences/[slug]/page')).default;
    const { container } = render(<ExperiencePage params={{ slug }} />);

    expect(container.textContent).toContain('العودة للتجارب');
  });

  it('renders host information', async () => {
    const ExperiencePage = (await import('@/app/experiences/[slug]/page')).default;
    const { container } = render(<ExperiencePage params={{ slug }} />);

    expect(container.textContent).toContain('العودة للتجارب');
  });

  it('shows 404 message for non-existent experience', async () => {
    const ExperiencePage = (await import('@/app/experiences/[slug]/page')).default;
    const { container } = render(<ExperiencePage params={{ slug: 'non-existent-experience' }} />);

    expect(container.textContent).toContain('التجربة غير موجودة');
  });

  it('renders related experiences', async () => {
    const ExperiencePage = (await import('@/app/experiences/[slug]/page')).default;
    const { container } = render(<ExperiencePage params={{ slug }} />);

    expect(container.textContent).toContain('تفاصيل التجربة');
  });
});

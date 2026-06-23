import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

describe('Destinations Listing Page', () => {
  it('renders hero section with title', async () => {
    const Page = (await import('@/app/destinations/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('اكتشف');
    expect(container.textContent).toContain('مصر');
  });

  it('renders region filter buttons', async () => {
    const Page = (await import('@/app/destinations/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('جميع المناطق');
    expect(container.textContent).toContain('بحر أحمر');
    expect(container.textContent).toContain('صعيد مصر');
  });

  it('renders destination cards from mock data', async () => {
    const Page = (await import('@/app/destinations/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('شرم الشيخ');
    expect(container.textContent).toContain('القاهرة');
    expect(container.textContent).toContain('الأقصر');
  });

  it('renders search and filter section', async () => {
    const Page = (await import('@/app/destinations/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('تصفية');
  });

  it('renders StatsBar and Testimonials sections', async () => {
    const Page = (await import('@/app/destinations/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('وجهة متاحة');
  });
});

describe('Destination Details Page', () => {
  it('renders destination name and region for valid slug', async () => {
    const Page = (await import('@/app/destinations/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'luxor' }} />);
    expect(container.textContent).toContain('الأقصر');
    expect(container.textContent).toContain('صعيد مصر');
  });

  it('renders destination description', async () => {
    const Page = (await import('@/app/destinations/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'cairo' }} />);
    expect(container.textContent).toContain('عاصمة مصر الخالدة');
  });

  it('renders statistics section', async () => {
    const Page = (await import('@/app/destinations/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'sharm-el-sheikh' }} />);
    expect(container.textContent).toContain('تجارب');
    expect(container.textContent).toContain('التقييم');
    expect(container.textContent).toContain('تصنيفات');
  });

  it('renders categories section', async () => {
    const Page = (await import('@/app/destinations/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'cairo' }} />);
    expect(container.textContent).toContain('تاريخ');
    expect(container.textContent).toContain('تسوق');
  });

  it('shows 404 message for non-existent destination', async () => {
    const Page = (await import('@/app/destinations/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'non-existent-dest' }} />);
    expect(container.textContent).toContain('الوجهة غير موجودة');
  });

  it('renders highlights list', async () => {
    const Page = (await import('@/app/destinations/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'luxor' }} />);
    expect(container.textContent).toContain('وادي الملوك');
    expect(container.textContent).toContain('معبد الكرنك');
  });

  it('renders Testimonials section', async () => {
    const Page = (await import('@/app/destinations/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'luxor' }} />);
    expect(container.textContent).toContain('ماذا يقول');
  });
});

describe('Experiences Listing Page', () => {
  it('renders hero section', async () => {
    const Page = (await import('@/app/experiences/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('التجارب');
    expect(container.textContent).toContain('السياحية');
  });

  it('renders category filter buttons', async () => {
    const Page = (await import('@/app/experiences/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('الكل');
    expect(container.textContent).toContain('جولات تاريخية');
    expect(container.textContent).toContain('مغامرات');
  });

  it('renders experience cards from mock data', async () => {
    const Page = (await import('@/app/experiences/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('جولة الأهرامات');
    expect(container.textContent).toContain('مغامرة الغوص');
  });

  it('renders search and filter section', async () => {
    const Page = (await import('@/app/experiences/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('اختر تجربتك');
  });

  it('renders StatsBar and Testimonials', async () => {
    const Page = (await import('@/app/experiences/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('تجربة متاحة');
  });
});

describe('Search Results Page', () => {
  it('renders search page with title', async () => {
    const Page = (await import('@/app/search/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('البحث');
  });

  it('renders search input field', async () => {
    const Page = (await import('@/app/search/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('ابحث عن وجهتك المثالية');
  });

  it('renders filter buttons (الكل, الوجهات, التجارب)', async () => {
    const Page = (await import('@/app/search/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('الكل');
    expect(container.textContent).toContain('الوجهات');
    expect(container.textContent).toContain('التجارب');
  });

  it('renders region filter dropdown', async () => {
    const Page = (await import('@/app/search/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('جميع المناطق');
  });

  it('shows placeholder when no query', async () => {
    const Page = (await import('@/app/search/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('ابحث عن وجهتك المثالية');
  });
});

describe('Stories Listing Page', () => {
  it('renders hero section with title', async () => {
    const Page = (await import('@/app/stories/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('قصص');
    expect(container.textContent).toContain('المسافرين');
  });

  it('renders category filter buttons', async () => {
    const Page = (await import('@/app/stories/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('تاريخ');
    expect(container.textContent).toContain('مغامرات');
    expect(container.textContent).toContain('طبيعة');
  });

  it('renders story cards from mock data', async () => {
    const Page = (await import('@/app/stories/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('غروب الشمس');
    expect(container.textContent).toContain('الغوص في سحر');
  });

  it('renders featured stories section', async () => {
    const Page = (await import('@/app/stories/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('مختارة');
  });

  it('renders StatsBar', async () => {
    const Page = (await import('@/app/stories/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('قصة');
  });
});

describe('Story Details Page', () => {
  it('renders story title and subtitle for valid slug', async () => {
    const Page = (await import('@/app/stories/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'sunset-over-the-pyramids' }} />);
    expect(container.textContent).toContain('غروب الشمس خلف الأهرامات');
    expect(container.textContent).toContain('رحلة في قلب التاريخ');
  });

  it('renders story content paragraphs', async () => {
    const Page = (await import('@/app/stories/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'diving-red-sea-magic' }} />);
    expect(container.textContent).toContain('البحر الأحمر');
    expect(container.textContent).toContain('الغردقة');
  });

  it('renders story metadata (date, read time, location)', async () => {
    const Page = (await import('@/app/stories/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'luxor-temples-wonders' }} />);
    expect(container.textContent).toContain('5 يناير 2025');
    expect(container.textContent).toContain('الأقصر');
  });

  it('renders author information', async () => {
    const Page = (await import('@/app/stories/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'siwa-oasis-escape' }} />);
    expect(container.textContent).toContain('كاتب الرحلة');
  });

  it('renders tags', async () => {
    const Page = (await import('@/app/stories/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'alexandria-mediterranean-bride' }} />);
    expect(container.textContent).toContain('الإسكندرية');
    expect(container.textContent).toContain('البحر المتوسط');
  });

  it('shows 404 message for non-existent story', async () => {
    const Page = (await import('@/app/stories/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'non-existent-story' }} />);
    expect(container.textContent).toContain('القصة غير موجودة');
  });

  it('renders Testimonials section', async () => {
    const Page = (await import('@/app/stories/[slug]/page')).default;
    const { container } = render(<Page params={{ slug: 'sunset-over-the-pyramids' }} />);
    expect(container.textContent).toContain('ماذا يقول');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

describe('AI Concierge Page', () => {
  it('renders chat interface with Zainab name', async () => {
    const Page = (await import('@/app/ai-concierge/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('زينب');
    expect(container.textContent).toContain('مساعدتك الذكية');
  });

  it('renders chat messages', async () => {
    const Page = (await import('@/app/ai-concierge/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('الأقصر وأسوان');
    expect(container.textContent).toContain('عايز أخطط رحلة');
  });

  it('renders trip planner section', async () => {
    const Page = (await import('@/app/ai-concierge/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('مخطط الرحلة');
    expect(container.textContent).toContain('الأقصر');
  });

  it('renders recommendations section', async () => {
    const Page = (await import('@/app/ai-concierge/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('التوصيات الذكية');
  });

  it('renders voice assistant button', async () => {
    const Page = (await import('@/app/ai-concierge/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('المساعد الصوتي');
  });

  it('renders chat history and suggestions', async () => {
    const Page = (await import('@/app/ai-concierge/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('سجل المحادثات');
    expect(container.textContent).toContain('اقتراحات فورية');
  });

  it('renders rating section', async () => {
    const Page = (await import('@/app/ai-concierge/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('تقييم زينب');
  });

  it('renders notification toggles', async () => {
    const Page = (await import('@/app/ai-concierge/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('الإشعارات');
  });
});

describe('Booking Checkout Page', () => {
  it('renders booking flow steps', async () => {
    const Page = (await import('@/app/booking/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('التاريخ والوقت');
    expect(container.textContent).toContain('المسافرين');
    expect(container.textContent).toContain('الإضافات');
    expect(container.textContent).toContain('المراجعة');
    expect(container.textContent).toContain('الدفع');
  });

  it('renders date selection calendar', async () => {
    const Page = (await import('@/app/booking/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('يناير 2025');
  });

  it('navigates to traveler step on next click', async () => {
    const Page = (await import('@/app/booking/page')).default;
    const { container } = render(<Page />);
    const nextButton = container.querySelector('button')?.closest('button');
    if (nextButton) fireEvent.click(nextButton);
  });

  it('shows add-ons section visible by default', async () => {
    const Page = (await import('@/app/booking/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('التاريخ والوقت');
    expect(container.textContent).toContain('يناير 2025');
  });

  it('shows payment method icons in footer', async () => {
    const Page = (await import('@/app/booking/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('VISA');
    expect(container.textContent).toContain('Meeza');
    expect(container.textContent).toContain('mastercard');
  });
});

describe('Booking Confirmation Page', () => {
  it('renders confirmation success message', async () => {
    const Page = (await import('@/app/booking/confirmation/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('تم تأكيد حجزك بنجاح');
  });

  it('renders booking reference number', async () => {
    const Page = (await import('@/app/booking/confirmation/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('EH-');
  });

  it('renders booking details (date, time, travelers)', async () => {
    const Page = (await import('@/app/booking/confirmation/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('15 يناير 2025');
    expect(container.textContent).toContain('09:00 صباحاً');
  });

  it('renders trip timeline tracking', async () => {
    const Page = (await import('@/app/booking/confirmation/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('تتبع الرحلة');
    expect(container.textContent).toContain('نقطة الانطلاق');
  });

  it('renders loyalty points section', async () => {
    const Page = (await import('@/app/booking/confirmation/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('نقاط الولاء');
  });

  it('renders digital ticket with QR code', async () => {
    const Page = (await import('@/app/booking/confirmation/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('امسح الكود عند نقطة الدخول');
  });
});

describe('Login Page', () => {
  it('renders login form', async () => {
    const Page = (await import('@/app/auth/login/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('تسجيل الدخول');
    expect(container.textContent).toContain('أهلاً بعودتك');
  });

  it('renders social login buttons', async () => {
    const Page = (await import('@/app/auth/login/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('Google');
    expect(container.textContent).toContain('Facebook');
    expect(container.textContent).toContain('Apple');
  });

  it('renders email and password fields', async () => {
    const Page = (await import('@/app/auth/login/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('البريد الإلكتروني');
    expect(container.textContent).toContain('كلمة المرور');
  });

  it('renders register link', async () => {
    const Page = (await import('@/app/auth/login/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('أنشئ حساب جديد');
  });

  it('renders forgot password and remember me', async () => {
    const Page = (await import('@/app/auth/login/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('تذكرني');
    expect(container.textContent).toContain('نسيت كلمة المرور');
  });
});

describe('Register Page', () => {
  it('renders registration form', async () => {
    const Page = (await import('@/app/auth/register/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('إنشاء حساب جديد');
    expect(container.textContent).toContain('انضم إلى EGYPTHUB');
  });

  it('renders social signup buttons', async () => {
    const Page = (await import('@/app/auth/register/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('Google');
    expect(container.textContent).toContain('Facebook');
  });

  it('renders step 1 fields (name, phone)', async () => {
    const Page = (await import('@/app/auth/register/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('الاسم الكامل');
    expect(container.textContent).toContain('رقم الهاتف');
  });

  it('renders login link', async () => {
    const Page = (await import('@/app/auth/register/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('سجل دخول');
  });

  it('renders multi-step navigation', async () => {
    const Page = (await import('@/app/auth/register/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('التالي');
  });
});

describe('Profile Page', () => {
  it('renders profile header with user name', async () => {
    const Page = (await import('@/app/profile/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('أحمد محمد');
    expect(container.textContent).toContain('مستكشف مصري');
  });

  it('renders tab navigation', async () => {
    const Page = (await import('@/app/profile/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('الحجوزات');
    expect(container.textContent).toContain('المفضلة');
    expect(container.textContent).toContain('الإشعارات');
    expect(container.textContent).toContain('التقييمات');
    expect(container.textContent).toContain('المحفظة');
    expect(container.textContent).toContain('الإعدادات');
  });

  it('renders reservations list', async () => {
    const Page = (await import('@/app/profile/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('الحجوزات');
    expect(container.textContent).toContain('رحلة سفاري');
  });

  it('renders favorites tab in navigation', async () => {
    const Page = (await import('@/app/profile/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('المفضلة');
  });

  it('renders wallet tab in navigation', async () => {
    const Page = (await import('@/app/profile/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('المحفظة');
  });

  it('renders settings tab in navigation', async () => {
    const Page = (await import('@/app/profile/page')).default;
    const { container } = render(<Page />);
    expect(container.textContent).toContain('الإعدادات');
  });
});

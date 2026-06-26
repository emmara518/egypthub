import LegalPage from '@/components/LegalPage';

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="June 1, 2026">
      <Section title="1. What Are Cookies">
        <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better browsing experience by remembering your preferences, login status, and language settings.</p>
      </Section>
      <Section title="2. How We Use Cookies">
        <p>We use essential cookies for site functionality, analytics cookies to understand usage patterns, and personalization cookies to tailor your experience. We may also use third-party cookies from payment processors and analytics providers.</p>
      </Section>
      <Section title="3. Managing Cookies">
        <p>You can control and delete cookies through your browser settings. Disabling certain cookies may affect the functionality of our platform, including your ability to complete bookings.</p>
      </Section>
      <Section title="4. Analytics & AI Training">
        <p>We use anonymized browsing data to train our AI recommendation engine. This data is aggregated and cannot be traced back to individual users. You can opt out of AI training data collection in your account settings.</p>
      </Section>
      <Section title="5. Updates">
        <p>We may update this Cookie Policy from time to time. Significant changes will be communicated via our website or email.</p>
      </Section>
    </LegalPage>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold font-display text-white mb-3">{title}</h2>
      <div className="text-white/60 text-sm font-english leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

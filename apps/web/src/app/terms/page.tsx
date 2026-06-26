import LegalPage from '@/components/LegalPage';

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="June 1, 2026">
      <Section title="1. Acceptance of Terms">
        <p>By accessing or using EGYPTHUB, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
      </Section>
      <Section title="2. Booking & Payment">
        <p>All bookings are subject to availability and confirmation. Prices are displayed in EGP and USD. Payment must be completed at the time of booking unless otherwise agreed. Cancellation policies vary by experience and are clearly stated at the time of booking.</p>
      </Section>
      <Section title="3. User Accounts">
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information.</p>
      </Section>
      <Section title="4. AI Concierge">
        <p>Our AI-powered concierge provides personalized recommendations based on your preferences. While we strive for accuracy, recommendations should be verified with our support team for critical travel decisions.</p>
      </Section>
      <Section title="5. Limitation of Liability">
        <p>EGYPTHUB acts as a marketplace connecting travelers with local experience providers. We are not liable for disputes between users and providers, but we will mediate in good faith.</p>
      </Section>
      <Section title="6. Changes to Terms">
        <p>We reserve the right to modify these terms at any time. Users will be notified of material changes via email or platform notification.</p>
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

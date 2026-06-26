import LegalPage from '@/components/LegalPage';

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="June 1, 2026">
      <Section title="1. Information We Collect">
        <p>We collect information you provide directly to us, including your name, email address, phone number, payment details, and travel preferences when you create an account, make a booking, or contact our support team.</p>
      </Section>
      <Section title="2. How We Use Your Information">
        <p>Your information is used to process bookings, personalize your travel recommendations, improve our services, send relevant travel updates, and provide customer support. We use AI to analyze your preferences and suggest tailored experiences.</p>
      </Section>
      <Section title="3. Data Sharing">
        <p>We share your data with trusted partners including hotels, tour operators, and payment processors solely to fulfill your bookings. We never sell your personal information to third parties.</p>
      </Section>
      <Section title="4. Data Security">
        <p>We implement industry-standard encryption and security measures to protect your data. All payment transactions are processed through PCI-compliant gateways.</p>
      </Section>
      <Section title="5. Your Rights">
        <p>You have the right to access, correct, delete, or export your personal data at any time through your account settings or by contacting our support team.</p>
      </Section>
      <Section title="6. Contact">
        <p>If you have questions about this Privacy Policy, please contact us at <span className="text-theme-gold">privacy@egypthub.co</span>.</p>
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

'use client';

import { useState } from 'react';
import Link from 'next/link';

const footerLinks = [
  { title: 'Destinations', links: [
    { label: 'Sharm El Sheikh', href: '/destinations/sharm-el-sheikh' },
    { label: 'Cairo', href: '/destinations/cairo' },
    { label: 'Luxor', href: '/destinations/luxor' },
    { label: 'Aswan', href: '/destinations/aswan' },
    { label: 'Hurghada', href: '/destinations/hurghada' },
    { label: 'Alexandria', href: '/destinations/alexandria' },
    { label: 'Dahab', href: '/destinations/dahab' },
    { label: 'Siwa Oasis', href: '/destinations/siwa' },
  ]},
  { title: 'Experiences', links: [
    { label: 'Nile Cruises', href: '/category/nile-cruises' },
    { label: 'Desert Safaris', href: '/category/desert-safari' },
    { label: 'Diving & Snorkeling', href: '/category/diving' },
    { label: 'Historical Tours', href: '/category/history' },
    { label: 'Wellness Retreats', href: '/category/wellness' },
    { label: 'Cultural Immersion', href: '/category/culture' },
  ]},
  { title: 'Company', links: [
    { label: 'About EgyptHub', href: '/about-egypt' },
    { label: 'Our Story', href: '/stories' },
    { label: 'Careers', href: '#' },
    { label: 'Press & Media', href: '#' },
    { label: 'Partners', href: '/partners' },
    { label: 'Blog', href: '/stories' },
  ]},
  { title: 'Support', links: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '/zainab' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cancellation Policy', href: '#' },
    { label: 'Accessibility', href: '#' },
  ]},
];

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#060A14]">
      <div className="border-t border-[#D4A24C]/20" />
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8 py-10 md:py-14">

        {/* Logo Section */}
        <div className="flex flex-col md:flex-row items-start gap-10 mb-10">
          <div className="shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4A24C] to-[#C89A3D] flex items-center justify-center shadow-[0_4px_20px_rgba(212,162,76,0.3)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 22h20L12 2z" fill="white" />
                  <path d="M12 8L6 22h12L12 8z" fill="#060A14" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold font-english text-white tracking-wide">EGYPTHUB</span>
                <p className="text-[10px] text-[#D4A24C]/70 font-english tracking-[0.18em] -mt-0.5">YOUR STORY IN EGYPT</p>
              </div>
            </div>
            <p className="text-sm text-white/40 font-english leading-relaxed max-w-xs mb-5">
              The first AI-powered travel platform that learns your style and crafts personalized Egyptian journeys.
            </p>
            <div className="flex items-center gap-3">
              {[
                { name: 'Instagram', href: 'https://instagram.com/egypthub', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { name: 'Facebook', href: 'https://facebook.com/egypthub', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'Twitter', href: 'https://twitter.com/egypthub', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'YouTube', href: 'https://youtube.com/@egypthub', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                { name: 'LinkedIn', href: 'https://linkedin.com/company/egypthub', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/30 hover:text-[#D4A24C] hover:border-[#D4A24C]/30 hover:bg-[#D4A24C]/5 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 hidden md:grid md:grid-cols-4 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="border border-white/[0.05] rounded-xl p-5 bg-white/[0.02]">
                <h4 className="text-[10px] font-bold font-english tracking-[0.2em] text-[#D4A24C] mb-4">{section.title.toUpperCase()}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}><Link href={link.href} className="text-[11px] text-white/40 hover:text-[#D4A24C]/80 font-english transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:hidden w-full divide-y divide-white/[0.05]">
            {footerLinks.map((section, i) => (
              <div key={section.title}>
                <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  className="w-full flex items-center justify-between py-3 text-left"
                  aria-label={section.title.toUpperCase()}>
                  <span className="text-[10px] font-bold font-english tracking-[0.2em] text-[#D4A24C]">{section.title.toUpperCase()}</span>
                  <span className={`text-white/30 text-sm transition-transform ${openAccordion === i ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {openAccordion === i && (
                      <ul className="pb-3 space-y-2">
                        {section.links.map((link) => (
                          <li key={link.href}><Link href={link.href} className="text-[11px] text-white/40 hover:text-[#D4A24C]/80 font-english pl-2 block py-1">{link.label}</Link></li>
                        ))}
                      </ul>
                    )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="border-t border-white/[0.05] pt-5 mb-5">
          <button onClick={() => setOpenAccordion(openAccordion === 999 ? null : 999)}
            className="w-full flex items-center justify-between py-2 text-left"
            aria-label="FAQ">
            <div className="flex items-center gap-2">
              <span className="w-0.5 h-3 bg-[#D4A24C] rounded-full" />
              <h4 className="text-[10px] font-bold font-english tracking-[0.2em] text-[#D4A24C]">FAQ</h4>
            </div>
            <span className={`text-[#D4A24C] text-xs transition-transform ${openAccordion === 999 ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {openAccordion === 999 && (
            <div className="grid md:grid-cols-2 gap-2 mt-3">
              {[
                { q: 'How do I book an experience on EgyptHub?', a: 'Browse or search for experiences, select your preferred date and group size, then click "Book Now." You\'ll receive instant confirmation and a detailed itinerary via email.' },
                { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, Fawry, and Vodafone Cash. All transactions are secured with industry-leading encryption.' },
                { q: 'Can I cancel or reschedule my booking?', a: 'Yes! Free cancellation up to 48 hours before your experience. Rescheduling is available up to 24 hours prior at no extra cost.' },
                { q: 'Is EgyptHub available in Arabic?', a: 'Absolutely. EgyptHub supports both English and Arabic with full RTL layout. You can switch languages anytime from the header or settings.' },
                { q: 'How does the AI concierge work?', a: 'Our AI learns your travel preferences and suggests personalized experiences, hidden gems, and optimized itineraries tailored to your style.' },
                { q: 'Are the experiences family-friendly?', a: 'Most experiences are family-friendly. Each listing clearly indicates age suitability. We also have dedicated family packages and child-friendly activities.' },
              ].map((faq, i) => (
                <div key={i} className="border border-white/[0.05] rounded-lg bg-white/[0.02] p-3">
                  <p className="text-[11px] font-bold font-english text-white/70 mb-1">{faq.q}</p>
                  <p className="text-[10px] text-white/40 font-english leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter + Payment Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 border-t border-white/[0.05] pt-8">
          {/* Newsletter */}
          <div className="border border-white/[0.06] rounded-xl p-6 bg-white/[0.02]">
            <h4 className="text-[10px] font-bold font-english tracking-[0.2em] text-[#D4A24C] mb-2">NEWSLETTER</h4>
            <p className="text-xs text-white/40 font-english mb-4">Subscribe for exclusive deals, travel tips, and Egyptian inspiration.</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email for newsletter subscription"
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs font-english placeholder:text-white/30 focus:outline-none focus:border-[#D4A24C]/30 transition-all"
              />
              <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4A24C] to-[#C89A3D] text-[#060A14] text-xs font-bold font-english hover:shadow-[0_4px_15px_rgba(212,162,76,0.3)] transition-all"
                aria-label="Subscribe to newsletter">
                Subscribe
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border border-white/[0.06] rounded-xl p-6 bg-white/[0.02]">
            <h4 className="text-[10px] font-bold font-english tracking-[0.2em] text-[#D4A24C] mb-2">ACCEPTED PAYMENTS</h4>
            <p className="text-xs text-white/40 font-english mb-4">Secure payments powered by industry-leading encryption.</p>
            <div className="flex flex-wrap gap-3">
              {/* Visa */}
              <div className="w-[60px] h-[38px] rounded-lg bg-white flex items-center justify-center hover:shadow-[0_2px_8px_rgba(212,162,76,0.2)] transition-all" title="Visa">
                <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
                  <path d="M19.1 11.2l1.8-10.4h2.9l-1.8 10.4h-2.9z" fill="#D4A24C"/>
                  <path d="M31.7 1c-.6-.2-1.5-.4-2.6-.4-2.9 0-4.9 1.5-4.9 3.7 0 1.6 1.5 2.5 2.6 3 1.2.6 1.6 1 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.6c.7.3 2 .5 3.3.5 3.1 0 5.1-1.5 5.1-3.8 0-1.3-.8-2.3-2.5-3.1-1-.5-1.7-.9-1.7-1.4 0-.5.6-1 1.8-1 1 0 1.8.2 2.4.4l.3.1.6-2.6z" fill="#D4A24C"/>
                  <path d="M37.2 1.1h-2.3c-.7 0-1.3.2-1.6.9l-4.5 8.7h3l.7-1.8h3.9l.4 1.8h2.7l-2.3-8.6zm-3.6 5.5l1.1-2.9 1.1 2.9h-2.2z" fill="#D4A24C"/>
                  <path d="M15.3 1.1l-2.8 7.4-.3-1.5c-.5-1.7-2.1-3.6-3.9-4.5l2.5 8.9h3l4.5-10.3h-3z" fill="#D4A24C"/>
                  <path d="M10.5 1.1H4.2l-.1.3c5.1 1.3 8.5 4.4 9.9 8.3l-1.5-7.2c-.2-.9-.8-1.3-1.6-1.4z" fill="#D4A24C"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="w-[60px] h-[38px] rounded-lg bg-white flex items-center justify-center hover:shadow-[0_2px_8px_rgba(212,162,76,0.2)] transition-all" title="Mastercard">
                <svg width="36" height="22" viewBox="0 0 36 22" fill="none">
                  <circle cx="13" cy="11" r="10" fill="#EB001B"/>
                  <circle cx="23" cy="11" r="10" fill="#F79E1B"/>
                  <path d="M18 3.5a10 10 0 010 15 10 10 0 000-15z" fill="#FF5F00"/>
                </svg>
              </div>
              {/* Amex */}
              <div className="w-[60px] h-[38px] rounded-lg bg-[#006FCF] flex items-center justify-center hover:shadow-[0_2px_8px_rgba(212,162,76,0.2)] transition-all" title="American Express">
                <span className="text-white text-[8px] font-bold font-english tracking-wider">AMEX</span>
              </div>
              {/* Fawry */}
              <div className="w-[60px] h-[38px] rounded-lg bg-[#2B2B2B] flex items-center justify-center hover:shadow-[0_2px_8px_rgba(212,162,76,0.2)] transition-all" title="Fawry">
                <span className="text-[#FF6B00] text-[9px] font-bold font-english">fawry</span>
              </div>
              {/* Vodafone Cash */}
              <div className="w-[60px] h-[38px] rounded-lg bg-[#E60000] flex items-center justify-center hover:shadow-[0_2px_8px_rgba(212,162,76,0.2)] transition-all" title="Vodafone Cash">
                <span className="text-white text-[7px] font-bold font-english text-center leading-tight">Vodafone<br/>Cash</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/[0.06] pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <p className="text-[10px] text-white/25 font-english">© 2026 EgyptHub. All rights reserved.</p>
            <span className="text-white/10 hidden md:inline">|</span>
            <Link href="/privacy" className="text-[10px] text-white/25 hover:text-white/50 font-english">Privacy Policy</Link>
            <span className="text-white/10 hidden md:inline">|</span>
            <Link href="/terms" className="text-[10px] text-white/25 hover:text-white/50 font-english">Terms of Service</Link>
            <span className="text-white/10 hidden md:inline">|</span>
            <Link href="/cookies" className="text-[10px] text-white/25 hover:text-white/50 font-english">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-white/25 font-english">English (EN)</span>
            <span className="text-white/15">|</span>
            <span className="text-[10px] text-white/25 font-english">EGP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

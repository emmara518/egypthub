import dynamic from 'next/dynamic';

// Static imports for above-the-fold components
import HeroSection from '@/components/home/HeroSection';
import InteractiveMapSection from '@/components/home/InteractiveMapSection';

// Dynamic imports for below-fold heavy components
const ExperiencesSection = dynamic(() => import('@/components/home/ExperiencesSection'), { ssr: true });
const StoriesSection = dynamic(() => import('@/components/home/StoriesSection'), { ssr: true });
const SignatureCollection = dynamic(() => import('@/components/home/SignatureCollection'), { ssr: true });
const OffersSection = dynamic(() => import('@/components/home/OffersSection'), { ssr: true });
const ReviewsSection = dynamic(() => import('@/components/home/ReviewsSection'), { ssr: true });
const StatsAndLocalEyes = dynamic(() => import('@/components/home/StatsAndLocalEyes'), { ssr: true });
const TrustBadges = dynamic(() => import('@/components/home/TrustBadges'), { ssr: true });
const Newsletter = dynamic(() => import('@/components/home/Newsletter'), { ssr: true });
const GuestPhotoGallery = dynamic(() => import('@/components/home/GuestPhotoGallery'), { ssr: true });
const GuideProfiles = dynamic(() => import('@/components/home/GuideProfiles'), { ssr: true });

// Dynamic imports for footer and overlay components
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });
const WhatsAppChat = dynamic(() => import('@/components/home/WhatsAppChat'), { ssr: false });
const AbandonedRecovery = dynamic(() => import('@/components/home/AbandonedRecovery'), { ssr: false });
const RecentlyViewed = dynamic(() => import('@/components/home/RecentlyViewed'), { ssr: false });
const BookingTimeline = dynamic(() => import('@/components/home/BookingTimeline'), { ssr: false });
const SmartRecommendations = dynamic(() => import('@/components/home/SmartRecommendations'), { ssr: false });
const ActionDrawer = dynamic(() => import('@/components/home/ActionDrawer'), { ssr: false });
const SessionRecovery = dynamic(() => import('@/components/planning/SessionRecovery'), { ssr: false });

// Static imports for lightweight components
import BrandMotif from '@/components/BrandMotif';
import ScrollProgress from '@/components/home/ScrollProgress';
import BackToTop from '@/components/home/BackToTop';
import ReferralBanner from '@/components/home/ReferralBanner';
export default function HomePage() {
  return (
    <main className="bg-[#080C18] text-white overflow-x-hidden">
      <h1 className="sr-only">EGYPTHUB - Egypt Travel Marketplace</h1>
      <a href="#hero" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <ReferralBanner />
      <BookingTimeline />
      <div className="section-fade-in"><section id="hero"><HeroSection /></section></div>
      <div className="section-fade-in"><section id="map"><InteractiveMapSection /></section></div>
      <BrandMotif variant="gold-line" className="mx-auto max-w-[200px] my-8" />
      <div className="section-fade-in">
        <section id="experiences-stories" className="relative">
          <div className="relative z-10"><ExperiencesSection /></div>
          <div className="relative z-10 -mt-16 md:-mt-24"><StoriesSection /></div>
        </section>
      </div>
      <div className="section-fade-in"><section id="signature"><SignatureCollection /></section></div>
      <BrandMotif variant="gold-line" className="mx-auto max-w-[200px] my-8" />
      <div className="section-fade-in"><section id="offers"><OffersSection /></section></div>
      <div className="section-fade-in"><section id="stats"><StatsAndLocalEyes /></section></div>
      <div className="section-fade-in"><section id="reviews">
        <ReviewsSection />
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
          <GuestPhotoGallery />
          <GuideProfiles />
        </div>
      </section></div>
      <BrandMotif variant="gold-line" className="mx-auto max-w-[200px] my-8" />
      <SmartRecommendations />
      <div className="section-fade-in"><Newsletter /></div>
      <div className="section-fade-in"><Footer /></div>
      <RecentlyViewed />
      <ActionDrawer />
      <WhatsAppChat />
      <AbandonedRecovery />
      <SessionRecovery />
      <BackToTop />
    </main>
  );
}

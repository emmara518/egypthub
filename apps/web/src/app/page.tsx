import HeroSection from '@/components/home/HeroSection';
import StoriesSection from '@/components/home/StoriesSection';
import LiveInEgypt from '@/components/home/LiveInEgypt';
import SignatureCollection from '@/components/home/SignatureCollection';
import StatsRow from '@/components/home/StatsRow';
import LocalEyes from '@/components/home/LocalEyes';
import PartnerLogos from '@/components/home/PartnerLogos';
import TrustBadges from '@/components/home/TrustBadges';
import MobilePreview from '@/components/home/MobilePreview';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080C18] text-white">
      <main className="relative">
        <HeroSection />
        <StoriesSection />
        <LiveInEgypt />
        <SignatureCollection />
        <StatsRow />
        <LocalEyes />
        <PartnerLogos />
        <TrustBadges />
        <MobilePreview />
      </main>
      <Footer />
    </div>
  );
}

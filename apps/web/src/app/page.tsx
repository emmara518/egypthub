import HeroSection from '@/components/home/HeroSection';
import InteractiveMapSection from '@/components/home/InteractiveMapSection';
import StoriesSection from '@/components/home/StoriesSection';
import SignatureCollection from '@/components/home/SignatureCollection';
import StatsAndLocalEyes from '@/components/home/StatsAndLocalEyes';
import PartnerLogos from '@/components/home/PartnerLogos';
import TrustBadges from '@/components/home/TrustBadges';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080C18] text-white">
      <main className="relative">
        <HeroSection />
        <InteractiveMapSection />
        <StoriesSection />
        <SignatureCollection />
        <StatsAndLocalEyes />
        <PartnerLogos />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
}

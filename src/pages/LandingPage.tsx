import {
  LandingHeader,
  LandingFooter,
  HeroSection,
  ValuePropositionSection,
  BuiltForSection,
  HowItWorksSection,
  PricingSection,
  FAQSection,
  // SOFT-LAUNCH: SocialProofSection,
} from '@/components/landing';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        {/* SOFT-LAUNCH: <SocialProofSection /> */}
        <BuiltForSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}

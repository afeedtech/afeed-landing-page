import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LandingHeader,
  LandingFooter,
  HeroSection,
  ValuePropositionSection,
  BuiltForSection,
  HowItWorksSection,
  PricingSection,
  FAQSection,
} from '@/components/landing';

export default function LandingPageEN() {
  const { i18n } = useTranslation();

  // Force English on mount, restore on unmount
  useEffect(() => {
    const prev = i18n.language;
    if (prev !== 'en') {
      i18n.changeLanguage('en');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
    return () => {
      if (prev !== 'en') {
        i18n.changeLanguage(prev);
        document.documentElement.dir = prev === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = prev;
      }
    };
  }, [i18n]);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <LandingHeader />
      <main>
        <HeroSection />
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

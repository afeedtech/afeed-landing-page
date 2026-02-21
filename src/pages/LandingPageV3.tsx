import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LandingHeader,
  LandingFooter,
  HeroSection,
  BuiltForSection,
  HowItWorksSection,
  PricingSection,
  FAQSection,
} from '@/components/landing';
import { ValuePropositionSectionV3 } from '@/components/landing/ValuePropositionSectionV3';

const enOverrides = {
  value: {
    card1: {
      title: "Your Own Professional Page",
      description: "A beautiful storefront that represents your brand. No coding required.",
    },
    card2: {
      description: "Package what you know into courses, sessions, programs, and memberships your audience can buy instantly.",
    },
    card3: {
      title: "Payments that just work",
      description: "Professional checkout, automatic receipts, and direct deposits with transparent fees and flexible schedules — so you never have to chase a payment again.",
    },
  },
  sell: {
    title: "Whatever you know, there's a way to sell it",
    subtitle: "Courses, coaching, Live Sessions, and Digital products. If it's digital, you can sell it.",
  },
  features: {
    subtitle: "Manage everything on your terms — without the tech headaches.",
  },
};

const arOverrides = {
  value: {
    card1: {
      title: "صفحتك الاحترافية الخاصة",
      description: "واجهة متجر جميلة تمثل علامتك التجارية. لا حاجة للبرمجة.",
    },
    card2: {
      description: "غلّف معرفتك في دورات، جلسات، برامج، وعضويات يقدر جمهورك يشتريها فوراً.",
    },
    card3: {
      title: "مدفوعات بدون تعقيد",
      description: "صفحة دفع احترافية، إيصالات تلقائية، وإيداعات مباشرة برسوم واضحة وجداول مرنة — عشان ما تلاحق أي دفعة مرة ثانية.",
    },
  },
  sell: {
    title: "مهما كنت تعرف، هناك طريقة لبيعه",
    subtitle: "دورات، استشارات، جلسات مباشرة، ومنتجات رقمية. إذا كان رقمياً، تقدر تبيعه.",
  },
  features: {
    subtitle: "أدر كل شيء بشروطك — بدون صداع تقني.",
  },
};

export default function LandingPageV3() {
  const { i18n } = useTranslation();
  const origEn = useRef<any>(null);
  const origAr = useRef<any>(null);

  useEffect(() => {
    origEn.current = JSON.parse(JSON.stringify(i18n.getResourceBundle('en', 'translation')));
    origAr.current = JSON.parse(JSON.stringify(i18n.getResourceBundle('ar', 'translation')));

    i18n.addResourceBundle('en', 'translation', enOverrides, true, true);
    i18n.addResourceBundle('ar', 'translation', arOverrides, true, true);

    return () => {
      if (origEn.current) {
        i18n.addResourceBundle('en', 'translation', origEn.current, true, true);
      }
      if (origAr.current) {
        i18n.addResourceBundle('ar', 'translation', origAr.current, true, true);
      }
    };
  }, [i18n]);

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <BuiltForSection />
        <ValuePropositionSectionV3 />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}

import { useEffect, useRef } from 'react';
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

const enOverrides = {
  hero: {
    titleSuffix: "into a real business",
    subtitle: "Build your storefront, sell your digital products and services, and get paid — all from one simple platform.",
  },
  value: {
    title: "Everything you need, nothing in your way",
    subtitle: "From your page to your payouts — every tool a creator needs, all in one place.",
    card1: {
      title: "A page that represents you",
      description: "Your own branded storefront — professional, beautiful, and ready to share.",
    },
    card2: {
      title: "Your knowledge, your way to sell",
      description: "Courses, sessions, downloads — package your expertise however works best.",
    },
    card3: {
      title: "Payments that just work",
      description: "Reliable payouts with clear fees and flexible schedules.",
    },
    card4: {
      title: "Data you can act on",
      description: "See what's working, understand your audience, and grow smarter.",
    },
  },
  sell: {
    title: "Whatever you know, there's a way to sell it",
    subtitle: "From courses to coaching to downloads — turn your expertise into products your audience will love.",
  },
  howItWorks: {
    title: "Ready before your coffee gets cold",
    subtitle: "Three simple steps to go live.",
  },
  features: {
    title: "Features that give you total flexibility",
    subtitle: "Built to scale with you — from your first product to your thousandth customer.",
  },
  payouts: {
    title: "Your earnings, delivered to you — not shared with us",
    subtitle: "Zero platform commission. Only standard payment processing fees apply.",
  },
  analytics: {
    title: "Smart insights that support your decisions",
    subtitle: "Track what matters — visitors, conversions, revenue — and know exactly where to focus.",
  },
  checkout: {
    title: "A buying experience your customers will love",
    subtitle: "Fast, secure checkout that converts. Multiple payment options, zero friction.",
  },
  pricing: {
    title: "Start free. Grow at your own pace.",
    subtitle: "No hidden fees, no surprises. Upgrade only when you're ready.",
  },
  faq: {
    title: "Questions? We've got you.",
    ctaTitle: "Ready to turn your knowledge into income?",
    ctaSubtitle: "Join creators who are building real businesses with Afeed.",
  },
};

const arOverrides = {
  hero: {
    titleSuffix: "إلى عمل حقيقي",
    subtitle: "ابنِ متجرك، بِع منتجاتك وخدماتك الرقمية، واستلم مستحقاتك — كل شيء من منصة واحدة بسيطة.",
  },
  value: {
    title: "كل ما تحتاجه، ولا شيء في طريقك",
    subtitle: "من صفحتك إلى مستحقاتك — كل أداة يحتاجها صانع المحتوى، في مكان واحد.",
    card1: {
      title: "صفحة تمثّلك",
      description: "واجهة متجر باسمك — احترافية، جميلة، وجاهزة للمشاركة.",
    },
    card2: {
      title: "معرفتك، طريقتك في البيع",
      description: "دورات، جلسات، تحميلات — غلّف خبرتك بالطريقة اللي تناسبك.",
    },
    card3: {
      title: "مدفوعات بدون تعقيد",
      description: "تحويلات موثوقة مع رسوم واضحة وجداول مرنة.",
    },
    card4: {
      title: "بيانات تقدر تتصرف عليها",
      description: "شوف وش يشتغل، افهم جمهورك، وانمو بذكاء.",
    },
  },
  sell: {
    title: "مهما كنت تعرف، هناك طريقة لبيعه",
    subtitle: "من الدورات إلى الاستشارات إلى التحميلات — حوّل خبرتك إلى منتجات يحبها جمهورك.",
  },
  howItWorks: {
    title: "جاهز قبل ما يبرد قهوتك",
    subtitle: "ثلاث خطوات بسيطة وتبدأ.",
  },
  features: {
    title: "مميزات تمنحك مرونة كاملة",
    subtitle: "مصممة تكبر معك — من أول منتج إلى آلاف العملاء.",
  },
  payouts: {
    title: "أرباحك، تُسلّم لك — ما نشاركك فيها",
    subtitle: "صفر عمولة منصة. فقط رسوم معالجة الدفع المعتادة.",
  },
  analytics: {
    title: "تحليلات ذكية تدعم قراراتك",
    subtitle: "تتبع اللي يهم — الزوار، التحويلات، الإيرادات — واعرف وين تركز بالضبط.",
  },
  checkout: {
    title: "تجربة شراء يحبها عملاؤك",
    subtitle: "عملية دفع سريعة وآمنة. خيارات دفع متعددة، بدون تعقيد.",
  },
  pricing: {
    title: "ابدأ مجاناً. كبّر على مزاجك.",
    subtitle: "لا رسوم خفية، لا مفاجآت. قم بالترقية فقط عندما تكون جاهزاً.",
  },
  faq: {
    title: "أسئلتك؟ عندنا الجواب.",
    ctaTitle: "مستعد تحوّل معرفتك إلى دخل حقيقي؟",
    ctaSubtitle: "انضم لصنّاع المحتوى اللي يبنون أعمال حقيقية مع أفيد.",
  },
};

export default function LandingPageV2() {
  const { i18n } = useTranslation();
  const origEn = useRef<any>(null);
  const origAr = useRef<any>(null);

  useEffect(() => {
    // Deep copy originals before overriding
    origEn.current = JSON.parse(JSON.stringify(i18n.getResourceBundle('en', 'translation')));
    origAr.current = JSON.parse(JSON.stringify(i18n.getResourceBundle('ar', 'translation')));

    // Apply v2 overrides (deep merge, overwrite)
    i18n.addResourceBundle('en', 'translation', enOverrides, true, true);
    i18n.addResourceBundle('ar', 'translation', arOverrides, true, true);

    return () => {
      // Restore original translations
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
        <ValuePropositionSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}

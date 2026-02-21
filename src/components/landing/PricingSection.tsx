import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Zap, Crown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { formatNumber, formatCompact } from '@/lib/formatters';

export function PricingSection() {
  const { t, i18n } = useTranslation();
  const { isRTL, language: lang } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(false);

  // Feature items starting with 'header:' render as section headers
  const plans = [
    {
      nameKey: 'pricing.plans.basic.name',
      descriptionKey: 'pricing.plans.basic.description',
      price: 20,
      annualPrice: 17,
      icon: Sparkles,
      popular: false,
      reachLimit: 500,
      featureKeys: [
        'header:pricing.features.headerFeatures',
        'pricing.features.storage20gb',
        'pricing.features.products10',
        'pricing.features.subscribers100',
        'pricing.features.liveSessions1200',
        'header:pricing.features.headerPaymentFees',
        'pricing.features.debitCard',
        'pricing.features.creditCard',
        'pricing.features.applePay',
      ],
    },
    {
      nameKey: 'pricing.plans.growth.name',
      descriptionKey: 'pricing.plans.growth.description',
      price: 35,
      annualPrice: 29,
      icon: Zap,
      popular: true,
      reachLimit: 5000,
      featureKeys: [
        'header:pricing.features.headerFeatures',
        'pricing.features.storage130gb',
        'pricing.features.products60',
        'pricing.features.subscribers600',
        'pricing.features.zoomMeetings12000',
        'header:pricing.features.headerPaymentFees',
        'pricing.features.debitCard',
        'pricing.features.creditCard',
        'pricing.features.applePay',
      ],
    },
    {
      nameKey: 'pricing.plans.pro.name',
      descriptionKey: 'pricing.plans.pro.description',
      price: 85,
      annualPrice: 72,
      icon: Crown,
      popular: false,
      reachLimit: 50000,
      featureKeys: [
        'header:pricing.features.headerFeatures',
        'pricing.features.storageUnlimited',
        'pricing.features.productsUnlimited',
        'pricing.features.subscribersUnlimited',
        'pricing.features.zoomUnlimited',
        'header:pricing.features.headerPaymentFees',
        'pricing.features.debitCard',
        'pricing.features.creditCard',
        'pricing.features.applePay',
      ],
    },
  ];

  const formatReachLimit = (limit: number) => {
    return formatCompact(limit, lang);
  };

  return (
    <section id="pricing" className="scroll-mt-24 py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            {t('pricing.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <Label htmlFor="pricing-toggle" className={cn("text-sm", !isAnnual && "font-semibold text-foreground")}>
              {t('pricing.monthly')}
            </Label>
            <Switch
              id="pricing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="pricing-toggle" className={cn("text-sm", isAnnual && "font-semibold text-foreground")}>
              {t('pricing.annual')}
              <span className="ms-1 text-xs text-primary font-medium">
                ({t('pricing.savePercent')})
              </span>
            </Label>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const displayPrice = isAnnual ? plan.annualPrice : plan.price;
            
            return (
              <div
                key={i}
                className={cn(
                  "relative bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border transition-all hover:shadow-xl flex flex-col",
                  plan.popular 
                    ? "border-primary shadow-lg shadow-primary/10 lg:scale-105 z-10" 
                    : "border-border hover:border-primary/30"
                )}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {t('pricing.popular')}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="text-center mb-6">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                    plan.popular 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-primary/10 text-primary"
                  )}>
                    <plan.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{t(plan.nameKey)}</h3>
                  <p className="text-muted-foreground mt-1">{t(plan.descriptionKey)}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-foreground">{formatNumber(displayPrice, lang)}</span>
                    <span className="text-lg sm:text-xl font-semibold text-muted-foreground">{isRTL ? 'د.ك' : 'KWD'}</span>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">/{t('pricing.perMonth')}</span>
                  {isAnnual && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('pricing.billedAnnually')}
                    </p>
                  )}
                </div>

                {/* Reach Limit Badge - Prominent */}
                <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      {formatReachLimit(plan.reachLimit)} {t('pricing.recipientsMonth')}
                    </span>
                  </div>
                </div>


                {/* Features */}
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.featureKeys.map((featureKey, j) => {
                    const isHeader = featureKey.startsWith('header:');
                    const actualKey = isHeader ? featureKey.replace('header:', '') : featureKey;
                    
                    if (isHeader) {
                      return (
                        <li key={j} className={cn("text-sm font-bold text-foreground", j > 0 && "pt-4 border-t border-border")}>
                          {t(actualKey)}
                        </li>
                      );
                    }
                    
                    return (
                      <li key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-primary">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <span className="text-foreground">{t(featureKey)}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <Link to="/signup" className="block">
                  <Button
                    className="w-full py-6 text-lg font-semibold rounded-xl transition-all brand-gradient-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                  >
                    {t('pricing.cta')}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-muted-foreground mt-12">
          {t('pricing.footer')}
        </p>
      </div>
    </section>
  );
}
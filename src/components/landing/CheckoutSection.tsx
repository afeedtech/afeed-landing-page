import { useTranslation } from 'react-i18next';
import { CreditCard, Smartphone, Zap, Check, Lock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/formatters';

export function CheckoutSection() {
  const { t, i18n } = useTranslation();
  const { isRTL, language: lang } = useLanguage();

  const features = [
    { icon: Zap, text: t('checkout.feature1') },
    { icon: CreditCard, text: t('checkout.feature2') },
    { icon: Smartphone, text: t('checkout.feature3') },
  ];

  const steps = [t('checkout.stepCart'), t('checkout.stepDetails'), t('checkout.stepPay')];

  return (
    <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
              {t('checkout.badge')}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
              {t('checkout.title')}
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground">
              {t('checkout.subtitle')}
            </p>

            <div className="mt-10 space-y-5">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                    <item.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-semibold text-lg text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Security badges */}
            <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-6">
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{t('checkout.ssl')}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{t('checkout.pci')}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                <span className="text-xs sm:text-sm">{t('checkout.secure3d')}</span>
              </div>
            </div>
          </div>

          {/* Right: Mock checkout - 3-step */}
          <div className="relative">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl sm:rounded-3xl blur-3xl scale-110" />

            <div className="relative bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-border/50 shadow-2xl max-w-md mx-auto lg:mx-0 lg:ms-auto">
              {/* Progress steps */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      i <= 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    )}>
                      {i < 2 ? <Check className="w-4 h-4" /> : formatNumber(i + 1, lang)}
                    </div>
                    <span className="ms-2 text-sm font-medium text-foreground hidden sm:block">{step}</span>
                    {i < 2 && <div className="w-8 sm:w-12 h-0.5 bg-primary mx-2" />}
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-xl text-foreground mb-6">{t('checkout.completePurchase')}</h3>
              
              {/* Product summary */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop"
                  alt="Product"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{t('checkout.productName')}</p>
                  <p className="text-sm text-muted-foreground">{t('checkout.productDuration')}</p>
                </div>
                <span className="font-bold text-xl text-foreground">{isRTL ? '٨٩ د.ك' : '89 KWD'}</span>
              </div>

              {/* Payment methods */}
              <div className="space-y-3 mb-6">
                <label className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border-2 border-primary cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-4 border-primary" />
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{t('checkout.creditCard')}</span>
                  </div>
                  <span className="text-sm text-foreground">{isRTL ? '•••• ٤٢٤٢' : '•••• 4242'}</span>
                </label>
                
                <label className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                    <span className="text-lg">🍎</span>
                    <span className="font-medium text-foreground">{t('checkout.applePay')}</span>
                  </div>
                </label>
              </div>

              {/* Pay button */}
              <button className="w-full brand-gradient-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" />
                {t('checkout.payButton')} {isRTL ? '٨٩ د.ك' : '89 KWD'}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-3 h-3" />
                {t('checkout.securePayment')}
              </div>
            </div>

            {/* Floating conversion stat - hidden on mobile */}
            <div className={cn(
              "absolute -bottom-6 bg-card rounded-2xl p-4 shadow-xl border border-border/50 hidden lg:block",
              isRTL ? "left-0 lg:-left-6" : "right-0 lg:-right-6"
            )}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{t('checkout.conversionStat')}</p>
                  <p className="text-xs text-muted-foreground">{t('checkout.conversionLabel')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
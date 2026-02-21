import { useTranslation } from 'react-i18next';
import { Shield, Calendar, Wallet, Check, Lock, BadgeCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export function PayoutsSection() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const highlights = [
    { icon: Shield, text: t('payouts.highlight1') },
    { icon: Calendar, text: t('payouts.highlight2') },
    { icon: Wallet, text: t('payouts.highlight3') },
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4" />
              {t('payouts.badge')}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
              {t('payouts.title')}
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground">
              {t('payouts.subtitle')}
            </p>

            <div className="mt-10 space-y-5">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:scale-110 transition-all">
                    <item.icon className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-semibold text-lg text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-4">
              {['KNET', 'Visa', 'Mastercard', 'Apple Pay'].map((badge, i) => (
                <div key={i} className="px-4 py-2 bg-muted rounded-xl text-sm font-medium text-muted-foreground border border-border">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock payout dashboard */}
          <div className="relative">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl sm:rounded-3xl blur-3xl scale-110" />

            <div className="relative bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-border/50 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="font-bold text-lg sm:text-xl text-foreground">
                  {t('payouts.scheduleTitle')}
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{t('payouts.secure')}</span>
                </div>
              </div>

              {/* Balance */}
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl text-white">
                <p className="text-xs sm:text-sm opacity-80 mb-1">{t('payouts.availableBalance')}</p>
                <p className="text-3xl sm:text-4xl font-bold">{isRTL ? '١٬٩٥٠ د.ك' : '1,950 KWD'}</p>
                <p className="text-xs sm:text-sm mt-2 opacity-80">{t('payouts.nextPayout')}</p>
              </div>
              
              {/* Schedule options */}
              <div className="space-y-4">
                {[
                  { label: t('payouts.weekly'), amount: isRTL ? '٣٨٥ د.ك' : '385 KWD', status: 'active', date: t('payouts.everyFriday') },
                  { label: t('payouts.monthly'), amount: isRTL ? '١٬٤٧٠ د.ك' : '1,470 KWD', status: 'pending', date: t('payouts.firstOfMonth') },
                  { label: t('payouts.immediate'), amount: isRTL ? '٩٥ د.ك' : '95 KWD', status: 'completed', date: t('payouts.instant') },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-muted/50 rounded-2xl hover:bg-muted transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${
                        item.status === 'active' ? 'bg-emerald-500 animate-pulse' : 
                        item.status === 'pending' ? 'bg-amber-500' : 
                        'bg-blue-500'
                      }`} />
                      <div>
                        <span className="font-semibold text-foreground">{item.label}</span>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg text-foreground">{item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-emerald-500/10 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {t('payouts.highlight1')}
                </span>
              </div>
            </div>

            {/* SOFT-LAUNCH: Floating testimonial - restore when we have real testimonials
            <div className="absolute -bottom-6 -left-6 hidden lg:block">
              <div className="bg-card rounded-2xl p-4 shadow-xl border border-border/50 max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/placeholder.svg" alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">Ahmed H.</p>
                    <p className="text-xs text-muted-foreground">{t('payouts.testimonialRole')}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"{t('payouts.testimonialQuote')}"</p>
              </div>
            </div>
            */}

          </div>
        </div>
      </div>
    </section>
  );
}
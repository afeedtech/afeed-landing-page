import { useTranslation } from 'react-i18next';
import { Layout, Package, CreditCard, BarChart3, BookOpen, Video, FileText, Shield, Calendar, Wallet, Headset, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MockMyPageView } from './MockMyPageView';
import { MockMyBusinessView } from './MockMyBusinessView';

export function ValuePropositionSection() {
  const { t } = useTranslation();

  const productCategories = [
    { icon: BookOpen, name: t('sell.courses'), description: t('sell.coursesDesc') },
    { icon: Video, name: t('sell.sessions'), description: t('sell.sessionsDesc') },
    { icon: FileText, name: t('sell.downloads'), description: t('sell.downloadsDesc') },
  ];

  const cards = [
    { icon: Layout, title: t('value.card1.title'), description: t('value.card1.description'), customView: 'myPage' },
    { icon: Package, title: t('value.card2.title'), description: t('value.card2.description'), customView: 'products' },
    { icon: CreditCard, title: t('value.card3.title'), description: t('value.card3.description'), customView: 'payouts' },
    { icon: BarChart3, title: t('value.card4.title'), description: t('value.card4.description'), customView: 'myBusiness' },
    { icon: Headset, title: t('value.card5.title'), description: t('value.card5.description'), customView: 'support' },
  ];

  return (
    <section id="why-afeed" className="py-8 md:py-12 lg:py-16 relative overflow-hidden scroll-mt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            {t('value.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('value.subtitle')}
          </p>
        </div>

        {/* Alternating cards layout */}
        <div className="space-y-12 md:space-y-16 lg:space-y-24">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className={cn(
                "grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center",
                i % 2 === 1 && "lg:grid-flow-dense"
              )}
            >
              {/* Content */}
              <div className={cn(
                "space-y-4 sm:space-y-6",
                i % 2 === 1 && "lg:col-start-2"
              )}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl brand-gradient-primary flex items-center justify-center shadow-lg">
                  <card.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  {card.title}
                </h3>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Image or Custom View */}
              <div className={cn(
                "relative",
                i % 2 === 1 && "lg:col-start-1 lg:row-start-1"
              )}>
                {card.customView === 'myPage' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4DA3FF]/20 to-[#0D4F9C]/20 rounded-2xl sm:rounded-3xl blur-3xl scale-110" />
                    <div className="relative">
                      <MockMyPageView />
                    </div>
                  </div>
                ) : card.customView === 'myBusiness' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4DA3FF]/20 to-[#0D4F9C]/20 rounded-2xl sm:rounded-3xl blur-3xl scale-110" />
                    <div className="relative">
                      <MockMyBusinessView />
                    </div>
                  </div>
                ) : card.customView === 'products' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4DA3FF]/30 to-[#0D4F9C]/30 rounded-2xl sm:rounded-3xl blur-3xl scale-110" />
                    <div className="relative flex flex-col gap-3">
                      {productCategories.map((category, j) => (
                        <div
                          key={j}
                          className="rounded-2xl p-5 sm:p-6 bg-card shadow-lg border border-border/50 border-l-4 border-l-[#1A70F0]"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-[#1A70F0]/10 flex items-center justify-center shrink-0">
                              <category.icon className="h-5 w-5 text-[#1A70F0] dark:text-[#4DA3FF]" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-foreground mb-1">{category.name}</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : card.customView === 'payouts' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4DA3FF]/20 to-[#0D4F9C]/20 rounded-2xl sm:rounded-3xl blur-3xl scale-110" />
                    <div className="relative bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/50 shadow-2xl">
                      <h4 className="font-bold text-lg sm:text-xl text-foreground mb-2">{t('payouts.title')}</h4>
                      <p className="text-sm text-muted-foreground mb-6">{t('payouts.subtitle')}</p>

                      <div className="space-y-4 mb-6">
                        {[
                          { icon: Shield, text: t('payouts.highlight1') },
                          { icon: Calendar, text: t('payouts.highlight2') },
                          { icon: Wallet, text: t('payouts.highlight3') },
                        ].map((item, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1A70F0]/10 flex items-center justify-center shrink-0">
                              <item.icon className="h-5 w-5 text-[#1A70F0] dark:text-[#4DA3FF]" />
                            </div>
                            <span className="font-medium text-sm sm:text-base text-foreground">{item.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {['KNET', 'Visa', 'Mastercard', 'Apple Pay'].map((badge, j) => (
                          <div key={j} className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium text-muted-foreground border border-border">
                            {badge}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : card.customView === 'support' ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4DA3FF]/20 to-[#0D4F9C]/20 rounded-2xl sm:rounded-3xl blur-3xl scale-110" />
                    <div className="relative bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/50 shadow-2xl">

                      <div className="space-y-4">
                        {[
                          { icon: Headset, text: t('support.highlight1') },
                          { icon: Sparkles, text: t('support.highlight2') },
                          { icon: Users, text: t('support.highlight3') },
                        ].map((item, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1A70F0]/10 flex items-center justify-center shrink-0">
                              <item.icon className="h-5 w-5 text-[#1A70F0] dark:text-[#4DA3FF]" />
                            </div>
                            <span className="font-medium text-sm sm:text-base text-foreground">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import { 
  Layout, 
  Package, 
  Users, 
  CreditCard, 
  HeadphonesIcon,
  Sparkles,
} from 'lucide-react';

export function FeaturesGridSection() {
  const { t } = useTranslation();

  const features = [
    { 
      icon: Layout, 
      title: t('features.storefront.title'), 
      description: t('features.storefront.description'),
      gradient: 'from-blue-600 to-indigo-700',
    },
    { 
      icon: Package, 
      title: t('features.products.title'), 
      description: t('features.products.description'),
      gradient: 'from-amber-500 to-orange-600',
    },
    { 
      icon: Users, 
      title: t('features.audience.title'), 
      description: t('features.audience.description'),
      gradient: 'from-emerald-500 to-teal-600',
    },
    { 
      icon: CreditCard, 
      title: t('features.payments.title'), 
      description: t('features.payments.description'),
      gradient: 'from-purple-500 to-violet-600',
    },
    { 
      icon: HeadphonesIcon, 
      title: t('features.support.title'), 
      description: t('features.support.description'),
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <section id="features" className="scroll-mt-24 py-8 md:py-12 lg:py-16 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            {t('features.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            {t('features.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Static grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-gradient-to-br ${feature.gradient} p-5`}
            >
              <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3">
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

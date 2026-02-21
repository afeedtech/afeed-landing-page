import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, DollarSign, Eye, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { formatCompact, formatNumber, formatPercent } from '@/lib/formatters';

export function AnalyticsSection() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const lang = i18n.language;

  const benefits = [
    t('analytics.benefit1'),
    t('analytics.benefit2'),
    t('analytics.benefit3'),
    t('analytics.benefit4'),
  ];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">
          {/* Left: Mock analytics dashboard */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl sm:rounded-3xl blur-3xl scale-110" />

              <div className="relative bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-border/50 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="font-bold text-lg sm:text-xl text-foreground">{t('analytics.dashboardTitle')}</h3>
                  <span className="text-xs sm:text-sm text-muted-foreground">{t('analytics.last30Days')}</span>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {[
                    { label: t('analytics.metric1'), value: formatCompact(12400, lang), icon: Users, change: `+${formatNumber(24, lang)}%`, color: 'text-blue-500' },
                    { label: t('analytics.metric2'), value: formatPercent(8.2, lang, 1), icon: TrendingUp, change: `+${formatNumber(12, lang)}%`, color: 'text-emerald-500' },
                    { label: t('analytics.metric3'), value: formatCompact(2600, lang), icon: DollarSign, change: `+${formatNumber(31, lang)}%`, color: 'text-purple-500' },
                  ].map((metric, i) => (
                    <div key={i} className="p-3 sm:p-4 bg-muted/50 rounded-xl sm:rounded-2xl hover:bg-muted transition-colors group">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <metric.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${metric.color}`} />
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5">
                          {metric.change}
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-foreground">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-xs sm:text-sm font-medium text-foreground">{t('analytics.revenueTrend')}</span>
                    <span className="text-xs text-muted-foreground">{t('common.currency')}</span>
                  </div>
                  <div className="h-32 sm:h-48 bg-gradient-to-t from-primary/5 to-transparent rounded-xl sm:rounded-2xl flex items-end justify-around p-3 sm:p-4 gap-1 sm:gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all hover:from-primary/80 cursor-pointer group relative"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {formatNumber(Math.round(height * 3), lang)} {t('common.currency')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-500/10 rounded-xl">
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">{t('analytics.topProduct')}</p>
                    <p className="text-foreground font-semibold mt-1">{t('analytics.sampleProduct')}</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-xl">
                    <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">{t('analytics.topSource')}</p>
                    <p className="text-foreground font-semibold mt-1">{t('analytics.sampleSource')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              {t('analytics.badge')}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
              {t('analytics.title')}
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground">
              {t('analytics.subtitle')}
            </p>

            <ul className="mt-6 sm:mt-10 space-y-3 sm:space-y-5">
              {benefits.map((item, i) => (
                <li key={i} className="flex items-center gap-3 sm:gap-4 group">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                  <span className="text-base sm:text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
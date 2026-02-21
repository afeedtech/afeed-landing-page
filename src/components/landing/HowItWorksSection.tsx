import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus, Palette, Rocket } from 'lucide-react';
import afeedIcon from '@/assets/afeed-logo-icon.svg';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/formatters';
import { useEffect, useRef, useState } from 'react';

export function HowItWorksSection() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const lang = i18n.language;
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    { icon: UserPlus, title: t('howItWorks.step1.title'), description: t('howItWorks.step1.description'), number: 1 },
    { icon: Palette, title: t('howItWorks.step2.title'), description: t('howItWorks.step2.description'), number: 2 },
    { icon: Rocket, title: t('howItWorks.step3.title'), description: t('howItWorks.step3.description'), number: 3 },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="scroll-mt-24 py-16 md:py-24 lg:py-32 relative overflow-hidden"
      style={{ background: '#0B1A2F' }}
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(213 87% 52% / 0.25) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {t('howItWorks.titlePart1')}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {formatNumber(Number(t('howItWorks.titleHighlight')), lang)}
            </span>
            {t('howItWorks.titlePart2')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps grid */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connector lines — desktop only */}
          <div className="hidden lg:block absolute top-[2.25rem] z-0" style={{ [isRTL ? 'right' : 'left']: 'calc(16.67% + 2.25rem)', width: 'calc(66.66% - 4.5rem)' }}>
            <div className="h-px bg-white/20 w-full relative">
              {/* Animated boomerang traveler */}
              <img
                src={afeedIcon}
                alt=""
                className={cn(
                  "absolute -top-3 w-6 h-6 brightness-0 invert opacity-0",
                  isVisible && "hiw-connector-travel",
                  isRTL && "hiw-connector-travel-rtl"
                )}
                style={{ [isRTL ? 'right' : 'left']: '0' }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 relative z-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "relative text-center group",
                  "opacity-0 translate-y-6",
                  isVisible && "hiw-step-appear"
                )}
                style={{ animationDelay: isVisible ? `${i * 200}ms` : '0ms' }}
              >
                {/* Icon */}
                <div className="relative inline-flex mb-5">
                  <div className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl bg-[#1a2d4a] border border-white/20 flex items-center justify-center shadow-lg shadow-primary/10 group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-105 transition-all">
                    <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  {/* Number badge with gradient */}
                  <span className={cn(
                    "absolute -top-2 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center shadow-md",
                    isRTL ? "-left-2" : "-right-2"
                  )}>
                    {formatNumber(step.number, lang)}
                  </span>
                </div>

                <h3 className="font-bold text-lg sm:text-xl text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 max-w-[260px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col items-center gap-3">
          <Link to="/signup">
            <Button
              size="lg"
              className="brand-gradient-primary text-white text-base sm:text-lg font-semibold px-6 py-5 sm:px-10 sm:py-7 rounded-xl sm:rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all group"
            >
              {t('howItWorks.cta')}
              <img src={afeedIcon} alt="" className={cn(
                "ms-1 h-6 w-6 brightness-0 invert transition-transform",
                isRTL ? "rotate-[205deg] group-hover:-translate-x-1" : "rotate-[25deg] group-hover:translate-x-1"
              )} />
            </Button>
          </Link>
          <p className="text-sm text-white/50">{t('howItWorks.ctaMicro')}</p>
        </div>
      </div>
    </section>
  );
}

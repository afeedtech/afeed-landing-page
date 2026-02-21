import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import afeedIcon from '@/assets/afeed-logo-icon.svg';
import { Button } from '@/components/ui/button';
import { MockStorefront } from './MockStorefront';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
// SOFT-LAUNCH: import { formatCompact, formatRating } from '@/lib/formatters';
// SOFT-LAUNCH: import { Play } from 'lucide-react';

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const lang = i18n.language;

  const rotatingWords = t('hero.rotatingWords', { returnObjects: true }) as string[];
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const longestWord = rotatingWords.reduce((a, b) => a.length > b.length ? a : b, '');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(true);
      }, 150);
    }, 2500);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // SOFT-LAUNCH: scrollToCreators - restore when SocialProofSection is back
  // const scrollToCreators = () => {
  //   const element = document.querySelector('#creators');
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  // SOFT-LAUNCH: stats - restore when we have real data
  // const stats = [
  //   { value: formatCompact(10000, lang), suffix: '+', label: t('hero.stats.creators') },
  //   { value: formatCompact(600000, lang), suffix: '+', label: t('hero.stats.paidToCreators') },
  //   { value: formatCompact(50000, lang), suffix: '+', label: t('hero.stats.productsSold') },
  //   { value: formatRating(4.9, lang), suffix: '', label: t('hero.stats.creatorRating') },
  // ];

  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-screen flex items-center pt-20 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-20 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-primary/5 rounded-full blur-[80px]" />
      
      {/* Subtle grid pattern */}
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className={cn(
            "order-1",
            isRTL ? "text-center lg:text-right" : "text-center lg:text-start"
          )}>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] animate-slide-up">
              <span className="block">{t('hero.titlePrefix')}</span>
              <span className="relative inline-block h-[1.5em] my-2 sm:my-3 px-2 sm:px-4 overflow-hidden align-bottom">
                <span className="invisible">{longestWord}</span>
                <span
                  key={wordIndex}
                  className={cn(
                    "absolute inset-0 flex items-center bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent",
                    isRTL ? "justify-center lg:justify-start" : "justify-center lg:justify-start",
                    isAnimating ? "animate-rotate-word-in" : "animate-rotate-word-out"
                  )}
                >
                  {rotatingWords[wordIndex]}
                </span>
              </span>
              <span className="block text-foreground">{t('hero.titleSuffix')}</span>
            </h1>
            
            <p className={cn(
              "mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed animate-slide-up [animation-delay:100ms]",
              isRTL ? "mx-auto lg:mx-0 lg:ms-auto" : "mx-auto lg:mx-0"
            )}>
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-slide-up [animation-delay:200ms]">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto brand-gradient-primary text-white text-base sm:text-lg font-semibold px-6 py-5 sm:px-10 sm:py-7 rounded-xl sm:rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all group"
                >
                  {t('hero.cta')}
                  <img src={afeedIcon} alt="" className={cn(
                    "ms-1 h-6 w-6 brightness-0 invert transition-transform",
                    isRTL ? "rotate-[205deg] group-hover:-translate-x-1" : "rotate-[25deg] group-hover:translate-x-1"
                  )} />
                </Button>
              </Link>
              {/* SOFT-LAUNCH: Secondary CTA - restore when SocialProofSection is back
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToCreators}
                className="w-full sm:w-auto text-base sm:text-lg font-medium px-6 py-5 sm:px-8 sm:py-7 rounded-xl sm:rounded-2xl border-2 hover:bg-muted/50 group"
              >
                <Play className="me-2 h-5 w-5 text-primary" />
                {t('hero.ctaSecondary')}
              </Button>
              */}
            </div>

            {/* Trust highlights - Now as badges */}
            <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 animate-slide-up [animation-delay:300ms]">
              {[t('hero.trust1'), t('hero.trust2'), t('hero.trust3')].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-card border border-border/50 text-xs sm:text-sm font-medium text-foreground shadow-sm"
                >
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mock Storefront */}
          <div className="order-2 animate-float w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-none mx-auto">
            <div className="relative">
              {/* Glow effect behind */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-3xl blur-3xl scale-110" />
              <MockStorefront />
            </div>
          </div>
        </div>

        {/* SOFT-LAUNCH: Stats bar - restore when we have real data
        <div className="mt-12 sm:mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto animate-slide-up [animation-delay:400ms]">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}{stat.suffix}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}

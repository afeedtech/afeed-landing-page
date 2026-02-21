import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';
import afeedIcon from '@/assets/afeed-logo-icon.svg';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
    { q: t('faq.q8'), a: t('faq.a8') },
  ];

  // Split into two columns
  const leftColumn = faqs.slice(0, 4);
  const rightColumn = faqs.slice(4);

  return (
    <section id="faq" className="scroll-mt-24 py-8 md:py-12 lg:py-16 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            {t('faq.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            {t('faq.title')}
          </h2>
        </div>

        {/* Two-column FAQ grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Left column */}
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {leftColumn.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 data-[state=open]:shadow-xl data-[state=open]:border-primary/20 transition-all"
              >
                <AccordionTrigger className="text-start font-semibold text-foreground hover:no-underline py-4 sm:py-6 text-base sm:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 sm:pb-6 text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right column */}
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {rightColumn.map((faq, i) => (
              <AccordionItem
                key={i + 4}
                value={`item-${i + 4}`}
                className="bg-card border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 data-[state=open]:shadow-xl data-[state=open]:border-primary/20 transition-all"
              >
                <AccordionTrigger className="text-start font-semibold text-foreground hover:no-underline py-4 sm:py-6 text-base sm:text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 sm:pb-6 text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Final CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              {t('faq.ctaTitle')}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto">
              {t('faq.ctaSubtitle')}
            </p>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="brand-gradient-primary text-white text-base sm:text-lg font-semibold px-6 py-5 sm:px-10 sm:py-7 rounded-xl sm:rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all group"
              >
                {t('hero.cta')}
                <img src={afeedIcon} alt="" className={cn(
                  "ms-1 h-6 w-6 brightness-0 invert transition-transform",
                  isRTL ? "rotate-[205deg] group-hover:-translate-x-1" : "rotate-[25deg] group-hover:translate-x-1"
                )} />
              </Button>
            </Link>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
              {t('faq.ctaFootnote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

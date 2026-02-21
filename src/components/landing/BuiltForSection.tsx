import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Crosshair, Briefcase, Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const cardIcons = [Sparkles, Crosshair, Briefcase];

export function BuiltForSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [featuredOpen, setFeaturedOpen] = useState(false);

  const cards = t('builtFor.cards', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    tags: string[];
  }>;

  const featured = t('builtFor.featured', { returnObjects: true }) as {
    badge: string;
    title: string;
    description: string;
    checklist: string[];
    tags: string[];
  };

  return (
    <section id="built-for" className="scroll-mt-24 py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-primary/5 rounded-full blur-3xl" />
      <div className="relative container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('builtFor.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('builtFor.subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {/* Featured MENA Card */}
          <div className="order-first md:order-none rounded-[16px] relative overflow-hidden flex flex-col p-6 md:p-8 cursor-pointer transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #4DA3FF 0%, #1A70F0 50%, #0D4F9C 100%)' }}
            onClick={() => {
              setFeaturedOpen(prev => !prev);
              setOpenIndex(null);
            }}
          >
            {/* Dot pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="relative z-10 flex flex-col h-full">
              {/* Badge */}
              <span className="inline-block self-start px-3 py-1.5 rounded-xl bg-white/[0.18] text-white text-xs font-medium mb-5">
                {featured.badge}
              </span>

              {/* Icon + Title - always visible */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.18] flex items-center justify-center">
                  <Globe size={20} className="text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {featured.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed mt-3">
                {featured.description}
              </p>

              {/* Collapsible content */}
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                featuredOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
              )}>
                <div className="border-t border-white/25 my-1" />

                <ul className="space-y-2 my-4">
                  {featured.checklist.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm sm:text-base text-white">
                      <Check size={14} className="shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/25 my-1" />

                <div className="flex flex-wrap gap-2 mt-4">
                  {featured.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs bg-white/[0.15] text-white font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stacked Cards Column */}
          <div className="flex flex-col gap-4">
            {cards.map((card, idx) => {
              const Icon = cardIcons[idx];
               const isExpanded = openIndex === idx;
               return (
                 <div
                   key={idx}
                   className="bg-card border border-border/50 rounded-[14px] px-5 py-4 flex flex-col cursor-pointer transition-all duration-300"
                   onClick={() => {
                     setOpenIndex(prev => prev === idx ? null : idx);
                     setFeaturedOpen(false);
                   }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {card.title}
                    </h3>
                  </div>

                  <div className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
                  )}>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {card.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {card.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-muted text-muted-foreground font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

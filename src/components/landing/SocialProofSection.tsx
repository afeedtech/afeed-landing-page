import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Quote, Star, Check, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { mockCreators } from '@/data/mockCreators';
import { formatCompact } from '@/lib/formatters';

export function SocialProofSection() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const lang = i18n.language;

  // Map creator slugs to translation keys
  const creatorTranslationKeys: Record<string, string> = {
    'noura-khalid': 'nouraKhalid',
    'ahmed-hassan': 'ahmedHassan',
    'sara-almutairi': 'saraAlmutairi',
    'omar-qasim': 'omarQasim',
    'layla-ibrahim': 'laylaIbrahim',
    'khalid-nasser': 'khalidNasser',
  };

  // Parse earnings string to number for formatting
  const parseEarnings = (earnings: string): number => {
    const match = earnings.match(/(\d+)/);
    return match ? parseInt(match[1]) * 1000 : 0;
  };

  const testimonials = [
    { 
      text: t('socialProof.testimonial1.text'), 
      author: t('socialProof.testimonial1.author'), 
      role: t('socialProof.testimonial1.role'),
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
    { 
      text: t('socialProof.testimonial2.text'), 
      author: t('socialProof.testimonial2.author'), 
      role: t('socialProof.testimonial2.role'),
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
    { 
      text: t('socialProof.testimonial3.text'), 
      author: t('socialProof.testimonial3.author'), 
      role: t('socialProof.testimonial3.role'),
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
  ];

  return (
    <section id="creators" className="scroll-mt-24 py-16 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            {t('socialProof.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            {t('socialProof.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('socialProof.subtitle')}
          </p>
        </div>

        {/* Creator cards - Horizontal scroll on mobile */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 mb-10 sm:mb-16 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {mockCreators.map((creator, i) => {
            const translationKey = creatorTranslationKeys[creator.slug];
            const creatorName = translationKey ? t(`creators.${translationKey}.name`) : creator.name;
            const creatorHeadline = translationKey ? t(`creators.${translationKey}.headline`) : creator.headline;
            const earningsValue = parseEarnings(creator.earnings);
            
            return (
              <div
                key={i}
                className="group flex-shrink-0 w-40 sm:w-48 md:w-auto snap-center bg-card rounded-2xl p-4 sm:p-5 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="relative inline-block mb-4">
                  <img 
                    src={creator.image} 
                    alt={creatorName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-border"
                  />
                  {creator.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-card">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-sm text-foreground truncate">{creatorName}</h3>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {creatorHeadline.split(' ').slice(0, 2).join(' ')}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  {formatCompact(earningsValue, lang)}+ {t('socialProof.earned')}
                </div>
                <Link 
                  to={`/creator/${creator.slug}`}
                  className="mt-3 block w-full text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {t('socialProof.viewPage')} →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 end-6 h-10 w-10 text-primary/10" />
              
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                "{testimonial.text}"
              </p>

              <div className={cn(
                "flex items-center gap-4",
                isRTL && "flex-row-reverse"
              )}>
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                />
                <div className={cn(isRTL && "text-end")}>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner logos placeholder */}
        <div className="mt-12 sm:mt-20 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">{t('socialProof.featuredIn')}</p>
          <div className="flex items-center justify-center flex-wrap gap-6 sm:gap-8 md:gap-12 opacity-50 grayscale">
            {['Forbes', 'Wamda', 'TechCrunch', 'Entrepreneur'].map((name, i) => (
              <div key={i} className="text-base sm:text-xl font-bold text-foreground/50">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

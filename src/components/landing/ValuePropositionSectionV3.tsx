import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Package, CreditCard, BarChart3, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { MockMyPageView } from './MockMyPageView';
import { MockMyBusinessView } from './MockMyBusinessView';

const rotatingWordsEn = ['Knowledge', 'Expertise', 'Experience', 'Products', 'Appointments'];
const rotatingWordsAr = ['معرفتك', 'خبرتك', 'تجربتك', 'منتجاتك', 'مواعيدك'];

function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseDuration = 1800) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];
    
    if (!isDeleting) {
      const next = currentWord.slice(0, displayText.length + 1);
      setDisplayText(next);
      if (next === currentWord) {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
      timeoutRef.current = setTimeout(tick, typingSpeed);
    } else {
      const next = currentWord.slice(0, displayText.length - 1);
      setDisplayText(next);
      if (next === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        timeoutRef.current = setTimeout(tick, typingSpeed);
        return;
      }
      timeoutRef.current = setTimeout(tick, deletingSpeed);
    }
  }, [displayText, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeoutRef.current);
  }, [tick, typingSpeed]);

  return displayText;
}

export function ValuePropositionSectionV3() {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();

  const rotatingWords = language === 'ar' ? rotatingWordsAr : rotatingWordsEn;
  const typedText = useTypingEffect(rotatingWords);

  const cards = [
    { 
      icon: Layout, 
      title: t('value.card1.title'), 
      description: t('value.card1.description'),
      gradient: 'from-blue-500 to-indigo-600',
      customView: 'myPage',
      rotatingTitle: false,
    },
    { 
      icon: Package, 
      title: '', // handled by rotatingTitle
      description: t('value.card2.description'),
      gradient: 'from-amber-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      rotatingTitle: true,
    },
    { 
      icon: CreditCard, 
      title: t('value.card3.title'), 
      description: t('value.card3.description'),
      gradient: 'from-emerald-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
      rotatingTitle: false,
    },
    { 
      icon: BarChart3, 
      title: t('value.card4.title'), 
      description: t('value.card4.description'),
      gradient: 'from-purple-500 to-violet-600',
      customView: 'myBusiness',
      rotatingTitle: false,
    },
  ];

  const card2TitlePrefix = language === 'ar' ? '' : 'Your ';
  const card2TitleSuffix = language === 'ar' ? '، جاهزة للبيع' : ', Ready to Sell';

  return (
    <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Background decoration */}
      

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
                <div className={cn(
                  "w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl backdrop-blur-md border flex items-center justify-center shadow-lg",
                  card.gradient === 'from-blue-500 to-indigo-600' && "bg-blue-500/10 border-blue-500/20",
                  card.gradient === 'from-amber-500 to-orange-600' && "bg-amber-500/10 border-amber-500/20",
                  card.gradient === 'from-emerald-500 to-teal-600' && "bg-emerald-500/10 border-emerald-500/20",
                  card.gradient === 'from-purple-500 to-violet-600' && "bg-purple-500/10 border-purple-500/20",
                )}>
                  <card.icon className={cn(
                    "h-6 w-6 sm:h-8 sm:w-8",
                    card.gradient === 'from-blue-500 to-indigo-600' && "text-blue-600",
                    card.gradient === 'from-amber-500 to-orange-600' && "text-amber-600",
                    card.gradient === 'from-emerald-500 to-teal-600' && "text-emerald-600",
                    card.gradient === 'from-purple-500 to-violet-600' && "text-purple-600",
                  )} />
                </div>
                
                {card.rotatingTitle ? (
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {card2TitlePrefix}
                    <span className="inline-block bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent border-e-2 border-primary">
                      {typedText}
                    </span>
                    {card2TitleSuffix}
                  </h3>
                ) : (
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {card.title}
                  </h3>
                )}
                
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
                  <MockMyPageView />
                ) : card.customView === 'myBusiness' ? (
                  <MockMyBusinessView />
                ) : (
                  <>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                      <img 
                        src={card.image} 
                        alt={card.rotatingTitle ? typedText : card.title}
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    
                    {/* Decorative glow */}
                    <div className={cn(
                      "absolute -z-10 w-full h-full top-4 rounded-3xl opacity-30",
                      `bg-gradient-to-br ${card.gradient}`,
                      isRTL ? "-left-4" : "-right-4"
                    )} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

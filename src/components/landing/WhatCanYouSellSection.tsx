import { useTranslation } from 'react-i18next';
import { BookOpen, Video, FileText } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import sellCoursesImg from '@/assets/sell-courses.jpg';
import sellSessionsImg from '@/assets/sell-sessions.jpg';
import sellDownloadsImg from '@/assets/sell-downloads.jpg';

export function WhatCanYouSellSection() {
  const { t } = useTranslation();

  const categories = [
    { 
      icon: BookOpen, 
      name: t('sell.courses'), 
      description: t('sell.coursesDesc'), 
      image: sellCoursesImg,
    },
    { 
      icon: Video, 
      name: t('sell.sessions'), 
      description: t('sell.sessionsDesc'), 
      image: sellSessionsImg,
    },
    { 
      icon: FileText, 
      name: t('sell.downloads'), 
      description: t('sell.downloadsDesc'), 
      image: sellDownloadsImg,
    },
  ];

  return (
    <section id="sell" className="scroll-mt-24 py-8 md:py-12 lg:py-16 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            {t('sell.title')}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground">
            {t('sell.subtitle')}
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ align: 'start', loop: true }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {categories.map((category, i) => (
              <CarouselItem key={i} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <div className="group relative h-[420px] sm:h-[460px] rounded-3xl overflow-hidden cursor-pointer">
                  {/* Background image */}
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Glassmorphic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 shadow-lg">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="font-bold text-xl sm:text-2xl text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

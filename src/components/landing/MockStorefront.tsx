import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';
import { Share2 } from 'lucide-react';
import abdullahProfile from '@/assets/abdullah-profile.jpg';
import mockCover from '@/assets/mock-cover-marble.jpg';
import mockProduct1 from '@/assets/mock-product-1.jpg';
import mockProduct2 from '@/assets/mock-product-2.jpg';
import afeedLogoEn from '@/assets/afeed-logo-en.svg';

export function MockStorefront() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const lang = i18n.language;

  const products = [
    {
      image: mockProduct1,
      badge: lang === 'ar' ? 'مجاني' : 'Free',
      badgeColor: 'bg-primary',
      title: lang === 'ar' ? 'أساسيات المبيعات' : 'Sales Fundamentals',
    },
    {
      image: mockProduct2,
      badge: formatCurrency(40, lang),
      badgeColor: 'bg-primary',
      title: lang === 'ar' ? '٥ خطوات لإغلاق الصفقات' : '5 Steps to Close Deals',
    },
  ];

  const tabs = lang === 'ar'
    ? ['المنتجات', 'مباشر', 'الأرشيف']
    : ['Products', 'Live', 'Archive'];

  return (
    <div className="relative bg-card rounded-2xl sm:rounded-3xl border border-border/50 shadow-2xl overflow-hidden max-w-[300px] mx-auto aspect-[9/16] flex flex-col">
      {/* Cover image */}
      <div className="relative h-28 sm:h-32 overflow-hidden">
        <img src={mockCover} alt="" className="w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D4F9C] via-[#1A70F0] to-[#0D3B78] mix-blend-color" />
        <div className="absolute inset-0 bg-[#0D4F9C]/30" />
      </div>

      {/* Centered avatar overlapping cover */}
      <div className="flex justify-center -mt-10 sm:-mt-12 relative z-10">
        <img
          src={abdullahProfile}
          alt={lang === 'ar' ? 'عبدالله أحمد' : 'Abdullah Ahmad'}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-card object-cover shadow-lg"
        />
      </div>

      {/* Name & subtitle centered */}
      <div className="text-center mt-3 px-4">
        <h3 className="font-bold text-base sm:text-lg text-foreground">
          {lang === 'ar' ? 'عبدالله أحمد' : 'Abdullah Ahmad'}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          {lang === 'ar' ? 'مدرب مبيعات' : 'Sales Coach'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 mt-4 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={cn(
              "flex-1 text-[10px] sm:text-xs font-medium py-2 border-b-2 transition-colors",
              i === 0
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product grid - 2 larger cards */}
      <div className="grid grid-cols-2 gap-3 p-3 flex-1">
        {products.map((product, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden border border-border/50 shadow-sm aspect-[3/4]">
            {/* Full-bleed product image */}
            <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
            {/* Top-left badge */}
            <span className={cn(
              "absolute top-1.5 start-1.5 z-10 text-[7px] sm:text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full shadow-sm",
              product.badgeColor
            )}>
              {product.badge}
            </span>
            {/* Top-right share icon */}
            <span className="absolute top-1.5 end-1.5 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm">
              <Share2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
            </span>
            {/* Bottom glassmorphism overlay */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-2 pt-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-[2px]">
              <p className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight line-clamp-2">
                {product.title}
              </p>
              <button className="w-full mt-1.5 py-1 rounded-full bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-semibold shadow-sm">
                {lang === 'ar' ? 'اشترك' : 'Subscribe'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer - pinned to bottom */}
      <div className="mt-auto flex items-center justify-center gap-1.5 py-3 border-t border-border text-[9px] sm:text-[10px] text-muted-foreground">
        <span>{lang === 'ar' ? 'مدعوم من' : 'Powered by'}</span>
        <img src={afeedLogoEn} alt="afeed" className="h-5 -mt-px" />
      </div>
    </div>
  );
}

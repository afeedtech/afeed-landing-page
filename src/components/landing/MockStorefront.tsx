import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';
import { Link2 } from 'lucide-react';
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
      badgeColor: 'bg-emerald-500',
      title: lang === 'ar' ? 'أساسيات المبيعات' : 'Sales Fundamentals',
      price: null,
    },
    {
      image: mockProduct2,
      badge: lang === 'ar' ? 'خصم 20%' : '20% OFF',
      badgeColor: 'bg-primary',
      title: lang === 'ar' ? '٥ خطوات لإغلاق الصفقات' : '5 Steps to Close Deals',
      price: 39.99,
    },
    {
      image: mockProduct1,
      badge: lang === 'ar' ? 'جديد' : 'New',
      badgeColor: 'bg-amber-500',
      title: lang === 'ar' ? 'فن التفاوض' : 'Art of Negotiation',
      price: 29.99,
    },
  ];

  const tabs = lang === 'ar'
    ? ['المنتجات', 'مباشر', 'المواعيد', 'الأرشيف']
    : ['Products', 'Live', 'Appointments', 'Archive'];

  return (
    <div className="relative bg-card rounded-2xl sm:rounded-3xl border border-border/50 shadow-2xl overflow-hidden max-w-[320px] mx-auto">
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

      {/* Product grid - updated card style */}
      <div className="grid grid-cols-3 gap-2 p-3">
        {products.map((product, i) => (
          <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm">
            {/* Product image with overlaid badges */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              {/* Top-left badge */}
              <span className={cn(
                "absolute top-1.5 start-1.5 text-[7px] sm:text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full shadow-sm",
                product.badgeColor
              )}>
                {product.badge}
              </span>
              {/* Top-right share icon */}
              <span className="absolute top-1.5 end-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <Link2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
              </span>
            </div>
            {/* Product info */}
            <div className="p-2 pt-2.5">
              <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight line-clamp-2 min-h-[2.5em]">
                {product.title}
              </p>
              {/* CTA button */}
              <button className="w-full mt-2 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold shadow-sm">
                {product.price
                  ? formatCurrency(product.price, lang)
                  : (lang === 'ar' ? 'مجاني' : 'Free')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1.5 py-3 border-t border-border text-[9px] sm:text-[10px] text-muted-foreground">
        <span>{lang === 'ar' ? 'مدعوم من' : 'Powered by'}</span>
        <img src={afeedLogoEn} alt="afeed" className="h-5 -mt-px" />
      </div>
    </div>
  );
}

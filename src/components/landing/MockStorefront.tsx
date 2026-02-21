import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';
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
      discount: lang === 'ar' ? 'خصم 20%' : '20% OFF',
      title: lang === 'ar' ? 'أساسيات المبيعات' : 'Sales Fundamentals',
      price: 39.99,
      oldPrice: 49.99,
    },
    {
      image: mockProduct2,
      discount: lang === 'ar' ? 'خصم 20%' : '20% OFF',
      title: lang === 'ar' ? '٥ خطوات لإغلاق الصفقات' : '5 Steps to Close Deals',
      price: 39.99,
      oldPrice: 49.99,
    },
    {
      image: mockProduct1,
      discount: lang === 'ar' ? 'خصم 20%' : '20% OFF',
      title: lang === 'ar' ? 'فن التفاوض' : 'Art of Negotiation',
      price: 39.99,
      oldPrice: 49.99,
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

      {/* Product grid */}
      <div className="grid grid-cols-3 gap-2 p-3">
        {products.map((product, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-muted/30 border border-border/50">
            {/* Product image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              {/* Badges */}
              <div className="absolute bottom-1.5 left-1 flex gap-0.5">
                <span className="text-[7px] sm:text-[8px] font-semibold bg-card/90 backdrop-blur-sm text-primary px-1 py-0.5 rounded">
                  {product.discount}
                </span>
              </div>
            </div>
            {/* Product info */}
            <div className="p-2">
              <p className="text-[10px] sm:text-xs font-medium text-foreground leading-tight line-clamp-2 min-h-[2.5em]">
                {product.title}
              </p>
              <div className="mt-1.5">
                <span className="text-[10px] sm:text-xs font-bold text-primary">
                  {formatCurrency(product.price, lang)}
                </span>
                <span className="text-[8px] sm:text-[10px] text-muted-foreground line-through ms-1.5">
                  {formatCurrency(product.oldPrice, lang)}
                </span>
              </div>
              <button className="w-full mt-2 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold">
                {lang === 'ar' ? 'تعديل' : 'Edit'}
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

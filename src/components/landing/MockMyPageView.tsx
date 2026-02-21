import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/formatters';
import abdullahProfile from '@/assets/abdullah-profile.jpg';
import mockCover from '@/assets/mock-cover-marble.jpg';
import afeedLogoIcon from '@/assets/afeed-logo-icon.svg';
import mockProduct1 from '@/assets/mock-product-1.jpg';
import mockProduct2 from '@/assets/mock-product-2.jpg';

export function MockMyPageView() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const lang = i18n.language;

  const tabs = lang === 'ar'
    ? ['المنتجات', 'مباشر', 'مسودات']
    : ['Products', 'Live', 'Drafts'];

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

  return (
    <div className="relative bg-card rounded-2xl sm:rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
      {/* Sidebar + Content layout */}
      <div className="flex">
        {/* Mini Sidebar - hidden on small screens */}
        <div className={cn(
          "w-36 bg-muted/30 border-border p-3 hidden md:flex flex-col gap-1",
          isRTL ? "border-l" : "border-r"
        )}>
          {/* Logo placeholder */}
          <div className="mb-4 px-1" />

          {/* Nav items */}
          {[
            { label: lang === 'ar' ? 'لوحة التحكم' : 'Dashboard', active: false },
            { label: lang === 'ar' ? 'الملف الشخصي' : 'Profile', active: true },
            { label: lang === 'ar' ? 'المستخدمون' : 'Users', active: false },
            { label: lang === 'ar' ? 'المدفوعات' : 'Payouts', active: false },
            { label: lang === 'ar' ? 'المواعيد' : 'My Appointments', active: false },
          ].map((item, i) => (
            <div
              key={i}
              className={cn(
                "px-2 py-1.5 rounded-md text-[10px] transition-colors",
                item.active
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Cover image */}
          <div className="relative h-24 sm:h-28 overflow-hidden">
            <img src={mockCover} alt="" className="w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D4F9C] via-[#1A70F0] to-[#0D3B78] mix-blend-color" />
            <div className="absolute inset-0 bg-[#0D4F9C]/30" />
          </div>

          {/* Centered avatar overlapping cover */}
          <div className="flex justify-center -mt-10 relative z-10">
            <img
              src={abdullahProfile}
              alt={lang === 'ar' ? 'عبدالله أحمد' : 'Abdullah Ahmad'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-card object-cover shadow-lg"
            />
          </div>

          {/* Name & subtitle */}
          <div className="text-center mt-2 px-4">
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              {lang === 'ar' ? 'عبدالله أحمد' : 'Abdullah Ahmad'}
            </h3>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
              {lang === 'ar' ? 'مدرب مبيعات' : 'Sales Coach'}
            </p>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-1 max-w-[260px] mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'أساعدك في تطوير مهاراتك في المبيعات وبناء عملك الخاص'
                : 'Helping you master sales skills and build your own business'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-2 mt-2 px-4">
            <span className="text-[8px] sm:text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              + {lang === 'ar' ? 'منتج جديد' : 'New Product'}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-3 mt-3 border-b border-border overflow-x-auto scrollbar-hide">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={cn(
                  "text-[9px] sm:text-[10px] font-medium py-1.5 border-b-2 transition-colors whitespace-nowrap px-1.5",
                  i === 0
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Product grid - 3 columns */}
          <div className="grid grid-cols-3 gap-2 p-3">
            {products.map((product, i) => (
              <div key={i} className="rounded-lg overflow-hidden bg-muted/30 border border-border/50">
                {/* Product image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  {/* Badges */}
                  <div className="absolute bottom-1 left-1 flex gap-0.5">
                    <span className="text-[7px] font-semibold bg-card/90 backdrop-blur-sm text-primary px-1 py-0.5 rounded">
                      {product.discount}
                    </span>
                  </div>
                </div>
                {/* Product info */}
                <div className="p-1.5">
                  <p className="text-[8px] sm:text-[9px] font-medium text-foreground leading-tight line-clamp-2 min-h-[2em]">
                    {product.title}
                  </p>
                  <div className="mt-1">
                    <span className="text-[8px] sm:text-[9px] font-bold text-primary">
                      {formatCurrency(product.price, lang)}
                    </span>
                    <span className="text-[7px] text-muted-foreground line-through ms-1">
                      {formatCurrency(product.oldPrice, lang)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

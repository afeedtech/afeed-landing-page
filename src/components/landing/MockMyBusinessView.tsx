import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { formatNumber } from '@/lib/formatters';

export function MockMyBusinessView() {
  const { i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const lang = i18n.language;

  const metrics = [
    {
      label: lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenue',
      value: lang === 'ar' ? 'د.ك ٢٥٣ ألف' : 'KWD 253k',
      change: '-2%',
      isUp: false,
    },
    {
      label: lang === 'ar' ? 'المشتركين المدفوعين' : 'Total Paying Subscribers',
      value: formatNumber(126, lang),
      change: '-2%',
      isUp: false,
    },
    {
      label: lang === 'ar' ? 'المشتركين المجانيين' : 'Total Free Subscribers',
      value: formatNumber(342, lang),
      change: '-2%',
      isUp: false,
    },
    {
      label: lang === 'ar' ? 'متوسط قيمة الشراء' : 'Average Purchase Value',
      value: lang === 'ar' ? 'د.ك ٢٩' : 'KWD 29',
      change: '+5%',
      isUp: true,
    },
  ];

  const metrics2 = [
    {
      label: lang === 'ar' ? 'إجمالي الزوار' : 'Total Visitors',
      value: formatNumber(2353, lang),
      change: '+5%',
      isUp: true,
    },
    {
      label: lang === 'ar' ? 'أفضل مصدر تحويل' : 'Top Converting Source',
      value: 'Instagram',
      change: '+5%',
      isUp: true,
    },
    {
      label: lang === 'ar' ? 'متوسط قيمة المشترك' : 'Avg. Subscriber Worth',
      value: formatNumber(173, lang),
      change: '+5%',
      isUp: true,
    },
    {
      label: lang === 'ar' ? 'قيمة المشتركين المحتملة' : 'Potential Subscriber Worth',
      value: lang === 'ar' ? 'د.ك ١٢٧' : 'KWD 127',
      change: '-2%',
      isUp: false,
    },
  ];

  // Mini chart data points for a revenue line chart
  const chartPoints = [5, 8, 6, 10, 7, 12, 15, 20, 17, 22, 18, 25];

  return (
    <div className="relative bg-card rounded-2xl sm:rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
      <div className="flex">
        {/* Mini Sidebar */}
        <div className={cn(
          "w-36 bg-muted/30 border-border p-3 hidden md:flex flex-col gap-0.5",
          isRTL ? "border-l" : "border-r"
        )}>
          {/* Logo */}
          <div className="flex items-center gap-1.5 mb-4 px-1">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px]">A</span>
            </div>
            <span className="font-bold text-xs text-foreground">
              {lang === 'ar' ? 'أفيد' : 'afeed'}
            </span>
          </div>

          {/* Nav - Analytics active with sub-items */}
          <div className="px-2 py-1.5 rounded-md text-[10px] text-primary font-semibold bg-primary/10">
            {lang === 'ar' ? 'التحليلات' : 'Analytics'}
          </div>
          <div className="ps-4 space-y-0.5">
            {[
              lang === 'ar' ? 'أعمالي' : 'My Business',
              lang === 'ar' ? 'عملائي' : 'My Customers',
              lang === 'ar' ? 'منتجاتي' : 'My Products',
              lang === 'ar' ? 'رؤى المنتجات' : 'Product Insights',
            ].map((item, i) => (
              <div key={i} className={cn(
                "text-[9px] py-1 px-1.5 rounded",
                i === 0 ? "text-primary font-medium" : "text-muted-foreground"
              )}>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-1 space-y-0.5">
            {[
              lang === 'ar' ? 'الملف الشخصي' : 'Profile',
              lang === 'ar' ? 'المستخدمون' : 'Users',
              lang === 'ar' ? 'المدفوعات' : 'Payouts',
              lang === 'ar' ? 'المواعيد' : 'My Appointments',
            ].map((item, i) => (
              <div key={i} className="px-2 py-1.5 rounded-md text-[10px] text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 min-w-0">
          {/* Header */}
          <div className="mb-3">
            <h2 className="font-bold text-sm sm:text-base text-foreground">
              {lang === 'ar' ? 'أعمالي' : 'My Business'}
            </h2>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground">
              {lang === 'ar' ? 'تعرف على أداء عملك' : 'See how well your business is doing'}
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex gap-1.5 mb-3">
            <span className="text-[8px] sm:text-[9px] bg-muted px-2 py-1 rounded-md text-muted-foreground">
              {lang === 'ar' ? 'نوع المنتج ▾' : 'Product Type ▾'}
            </span>
            <span className="text-[8px] sm:text-[9px] bg-muted px-2 py-1 rounded-md text-muted-foreground">
              {lang === 'ar' ? 'هذا الشهر ▾' : 'This Month ▾'}
            </span>
          </div>

          {/* Performance Overview */}
          <div className="bg-muted/30 rounded-lg p-2.5 mb-3 border border-border/30">
            <h3 className="text-[10px] sm:text-xs font-semibold text-foreground mb-0.5">
              {lang === 'ar' ? 'نظرة عامة على الأداء' : 'Performance Overview'}
            </h3>
            <p className="text-[8px] text-muted-foreground mb-2">
              {lang === 'ar' ? 'تتبع أرباحك واشتراكاتك' : 'Track your earnings, subscribers, and quick wins.'}
            </p>

            {/* Metrics row 1 */}
            <div className="grid grid-cols-4 gap-1.5 mb-1.5">
              {metrics.map((m, i) => (
                <div key={i} className="bg-card rounded-md p-1.5 border border-border/30">
                  <p className="text-[7px] sm:text-[8px] text-muted-foreground truncate">{m.label}</p>
                  <p className={cn("text-[10px] sm:text-xs font-bold mt-0.5", i === 0 ? "text-primary" : "text-foreground")}>
                    {m.value}
                  </p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {m.isUp ? (
                      <TrendingUp className="w-2 h-2 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-2 h-2 text-red-500" />
                    )}
                    <span className={cn("text-[7px]", m.isUp ? "text-emerald-500" : "text-red-500")}>
                      {m.change}
                    </span>
                    <span className="text-[6px] text-muted-foreground">
                      {lang === 'ar' ? 'مقارنة بالشهر الماضي' : 'vs last month'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics row 2 */}
            <div className="grid grid-cols-4 gap-1.5">
              {metrics2.map((m, i) => (
                <div key={i} className="bg-card rounded-md p-1.5 border border-border/30">
                  <p className="text-[7px] sm:text-[8px] text-muted-foreground truncate">{m.label}</p>
                  <p className="text-[10px] sm:text-xs font-bold text-foreground mt-0.5">{m.value}</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {m.isUp ? (
                      <TrendingUp className="w-2 h-2 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-2 h-2 text-red-500" />
                    )}
                    <span className={cn("text-[7px]", m.isUp ? "text-emerald-500" : "text-red-500")}>
                      {m.change}
                    </span>
                    <span className="text-[6px] text-muted-foreground">
                      {lang === 'ar' ? 'مقارنة بالشهر الماضي' : 'vs last month'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="bg-muted/30 rounded-lg p-2.5 border border-border/30">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-[10px] sm:text-xs font-semibold text-foreground">
                  {lang === 'ar' ? 'اتجاه الإيرادات' : 'Revenue Trend'}
                </h3>
                <p className="text-[8px] text-muted-foreground">
                  {lang === 'ar' ? 'تتبع أرباحك في الشهر الأخير' : 'Track how much you earned in the last month.'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-500">+12%</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm font-bold text-foreground mb-2">
              {lang === 'ar' ? 'د.ك ٢٥٣,٠٠٠' : 'KWD 253,000'}
            </p>

            {/* SVG line chart */}
            <div className="h-16 w-full relative">
              <svg viewBox="0 0 240 60" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 15, 30, 45, 60].map(y => (
                  <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
                ))}
                {/* Area fill */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M0,${60 - chartPoints[0] * 2.2} ${chartPoints.map((p, i) => `L${(i / (chartPoints.length - 1)) * 240},${60 - p * 2.2}`).join(' ')} L240,60 L0,60 Z`}
                  fill="url(#chartGrad)"
                />
                {/* Line */}
                <path
                  d={`M0,${60 - chartPoints[0] * 2.2} ${chartPoints.map((p, i) => `L${(i / (chartPoints.length - 1)) * 240},${60 - p * 2.2}`).join(' ')}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                />
              </svg>
              {/* X axis labels */}
              <div className="flex justify-between mt-1">
                {(lang === 'ar'
                  ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو']
                  : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                ).map(m => (
                  <span key={m} className="text-[6px] text-muted-foreground">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

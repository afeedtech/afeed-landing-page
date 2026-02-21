import { useLanguage } from '@/context/LanguageContext';

interface ProductRevenueListProps {
  data: Array<{ name: string; value: number }>;
}

export function ProductRevenueList({ data }: ProductRevenueListProps) {
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.name}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-foreground truncate pr-4">
              {item.name}
            </span>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {item.value.toLocaleString()} {currencyLabel}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-primary rounded-full transition-all duration-300"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

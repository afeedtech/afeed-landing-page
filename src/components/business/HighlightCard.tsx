import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/types/analytics';

interface HighlightCardProps {
  title: string;
  value: string;
  subtitle: string;
  badge?: string;
  productType?: ProductType;
  icon?: React.ReactNode;
  helperText: string;
  className?: string;
  delay?: number;
}

const productTypeLabels: Record<ProductType, string> = {
  course: 'Course',
  session: 'Session',
  program: 'Program',
  membership: 'Membership',
};

export function HighlightCard({
  title,
  value,
  subtitle,
  badge,
  productType,
  icon,
  helperText,
  className,
  delay = 0,
}: HighlightCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-5 shadow-card animate-slide-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="text-brand-primary">{icon}</div>}
      </div>

      <div className="space-y-1">
        <p className="text-lg font-semibold text-foreground line-clamp-1">{value}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{subtitle}</span>
          {(badge || productType) && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-brand-primary/10 text-brand-primary border-0"
            >
              {badge || (productType && productTypeLabels[productType])}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3">{helperText}</p>
    </div>
  );
}

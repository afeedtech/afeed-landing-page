import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MetricData } from '@/types/analytics';

interface MetricCardProps {
  title: string;
  metric: MetricData;
  icon?: React.ReactNode;
  helperText: string;
  className?: string;
  delay?: number;
}

export function MetricCard({
  title,
  metric,
  icon,
  helperText,
  className,
  delay = 0,
}: MetricCardProps) {
  const TrendIcon = metric.trend === 'up' 
    ? TrendingUp 
    : metric.trend === 'down' 
      ? TrendingDown 
      : Minus;

  const trendColor = metric.trend === 'up' 
    ? 'text-brand-accent' 
    : metric.trend === 'down' 
      ? 'text-destructive' 
      : 'text-muted-foreground';

  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && (
          <div className="p-2 rounded-lg bg-brand-primary/10">
            {icon}
          </div>
        )}
      </div>

      <p className="text-3xl font-bold tracking-tight text-foreground">
        {metric.formattedValue}
      </p>

      <div className="flex items-center gap-1.5 mt-2">
        <TrendIcon className={cn('h-4 w-4', trendColor)} />
        <span className={cn('text-sm font-medium', trendColor)}>
          {metric.trend === 'up' ? '+' : ''}{metric.changePercent}%
        </span>
        <span className="text-sm text-muted-foreground">vs previous period</span>
      </div>

      <p className="text-xs text-muted-foreground mt-3">{helperText}</p>
    </div>
  );
}

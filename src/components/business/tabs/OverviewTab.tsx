import { DollarSign, Users, TrendingUp, ShoppingCart, Trophy, Globe, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard, TimeRangeSelector, HighlightCard, RevenueAreaChart } from '@/components/business';
import { useOverviewData } from '@/hooks/analytics';
import { TimeRange } from '@/types/analytics';
import { useLanguage } from '@/context/LanguageContext';

interface OverviewTabProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function OverviewTab({ timeRange, onTimeRangeChange }: OverviewTabProps) {
  const { data, isLoading } = useOverviewData(timeRange);
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';

  if (isLoading || !data) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          metric={data.totalRevenue}
          icon={<DollarSign className="h-5 w-5 text-brand-primary" />}
          helperText="Total earnings from all products"
          delay={0}
        />
        <MetricCard
          title="Paying Customers"
          metric={data.payingCustomers}
          icon={<Users className="h-5 w-5 text-brand-primary" />}
          helperText="Unique customers who made a purchase"
          delay={50}
        />
        <MetricCard
          title="Conversion Rate"
          metric={data.conversionRate}
          icon={<TrendingUp className="h-5 w-5 text-brand-primary" />}
          helperText="Visitors who became customers"
          delay={100}
        />
        <MetricCard
          title="Avg Purchase Value"
          metric={data.averagePurchaseValue}
          icon={<ShoppingCart className="h-5 w-5 text-brand-primary" />}
          helperText="Average amount per transaction"
          delay={150}
        />
      </div>

      {/* Revenue Trend */}
      <Card className="rounded-xl border border-border bg-card shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track your earnings over time
            </p>
          </div>
          <TimeRangeSelector
            value={timeRange}
            onChange={onTimeRangeChange}
            className="w-[180px]"
          />
        </CardHeader>
        <CardContent>
          <RevenueAreaChart data={data.revenueTrend} height={320} />
        </CardContent>
      </Card>

      {/* Highlights */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Highlights</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Key performance indicators for your business
        </p>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <HighlightCard
            title="Top Product"
            value={data.highlights.topProduct.name}
            subtitle={`${data.highlights.topProduct.revenue.toLocaleString()} ${currencyLabel}`}
            productType={data.highlights.topProduct.type}
            icon={<Trophy className="h-5 w-5" />}
            helperText="Best-selling product by revenue"
            delay={250}
          />
          <HighlightCard
            title="Top Traffic Source"
            value={data.highlights.topTrafficSource.name}
            subtitle={`${data.highlights.topTrafficSource.percentage}% of visitors`}
            badge={`${data.highlights.topTrafficSource.visitors.toLocaleString()} visitors`}
            icon={<Globe className="h-5 w-5" />}
            helperText="Where most of your visitors come from"
            delay={300}
          />
          <HighlightCard
            title="Best Product Type"
            value={data.highlights.bestProductType.type.charAt(0).toUpperCase() + data.highlights.bestProductType.type.slice(1) + 's'}
            subtitle={`${data.highlights.bestProductType.revenue.toLocaleString()} ${currencyLabel}`}
            badge={`${data.highlights.bestProductType.percentage}%`}
            icon={<Award className="h-5 w-5" />}
            helperText="Product category with highest revenue"
            delay={350}
          />
        </div>
      </div>
    </div>
  );
}

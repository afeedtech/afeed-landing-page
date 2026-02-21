import { ArrowLeft, Video, Clock, Share2, Eye, BarChart3, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DistributionDonut, TimeRangeSelector } from '@/components/business';
import { SteppedProgressBars } from '@/components/business/charts/SteppedProgressBars';
import { useProductInsightsData, useProductsData } from '@/hooks/analytics';
import { TimeRange } from '@/types/analytics';
import { cn } from '@/lib/utils';
import { useChartColors } from '@/lib/chartTheme';

interface ProductInsightsTabProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  selectedProductId: string | null;
  onProductSelect: (productId: string | null) => void;
}

const contentTypeIcons: Record<string, React.ReactNode> = {
  video: <Video className="h-4 w-4" />,
  lesson: <Video className="h-4 w-4" />,
  quiz: <BarChart3 className="h-4 w-4" />,
  resource: <Eye className="h-4 w-4" />,
};

export function ProductInsightsTab({ 
  timeRange, 
  onTimeRangeChange,
  selectedProductId, 
  onProductSelect 
}: ProductInsightsTabProps) {
  const { data: productsData } = useProductsData(timeRange);
  const { data, isLoading } = useProductInsightsData(selectedProductId, timeRange);
  const colors = useChartColors();

  // Empty state - no product selected
  if (!selectedProductId) {
    return (
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Select a product to view detailed insights
        </p>
        
        <Card className="rounded-xl border border-border bg-card p-8 text-center">
          <div className="max-w-md mx-auto">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Choose a Product
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Dive deep into conversion funnels, content performance, and traffic sources for any product.
            </p>
            <Select onValueChange={(v) => onProductSelect(v)}>
              <SelectTrigger className="w-full max-w-xs mx-auto">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {productsData?.products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>
    );
  }

  if (isLoading || !data) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onProductSelect(null)}
          className="text-muted-foreground"
          aria-label="Back to product list"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{data.product.name}</h3>
          <Badge variant="secondary" className="text-xs bg-brand-primary/10 text-brand-primary border-0 mt-1">
            {data.product.type.charAt(0).toUpperCase() + data.product.type.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <TimeRangeSelector 
            value={timeRange} 
            onChange={onTimeRangeChange}
            className="w-[160px]"
          />
          <Select value={selectedProductId} onValueChange={(v) => onProductSelect(v)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {productsData?.products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conversion Funnel */}
      <Card className="rounded-xl border border-border bg-card shadow-card flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Conversion Funnel</CardTitle>
          <p className="text-xs text-muted-foreground">
            Track how visitors move from discovery to purchase
          </p>
        </CardHeader>
        <CardContent>
          <SteppedProgressBars data={data.conversionFunnel} showDropOff={true} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content Performance */}
        <Card className="rounded-xl border border-border bg-card shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Content Performance</CardTitle>
            <p className="text-xs text-muted-foreground">
              How each lesson or media performs
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Completion</TableHead>
                  <TableHead className="text-right">Drop-off</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.contentPerformance.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {contentTypeIcons[content.type]}
                        </span>
                        <span className="text-sm line-clamp-1">{content.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{content.views}</TableCell>
                    <TableCell className="text-right">
                      <span className={cn(
                        content.completionRate >= 80 ? 'text-brand-accent' :
                        content.completionRate >= 60 ? 'text-foreground' : 'text-destructive'
                      )}>
                        {content.completionRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {content.dropOffRate}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Drop-off Points */}
        <Card className="rounded-xl border border-border bg-card shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Drop-off Points</CardTitle>
            <p className="text-xs text-muted-foreground">
              Where users leave your product
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.dropOffPoints.map((item, i) => {
              const opacity = 0.3 + (i / Math.max(1, data.dropOffPoints.length - 1)) * 0.7;
              return (
                <div key={item.point} className="flex items-center gap-3">
                  <div className="w-24 sm:w-28 text-sm text-muted-foreground truncate">
                    {item.point}
                  </div>
                  <div className="flex-1 h-6 bg-muted/30 rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.max(2, item.dropOffRate)}%`,
                        backgroundColor: colors.brandPrimary,
                        opacity,
                      }}
                    />
                  </div>
                  <span className="w-12 text-sm font-medium text-right">
                    {item.dropOffRate}%
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Promo Video Performance */}
        <Card className="rounded-xl border border-border bg-card shadow-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-brand-primary" />
              <CardTitle className="text-base font-semibold">Promo Video</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">
              Sales video performance metrics
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Views</span>
              <span className="font-semibold">{data.promoVideoPerformance.views.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Watch Time</span>
              <span className="font-semibold">{data.promoVideoPerformance.avgWatchTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Completion Rate</span>
              <span className="font-semibold text-brand-accent">{data.promoVideoPerformance.completionRate}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Metrics */}
        <Card className="rounded-xl border border-border bg-card shadow-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-primary" />
              <CardTitle className="text-base font-semibold">Engagement</CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">
              How users interact with your product
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Time Spent</span>
              <span className="font-semibold">{data.engagementMetrics.avgTimeSpent}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Repeat Views</span>
              <span className="font-semibold">{data.engagementMetrics.repeatViews}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Shares</span>
              <span className="font-semibold">{data.engagementMetrics.shares}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources - Stacked Layout */}
      <Card className="rounded-xl border border-border bg-card shadow-card">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-base font-semibold">Traffic Sources</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground">
            Where your buyers come from
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            {/* Larger Donut Chart */}
            <DistributionDonut
              data={data.trafficSources}
              height={200}
              showLegend={false}
              innerRadius={55}
              outerRadius={85}
            />
            
            {/* Custom Legend with Progress Bars */}
            <div className="w-full mt-6 space-y-3">
              {data.trafficSources.map((source, index) => {
                const palette = [
                  colors.brandPrimary,
                  colors.brandSecondary,
                  colors.brandAccent,
                  colors.accent,
                  colors.muted,
                ];
                const color = palette[index % palette.length];
                
                return (
                  <div key={source.name} className="flex items-center gap-3">
                    {/* Color Dot */}
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    
                    {/* Source Name */}
                    <span className="text-sm text-foreground w-28 truncate">
                      {source.name}
                    </span>
                    
                    {/* Mini Progress Bar */}
                    <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${source.percentage}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                    
                    {/* Visitor Count */}
                    <span className="text-sm text-muted-foreground w-16 text-right tabular-nums">
                      {source.value.toLocaleString()}
                    </span>
                    
                    {/* Percentage */}
                    <span className="text-sm font-medium text-foreground w-14 text-right tabular-nums">
                      {source.percentage.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

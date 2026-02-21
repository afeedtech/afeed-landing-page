import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TimeRangeSelector, DistributionDonut } from '@/components/business';
import { ProductRevenueList } from '@/components/business/charts/ProductRevenueList';
import { useProductsData } from '@/hooks/analytics';
import { ProductType, TimeRange } from '@/types/analytics';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface ProductsTabProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onProductSelect: (productId: string) => void;
}

const productTypeLabels: Record<ProductType, string> = {
  course: 'Course',
  session: 'Session',
  program: 'Program',
  membership: 'Membership',
};

const productTypeColors: Record<ProductType, string> = {
  course: 'bg-brand-primary/10 text-brand-primary',
  session: 'bg-brand-secondary/10 text-brand-secondary',
  program: 'bg-brand-accent/10 text-brand-accent',
  membership: 'bg-accent text-accent-foreground',
};

export function ProductsTab({ timeRange, onTimeRangeChange, onProductSelect }: ProductsTabProps) {
  const [productTypeFilter, setProductTypeFilter] = useState<ProductType | 'all'>('all');
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  
  const { data, isLoading } = useProductsData(
    timeRange,
    productTypeFilter === 'all' ? undefined : productTypeFilter
  );

  if (isLoading || !data) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Analyze performance across all your products
      </p>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Product Type:</span>
          <Select 
            value={productTypeFilter} 
            onValueChange={(v) => setProductTypeFilter(v as ProductType | 'all')}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="course">Courses</SelectItem>
              <SelectItem value="session">Sessions</SelectItem>
              <SelectItem value="program">Programs</SelectItem>
              <SelectItem value="membership">Memberships</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Time Range:</span>
          <TimeRangeSelector
            value={timeRange}
            onChange={onTimeRangeChange}
            className="w-[180px]"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground">{data.summary.totalRevenue.toLocaleString()} {currencyLabel}</p>
        </Card>
        <Card className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Units Sold</p>
          <p className="text-2xl font-bold text-foreground">{data.summary.totalUnitsSold.toLocaleString()}</p>
        </Card>
        <Card className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Avg Conversion Rate</p>
          <p className="text-2xl font-bold text-foreground">{data.summary.avgConversionRate}%</p>
        </Card>
      </div>

      {/* Product Table */}
      <Card className="rounded-xl border border-border bg-card shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">All Products</CardTitle>
          <p className="text-sm text-muted-foreground">Click on a product to view detailed insights</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Units Sold</TableHead>
                <TableHead className="text-right">Conversion</TableHead>
                <TableHead className="text-right">Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.products.map((product) => (
                <TableRow 
                  key={product.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => onProductSelect(product.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                        <Badge 
                          variant="secondary"
                          className={cn('text-xs mt-1 border-0', productTypeColors[product.type])}
                        >
                          {productTypeLabels[product.type]}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {product.revenue.toLocaleString()} {currencyLabel}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.unitsSold}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.conversionRate}%
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-muted-foreground">{product.engagementLabel}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Visuals */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-xl border border-border bg-card shadow-card flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Revenue by Product</CardTitle>
            <p className="text-xs text-muted-foreground">Top 5 products by revenue</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div>
              <ProductRevenueList data={data.revenueByProduct} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-border bg-card shadow-card flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Revenue by Type</CardTitle>
            <p className="text-xs text-muted-foreground">Distribution across product categories</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div>
              <DistributionDonut
                data={data.revenueByType}
                height={260}
                showLegend={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

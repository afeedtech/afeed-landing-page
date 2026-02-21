import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TimeRangeSelector } from '@/components/business';
import { TimeRange, ProductType, AudienceGlobalFiltersState } from '@/types/analytics';

interface AudienceGlobalFiltersProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  globalFilters: AudienceGlobalFiltersState;
  onGlobalFiltersChange: (filters: AudienceGlobalFiltersState) => void;
}

// Mock products for demo
const mockProducts = [
  { id: 'prod_1', name: 'Digital Marketing Masterclass' },
  { id: 'prod_2', name: 'Content Creation Blueprint' },
  { id: 'prod_3', name: 'Social Media Strategy Guide' },
  { id: 'prod_4', name: '1:1 Business Coaching' },
  { id: 'prod_5', name: 'Brand Building Program' },
];

export function AudienceGlobalFilters({
  timeRange,
  onTimeRangeChange,
  globalFilters,
  onGlobalFiltersChange,
}: AudienceGlobalFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Time Range:</span>
        <TimeRangeSelector
          value={timeRange}
          onChange={onTimeRangeChange}
          className="w-[180px]"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Product:</span>
        <Select
          value={globalFilters.productId || 'all'}
          onValueChange={(v) => onGlobalFiltersChange({
            ...globalFilters,
            productId: v === 'all' ? undefined : v,
          })}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            {mockProducts.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Product Type:</span>
        <Select
          value={globalFilters.productType || 'all'}
          onValueChange={(v) => onGlobalFiltersChange({
            ...globalFilters,
            productType: v === 'all' ? undefined : v as ProductType,
          })}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="course">Courses</SelectItem>
            <SelectItem value="session">Live Sessions</SelectItem>
            <SelectItem value="program">Programs</SelectItem>
            <SelectItem value="membership">Memberships</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

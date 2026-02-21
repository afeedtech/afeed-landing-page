import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AudienceFilters, ProductType } from '@/types/analytics';
import { 
  Activity, 
  MousePointerClick, 
  DollarSign, 
  Package, 
  UserCircle 
} from 'lucide-react';

interface AdvancedFiltersProps {
  filters: AudienceFilters;
  onFiltersChange: (filters: AudienceFilters) => void;
}

// Mock products for demo
const mockProducts = [
  { id: 'prod_1', name: 'Digital Marketing Masterclass' },
  { id: 'prod_2', name: 'Content Creation Blueprint' },
  { id: 'prod_3', name: 'Social Media Strategy Guide' },
  { id: 'prod_4', name: '1:1 Business Coaching' },
  { id: 'prod_5', name: 'Brand Building Program' },
];

const countries = [
  'Kuwait', 'Saudi Arabia', 'UAE', 'Qatar', 'Bahrain', 
  'Oman', 'Egypt', 'Jordan', 'Lebanon', 'Morocco'
];

const audienceSegments = [
  'Professionals', 'Students', 'Entrepreneurs', 'Executives', 'Freelancers'
];

function FilterRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-2">
      {children}
    </div>
  );
}

function BooleanFilter({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value?: boolean; 
  onChange: (val: boolean | undefined) => void;
}) {
  return (
    <FilterRow>
      <Label className="text-sm text-muted-foreground w-40 shrink-0">{label}</Label>
      <Select
        value={value === undefined ? 'any' : value ? 'yes' : 'no'}
        onValueChange={(v) => onChange(v === 'any' ? undefined : v === 'yes')}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </FilterRow>
  );
}

export function AdvancedFilters({ filters, onFiltersChange }: AdvancedFiltersProps) {
  const updateFilter = <K extends keyof AudienceFilters>(
    key: K, 
    value: AudienceFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Accordion type="multiple" className="w-full">
      {/* Engagement Filters */}
      <AccordionItem value="engagement" className="border-border">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-brand-primary" />
            <span className="font-medium">Engagement Filters</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-4 space-y-1">
          <BooleanFilter
            label="Product page viewed"
            value={filters.productPageViewed}
            onChange={(v) => updateFilter('productPageViewed', v)}
          />
          <BooleanFilter
            label="Content started"
            value={filters.contentStarted}
            onChange={(v) => updateFilter('contentStarted', v)}
          />
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Content completion</Label>
            <Select
              value={filters.contentCompletion || 'any'}
              onValueChange={(v) => updateFilter('contentCompletion', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="not_started">Not started</SelectItem>
                <SelectItem value="1-25">1–25%</SelectItem>
                <SelectItem value="26-50">26–50%</SelectItem>
                <SelectItem value="51-75">51–75%</SelectItem>
                <SelectItem value="76-100">76–100%</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Avg time spent</Label>
            <Select
              value={filters.avgTimeSpent || 'any'}
              onValueChange={(v) => updateFilter('avgTimeSpent', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="<1min">&lt; 1 min</SelectItem>
                <SelectItem value="1-5min">1–5 min</SelectItem>
                <SelectItem value="5-15min">5–15 min</SelectItem>
                <SelectItem value="15+min">15+ min</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Last activity</Label>
            <Select
              value={filters.lastActivity || 'any'}
              onValueChange={(v) => updateFilter('lastActivity', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last_7_days">Last 7 days</SelectItem>
                <SelectItem value="last_30_days">Last 30 days</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
        </AccordionContent>
      </AccordionItem>

      {/* Interaction Filters */}
      <AccordionItem value="interaction" className="border-border">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <MousePointerClick className="h-4 w-4 text-brand-secondary" />
            <span className="font-medium">Interaction Filters</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-4 space-y-1">
          <BooleanFilter
            label="CTA clicked"
            value={filters.ctaClicked}
            onChange={(v) => updateFilter('ctaClicked', v)}
          />
          <BooleanFilter
            label="Checkout started"
            value={filters.checkoutStarted}
            onChange={(v) => updateFilter('checkoutStarted', v)}
          />
          <BooleanFilter
            label="Purchase completed"
            value={filters.purchaseCompleted}
            onChange={(v) => updateFilter('purchaseCompleted', v)}
          />
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Promo video watched</Label>
            <Select
              value={filters.promoVideoWatched || 'any'}
              onValueChange={(v) => updateFilter('promoVideoWatched', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="not_watched">Not watched</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
          <BooleanFilter
            label="Live session attended"
            value={filters.liveSessionAttended}
            onChange={(v) => updateFilter('liveSessionAttended', v)}
          />
          <BooleanFilter
            label="Replay watched"
            value={filters.replayWatched}
            onChange={(v) => updateFilter('replayWatched', v)}
          />
        </AccordionContent>
      </AccordionItem>

      {/* Monetization Filters */}
      <AccordionItem value="monetization" className="border-border">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-brand-accent" />
            <span className="font-medium">Monetization / Value Filters</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-4 space-y-1">
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Total spend</Label>
            <Select
              value={filters.totalSpendTier || 'any'}
              onValueChange={(v) => updateFilter('totalSpendTier', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="free">Free users</SelectItem>
                <SelectItem value="low">Low spend</SelectItem>
                <SelectItem value="medium">Medium spend</SelectItem>
                <SelectItem value="high">High spend</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Avg ticket size</Label>
            <Select
              value={filters.avgTicketSize || 'any'}
              onValueChange={(v) => updateFilter('avgTicketSize', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="low">&lt; 50 KWD</SelectItem>
                <SelectItem value="medium">50–150 KWD</SelectItem>
                <SelectItem value="high">&gt; 150 KWD</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Number of purchases</Label>
            <Select
              value={filters.purchaseCount || 'any'}
              onValueChange={(v) => updateFilter('purchaseCount', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2-3">2–3</SelectItem>
                <SelectItem value="4+">4+</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Membership status</Label>
            <Select
              value={filters.membershipStatus || 'any'}
              onValueChange={(v) => updateFilter('membershipStatus', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="active">Active member</SelectItem>
                <SelectItem value="past">Past member</SelectItem>
                <SelectItem value="never">Never a member</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
        </AccordionContent>
      </AccordionItem>

      {/* Product Interest Filters */}
      <AccordionItem value="product-interest" className="border-border">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-accent" />
            <span className="font-medium">Product Interest Filters</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-4 space-y-1">
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Purchased product</Label>
            <Select
              value={filters.purchasedProductId || 'any'}
              onValueChange={(v) => updateFilter('purchasedProductId', v === 'any' ? undefined : v)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Viewed but not purchased</Label>
            <Select
              value={filters.viewedNotPurchasedProductId || 'any'}
              onValueChange={(v) => updateFilter('viewedNotPurchasedProductId', v === 'any' ? undefined : v)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Interested in type</Label>
            <Select
              value={filters.interestedProductType || 'any'}
              onValueChange={(v) => updateFilter('interestedProductType', v === 'any' ? undefined : v as ProductType)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="course">Courses</SelectItem>
                <SelectItem value="session">Live Sessions</SelectItem>
                <SelectItem value="program">Programs</SelectItem>
                <SelectItem value="membership">Memberships</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
          <BooleanFilter
            label="Active in membership"
            value={filters.membershipActive}
            onChange={(v) => updateFilter('membershipActive', v)}
          />
        </AccordionContent>
      </AccordionItem>

      {/* User Background Filters */}
      <AccordionItem value="user-background" className="border-border">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">User Background Filters</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-4 space-y-1">
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Device type</Label>
            <Select
              value={filters.deviceType || 'any'}
              onValueChange={(v) => updateFilter('deviceType', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Country</Label>
            <Select
              value={filters.country || 'any'}
              onValueChange={(v) => updateFilter('country', v === 'any' ? undefined : v)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">Audience segment</Label>
            <Select
              value={filters.audienceSegment || 'any'}
              onValueChange={(v) => updateFilter('audienceSegment', v === 'any' ? undefined : v)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                {audienceSegments.map((segment) => (
                  <SelectItem key={segment} value={segment}>
                    {segment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterRow>
          <FilterRow>
            <Label className="text-sm text-muted-foreground w-40 shrink-0">User type</Label>
            <Select
              value={filters.userType || 'any'}
              onValueChange={(v) => updateFilter('userType', v === 'any' ? undefined : v as any)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="returning">Returning</SelectItem>
              </SelectContent>
            </Select>
          </FilterRow>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

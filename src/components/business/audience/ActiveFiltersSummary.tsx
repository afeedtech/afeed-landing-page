import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AudienceFilters } from '@/types/analytics';

interface ActiveFiltersSummaryProps {
  filters: AudienceFilters;
  onRemoveFilter: (key: keyof AudienceFilters) => void;
  onClearAll: () => void;
}

// Human-readable labels for filter values
const filterLabels: Record<keyof AudienceFilters, string> = {
  productPageViewed: 'Product page viewed',
  contentStarted: 'Content started',
  contentCompletion: 'Content completion',
  avgTimeSpent: 'Avg time spent',
  lastActivity: 'Last activity',
  ctaClicked: 'CTA clicked',
  checkoutStarted: 'Checkout started',
  purchaseCompleted: 'Purchase completed',
  promoVideoWatched: 'Promo video',
  liveSessionAttended: 'Live session attended',
  replayWatched: 'Replay watched',
  totalSpendTier: 'Total spend',
  avgTicketSize: 'Avg ticket size',
  purchaseCount: 'Purchases',
  membershipStatus: 'Membership',
  purchasedProductId: 'Purchased product',
  viewedNotPurchasedProductId: 'Viewed not purchased',
  enrolledProgramId: 'Enrolled in program',
  membershipActive: 'Active membership',
  interestedProductType: 'Interested in type',
  deviceType: 'Device',
  country: 'Country',
  audienceSegment: 'Segment',
  userType: 'User type',
};

const valueLabels: Record<string, string> = {
  'not_started': 'Not started',
  '1-25': '1–25%',
  '26-50': '26–50%',
  '51-75': '51–75%',
  '76-100': '76–100%',
  '<1min': '< 1 min',
  '1-5min': '1–5 min',
  '5-15min': '5–15 min',
  '15+min': '15+ min',
  'today': 'Today',
  'last_7_days': 'Last 7 days',
  'last_30_days': 'Last 30 days',
  'inactive': 'Inactive',
  'not_watched': 'Not watched',
  'partial': 'Partial',
  'completed': 'Completed',
  'free': 'Free users',
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
  '1': '1',
  '2-3': '2–3',
  '4+': '4+',
  'active': 'Active',
  'past': 'Past',
  'never': 'Never',
  'mobile': 'Mobile',
  'desktop': 'Desktop',
  'tablet': 'Tablet',
  'new': 'New',
  'returning': 'Returning',
  'course': 'Courses',
  'session': 'Sessions',
  'program': 'Programs',
  'membership': 'Memberships',
  'true': 'Yes',
  'false': 'No',
};

function formatFilterValue(key: keyof AudienceFilters, value: any): string {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return valueLabels[value] || value;
}

export function ActiveFiltersSummary({
  filters,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersSummaryProps) {
  const activeFilters = Object.entries(filters).filter(
    ([_, value]) => value !== undefined && value !== ''
  ) as [keyof AudienceFilters, any][];

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 px-4 bg-muted/30 rounded-lg border border-border">
      <span className="text-sm text-muted-foreground mr-1">Active filters:</span>
      {activeFilters.map(([key, value]) => (
        <Badge
          key={key}
          variant="secondary"
          className="pl-2 pr-1 py-1 gap-1 text-xs"
        >
          <span className="font-medium">{filterLabels[key]}:</span>
          <span>{formatFilterValue(key, value)}</span>
          <button
            onClick={() => onRemoveFilter(key)}
            className="ml-1 hover:bg-background/50 rounded p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        onClick={onClearAll}
      >
        Clear all
      </Button>
    </div>
  );
}

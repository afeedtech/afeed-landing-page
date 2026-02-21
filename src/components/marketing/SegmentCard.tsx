import { Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SavedSegment } from '@/types/analytics';

interface SegmentCardProps {
  segment: SavedSegment;
  onUseInCampaign: (segment: SavedSegment) => void;
}

function getFilterSummary(segment: SavedSegment): string {
  const filterKeys = Object.keys(segment.filters);
  if (filterKeys.length === 0) return 'No filters';
  
  const filterLabels: Record<string, string> = {
    totalSpendTier: 'Spend tier',
    contentCompletion: 'Completion',
    lastActivity: 'Activity',
    deviceType: 'Device',
    purchaseCompleted: 'Purchased',
    ctaClicked: 'CTA clicked',
    membershipStatus: 'Membership',
    avgTimeSpent: 'Time spent',
  };

  const labels = filterKeys
    .slice(0, 3)
    .map(key => filterLabels[key] || key);
  
  if (filterKeys.length > 3) {
    return `${labels.join(', ')} +${filterKeys.length - 3} more`;
  }
  
  return labels.join(', ');
}

export function SegmentCard({ segment, onUseInCampaign }: SegmentCardProps) {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-elevated">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 flex-shrink-0">
              <Users className="h-5 w-5 text-brand-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{segment.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {getFilterSummary(segment)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Badge variant="secondary" className="text-xs">
              {segment.userCount.toLocaleString()} users
            </Badge>
            <Button
              size="sm"
              onClick={() => onUseInCampaign(segment)}
              className="brand-gradient-primary text-primary-foreground"
            >
              Use in Campaign
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

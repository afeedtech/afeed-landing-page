import { Card, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';
import { AudienceSegmentationResult } from '@/types/analytics';

interface SegmentationResultsSummaryProps {
  data: AudienceSegmentationResult;
}

export function SegmentationResultsSummary({ data }: SegmentationResultsSummaryProps) {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-card">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold text-foreground">Results Summary</h3>
          <p className="text-sm text-muted-foreground">
            Summary metrics for the selected audience segment.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 shrink-0">
              <Users className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{data.totalMatching.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Users matched</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 shrink-0">
              <Target className="h-5 w-5 text-brand-secondary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{data.percentageOfTotal}%</p>
              <p className="text-xs text-muted-foreground">Of total audience</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 shrink-0">
              <TrendingUp className="h-5 w-5 text-brand-accent" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{data.avgEngagement}%</p>
              <p className="text-xs text-muted-foreground">Avg engagement</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shrink-0">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{data.avgSpend} KWD</p>
              <p className="text-xs text-muted-foreground">Avg spend</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10 shrink-0">
              <Target className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{data.conversionRate}%</p>
              <p className="text-xs text-muted-foreground">Conversion rate</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

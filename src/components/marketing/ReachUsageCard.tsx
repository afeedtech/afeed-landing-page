import { AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ReachUsage } from '@/types/marketing';

interface ReachUsageCardProps {
  usage: ReachUsage;
  currentPlanId?: string;
}

// Plan reach limits
const planReachLimits: Record<string, { limit: number; name: string }> = {
  basic: { limit: 500, name: 'Basic' },
  growth: { limit: 5000, name: 'Growth' },
  pro: { limit: 50000, name: 'Pro' },
};

const getNextPlan = (currentPlanId: string) => {
  if (currentPlanId === 'basic') return planReachLimits.growth;
  if (currentPlanId === 'growth') return planReachLimits.pro;
  return null;
};

const formatReachLimit = (limit: number) => {
  if (limit >= 1000) {
    return `${(limit / 1000).toLocaleString()}K`;
  }
  return limit.toLocaleString();
};

export function ReachUsageCard({ usage, currentPlanId = 'growth' }: ReachUsageCardProps) {
  const { used, limit } = usage;
  const percentage = Math.min((used / limit) * 100, 100);
  const remaining = Math.max(limit - used, 0);
  const isExceeded = used >= limit;
  const isWarning = percentage >= 80 && !isExceeded;
  const nextPlan = getNextPlan(currentPlanId);

  return (
    <Card className="rounded-xl border border-border bg-card shadow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-base font-semibold">Monthly Reach Usage</CardTitle>
          </div>
          {isExceeded && (
            <span className="flex items-center gap-1 text-xs font-medium text-destructive">
              <AlertCircle className="h-4 w-4" />
              Limit reached
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {used.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">/ {limit.toLocaleString()}</span>
            </span>
            <span className="text-sm text-muted-foreground">
              {remaining.toLocaleString()} remaining
            </span>
          </div>
          <Progress 
            value={percentage} 
            className={`h-2 ${isExceeded ? '[&>div]:bg-destructive' : isWarning ? '[&>div]:bg-amber-500' : ''}`}
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          Reach counts the total number of recipients you've contacted this month across all channels. Contacting the same user twice counts twice. Reach resets monthly.
        </p>

        {isExceeded && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <p className="text-sm text-destructive font-medium mb-2">
              You've used all {limit.toLocaleString()} recipients this month
            </p>
            {nextPlan ? (
              <>
                <p className="text-xs text-muted-foreground mb-3">
                  Upgrade to {nextPlan.name} for {formatReachLimit(nextPlan.limit)} recipients/month.
                </p>
                <Button size="sm" className="brand-gradient-primary text-primary-foreground">
                  Upgrade to {nextPlan.name}
                </Button>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                You're on the highest plan. Contact support if you need higher limits.
              </p>
            )}
          </div>
        )}

        {isWarning && !isExceeded && nextPlan && (
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">
              You're approaching your monthly limit
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Consider upgrading to {nextPlan.name} for {formatReachLimit(nextPlan.limit)} recipients/month.
            </p>
            <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10">
              View Upgrade Options
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

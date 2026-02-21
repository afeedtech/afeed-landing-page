import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { subscriptionPlans } from "./mockData";
import { cn } from "@/lib/utils";

interface SubscriptionPlansProps {
  currentPlanId: string;
}

export function SubscriptionPlans({ currentPlanId }: SubscriptionPlansProps) {
  const { t } = useTranslation();
  const [isAnnual, setIsAnnual] = useState(false);
  const currentPlanIndex = subscriptionPlans.findIndex(p => p.id === currentPlanId);

  const handleUpgrade = (planName: string) => {
    console.log(`Upgrading to ${planName}`);
  };

  const handleDowngrade = (planName: string) => {
    console.log(`Downgrading to ${planName}`);
  };

  const formatReachLimit = (limit: number) => {
    if (limit >= 1000) {
      return `${(limit / 1000).toLocaleString()}K`;
    }
    return limit.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Subscription</h3>
          <p className="text-sm text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </div>
        
        {/* Billing Toggle */}
        <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-2">
          <Label htmlFor="billing-toggle" className={cn("text-sm", !isAnnual && "font-semibold text-foreground")}>
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label htmlFor="billing-toggle" className={cn("text-sm", isAnnual && "font-semibold text-foreground")}>
            Annual
            <span className="ml-1 text-xs text-primary font-medium">(Save up to 18%)</span>
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan, index) => {
          const isCurrent = plan.id === currentPlanId;
          const isHigher = index > currentPlanIndex;
          const isLower = index < currentPlanIndex;
          const displayPrice = isAnnual ? plan.annualPrice : plan.price;

          return (
            <div
              key={plan.id}
              className={cn(
                "rounded-xl p-5 transition-all relative flex flex-col",
                isCurrent
                  ? "border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg"
                  : "border border-border bg-card hover:border-primary/30"
              )}
            >
              {isCurrent && (
                <Badge className="absolute -top-2.5 left-4 bg-primary text-primary-foreground border-0">
                  Active
                </Badge>
              )}
              {plan.isPopular && !isCurrent && (
                <Badge className="absolute -top-2.5 left-4 bg-primary text-primary-foreground border-0">
                  Popular
                </Badge>
              )}

              <div className="mb-4">
                <h4 className="text-lg font-semibold">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold">{displayPrice}</span>
                  <span className="text-muted-foreground">{plan.currency}/month</span>
                </div>
                {isAnnual && (
                  <p className="text-xs text-muted-foreground mt-1">
                    billed annually
                  </p>
                )}
              </div>

              {/* Reach Limit Badge - Prominent */}
              <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {formatReachLimit(plan.reachLimit)} {t('subscription.recipientsMonth')}
                  </span>
                </div>
              </div>

              {/* Membership Indicator */}
              <div className="mb-4 flex items-center gap-2">
                {plan.memberships ? (
                  <>
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">Memberships included</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Memberships not included</span>
                  </>
                )}
              </div>

              <ul className="space-y-2.5 flex-1">
                {plan.features.slice(1).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {isCurrent ? (
                  <Button disabled className="w-full" variant="outline">
                    Current Plan
                  </Button>
                ) : isHigher ? (
                  <Button
                    className="w-full gradient-bg"
                    onClick={() => handleUpgrade(plan.name)}
                  >
                    Upgrade
                  </Button>
                ) : isLower ? (
                  <Button
                    variant="downgrade"
                    className="w-full"
                    onClick={() => handleDowngrade(plan.name)}
                  >
                    Downgrade
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Billing cycle: {isAnnual ? "Annual" : "Monthly"} • Next billing: Jan 22, 2025
        </p>
      </div>
    </div>
  );
}

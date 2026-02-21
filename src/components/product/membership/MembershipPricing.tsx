import { Check, Sparkles, Calendar, BookOpen, Video, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PricingOption, Product } from "@/components/profile/types";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface MembershipPricingProps {
  product: Product;
  hasAccess: boolean;
  className?: string;
}

export function MembershipPricing({ product, hasAccess, className }: MembershipPricingProps) {
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  const [selectedPlan, setSelectedPlan] = useState<string>(
    product.pricingOptions?.[0]?.id || "monthly"
  );

  const pricingOptions = product.pricingOptions || [
    { id: "monthly", interval: "monthly" as const, price: product.price }
  ];

  const intervalLabels = {
    monthly: "/month",
    quarterly: "/quarter",
    annual: "/year",
  };

  // If user has access, show membership dashboard view
  if (hasAccess) {
    return (
      <div className={cn("space-y-6", className)}>
        <h2 className="text-xl font-semibold">Your Membership</h2>

        {/* Membership Status */}
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-primary text-primary-foreground">Active</Badge>
            <span className="text-sm text-muted-foreground">
              Renews on Jan 15, 2025
            </span>
          </div>

          <h3 className="font-semibold text-lg">{product.title}</h3>
          
          {/* Content cadence */}
          {product.contentCadence && (
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {product.contentCadence}
            </div>
          )}
        </div>

        {/* Included content */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Your Benefits</h3>
            <div className="grid gap-2">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick access links */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" className="justify-start">
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Courses
          </Button>
          <Button variant="outline" className="justify-start">
            <Video className="h-4 w-4 mr-2" />
            Upcoming Sessions
          </Button>
          <Button variant="outline" className="justify-start">
            <Users className="h-4 w-4 mr-2" />
            Community
          </Button>
        </div>
      </div>
    );
  }

  // Pre-purchase pricing view
  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="text-xl font-semibold">Choose Your Plan</h2>

      {/* Pricing Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        {pricingOptions.map((option) => {
          const isSelected = selectedPlan === option.id;
          const isPopular = option.label?.toLowerCase().includes("best");

          return (
            <button
              key={option.id}
              onClick={() => setSelectedPlan(option.id)}
              className={cn(
                "relative p-4 rounded-xl border-2 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              {option.label && (
                <Badge
                  className={cn(
                    "absolute -top-2.5 left-4",
                    isPopular
                      ? "bg-gradient-to-br from-brand-purple to-brand-violet text-white border-0"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isPopular && <Sparkles className="h-3 w-3 mr-1" />}
                  {option.label}
                </Badge>
              )}

              <div className="mt-2">
                <div className="text-2xl font-bold">
                  {option.price} {currencyLabel}
                  <span className="text-sm font-normal text-muted-foreground">
                    {intervalLabels[option.interval]}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground capitalize mt-1">
                  {option.interval} billing
                </div>
              </div>

              {/* Selection indicator */}
              <div
                className={cn(
                  "absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                )}
              >
                {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Content cadence */}
      {product.contentCadence && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {product.contentCadence}
        </div>
      )}

      {/* Benefits list */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium">What's included</h3>
          <div className="grid gap-2">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Button className="w-full gradient-bg" size="lg">
        Subscribe Now - {pricingOptions.find(o => o.id === selectedPlan)?.price} {currencyLabel}
        {intervalLabels[pricingOptions.find(o => o.id === selectedPlan)?.interval || "monthly"]}
      </Button>
    </div>
  );
}

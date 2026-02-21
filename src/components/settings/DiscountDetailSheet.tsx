import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { DiscountCode } from "./types";
import { toast } from "sonner";

interface DiscountDetailSheetProps {
  code: DiscountCode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DiscountDetailSheet({ code, open, onOpenChange }: DiscountDetailSheetProps) {
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  if (!code) return null;

  const getDiscountDisplay = () => {
    switch (code.type) {
      case "percentage":
        return `${code.value}% off`;
      case "fixed":
        return `${code.value} ${currencyLabel} off`;
      case "free_trial":
        return `${code.value} days free trial`;
    }
  };

  const handleReactivate = () => {
    toast.success(`Code "${code.code}" has been reactivated`);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span className="font-mono">{code.code}</span>
            <Badge
              variant="secondary"
              className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {code.status === "expired" ? "Expired" : "Deactivated"}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] pr-4 mt-6">
          <div className="space-y-6">
            {/* Discount Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Details</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{code.type.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Value</p>
                  <p className="font-medium">{getDiscountDisplay()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Per Customer</p>
                  <p className="font-medium">{code.perCustomerLimit} use(s)</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Products</p>
                  <p className="font-medium">
                    {code.productIds === "all" ? "All products" : `${(code.productIds as string[]).length} selected`}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Date Range */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Date Range</h4>
              <div className="text-sm">
                <p>
                  <span className="text-muted-foreground">Created:</span>{" "}
                  <span className="font-medium">{format(code.createdAt, "PPP")}</span>
                </p>
                <p className="mt-1">
                  <span className="text-muted-foreground">Active period:</span>{" "}
                  <span className="font-medium">
                    {format(code.startDate, "MMM d")} – {format(code.endDate, "MMM d, yyyy")}
                  </span>
                </p>
              </div>
            </div>

            <Separator />

            {/* Usage Statistics */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Usage Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-2xl font-bold">{code.totalUses}</p>
                  <p className="text-xs text-muted-foreground">Total Uses</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-2xl font-bold">{code.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{currencyLabel} Generated</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Users List */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">
                Users Who Used This Code ({code.usages.length})
              </h4>
              
              {code.usages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No usage records available</p>
              ) : (
                <div className="space-y-2">
                  {code.usages.map((usage, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-muted/30 p-3 text-sm"
                    >
                      <div>
                        <p className="font-medium">{usage.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(usage.usedAt, "MMM d, yyyy")}
                        </p>
                      </div>
                      <p className="font-medium">{usage.orderAmount} {currencyLabel}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reactivate Button */}
            <div className="pt-4">
              <Button onClick={handleReactivate} variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reactivate Code
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

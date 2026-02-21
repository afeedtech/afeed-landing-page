import { Copy, MoreHorizontal, Pencil, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { DiscountCode } from "./types";
import { toast } from "sonner";

interface ActiveDiscountsListProps {
  codes: DiscountCode[];
}

export function ActiveDiscountsList({ codes }: ActiveDiscountsListProps) {
  const activeCodes = codes.filter((c) => c.status === "active");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Code "${code}" copied to clipboard`);
  };

  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';

  const getDiscountDisplay = (code: DiscountCode) => {
    switch (code.type) {
      case "percentage":
        return `${code.value}% off`;
      case "fixed":
        return `${code.value} ${currencyLabel} off`;
      case "free_trial":
        return `${code.value} days free`;
    }
  };

  if (activeCodes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No active discount codes</p>
        <p className="text-sm mt-1">Create your first discount code above</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Active Codes</h4>
      
      <div className="grid gap-3">
        {activeCodes.map((code) => {
          const usagePercent = (code.totalUses / code.maxUses) * 100;

          return (
            <div
              key={code.id}
              className="rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-semibold text-lg">{code.code}</span>
                    <Badge variant="secondary" className="text-xs">
                      {getDiscountDisplay(code)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyCode(code.code)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usage</span>
                      <span>
                        {code.totalUses}/{code.maxUses}
                      </span>
                    </div>
                    <Progress value={usagePercent} className="h-1.5" />
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    Expires {format(code.endDate, "MMM d, yyyy")}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => copyCode(code.code)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <XCircle className="h-4 w-4 mr-2" />
                      Deactivate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from "react";
import { ChevronDown, ChevronUp, Archive } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import { DiscountCode } from "./types";

interface ArchivedDiscountsListProps {
  codes: DiscountCode[];
  onSelectCode: (code: DiscountCode) => void;
}

export function ArchivedDiscountsList({ codes, onSelectCode }: ArchivedDiscountsListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  const archivedCodes = codes.filter(
    (c) => c.status === "expired" || c.status === "deactivated"
  );

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

  if (archivedCodes.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between px-0 hover:bg-transparent">
          <span className="flex items-center gap-2 font-semibold">
            <Archive className="h-4 w-4" />
            Archived Codes ({archivedCodes.length})
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3">
        <div className="space-y-2">
          {archivedCodes.map((code) => (
            <button
              key={code.id}
              onClick={() => onSelectCode(code)}
              className="w-full rounded-lg border border-border bg-muted/30 p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-medium">{code.code}</span>
                    <Badge variant="outline" className="text-xs">
                      {getDiscountDisplay(code)}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {code.status === "expired" ? "Expired" : "Deactivated"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(code.createdAt, "MMM d, yyyy")} – {format(code.endDate, "MMM d, yyyy")}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-semibold">{code.totalRevenue.toLocaleString()} {currencyLabel}</p>
                  <p className="text-xs text-muted-foreground">{code.totalUses} uses</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

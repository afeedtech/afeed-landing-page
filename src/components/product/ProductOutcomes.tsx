import { Check, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductOutcomesProps {
  outcomes: string[];
  className?: string;
}

export function ProductOutcomes({ outcomes, className }: ProductOutcomesProps) {
  if (!outcomes || outcomes.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">What You'll Get</h2>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {outcomes.map((outcome, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm text-foreground">{outcome}</span>
          </div>
        ))}
      </div>

      {/* Inline guidance for creators */}
      <p className="text-xs text-muted-foreground">
        Tip: Focus on outcomes your audience cares about.
      </p>
    </div>
  );
}

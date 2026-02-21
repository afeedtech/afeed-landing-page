import { Check } from "lucide-react";
import { ThemeConfig } from "@/lib/themes";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeColorCardProps {
  config: ThemeConfig;
  isSelected: boolean;
  onClick: () => void;
}

export function ThemeColorCard({ config, isSelected, onClick }: ThemeColorCardProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className={cn(
              "relative w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center",
              "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring",
              isSelected && "ring-2 ring-offset-2 ring-primary"
            )}
            style={{ background: config.gradient }}
          >
            {isSelected && (
              <Check className="w-4 h-4 text-white drop-shadow-md" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {config.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

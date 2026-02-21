import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, BookOpen, Lightbulb, Ban, Megaphone, Star } from "lucide-react";
import { FormatType, formatLabels } from "./mockData";
import { cn } from "@/lib/utils";

interface BuilderStepFormatProps {
  selected: FormatType | null;
  onSelect: (format: FormatType) => void;
}

const formatIcons: Record<FormatType, React.ReactNode> = {
  'hook-first': <Zap className="h-6 w-6" />,
  'story': <BookOpen className="h-6 w-6" />,
  'problem-solution': <Lightbulb className="h-6 w-6" />,
  'myth-busting': <Ban className="h-6 w-6" />,
  'callout': <Megaphone className="h-6 w-6" />,
};

export const BuilderStepFormat = ({ selected, onSelect }: BuilderStepFormatProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Choose your script type</h2>
        <p className="text-muted-foreground">Pick the structure that fits your message</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {(Object.keys(formatLabels) as FormatType[]).map((format) => {
          const info = formatLabels[format];
          const isSelected = selected === format;

          return (
            <Card
              key={format}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 relative",
                isSelected && "border-primary bg-primary/5 shadow-md"
              )}
              onClick={() => onSelect(format)}
            >
              {info.recommended && (
                <Badge className="absolute top-2 right-2 bg-none bg-green-600 text-white border-0 text-xs">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Recommended
                </Badge>
              )}
              <CardContent className="flex flex-col items-center text-center gap-3 p-5 pt-7">
                <div className={cn(
                  "p-3 rounded-xl transition-colors",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {formatIcons[format]}
                </div>
                <div>
                  <CardTitle className="text-base">{info.label}</CardTitle>
                  <CardDescription className="text-sm mt-1">{info.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

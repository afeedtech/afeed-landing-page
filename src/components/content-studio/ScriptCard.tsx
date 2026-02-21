import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, Star } from "lucide-react";
import { ScriptTemplate, goalLabels, formatLabels, triggerLabels } from "./mockData";

interface ScriptCardProps {
  template: ScriptTemplate;
  onUse: (template: ScriptTemplate) => void;
}

export const ScriptCard = ({ template, onUse }: ScriptCardProps) => {
  const goalInfo = goalLabels[template.goal];
  const formatInfo = formatLabels[template.format];
  const triggerLabel = triggerLabels[template.emotionalTrigger];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/30 bg-card relative">
      {template.recommended && (
        <Badge className="absolute top-3 right-3 bg-none bg-green-600 text-white border-0">
          <Star className="h-3 w-3 mr-1 fill-current" />
          Recommended
        </Badge>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          {!template.recommended && (
            <Badge variant="secondary" className="text-xs">
              {formatInfo.label}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-3">{template.name}</CardTitle>
        <CardDescription className="text-sm">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {goalInfo.label}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {triggerLabel}
          </Badge>
        </div>
        
        <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Example hook:</p>
          <p className="text-sm italic">"{template.exampleHook}"</p>
        </div>

        <Button 
          onClick={() => onUse(template)} 
          className="w-full gap-2"
          variant="default"
        >
          <Sparkles className="h-4 w-4" />
          Use this script
        </Button>
      </CardContent>
    </Card>
  );
};

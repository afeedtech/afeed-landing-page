import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ShoppingBag, GraduationCap, RefreshCw, Star } from "lucide-react";
import { GoalType, goalLabels } from "./mockData";
import { cn } from "@/lib/utils";

interface BuilderStepGoalProps {
  selected: GoalType | null;
  onSelect: (goal: GoalType) => void;
}

const goalIcons: Record<GoalType, React.ReactNode> = {
  grow: <Users className="h-6 w-6" />,
  sell: <ShoppingBag className="h-6 w-6" />,
  educate: <GraduationCap className="h-6 w-6" />,
  reengage: <RefreshCw className="h-6 w-6" />,
};

export const BuilderStepGoal = ({ selected, onSelect }: BuilderStepGoalProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">What's your goal?</h2>
        <p className="text-muted-foreground">Choose what you want to achieve with this content</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {(Object.keys(goalLabels) as GoalType[]).map((goal) => {
          const info = goalLabels[goal];
          const isSelected = selected === goal;

          return (
            <Card
              key={goal}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 relative",
                isSelected && "border-primary bg-primary/5 shadow-md"
              )}
              onClick={() => onSelect(goal)}
            >
              {info.recommended && (
                <Badge className="absolute top-2 right-2 bg-none bg-green-600 text-white border-0 text-xs">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Recommended
                </Badge>
              )}
              <CardContent className="flex items-center gap-4 p-5">
                <div className={cn(
                  "p-3 rounded-xl transition-colors",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {goalIcons[goal]}
                </div>
                <div>
                  <CardTitle className="text-base">{info.label}</CardTitle>
                  <CardDescription className="text-sm mt-0.5">{info.description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

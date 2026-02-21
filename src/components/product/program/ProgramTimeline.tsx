import { Calendar, CheckCircle, Lock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProgramPhase } from "@/components/profile/types";

interface ProgramTimelineProps {
  phases: ProgramPhase[];
  programDuration?: string;
  hasAccess: boolean;
  className?: string;
}

export function ProgramTimeline({ phases, programDuration, hasAccess, className }: ProgramTimelineProps) {
  if (!phases || phases.length === 0) return null;

  // Mock current phase for demo
  const currentPhaseId = hasAccess ? 1 : null;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Program Timeline</h2>
        </div>
        {programDuration && (
          <Badge variant="secondary">{programDuration}</Badge>
        )}
      </div>

      {/* Timeline */}
      <div className="relative space-y-4">
        {/* Vertical line */}
        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-border" />

        {phases.map((phase, index) => {
          const isCompleted = hasAccess && currentPhaseId && phase.id < currentPhaseId;
          const isCurrent = hasAccess && phase.id === currentPhaseId;
          const isLocked = !hasAccess || (currentPhaseId && phase.id > currentPhaseId);

          return (
            <div
              key={phase.id}
              className={cn(
                "relative flex gap-4 p-4 rounded-xl border transition-colors",
                isCurrent
                  ? "bg-primary/5 border-primary/30"
                  : isCompleted
                  ? "bg-muted/30 border-border"
                  : "bg-card border-border",
                hasAccess && !isLocked && "hover:bg-muted/50 cursor-pointer"
              )}
            >
              {/* Phase indicator */}
              <div
                className={cn(
                  "relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : isLocked && !hasAccess ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Phase content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className={cn("font-medium", isLocked && !hasAccess && "text-muted-foreground")}>
                      {phase.title}
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Week {phase.weekStart}{phase.weekEnd !== phase.weekStart && `-${phase.weekEnd}`}
                    </div>
                  </div>
                  {isCurrent && (
                    <Badge className="bg-primary/10 text-primary border-0">Current</Badge>
                  )}
                </div>
                
                <p className={cn("text-sm mt-2", isLocked && !hasAccess ? "text-muted-foreground/60" : "text-muted-foreground")}>
                  {phase.description}
                </p>

                {/* Navigation for accessible phases */}
                {hasAccess && !isLocked && (
                  <div className="flex items-center gap-1 mt-3 text-primary text-sm">
                    <span>{isCurrent ? "Continue" : "Review"}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicator for users with access */}
      {hasAccess && currentPhaseId && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${(currentPhaseId / phases.length) * 100}%` }}
            />
          </div>
          <span className="flex-shrink-0">
            Phase {currentPhaseId}/{phases.length}
          </span>
        </div>
      )}
    </div>
  );
}

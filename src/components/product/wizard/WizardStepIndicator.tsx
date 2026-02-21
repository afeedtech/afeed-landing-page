import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { WIZARD_STEPS, type WizardStep } from "./types";

interface WizardStepIndicatorProps {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  onStepClick?: (step: WizardStep) => void;
}

export function WizardStepIndicator({
  currentStep,
  completedSteps,
  onStepClick,
}: WizardStepIndicatorProps) {
  const currentStepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-0 sm:gap-2">
        {WIZARD_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isClickable = isCompleted || isCurrent;
          const isUpcoming = index > currentStepIndex && !isCompleted;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle + Label */}
              <button
                onClick={() => isClickable && onStepClick?.(step.id)}
                disabled={!isClickable}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full transition-all",
                  isClickable && "cursor-pointer hover:bg-muted",
                  !isClickable && "cursor-default",
                  isCurrent && "bg-primary/10"
                )}
              >
                {/* Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && !isCompleted && "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
                    isUpcoming && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </div>

                {/* Label - hidden on mobile for all except current */}
                <span
                  className={cn(
                    "text-sm font-medium hidden sm:inline",
                    isCurrent && "text-foreground",
                    isCompleted && "text-foreground",
                    isUpcoming && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>

                {/* Mobile: Show label only for current step */}
                {isCurrent && (
                  <span className="text-sm font-medium sm:hidden text-foreground">
                    {step.label}
                  </span>
                )}
              </button>

              {/* Connector Line */}
              {index < WIZARD_STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-8 sm:w-12 h-0.5 mx-1",
                    index < currentStepIndex || isCompleted
                      ? "bg-primary"
                      : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

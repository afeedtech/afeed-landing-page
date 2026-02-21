import { cn } from '@/lib/utils';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              index < currentStep
                ? 'bg-primary'
                : index === currentStep
                ? 'bg-primary scale-125'
                : 'bg-muted-foreground/30'
            )}
          />
          {index < totalSteps - 1 && (
            <div
              className={cn(
                'w-12 h-0.5 mx-1 transition-all duration-300',
                index < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

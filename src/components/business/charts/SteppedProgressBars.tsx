import React from 'react';
import { cn } from '@/lib/utils';
import { useChartColors } from '@/lib/chartTheme';
import { FunnelStep } from '@/types/analytics';

interface SteppedProgressBarsProps {
  data: FunnelStep[];
  showDropOff?: boolean;
  className?: string;
}

export function SteppedProgressBars({ 
  data, 
  showDropOff = true,
  className 
}: SteppedProgressBarsProps) {
  const colors = useChartColors();
  
  if (!data.length) return null;

  const n = data.length;

  // Generate opacity values (light to dark from top to bottom)
  const getOpacity = (index: number, total: number) => {
    const minOpacity = 0.3;
    const maxOpacity = 1;
    if (total === 1) return maxOpacity;
    return minOpacity + ((index / (total - 1)) * (maxOpacity - minOpacity));
  };

  return (
    <div className={cn('w-full space-y-1', className)}>
      {data.map((step, i) => {
        const opacity = getOpacity(i, n);
        const dropOff = i > 0 ? step.percentage - data[i - 1].percentage : 0;

        return (
          <React.Fragment key={step.name}>
            {/* Drop-off indicator */}
            {showDropOff && i > 0 && (
              <div className="flex justify-end pr-2 py-1">
                <span className="text-xs text-muted-foreground">
                  {dropOff.toFixed(1)}%
                </span>
              </div>
            )}
            
            {/* Step row */}
            <div className="flex items-center gap-4">
              {/* Left: Name and value */}
              <div className="w-32 flex-shrink-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {step.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {step.value.toLocaleString()}
                </div>
              </div>

              {/* Right: Progress bar */}
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 h-8 bg-muted/30 rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.max(2, step.percentage)}%`,
                      backgroundColor: colors.brandPrimary,
                      opacity,
                    }}
                  />
                </div>
                <span className="w-14 text-sm font-medium text-foreground text-right">
                  {step.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

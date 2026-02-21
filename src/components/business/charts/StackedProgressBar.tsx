import React from 'react';
import { useChartColors } from '@/lib/chartTheme';

interface SegmentData {
  name: string;
  value: number;
  percentage: number;
}

interface StackedProgressBarProps {
  data: SegmentData[];
  height?: number;
  showLabels?: boolean;
}

export function StackedProgressBar({
  data,
  height = 48,
  showLabels = true,
}: StackedProgressBarProps) {
  const colors = useChartColors();

  const colorOptions = [
    { bg: colors.brandPrimary, textDark: false },
    { bg: colors.brandSecondary, textDark: true },  // Light color - use dark text
    { bg: colors.brandAccent, textDark: true },     // Light color - use dark text
    { bg: colors.accent, textDark: false },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full space-y-3">
      {/* Progress bar */}
      <div
        className="w-full rounded-full overflow-hidden flex"
        style={{ height: `${height}px` }}
      >
        {data.map((segment, index) => {
          const percentage = total > 0 ? (segment.value / total) * 100 : 0;
          const colorConfig = colorOptions[index % colorOptions.length];
          return (
            <div
              key={segment.name}
              className="flex items-center justify-center transition-all duration-300 first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: colorConfig.bg,
                minWidth: percentage > 0 ? '40px' : '0',
              }}
            >
              {percentage >= 15 && (
                <span 
                  className="text-sm font-semibold drop-shadow-sm"
                  style={{ color: colorConfig.textDark ? 'hsl(var(--foreground))' : 'white' }}
                >
                  {percentage.toFixed(0)}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex flex-wrap gap-4">
          {data.map((segment, index) => {
            const percentage = total > 0 ? (segment.value / total) * 100 : 0;
            return (
              <div key={segment.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colorOptions[index % colorOptions.length].bg }}
                />
                <span className="text-sm text-muted-foreground">
                  {segment.name}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

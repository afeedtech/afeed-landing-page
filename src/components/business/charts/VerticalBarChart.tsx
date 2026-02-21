import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useChartColors, chartTooltipStyles, formatPercentage } from '@/lib/chartTheme';
import { useIsMobile } from '@/hooks/use-mobile';

interface DataItem {
  name: string;
  value: number;
  percentage?: number;
}

interface VerticalBarChartProps {
  data: DataItem[];
  height?: number;
  showPercentage?: boolean;
  colorKey?: 'brandPrimary' | 'brandSecondary' | 'brandAccent' | 'accent';
}

export function VerticalBarChart({
  data,
  height = 220,
  showPercentage = true,
  colorKey = 'brandPrimary',
}: VerticalBarChartProps) {
  const colors = useChartColors();
  const isMobile = useIsMobile();

  // Generate color variations for each bar
  const getBarColor = (index: number) => {
    const colorOptions = [
      colors.brandPrimary,
      colors.brandSecondary,
      colors.brandAccent,
      colors.accent,
      colors.muted,
    ];
    return colorOptions[index % colorOptions.length];
  };

  // Calculate responsive label configuration based on screen size and label length
  const labelConfig = useMemo(() => {
    const maxLabelLength = Math.max(...data.map(d => d.name.length), 0);
    const hasLongLabels = maxLabelLength > 12;

    if (isMobile) {
      return {
        fontSize: hasLongLabels ? 8 : 9,
        angle: hasLongLabels ? -55 : -45,
        height: hasLongLabels ? 80 : 65,
        dy: 10,
      };
    }
    // Tablet/Desktop
    return {
      fontSize: hasLongLabels ? 9 : 11,
      angle: hasLongLabels ? -45 : -35,
      height: hasLongLabels ? 75 : 60,
      dy: hasLongLabels ? 8 : 5,
    };
  }, [data, isMobile]);

  const displayData = data.map((item) => ({
    ...item,
    displayValue: showPercentage ? (item.percentage ?? item.value) : item.value,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={displayData}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: labelConfig.fontSize }}
          interval={0}
          angle={labelConfig.angle}
          textAnchor="end"
          height={labelConfig.height}
          dy={labelConfig.dy}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          tickFormatter={(value) => (showPercentage ? `${value}%` : value.toLocaleString())}
        />
        <Tooltip
          contentStyle={chartTooltipStyles.contentStyle}
          labelStyle={chartTooltipStyles.labelStyle}
          formatter={(value: number) =>
            showPercentage ? formatPercentage(value) : value.toLocaleString()
          }
        />
        <Bar dataKey="displayValue" radius={[4, 4, 0, 0]} maxBarSize={50}>
          {displayData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

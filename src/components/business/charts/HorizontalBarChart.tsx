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
import { useChartColors, chartGridConfig, chartTooltipStyles } from '@/lib/chartTheme';
import { DistributionItem } from '@/types/analytics';

interface HorizontalBarChartProps {
  data: DistributionItem[];
  height?: number;
  showPercentage?: boolean;
  barSize?: number;
}

export function HorizontalBarChart({
  data,
  height = 200,
  showPercentage = true,
  barSize = 20,
}: HorizontalBarChartProps) {
  const colors = useChartColors();

  // Color palette for bars
  const palette = [
    colors.brandPrimary,
    colors.brandSecondary,
    colors.brandAccent,
    colors.accent,
    colors.muted,
  ];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
      >
        <CartesianGrid {...chartGridConfig} horizontal={true} vertical={false} />
        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.mutedForeground, fontSize: 12 }}
          tickFormatter={(value) => showPercentage ? `${value}%` : value.toLocaleString()}
        />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.foreground, fontSize: 12 }}
          width={75}
        />
        <Tooltip
          contentStyle={chartTooltipStyles.contentStyle}
          formatter={(value: number, name: string) => [
            showPercentage 
              ? `${value.toFixed(1)}%` 
              : value.toLocaleString(),
            'Value'
          ]}
        />
        <Bar 
          dataKey={showPercentage ? 'percentage' : 'value'} 
          barSize={barSize}
          radius={[0, 4, 4, 0]}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || palette[index % palette.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

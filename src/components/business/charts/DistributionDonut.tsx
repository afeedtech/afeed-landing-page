import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useChartColors, chartTooltipStyles } from '@/lib/chartTheme';
import { DistributionItem } from '@/types/analytics';

interface DistributionDonutProps {
  data: DistributionItem[];
  height?: number;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}

export function DistributionDonut({
  data,
  height = 200,
  showLegend = true,
  innerRadius = 50,
  outerRadius = 80,
}: DistributionDonutProps) {
  const colors = useChartColors();
  
  // Color palette for multiple segments
  const palette = [
    colors.brandPrimary,
    colors.brandSecondary,
    colors.brandAccent,
    colors.accent,
    colors.muted,
  ];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || palette[index % palette.length]}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={chartTooltipStyles.contentStyle}
          formatter={(value: number, name: string) => [
            `${value.toLocaleString()} (${data.find(d => d.name === name)?.percentage.toFixed(1)}%)`,
            name
          ]}
        />
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span style={{ color: colors.foreground, fontSize: 12 }}>{value}</span>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

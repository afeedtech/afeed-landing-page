import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useChartColors, chartGridConfig, chartTooltipStyles } from '@/lib/chartTheme';
import { TimeSeriesPoint } from '@/types/analytics';
import { useLanguage } from '@/context/LanguageContext';

interface RevenueAreaChartProps {
  data: TimeSeriesPoint[];
  height?: number;
}

export function RevenueAreaChart({ data, height = 300 }: RevenueAreaChartProps) {
  const colors = useChartColors();
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  const gradientId = 'revenueGradient';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.brandPrimary} stopOpacity={0.3} />
            <stop offset="100%" stopColor={colors.brandPrimary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...chartGridConfig} />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.mutedForeground, fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: colors.mutedForeground, fontSize: 12 }}
          tickFormatter={(value) => `${value}`}
          dx={-10}
        />
        <Tooltip
          contentStyle={chartTooltipStyles.contentStyle}
          labelStyle={chartTooltipStyles.labelStyle}
          formatter={(value: number) => [`${value.toLocaleString()} ${currencyLabel}`, 'Revenue']}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={colors.brandPrimary}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

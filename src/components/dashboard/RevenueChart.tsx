import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLanguage } from "@/context/LanguageContext";

const data = [
  { month: "Jan", revenue: 1280 },
  { month: "Feb", revenue: 1770 },
  { month: "Mar", revenue: 1500 },
  { month: "Apr", revenue: 2200 },
  { month: "May", revenue: 2080 },
  { month: "Jun", revenue: 2570 },
  { month: "Jul", revenue: 2810 },
  { month: "Aug", revenue: 2690 },
  { month: "Sep", revenue: 3210 },
  { month: "Oct", revenue: 3420 },
  { month: "Nov", revenue: 2990 },
  { month: "Dec", revenue: 3820 },
];

export function RevenueChart() {
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>
        <p className="text-sm text-muted-foreground">Monthly earnings for 2024</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A70F0" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#1A70F0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k ${currencyLabel}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-elevated">
                      <p className="text-sm font-medium">
                        {payload[0].value?.toLocaleString()} {currencyLabel}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1A70F0"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

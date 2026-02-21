import { useMemo } from 'react';
import { OverviewData, TimeRange, UseDataResult } from '@/types/analytics';

// Mock data - structured to match expected API shape for Hisham Abdoh - Fintech Expert
// All-time totals: 52,850+ KWD revenue, 1,635 products sold, 1,180 paying customers
const generateMockOverviewData = (timeRange: TimeRange): OverviewData => {
  // Adjust values based on time range for realistic data
  // All-time base: 52,850 KWD revenue over ~2 years
  const multiplier = {
    last_24_hours: 0.003,    // ~158 KWD
    last_7_days: 0.02,       // ~1,057 KWD
    last_30_days: 0.08,      // ~4,228 KWD
    this_month: 0.07,        // ~3,700 KWD
    last_3_months: 0.22,     // ~11,627 KWD
    last_6_months: 0.45,     // ~23,783 KWD
    all_time: 1,             // 52,850 KWD
  }[timeRange];

  const baseRevenue = 52850;
  const revenue = Math.round(baseRevenue * multiplier);
  const previousRevenue = Math.round(revenue * 0.88);
  const revenueChange = ((revenue - previousRevenue) / previousRevenue) * 100;

  const baseCustomers = 1180;
  const customers = Math.round(baseCustomers * multiplier);
  const previousCustomers = Math.round(customers * 0.92);
  const customersChange = ((customers - previousCustomers) / previousCustomers) * 100;

  // Generate revenue trend data points
  const trendPoints = timeRange === 'last_24_hours' ? 24 : 
                      timeRange === 'last_7_days' ? 7 :
                      timeRange === 'last_30_days' ? 30 :
                      timeRange === 'this_month' ? 30 :
                      timeRange === 'last_3_months' ? 12 :
                      timeRange === 'last_6_months' ? 24 : 24;

  const revenueTrend = Array.from({ length: trendPoints }, (_, i) => {
    const date = new Date();
    if (timeRange === 'last_24_hours') {
      date.setHours(date.getHours() - (trendPoints - i));
    } else if (timeRange === 'last_7_days' || timeRange === 'last_30_days' || timeRange === 'this_month') {
      date.setDate(date.getDate() - (trendPoints - i));
    } else {
      date.setDate(date.getDate() - (trendPoints - i) * 30);
    }
    
    const baseValue = revenue / trendPoints;
    const variance = baseValue * 0.35;
    const value = Math.round(baseValue + (Math.random() - 0.5) * variance * 2);
    
    return {
      date: date.toISOString(),
      value: Math.max(0, value),
      label: timeRange === 'last_24_hours' 
        ? date.toLocaleTimeString('en-US', { hour: 'numeric' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  return {
    totalRevenue: {
      value: revenue,
      formattedValue: `${revenue.toLocaleString()} KWD`,
      previousValue: previousRevenue,
      changePercent: parseFloat(revenueChange.toFixed(1)),
      trend: revenueChange >= 0 ? 'up' : 'down',
    },
    payingCustomers: {
      value: customers,
      formattedValue: customers.toLocaleString(),
      previousValue: previousCustomers,
      changePercent: parseFloat(customersChange.toFixed(1)),
      trend: customersChange >= 0 ? 'up' : 'down',
    },
    conversionRate: {
      value: 5.8,
      formattedValue: '5.8%',
      previousValue: 5.2,
      changePercent: 11.5,
      trend: 'up',
    },
    averagePurchaseValue: {
      value: 45,
      formattedValue: '45 KWD',
      previousValue: 42,
      changePercent: 7.1,
      trend: 'up',
    },
    revenueTrend,
    highlights: {
      topProduct: {
        id: 'prod-005',
        name: 'Fintech Leadership Accelerator',
        revenue: Math.round(revenue * 0.35),
        type: 'program',
      },
      topTrafficSource: {
        name: 'LinkedIn',
        percentage: 48,
        visitors: Math.round(customers * 3.2),
      },
      bestProductType: {
        type: 'program',
        revenue: Math.round(revenue * 0.62),
        percentage: 62,
      },
    },
  };
};

export function useOverviewData(timeRange: TimeRange): UseDataResult<OverviewData> {
  // In the future, this will be replaced with React Query + API call
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['overview', timeRange],
  //   queryFn: () => fetchOverviewData(timeRange),
  // });

  const data = useMemo(() => generateMockOverviewData(timeRange), [timeRange]);

  return {
    data,
    isLoading: false,
    error: null,
  };
}

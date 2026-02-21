import { useMemo } from 'react';
import { AudienceData, TimeRange, UseDataResult } from '@/types/analytics';

// Audience data for Hisham Abdoh - MENA Fintech Expert
// Target: Banking Professionals, Fintech Entrepreneurs, Corporate Decision Makers, Regulators
const generateMockAudienceData = (timeRange: TimeRange): AudienceData => {
  return {
    newVsReturning: {
      new: 1420,
      returning: 2890,
      newPercentage: 32.9, // Professional audience has higher returning rate
    },
    avgTimeSpent: {
      seconds: 486,
      formatted: '8m 6s', // Longer engagement for B2B professional content
      trend: 'up',
      changePercent: 12.4,
    },
    ageDistribution: [
      { name: '18-24', value: 215, percentage: 5.0 },    // Fewer young viewers (professional content)
      { name: '25-34', value: 1205, percentage: 28.0 },  // Early career professionals
      { name: '35-44', value: 1810, percentage: 42.0 },  // Core professional audience
      { name: '45-54', value: 945, percentage: 22.0 },   // Senior professionals
      { name: '55+', value: 135, percentage: 3.0 },      // Executives
    ],
    genderDistribution: [
      { name: 'Male', value: 2795, percentage: 64.8 },    // Fintech industry skews male
      { name: 'Female', value: 1420, percentage: 32.9 },
      { name: 'Other', value: 95, percentage: 2.2 },
    ],
    deviceTypes: [
      { name: 'Desktop', value: 2280, percentage: 52.9 }, // Professional users on desktop
      { name: 'Mobile', value: 1780, percentage: 41.3 },
      { name: 'Tablet', value: 250, percentage: 5.8 },
    ],
    geographicDistribution: [
      { name: 'Saudi Arabia', value: 1510, percentage: 35.0 },
      { name: 'UAE', value: 1205, percentage: 28.0 },
      { name: 'Kuwait', value: 775, percentage: 18.0 },
      { name: 'Bahrain', value: 515, percentage: 12.0 },
      { name: 'Qatar', value: 305, percentage: 7.0 },
    ],
    audienceSegments: [
      { name: 'Banking Professionals', value: 1640, percentage: 38.0 },
      { name: 'Fintech Entrepreneurs', value: 1205, percentage: 28.0 },
      { name: 'Corporate Decision Makers', value: 1035, percentage: 24.0 },
      { name: 'Regulators', value: 430, percentage: 10.0 },
    ],
  };
};

export function useAudienceData(timeRange: TimeRange): UseDataResult<AudienceData> {
  const data = useMemo(() => generateMockAudienceData(timeRange), [timeRange]);

  return {
    data,
    isLoading: false,
    error: null,
  };
}

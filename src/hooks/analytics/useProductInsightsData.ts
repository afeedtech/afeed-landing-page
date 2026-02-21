import { useMemo } from 'react';
import { ProductInsightsData, TimeRange, UseDataResult } from '@/types/analytics';

const generateMockProductInsightsData = (
  productId: string,
  timeRange: TimeRange
): ProductInsightsData | null => {
  if (!productId) return null;

  // Fintech products matching sampleProducts
  const productInfo: Record<string, { name: string; type: 'course' | 'session' | 'program' | 'membership' }> = {
    'prod-001': { name: 'Digital Payments & Open Banking Masterclass', type: 'course' },
    'prod-002': { name: 'Fintech Partnerships & BaaS Essentials', type: 'course' },
    'prod-003': { name: '1:1 Fintech Strategy Consultation', type: 'session' },
    'prod-004': { name: 'RegTech Compliance Workshop', type: 'session' },
    'prod-005': { name: 'Fintech Leadership Accelerator', type: 'program' },
    'prod-006': { name: 'Fintech Insider Community', type: 'membership' },
  };

  const product = productInfo[productId];
  if (!product) return null;

  // Adjust content performance based on product type
  const getContentPerformance = () => {
    if (product.type === 'course') {
      return [
        { id: 'lesson-1', name: 'Module 1: Industry Overview', type: 'video' as const, views: 420, completionRate: 94, avgWatchTime: '16m 30s', dropOffRate: 6 },
        { id: 'lesson-2', name: 'Module 2: Technical Foundations', type: 'video' as const, views: 395, completionRate: 88, avgWatchTime: '24m 15s', dropOffRate: 12 },
        { id: 'lesson-3', name: 'Module 3: Regulatory Framework', type: 'video' as const, views: 368, completionRate: 82, avgWatchTime: '28m 45s', dropOffRate: 18 },
        { id: 'lesson-4', name: 'Module 4: Implementation Strategy', type: 'video' as const, views: 342, completionRate: 78, avgWatchTime: '22m 10s', dropOffRate: 22 },
        { id: 'lesson-5', name: 'Case Studies & Examples', type: 'video' as const, views: 318, completionRate: 85, avgWatchTime: '20m 30s', dropOffRate: 15 },
        { id: 'lesson-6', name: 'Templates & Resources', type: 'resource' as const, views: 295, completionRate: 72, dropOffRate: 28 },
      ];
    } else if (product.type === 'program') {
      return [
        { id: 'phase-1', name: 'Week 1-2: Fintech Landscape', type: 'video' as const, views: 95, completionRate: 96, avgWatchTime: '4h 15m', dropOffRate: 4 },
        { id: 'phase-2', name: 'Week 3-4: Technology Deep-Dive', type: 'video' as const, views: 91, completionRate: 92, avgWatchTime: '5h 30m', dropOffRate: 8 },
        { id: 'phase-3', name: 'Week 5-6: Strategy & Execution', type: 'video' as const, views: 88, completionRate: 89, avgWatchTime: '4h 45m', dropOffRate: 11 },
        { id: 'phase-4', name: 'Week 7-8: Capstone Project', type: 'resource' as const, views: 84, completionRate: 88, dropOffRate: 12 },
      ];
    }
    return [
      { id: 'content-1', name: 'Session Recording', type: 'video' as const, views: 180, completionRate: 92, avgWatchTime: '52m', dropOffRate: 8 },
      { id: 'content-2', name: 'Follow-up Resources', type: 'resource' as const, views: 145, completionRate: 68, dropOffRate: 32 },
    ];
  };

  return {
    product: {
      id: productId,
      name: product.name,
      type: product.type,
    },
    conversionFunnel: [
      { name: 'Page Views', value: 8450, percentage: 100 },
      { name: 'Product View', value: 3820, percentage: 45.2, dropOffRate: 54.8 },
      { name: 'Add to Cart', value: 680, percentage: 8.0, dropOffRate: 82.2 },
      { name: 'Purchase', value: 420, percentage: 5.0, dropOffRate: 38.2 },
    ],
    contentPerformance: getContentPerformance(),
    dropOffPoints: [
      { point: 'After Module 3', dropOffRate: 15.2 },
      { point: 'Before Implementation', dropOffRate: 10.8 },
      { point: 'During Case Studies', dropOffRate: 6.5 },
      { point: 'After Resources', dropOffRate: 4.2 },
    ],
    promoVideoPerformance: {
      views: 5680,
      avgWatchTime: '2m 15s',
      completionRate: 58.5,
    },
    engagementMetrics: {
      avgTimeSpent: '3h 45m',
      repeatViews: 285,
      shares: 68,
    },
    trafficSources: [
      { name: 'LinkedIn', value: 2710, percentage: 48.0 },
      { name: 'Direct', value: 1520, percentage: 26.8 },
      { name: 'Email', value: 850, percentage: 15.0 },
      { name: 'Twitter/X', value: 420, percentage: 7.4 },
      { name: 'Referral', value: 180, percentage: 3.2 },
    ],
  };
};

export function useProductInsightsData(
  productId: string | null,
  timeRange: TimeRange
): UseDataResult<ProductInsightsData> {
  const data = useMemo(
    () => (productId ? generateMockProductInsightsData(productId, timeRange) : null),
    [productId, timeRange]
  );

  return {
    data,
    isLoading: false,
    error: null,
  };
}

import { useMemo } from 'react';
import { ProductsData, ProductType, TimeRange, UseDataResult } from '@/types/analytics';

const generateMockProductsData = (
  timeRange: TimeRange, 
  productTypeFilter?: ProductType
): ProductsData => {
  // Fintech products matching sampleProducts data
  const allProducts = [
    {
      id: 'prod-001',
      name: 'Digital Payments & Open Banking Masterclass',
      type: 'course' as ProductType,
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      revenue: 31500,
      unitsSold: 420,
      conversionRate: 6.2,
      engagement: 82,
      engagementLabel: '82% completion',
    },
    {
      id: 'prod-002',
      name: 'Fintech Partnerships & BaaS Essentials',
      type: 'course' as ProductType,
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      revenue: 12825,
      unitsSold: 285,
      conversionRate: 5.4,
      engagement: 78,
      engagementLabel: '78% completion',
    },
    {
      id: 'prod-003',
      name: '1:1 Fintech Strategy Consultation',
      type: 'session' as ProductType,
      imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop',
      revenue: 11700,
      unitsSold: 180,
      conversionRate: 12.8,
      engagement: 96,
      engagementLabel: '96% satisfaction',
    },
    {
      id: 'prod-004',
      name: 'RegTech Compliance Workshop',
      type: 'session' as ProductType,
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
      revenue: 5075,
      unitsSold: 145,
      conversionRate: 7.2,
      engagement: 91,
      engagementLabel: '91% attendance',
    },
    {
      id: 'prod-005',
      name: 'Fintech Leadership Accelerator',
      type: 'program' as ProductType,
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      revenue: 33250,
      unitsSold: 95,
      conversionRate: 4.8,
      engagement: 88,
      engagementLabel: '88% certification',
    },
    {
      id: 'prod-006',
      name: 'Fintech Insider Community',
      type: 'membership' as ProductType,
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
      revenue: 6400,
      unitsSold: 320,
      conversionRate: 8.5,
      engagement: 85,
      engagementLabel: '85% active',
    },
  ];

  const products = productTypeFilter
    ? allProducts.filter((p) => p.type === productTypeFilter)
    : allProducts;

  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalUnitsSold = products.reduce((sum, p) => sum + p.unitsSold, 0);
  const avgConversionRate = products.reduce((sum, p) => sum + p.conversionRate, 0) / products.length;

  const revenueByProduct = products
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((p) => ({
      name: p.name,
      value: p.revenue,
      percentage: (p.revenue / totalRevenue) * 100,
    }));

  const revenueByTypeMap = products.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + p.revenue;
    return acc;
  }, {} as Record<ProductType, number>);

  const typeLabels: Record<ProductType, string> = {
    course: 'Courses',
    session: 'Sessions',
    program: 'Programs',
    membership: 'Memberships',
  };

  const revenueByType = Object.entries(revenueByTypeMap).map(([type, value]) => ({
    name: typeLabels[type as ProductType],
    value,
    percentage: (value / totalRevenue) * 100,
  }));

  return {
    products,
    revenueByProduct,
    revenueByType,
    summary: {
      totalRevenue,
      totalUnitsSold,
      avgConversionRate: parseFloat(avgConversionRate.toFixed(1)),
    },
  };
};

export function useProductsData(
  timeRange: TimeRange,
  productTypeFilter?: ProductType
): UseDataResult<ProductsData> {
  const data = useMemo(
    () => generateMockProductsData(timeRange, productTypeFilter),
    [timeRange, productTypeFilter]
  );

  return {
    data,
    isLoading: false,
    error: null,
  };
}

// Core metric with change tracking
export interface MetricData {
  value: number;
  formattedValue: string;
  previousValue: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
}

// Time series data point
export interface TimeSeriesPoint {
  date: string; // ISO format
  value: number;
  label?: string;
}

// Product types
export type ProductType = 'course' | 'session' | 'program' | 'membership';

// Time range options
export type TimeRange = 
  | 'last_24_hours'
  | 'last_7_days'
  | 'last_30_days'
  | 'this_month'
  | 'last_3_months'
  | 'last_6_months'
  | 'all_time';

export interface TimeRangeOption {
  value: TimeRange;
  label: string;
}

// Overview tab data
export interface OverviewData {
  totalRevenue: MetricData;
  payingCustomers: MetricData;
  conversionRate: MetricData;
  averagePurchaseValue: MetricData;
  revenueTrend: TimeSeriesPoint[];
  highlights: {
    topProduct: { 
      id: string;
      name: string; 
      revenue: number; 
      type: ProductType;
    };
    topTrafficSource: { 
      name: string; 
      percentage: number;
      visitors: number;
    };
    bestProductType: { 
      type: ProductType; 
      revenue: number;
      percentage: number;
    };
  };
}

// Distribution data (for pie/donut charts)
export interface DistributionItem {
  name: string;
  value: number;
  percentage: number;
  color?: string;
}

// Audience tab data
export interface AudienceData {
  newVsReturning: {
    new: number;
    returning: number;
    newPercentage: number;
  };
  avgTimeSpent: {
    seconds: number;
    formatted: string;
    trend: 'up' | 'down' | 'neutral';
    changePercent: number;
  };
  ageDistribution: DistributionItem[];
  genderDistribution: DistributionItem[];
  deviceTypes: DistributionItem[];
  geographicDistribution: DistributionItem[];
  audienceSegments: DistributionItem[];
}

// Product performance data
export interface ProductPerformance {
  id: string;
  name: string;
  type: ProductType;
  imageUrl?: string;
  revenue: number;
  unitsSold: number;
  conversionRate: number;
  engagement: number; // completion rate or avg watch time percentage
  engagementLabel: string;
}

// Products tab data
export interface ProductsData {
  products: ProductPerformance[];
  revenueByProduct: DistributionItem[];
  revenueByType: DistributionItem[];
  summary: {
    totalRevenue: number;
    totalUnitsSold: number;
    avgConversionRate: number;
  };
}

// Funnel step data
export interface FunnelStep {
  name: string;
  value: number;
  percentage: number;
  dropOffRate?: number;
}

// Content/lesson performance
export interface ContentPerformance {
  id: string;
  name: string;
  type: 'lesson' | 'video' | 'quiz' | 'resource';
  views: number;
  completionRate: number;
  avgWatchTime?: string;
  dropOffRate: number;
}

// Product insights data
export interface ProductInsightsData {
  product: {
    id: string;
    name: string;
    type: ProductType;
  };
  conversionFunnel: FunnelStep[];
  contentPerformance: ContentPerformance[];
  dropOffPoints: {
    point: string;
    dropOffRate: number;
  }[];
  promoVideoPerformance: {
    views: number;
    avgWatchTime: string;
    completionRate: number;
  };
  engagementMetrics: {
    avgTimeSpent: string;
    repeatViews: number;
    shares: number;
  };
  trafficSources: DistributionItem[];
}

// Audience filter types
export interface AudienceFilters {
  // Engagement Filters
  productPageViewed?: boolean;
  contentStarted?: boolean;
  contentCompletion?: 'not_started' | '1-25' | '26-50' | '51-75' | '76-100';
  avgTimeSpent?: '<1min' | '1-5min' | '5-15min' | '15+min';
  lastActivity?: 'today' | 'last_7_days' | 'last_30_days' | 'inactive';
  
  // Interaction Filters
  ctaClicked?: boolean;
  checkoutStarted?: boolean;
  purchaseCompleted?: boolean;
  promoVideoWatched?: 'not_watched' | 'partial' | 'completed';
  liveSessionAttended?: boolean;
  replayWatched?: boolean;
  
  // Monetization Filters
  totalSpendTier?: 'free' | 'low' | 'medium' | 'high';
  avgTicketSize?: 'low' | 'medium' | 'high';
  purchaseCount?: '1' | '2-3' | '4+';
  membershipStatus?: 'active' | 'past' | 'never';
  
  // Product Interest Filters
  purchasedProductId?: string;
  viewedNotPurchasedProductId?: string;
  enrolledProgramId?: string;
  membershipActive?: boolean;
  interestedProductType?: ProductType;
  
  // User Background Filters
  deviceType?: 'mobile' | 'desktop' | 'tablet';
  country?: string;
  audienceSegment?: string;
  userType?: 'new' | 'returning';
}

export interface SegmentedUser {
  id: string;
  name: string;
  email?: string;
  totalSpend: number;
  engagementLevel: 'Low' | 'Medium' | 'High';
  lastActivity: string;
  productsInteracted: string[];
}

export interface AudienceSegmentationResult {
  totalMatching: number;
  percentageOfTotal: number;
  avgEngagement: number;
  avgSpend: number;
  conversionRate: number;
  users: SegmentedUser[];
}

export interface AudienceGlobalFiltersState {
  productId?: string;
  productType?: ProductType;
}

// Saved audience segment
export interface SavedSegment {
  id: string;
  name: string;
  description?: string;
  filters: AudienceFilters;
  globalFilters: AudienceGlobalFiltersState;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

// Hook return types
export interface UseDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

import { useMemo } from 'react';
import { 
  TimeRange, 
  AudienceFilters, 
  AudienceSegmentationResult, 
  SegmentedUser,
  AudienceGlobalFiltersState,
  UseDataResult 
} from '@/types/analytics';

// Mock user names for demo
const mockNames = [
  'Ahmed Hassan', 'Fatima Al-Rashid', 'Omar Khalil', 'Layla Mohammed',
  'Youssef Nasser', 'Sara Ibrahim', 'Karim Mahmoud', 'Nour Ahmed',
  'Rania Saleh', 'Hassan Ali', 'Mona Youssef', 'Ali Rahman',
  'Dina Farouk', 'Tarek Mansour', 'Heba Salem', 'Khaled Mostafa',
  'Amira Fathy', 'Mohamed Zaki', 'Yasmin Adel', 'Mahmoud Gamal',
];

const mockProducts = [
  'Digital Marketing Masterclass',
  'Content Creation Blueprint',
  'Social Media Strategy Guide',
  '1:1 Business Coaching',
  'Brand Building Program',
];

function generateMockUsers(count: number): SegmentedUser[] {
  const users: SegmentedUser[] = [];
  
  for (let i = 0; i < count; i++) {
    const engagementLevels: Array<'Low' | 'Medium' | 'High'> = ['Low', 'Medium', 'High'];
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    const productCount = Math.floor(Math.random() * 3) + 1;
    const shuffledProducts = [...mockProducts].sort(() => Math.random() - 0.5);
    
    users.push({
      id: `user_${i + 1}`,
      name: mockNames[i % mockNames.length],
      email: `${mockNames[i % mockNames.length].toLowerCase().replace(' ', '.')}@example.com`,
      totalSpend: Math.floor(Math.random() * 500) + 10,
      engagementLevel: engagementLevels[Math.floor(Math.random() * 3)],
      lastActivity: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      productsInteracted: shuffledProducts.slice(0, productCount),
    });
  }
  
  return users;
}

function countActiveFilters(filters: AudienceFilters): number {
  return Object.values(filters).filter(v => v !== undefined && v !== '').length;
}

export function useAudienceSegmentation(
  timeRange: TimeRange,
  globalFilters: AudienceGlobalFiltersState,
  filters: AudienceFilters
): UseDataResult<AudienceSegmentationResult> {
  const data = useMemo(() => {
    // Total audience size (mock)
    const totalAudience = 1247;
    
    // Calculate matching count based on filter complexity
    const activeFilterCount = countActiveFilters(filters);
    
    // More filters = fewer matches (simulate filtering)
    let matchingPercentage = 100;
    if (activeFilterCount > 0) {
      matchingPercentage = Math.max(5, 100 - (activeFilterCount * 15) + Math.floor(Math.random() * 10));
    }
    
    const totalMatching = Math.floor((totalAudience * matchingPercentage) / 100);
    
    // Generate mock users (limit to 20 for display)
    const displayCount = Math.min(totalMatching, 20);
    const users = generateMockUsers(displayCount);
    
    // Calculate aggregated metrics
    const avgEngagement = Math.floor(Math.random() * 30) + 50; // 50-80%
    const avgSpend = users.length > 0 
      ? Math.floor(users.reduce((sum, u) => sum + u.totalSpend, 0) / users.length)
      : 0;
    const conversionRate = Math.floor(Math.random() * 20) + 10; // 10-30%
    
    return {
      totalMatching,
      percentageOfTotal: Math.round((totalMatching / totalAudience) * 100),
      avgEngagement,
      avgSpend,
      conversionRate,
      users,
    };
  }, [timeRange, globalFilters, filters]);

  return {
    data,
    isLoading: false,
    error: null,
  };
}

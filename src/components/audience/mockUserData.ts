import { UserProfileData, UserTimelineEvent } from './UserProfileDrawer';

// Generate mock user profile data from basic user info
export function generateMockUserProfile(
  id: string,
  name: string,
  email?: string,
  totalSpend?: number,
  products?: string[]
): UserProfileData {
  const hasSpend = (totalSpend || 0) > 0;
  const hasMembership = products?.some(p => p.toLowerCase().includes('membership')) || false;
  
  const signupMethods: ('google' | 'apple' | 'email')[] = ['google', 'apple', 'email'];
  const countries = ['Kuwait', 'UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', undefined];
  const devices = ['iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Pro', 'Windows PC', 'iPad Pro', undefined];
  
  const randomSignupMethod = signupMethods[Math.floor(Math.random() * signupMethods.length)];
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  const randomDevice = devices[Math.floor(Math.random() * devices.length)];
  
  const purchaseCount = products?.length || 0;
  
  // Generate products from product names
  const productTypes: ('course' | 'session' | 'program' | 'membership')[] = ['course', 'session', 'program', 'membership'];
  const productStatuses: ('active' | 'completed' | 'expired')[] = ['active', 'completed', 'expired'];
  
  const userProducts = (products || []).map((productName, index) => {
    let type: 'course' | 'session' | 'program' | 'membership' = 'course';
    if (productName.toLowerCase().includes('session') || productName.toLowerCase().includes('coaching')) {
      type = 'session';
    } else if (productName.toLowerCase().includes('program')) {
      type = 'program';
    } else if (productName.toLowerCase().includes('membership')) {
      type = 'membership';
    }
    
    return {
      id: `prod-${id}-${index}`,
      name: productName,
      type,
      status: productStatuses[Math.floor(Math.random() * productStatuses.length)] as 'active' | 'completed' | 'expired',
      purchaseDate: `Dec ${10 + index}, 2024`,
    };
  });
  
  // Generate timeline events
  const timeline: UserTimelineEvent[] = [
    {
      id: `event-${id}-1`,
      date: 'Dec 5, 2024 at 10:23 AM',
      action: 'Account created',
      type: 'account',
    },
  ];
  
  if (products && products.length > 0) {
    products.forEach((product, index) => {
      timeline.push({
        id: `event-${id}-view-${index}`,
        date: `Dec ${8 + index}, 2024 at 2:15 PM`,
        action: 'Viewed product page',
        productName: product,
        type: 'view',
      });
      
      timeline.push({
        id: `event-${id}-purchase-${index}`,
        date: `Dec ${10 + index}, 2024 at 4:30 PM`,
        action: 'Purchased product',
        productName: product,
        type: 'purchase',
      });
    });
  }
  
  // Add some engagement events
  if (hasSpend) {
    timeline.push({
      id: `event-${id}-content`,
      date: 'Dec 22, 2024 at 11:00 AM',
      action: 'Started course content',
      productName: products?.[0],
      type: 'enrollment',
    });
  }
  
  return {
    id,
    name,
    email,
    phone: Math.random() > 0.5 ? `+965 ${Math.floor(Math.random() * 9000000 + 1000000)}` : undefined,
    country: randomCountry,
    signupMethod: randomSignupMethod,
    status: hasMembership ? 'active_member' : hasSpend ? 'paying_customer' : 'registered',
    firstSignupDate: 'Dec 5, 2024',
    lastActivityDate: 'Dec 24, 2024',
    lastDevice: randomDevice,
    
    lifetimeSpend: totalSpend || 0,
    purchaseCount,
    productsCount: purchaseCount,
    firstPurchaseDate: hasSpend ? 'Dec 10, 2024' : undefined,
    lastPurchaseDate: hasSpend ? 'Dec 20, 2024' : undefined,
    membershipStatus: hasMembership ? 'active' : hasSpend ? 'past' : 'never',
    
    products: userProducts,
    timeline: timeline.reverse(), // Most recent first
    
    avgCourseCompletion: hasSpend ? Math.floor(Math.random() * 60 + 40) : undefined,
    liveSessionsAttended: hasSpend ? Math.floor(Math.random() * 5) : undefined,
    lastContentInteraction: hasSpend ? 'Dec 24, 2024' : undefined,
  };
}

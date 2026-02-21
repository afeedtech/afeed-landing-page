export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_trial';
  value: number;
  totalUses: number;
  maxUses: number;
  perCustomerLimit: number;
  startDate: Date;
  endDate: Date;
  productIds: string[] | 'all';
  status: 'active' | 'expired' | 'deactivated';
  usages: DiscountUsage[];
  totalRevenue: number;
  createdAt: Date;
}

export interface DiscountUsage {
  userId: string;
  userName: string;
  usedAt: Date;
  orderAmount: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  annualPrice: number;
  currency: string;
  reachLimit: number;
  memberships: boolean;
  features: string[];
  isPopular?: boolean;
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, Users, Package, Lightbulb } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OverviewTab } from '@/components/business/tabs/OverviewTab';
import { AudienceTab } from '@/components/business/tabs/AudienceTab';
import { ProductsTab } from '@/components/business/tabs/ProductsTab';
import { ProductInsightsTab } from '@/components/business/tabs/ProductInsightsTab';
import { TimeRange } from '@/types/analytics';
import { cn } from '@/lib/utils';

type BusinessTab = 'overview' | 'audience' | 'products' | 'insights';

const businessTabKeys = [
  { id: 'overview' as BusinessTab, key: 'overview', icon: BarChart3 },
  { id: 'audience' as BusinessTab, key: 'audience', icon: Users },
  { id: 'products' as BusinessTab, key: 'products', icon: Package },
  { id: 'insights' as BusinessTab, key: 'insights', icon: Lightbulb },
];

export default function MyBusiness() {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<TimeRange>('last_7_days');
  const [activeTab, setActiveTab] = useState<BusinessTab>('overview');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const businessTabs = businessTabKeys.map(tab => ({
    ...tab,
    label: t(`myBusiness.tabs.${tab.key}`),
  }));

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setActiveTab('insights');
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('myBusiness.title')}</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {t('myBusiness.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "25ms" }}>
          <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {businessTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4 sm:mt-6">
          {activeTab === 'overview' && (
            <OverviewTab 
              timeRange={timeRange} 
              onTimeRangeChange={setTimeRange} 
            />
          )}

          {activeTab === 'audience' && (
            <AudienceTab 
              timeRange={timeRange} 
              onTimeRangeChange={setTimeRange}
            />
          )}

          {activeTab === 'products' && (
            <ProductsTab 
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              onProductSelect={handleProductSelect}
            />
          )}

          {activeTab === 'insights' && (
            <ProductInsightsTab 
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
              selectedProductId={selectedProductId}
              onProductSelect={setSelectedProductId}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

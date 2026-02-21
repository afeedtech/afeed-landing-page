import { useState } from 'react';
import { Clock, UserPlus, Users, Smartphone, Globe, Target, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VerticalBarChart, StackedProgressBar } from '@/components/business';
import { useAudienceData, useAudienceSegmentation } from '@/hooks/analytics';
import { TimeRange, AudienceFilters, AudienceGlobalFiltersState, SavedSegment } from '@/types/analytics';
import { cn } from '@/lib/utils';
import { useSegments } from '@/context/SegmentsContext';
import {
  AudienceGlobalFilters,
  AdvancedFilters,
  ActiveFiltersSummary,
  SegmentationResultsSummary,
  MatchingUsersList,
  SaveSegmentModal,
  SavedSegmentsList,
  RenameSegmentModal,
  DeleteSegmentDialog,
} from '@/components/business/audience';

interface AudienceTabProps {
  timeRange: TimeRange;
  onTimeRangeChange?: (range: TimeRange) => void;
}

interface AudienceSectionProps {
  title: string;
  icon: React.ReactNode;
  keyMetric: string;
  keyMetricLabel: string;
  helperText: string;
  children: React.ReactNode;
  delay?: number;
}

function AudienceSection({ 
  title, 
  icon, 
  keyMetric, 
  keyMetricLabel, 
  helperText, 
  children,
  delay = 0,
}: AudienceSectionProps) {
  return (
    <Card 
      className="rounded-xl border border-border bg-card shadow-card animate-slide-up flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="text-brand-primary">{icon}</div>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div>
          {children}
        </div>
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{keyMetric}</span>
            <span className="text-sm text-muted-foreground">{keyMetricLabel}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{helperText}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const emptyFilters: AudienceFilters = {};

export function AudienceTab({ timeRange, onTimeRangeChange }: AudienceTabProps) {
  const { savedSegments, addSegment, updateSegment, removeSegment } = useSegments();
  
  const [globalFilters, setGlobalFilters] = useState<AudienceGlobalFiltersState>({});
  const [advancedFilters, setAdvancedFilters] = useState<AudienceFilters>(emptyFilters);
  
  // Modal states
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<SavedSegment | null>(null);
  
  const { data, isLoading } = useAudienceData(timeRange);
  const { data: segmentationData } = useAudienceSegmentation(timeRange, globalFilters, advancedFilters);

  // Check if save button should be shown
  const hasActiveFilters = Object.keys(advancedFilters).length > 0;
  const canSaveSegment = hasActiveFilters && segmentationData && segmentationData.totalMatching > 0;

  const handleRemoveFilter = (key: keyof AudienceFilters) => {
    const newFilters = { ...advancedFilters };
    delete newFilters[key];
    setAdvancedFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setAdvancedFilters(emptyFilters);
  };

  // Segment handlers
  const handleSaveSegment = (name: string, description?: string) => {
    const newSegment: SavedSegment = {
      id: crypto.randomUUID(),
      name,
      description,
      filters: { ...advancedFilters },
      globalFilters: { ...globalFilters },
      userCount: segmentationData?.totalMatching || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addSegment(newSegment);
  };

  const handleRenameSegment = (id: string, name: string, description?: string) => {
    updateSegment(id, { name, description });
  };

  const handleDeleteSegment = (id: string) => {
    removeSegment(id);
  };

  const handleLoadSegment = (segment: SavedSegment) => {
    setGlobalFilters(segment.globalFilters);
    setAdvancedFilters(segment.filters);
  };

  if (isLoading || !data) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Understand who your audience is and how they interact with your content
      </p>

      {/* Global Filters */}
      {onTimeRangeChange && (
        <AudienceGlobalFilters
          timeRange={timeRange}
          onTimeRangeChange={onTimeRangeChange}
          globalFilters={globalFilters}
          onGlobalFiltersChange={setGlobalFilters}
        />
      )}

      {/* Existing Audience Analytics Cards - PRESERVED */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* New vs Returning - Stacked Progress Bar */}
        <AudienceSection
          title="New vs Returning"
          icon={<UserPlus className="h-5 w-5" />}
          keyMetric={`${data.newVsReturning.newPercentage.toFixed(1)}%`}
          keyMetricLabel="new visitors"
          helperText="First-time vs repeat visitors to your page"
          delay={0}
        >
          <div className="py-6">
            <StackedProgressBar
              data={[
                { name: 'New', value: data.newVsReturning.new, percentage: data.newVsReturning.newPercentage },
                { name: 'Returning', value: data.newVsReturning.returning, percentage: 100 - data.newVsReturning.newPercentage },
              ]}
              height={40}
              showLabels={true}
            />
          </div>
        </AudienceSection>

        {/* Avg Time Spent - Keep as metric display */}
        <AudienceSection
          title="Time on Page"
          icon={<Clock className="h-5 w-5" />}
          keyMetric={data.avgTimeSpent.formatted}
          keyMetricLabel="average session"
          helperText="Average time spent per visit"
          delay={50}
        >
          <div className="flex items-center justify-center h-[150px]">
            <div className="text-center">
              <p className="text-5xl font-bold text-brand-primary">{data.avgTimeSpent.formatted}</p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className={cn(
                  'font-medium',
                  data.avgTimeSpent.trend === 'up' ? 'text-brand-accent' : 'text-destructive'
                )}>
                  {data.avgTimeSpent.trend === 'up' ? '+' : ''}{data.avgTimeSpent.changePercent}%
                </span>
                {' '}vs previous period
              </p>
            </div>
          </div>
        </AudienceSection>

        {/* Device Types - Vertical Bar Chart */}
        <AudienceSection
          title="Device Types"
          icon={<Smartphone className="h-5 w-5" />}
          keyMetric={data.deviceTypes[0].name}
          keyMetricLabel={`${data.deviceTypes[0].percentage.toFixed(1)}% of traffic`}
          helperText="How visitors access your content"
          delay={100}
        >
          <VerticalBarChart
            data={data.deviceTypes}
            height={240}
            showPercentage={true}
          />
        </AudienceSection>

        {/* Age Distribution - Vertical Bar Chart */}
        <AudienceSection
          title="Age Distribution"
          icon={<Users className="h-5 w-5" />}
          keyMetric={data.ageDistribution[1].name}
          keyMetricLabel="largest age group"
          helperText="Age demographics of your audience"
          delay={150}
        >
          <VerticalBarChart
            data={data.ageDistribution}
            height={260}
            showPercentage={true}
          />
        </AudienceSection>

        {/* Geographic Distribution - Vertical Bar Chart */}
        <AudienceSection
          title="Top Locations"
          icon={<Globe className="h-5 w-5" />}
          keyMetric={data.geographicDistribution[0].name}
          keyMetricLabel={`${data.geographicDistribution[0].percentage.toFixed(1)}%`}
          helperText="Where your audience is located"
          delay={200}
        >
          <VerticalBarChart
            data={data.geographicDistribution}
            height={260}
            showPercentage={true}
          />
        </AudienceSection>

        {/* Audience Segments - Keep Donut (good for parts of whole) */}
        <AudienceSection
          title="Audience Segments"
          icon={<Target className="h-5 w-5" />}
          keyMetric={data.audienceSegments.length.toString()}
          keyMetricLabel="segments identified"
          helperText="Behavioral groupings of your audience"
          delay={250}
        >
          <VerticalBarChart
            data={data.audienceSegments}
            height={260}
            showPercentage={true}
          />
        </AudienceSection>
      </div>

      {/* Audience Segmentation Section - NEW */}
      <div className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10">
            <Filter className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Audience Segmentation</h2>
            <p className="text-sm text-muted-foreground">
              Filter and explore specific groups of users based on behavior, engagement, and value.
            </p>
          </div>
        </div>

        {/* Saved Segments List */}
        <SavedSegmentsList
          segments={savedSegments}
          onLoadSegment={handleLoadSegment}
          onRenameSegment={(segment) => {
            setSelectedSegment(segment);
            setRenameModalOpen(true);
          }}
          onDeleteSegment={(segment) => {
            setSelectedSegment(segment);
            setDeleteDialogOpen(true);
          }}
        />

        {/* Advanced Filters */}
        <Card className="rounded-xl border border-border bg-card shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Advanced Filters</CardTitle>
            <p className="text-xs text-muted-foreground">
              Use filters to discover high-value users, re-engage inactive audiences, or understand buying behavior.
            </p>
          </CardHeader>
          <CardContent>
            <AdvancedFilters
              filters={advancedFilters}
              onFiltersChange={setAdvancedFilters}
            />
          </CardContent>
        </Card>

        {/* Active Filters Summary */}
        <ActiveFiltersSummary
          filters={advancedFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Results */}
        {segmentationData && (
          <>
            <SegmentationResultsSummary data={segmentationData} />
            <MatchingUsersList 
              users={segmentationData.users} 
              totalMatching={segmentationData.totalMatching}
              onSaveSegment={canSaveSegment ? () => setSaveModalOpen(true) : undefined}
            />
          </>
        )}
      </div>

      {/* Modals */}
      <SaveSegmentModal
        open={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSaveSegment}
        userCount={segmentationData?.totalMatching || 0}
      />

      <RenameSegmentModal
        open={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        segment={selectedSegment}
        onSave={handleRenameSegment}
      />

      <DeleteSegmentDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        segment={selectedSegment}
        onConfirm={handleDeleteSegment}
      />
    </div>
  );
}

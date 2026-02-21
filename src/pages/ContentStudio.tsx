import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Library, PenTool, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ScriptLibrary, 
  GuidedBuilder, 
  ScriptEditor, 
  SchedulingPanel,
  ScheduledPostsList,
  ScriptTemplate,
  GeneratedScript,
  GoalType,
  FormatType,
  Platform
} from "@/components/content-studio";
import { useToast } from "@/hooks/use-toast";

const contentStudioTabKeys = [
  { id: 'library', key: 'library', icon: Library },
  { id: 'create', key: 'create', icon: PenTool },
  { id: 'scheduled', key: 'scheduled', icon: Calendar },
] as const;

type ViewState = 
  | { type: 'library' }
  | { type: 'builder'; template?: ScriptTemplate }
  | { type: 'editor'; script: GeneratedScript; meta: { goal: GoalType; format: FormatType } }
  | { type: 'scheduling'; script: GeneratedScript; hookPreview: string };

const ContentStudio = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("library");
  const [viewState, setViewState] = useState<ViewState>({ type: 'library' });

  const contentStudioTabs = contentStudioTabKeys.map(tab => ({
    ...tab,
    label: t(`contentStudio.tabs.${tab.key}`),
  }));

  const handleUseTemplate = (template: ScriptTemplate) => {
    setActiveTab("create");
    setViewState({ type: 'builder', template });
  };

  const handleBuilderComplete = (script: GeneratedScript, meta: { goal: GoalType; format: FormatType }) => {
    setViewState({ type: 'editor', script, meta });
  };

  const handleBuilderCancel = () => {
    setActiveTab("library");
    setViewState({ type: 'library' });
  };

  const handleScheduleClick = () => {
    if (viewState.type === 'editor') {
      setViewState({ 
        type: 'scheduling', 
        script: viewState.script,
        hookPreview: viewState.script.hook
      });
    }
  };

  const handleScheduleConfirm = (platform: Platform, date: Date, time: string) => {
    toast({
      title: "Post Scheduled!",
      description: `Your content will be posted to ${platform} on ${date.toLocaleDateString()} at ${time}.`,
    });
    // Reset to library after scheduling
    setActiveTab("scheduled");
    setViewState({ type: 'library' });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your script has been saved as a draft.",
    });
    setActiveTab("scheduled");
    setViewState({ type: 'library' });
  };

  const handleBackToBuilder = () => {
    setViewState({ type: 'builder' });
  };

  const handleCloseScheduling = () => {
    if (viewState.type === 'scheduling') {
      setViewState({ 
        type: 'editor', 
        script: viewState.script, 
        meta: { goal: 'grow', format: 'hook-first' } 
      });
    }
  };

  const handleCreateNew = () => {
    setActiveTab("create");
    setViewState({ type: 'builder' });
  };

  // Reset view state when switching tabs via tab click
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'library') {
      setViewState({ type: 'library' });
    } else if (value === 'create') {
      setViewState({ type: 'builder' });
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold">{t('contentStudio.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('contentStudio.subtitle')}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {contentStudioTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
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

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'library' && (
              <ScriptLibrary onUseTemplate={handleUseTemplate} />
            )}
            
            {activeTab === 'create' && (
              <>
                {viewState.type === 'builder' && (
                  <GuidedBuilder
                    onComplete={handleBuilderComplete}
                    onCancel={handleBuilderCancel}
                    initialGoal={viewState.template?.goal}
                    initialFormat={viewState.template?.format}
                  />
                )}
                {viewState.type === 'editor' && (
                  <ScriptEditor
                    script={viewState.script}
                    meta={viewState.meta}
                    onSchedule={handleScheduleClick}
                    onSaveDraft={handleSaveDraft}
                    onBack={handleBackToBuilder}
                  />
                )}
                {viewState.type === 'scheduling' && (
                  <SchedulingPanel
                    hookPreview={viewState.hookPreview}
                    onSchedule={handleScheduleConfirm}
                    onSaveDraft={handleSaveDraft}
                    onClose={handleCloseScheduling}
                  />
                )}
              </>
            )}
            
            {activeTab === 'scheduled' && (
              <ScheduledPostsList onCreateNew={handleCreateNew} />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContentStudio;

import { BookOpen, Video, Crown, Users, Check, Star, HelpCircle, ListOrdered, Clock, Calendar, RefreshCw, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { WizardFormData, WizardStep } from "../types";
import type { ProductType } from "@/components/profile/types";

interface StepReviewProps {
  formData: WizardFormData;
  onEditStep: (step: WizardStep) => void;
}

const typeConfig: Record<ProductType, { label: string; icon: typeof BookOpen; color: string }> = {
  course: { label: "Course", icon: BookOpen, color: "text-blue-600" },
  session: { label: "Session", icon: Video, color: "text-green-600" },
  program: { label: "Program", icon: Crown, color: "text-purple-600" },
  membership: { label: "Membership", icon: Users, color: "text-amber-600" },
};

export function StepReview({ formData, onEditStep }: StepReviewProps) {
  const config = typeConfig[formData.type];
  const TypeIcon = config.icon;

  const filteredOutcomes = formData.outcomes.filter(o => o.trim());
  const filteredFaq = formData.faqItems.filter(f => f.question.trim() && f.answer.trim());

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Review Your Product</h3>
        <p className="text-sm text-muted-foreground">
          Make sure everything looks good before publishing
        </p>
      </div>

      {/* Basics Section */}
      <ReviewSection
        title="Basics"
        step="basics"
        onEdit={() => onEditStep("basics")}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TypeIcon className={cn("h-5 w-5", config.color)} />
            <span className="text-sm font-medium">{config.label}</span>
            {formData.featured && (
              <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <h4 className="text-xl font-bold">{formData.title || "(No title)"}</h4>
          {formData.headline && (
            <p className="text-muted-foreground">{formData.headline}</p>
          )}
        </div>
      </ReviewSection>

      {/* Sales Content Section */}
      <ReviewSection
        title="Sales Content"
        step="sales"
        onEdit={() => onEditStep("sales")}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm">{formData.description || "(No description)"}</p>
          </div>

          {filteredOutcomes.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">OUTCOMES</p>
              <ul className="space-y-1">
                {filteredOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{formData.price} KWD</span>
            {formData.billingCycle && (
              <span className="text-sm text-muted-foreground">/{formData.billingCycle}</span>
            )}
          </div>

          {filteredFaq.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                FAQ ({filteredFaq.length} items)
              </p>
            </div>
          )}
        </div>
      </ReviewSection>

      {/* Structure Section */}
      <ReviewSection
        title="Structure"
        step="structure"
        onEdit={() => onEditStep("structure")}
      >
        {formData.type === "course" && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ListOrdered className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {formData.lessons?.length || 0} Lessons
              </span>
            </div>
            {formData.lessons && formData.lessons.length > 0 && (
              <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                {formData.lessons.slice(0, 3).map((lesson, i) => (
                  <li key={i}>{lesson.title || `Lesson ${i + 1}`}</li>
                ))}
                {formData.lessons.length > 3 && (
                  <li className="italic">+{formData.lessons.length - 3} more</li>
                )}
              </ul>
            )}
          </div>
        )}

        {formData.type === "session" && formData.sessionConfig && (
          <div className="space-y-2">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {formData.sessionConfig.duration} min
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                {formData.sessionConfig.sessionType}
              </div>
              {formData.sessionConfig.replayEnabled && (
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  Replay enabled
                </div>
              )}
            </div>
          </div>
        )}

        {formData.type === "program" && (
          <div>
            {formData.programDuration && (
              <p className="text-sm mb-2">{formData.programDuration}</p>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {formData.phases?.length || 0} Phases
              </span>
            </div>
          </div>
        )}

        {formData.type === "membership" && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {formData.benefits?.filter(b => b.trim()).length || 0} Benefits
              </span>
            </div>
            {formData.contentCadence && (
              <p className="text-sm text-muted-foreground">
                {formData.contentCadence}
              </p>
            )}
          </div>
        )}
      </ReviewSection>
    </div>
  );
}

// Helper component for review sections
function ReviewSection({ 
  title, 
  step,
  onEdit, 
  children 
}: { 
  title: string;
  step: WizardStep;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-lg border bg-muted/20">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {title}
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-7 text-xs"
        >
          <Edit2 className="h-3 w-3 mr-1" />
          Edit
        </Button>
      </div>
      {children}
    </div>
  );
}

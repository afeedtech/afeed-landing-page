import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { BuilderStepGoal } from "./BuilderStepGoal";
import { BuilderStepFormat } from "./BuilderStepFormat";
import { BuilderStepQuestions } from "./BuilderStepQuestions";
import { GoalType, FormatType, GeneratedScript, generateMockScript } from "./mockData";

interface GuidedBuilderProps {
  onComplete: (script: GeneratedScript, meta: { goal: GoalType; format: FormatType }) => void;
  onCancel: () => void;
  initialGoal?: GoalType;
  initialFormat?: FormatType;
}

export const GuidedBuilder = ({ 
  onComplete, 
  onCancel, 
  initialGoal = null, 
  initialFormat = null 
}: GuidedBuilderProps) => {
  const [step, setStep] = useState(initialGoal ? (initialFormat ? 3 : 2) : 1);
  const [goal, setGoal] = useState<GoalType | null>(initialGoal);
  const [format, setFormat] = useState<FormatType | null>(initialFormat);
  const [audience, setAudience] = useState("");
  const [pain, setPain] = useState("");
  const [outcome, setOutcome] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const canProceed = () => {
    if (step === 1) return goal !== null;
    if (step === 2) return format !== null;
    if (step === 3) return audience && pain && outcome;
    return false;
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onCancel();
    }
  };

  const handleGenerate = async () => {
    if (!goal || !format) return;
    
    setIsGenerating(true);
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const script = generateMockScript(goal, format, audience, pain, outcome);
    setIsGenerating(false);
    onComplete(script, { goal, format });
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
          <div className="relative p-4 bg-primary rounded-full">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Creating your script...</h2>
        <p className="text-muted-foreground">This script is adapted to your niche and tone.</p>
        <Loader2 className="h-6 w-6 animate-spin mt-6 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="min-h-[300px] py-4">
        {step === 1 && (
          <BuilderStepGoal 
            selected={goal} 
            onSelect={(g) => {
              setGoal(g);
            }} 
          />
        )}
        {step === 2 && (
          <BuilderStepFormat 
            selected={format} 
            onSelect={(f) => {
              setFormat(f);
            }} 
          />
        )}
        {step === 3 && (
          <BuilderStepQuestions
            audience={audience}
            pain={pain}
            outcome={outcome}
            onAudienceChange={setAudience}
            onPainChange={setPain}
            onOutcomeChange={setOutcome}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {step === 1 ? 'Cancel' : 'Back'}
        </Button>
        <Button onClick={handleNext} disabled={!canProceed()}>
          {step === totalSteps ? (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Script
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

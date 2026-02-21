import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Anchor, 
  FileText, 
  Target, 
  Clock, 
  Copy, 
  Save, 
  Calendar,
  Zap,
  BookOpen,
  Heart,
  Info
} from "lucide-react";
import { GeneratedScript, GoalType, FormatType } from "./mockData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ScriptEditorProps {
  script: GeneratedScript;
  meta: { goal: GoalType; format: FormatType };
  onSchedule: () => void;
  onSaveDraft: () => void;
  onBack: () => void;
}

type ToneType = 'aggressive' | 'educational' | 'emotional';

export const ScriptEditor = ({ script, meta, onSchedule, onSaveDraft, onBack }: ScriptEditorProps) => {
  const { toast } = useToast();
  const [hook, setHook] = useState(script.hook);
  const [body, setBody] = useState(script.body.join('\n\n'));
  const [cta, setCta] = useState(script.cta);
  const [activeTone, setActiveTone] = useState<ToneType | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);

  const handleToneChange = async (tone: ToneType) => {
    if (activeTone === tone) {
      setActiveTone(null);
      return;
    }
    
    setIsAdjusting(true);
    setActiveTone(tone);
    
    // Simulate tone adjustment
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock tone adjustments
    const toneAdjustments: Record<ToneType, { hookPrefix: string; ctaSuffix: string }> = {
      aggressive: { 
        hookPrefix: "Listen up! ", 
        ctaSuffix: " Do it now." 
      },
      educational: { 
        hookPrefix: "Here's what you need to know: ", 
        ctaSuffix: " Let me know if you have questions." 
      },
      emotional: { 
        hookPrefix: "I want to share something personal... ", 
        ctaSuffix: " This means so much to me." 
      },
    };

    const adjustment = toneAdjustments[tone];
    setHook(adjustment.hookPrefix + script.hook);
    setCta(script.cta + adjustment.ctaSuffix);
    
    setIsAdjusting(false);
    toast({
      title: "Tone adjusted",
      description: `Script updated with a more ${tone} tone.`,
    });
  };

  const handleCopyAll = () => {
    const fullScript = `${hook}\n\n${body}\n\n${cta}`;
    navigator.clipboard.writeText(fullScript);
    toast({
      title: "Copied!",
      description: "Script copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Edit Your Script</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
            <Info className="h-4 w-4" />
            This script is adapted to your niche and tone.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{meta.goal}</Badge>
          <Badge variant="outline">{meta.format}</Badge>
        </div>
      </div>

      {/* Tone Toggles */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Adjust Tone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTone === 'aggressive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToneChange('aggressive')}
              disabled={isAdjusting}
              className="gap-2"
            >
              <Zap className="h-4 w-4" />
              More aggressive
            </Button>
            <Button
              variant={activeTone === 'educational' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToneChange('educational')}
              disabled={isAdjusting}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              More educational
            </Button>
            <Button
              variant={activeTone === 'emotional' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleToneChange('emotional')}
              disabled={isAdjusting}
              className="gap-2"
            >
              <Heart className="h-4 w-4" />
              More emotional
            </Button>
          </div>
          {isAdjusting && (
            <p className="text-sm text-muted-foreground mt-2 animate-pulse">Adjusting tone...</p>
          )}
        </CardContent>
      </Card>

      {/* Script Sections */}
      <div className="space-y-4">
        {/* Hook */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Anchor className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Hook</CardTitle>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {script.hookTiming}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              className="min-h-[80px] resize-none"
              placeholder="Your attention-grabbing opener..."
            />
          </CardContent>
        </Card>

        {/* Body */}
        <Card className="border-l-4 border-l-muted-foreground/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">Body</CardTitle>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {script.bodyTiming}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[160px] resize-none"
              placeholder="The main content of your script..."
            />
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <CardTitle className="text-base">Call to Action</CardTitle>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {script.ctaTiming}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              className="min-h-[60px] resize-none"
              placeholder="Your closing call to action..."
            />
          </CardContent>
        </Card>
      </div>

      {/* Why this works */}
      <Card className="bg-muted/30">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="font-medium">Why this script works:</span>
            This {meta.format} format is proven to drive {meta.goal === 'grow' ? 'audience growth' : meta.goal === 'sell' ? 'conversions' : meta.goal === 'educate' ? 'engagement' : 're-engagement'}.
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="ghost" onClick={onBack} className="order-2 sm:order-1">
          ← Back to builder
        </Button>
        <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
          <Button variant="outline" onClick={handleCopyAll} className="gap-2 w-full sm:w-auto">
            <Copy className="h-4 w-4" />
            Copy All
          </Button>
          <Button variant="secondary" onClick={onSaveDraft} className="gap-2 w-full sm:w-auto">
            <Save className="h-4 w-4" />
            Save as Draft
          </Button>
          <Button onClick={onSchedule} className="gap-2 w-full sm:w-auto">
            <Calendar className="h-4 w-4" />
            Schedule Post
          </Button>
        </div>
      </div>
      
      {/* Mobile Sticky Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border z-40 sm:hidden">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onSaveDraft} className="flex-1 h-12">
            <Save className="h-4 w-4 me-2" />
            Save Draft
          </Button>
          <Button onClick={onSchedule} className="flex-1 h-12">
            <Calendar className="h-4 w-4 me-2" />
            Schedule
          </Button>
        </div>
      </div>
      
      {/* Mobile spacer */}
      <div className="h-20 sm:hidden" />
    </div>
  );
};

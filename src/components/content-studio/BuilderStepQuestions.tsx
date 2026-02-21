import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { audienceOptions, outcomeOptions } from "./mockData";

interface BuilderStepQuestionsProps {
  audience: string;
  pain: string;
  outcome: string;
  onAudienceChange: (value: string) => void;
  onPainChange: (value: string) => void;
  onOutcomeChange: (value: string) => void;
}

export const BuilderStepQuestions = ({
  audience,
  pain,
  outcome,
  onAudienceChange,
  onPainChange,
  onOutcomeChange,
}: BuilderStepQuestionsProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Tell us a bit more</h2>
        <p className="text-muted-foreground">Answer a few questions — we'll handle the structure.</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <Label htmlFor="audience" className="text-sm font-medium">Who is this for?</Label>
          <Select value={audience} onValueChange={onAudienceChange}>
            <SelectTrigger id="audience" className="w-full">
              <SelectValue placeholder="Select your target audience" />
            </SelectTrigger>
            <SelectContent>
              {audienceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pain" className="text-sm font-medium">What's the main pain or desire?</Label>
          <Input
            id="pain"
            placeholder="e.g., growing their audience, finding clients..."
            value={pain}
            onChange={(e) => onPainChange(e.target.value)}
            maxLength={80}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground text-right">{pain.length}/80</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="outcome" className="text-sm font-medium">What outcome do you want?</Label>
          <Select value={outcome} onValueChange={onOutcomeChange}>
            <SelectTrigger id="outcome" className="w-full">
              <SelectValue placeholder="Select desired outcome" />
            </SelectTrigger>
            <SelectContent>
              {outcomeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

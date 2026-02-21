import { useState } from "react";
import { Plus, X, ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { WizardFormData } from "../types";
import type { FaqItem } from "@/components/profile/types";

interface StepSalesContentProps {
  formData: WizardFormData;
  onFormDataChange: (data: Partial<WizardFormData>) => void;
  errors: Record<string, string>;
}

export function StepSalesContent({ formData, onFormDataChange, errors }: StepSalesContentProps) {
  const [faqOpen, setFaqOpen] = useState(false);

  // Outcomes management
  const addOutcome = () => {
    onFormDataChange({ outcomes: [...formData.outcomes, ""] });
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...formData.outcomes];
    newOutcomes[index] = value;
    onFormDataChange({ outcomes: newOutcomes });
  };

  const removeOutcome = (index: number) => {
    if (formData.outcomes.length <= 1) return;
    const newOutcomes = formData.outcomes.filter((_, i) => i !== index);
    onFormDataChange({ outcomes: newOutcomes });
  };

  // FAQ management
  const addFaq = () => {
    onFormDataChange({ 
      faqItems: [...formData.faqItems, { question: "", answer: "" }] 
    });
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    const newFaq = [...formData.faqItems];
    newFaq[index] = { ...newFaq[index], [field]: value };
    onFormDataChange({ faqItems: newFaq });
  };

  const removeFaq = (index: number) => {
    const newFaq = formData.faqItems.filter((_, i) => i !== index);
    onFormDataChange({ faqItems: newFaq });
  };

  const isMembership = formData.type === "membership";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Image Upload Placeholder */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Hero Image</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20">
          <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: 1200 x 630px
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe what your audience will get from this product..."
          value={formData.description}
          onChange={(e) => onFormDataChange({ description: e.target.value })}
          rows={4}
          className={cn(errors.description && "border-destructive")}
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Outcomes / What You'll Get */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">
            What You'll Get <span className="text-destructive">*</span>
          </Label>
          <span className="text-xs text-muted-foreground">
            {formData.outcomes.filter(o => o.trim()).length} items
          </span>
        </div>
        <div className="space-y-2">
          {formData.outcomes.map((outcome, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder={`Outcome ${index + 1}`}
                value={outcome}
                onChange={(e) => updateOutcome(index, e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOutcome(index)}
                disabled={formData.outcomes.length <= 1}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addOutcome}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Outcome
        </Button>
        {errors.outcomes && (
          <p className="text-xs text-destructive">{errors.outcomes}</p>
        )}
      </div>

      {/* Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium">
            Price (KWD) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            value={formData.price || ""}
            onChange={(e) => onFormDataChange({ price: parseFloat(e.target.value) || 0 })}
            className={cn(errors.price && "border-destructive")}
          />
          {errors.price && (
            <p className="text-xs text-destructive">{errors.price}</p>
          )}
        </div>

        {isMembership && (
          <div className="space-y-2">
            <Label htmlFor="billingCycle" className="text-sm font-medium">
              Billing Cycle
            </Label>
            <Select
              value={formData.billingCycle}
              onValueChange={(value: "monthly" | "quarterly" | "yearly") => 
                onFormDataChange({ billingCycle: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* FAQ Section (Collapsible) */}
      <Collapsible open={faqOpen} onOpenChange={setFaqOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className="text-left">
              <span className="text-sm font-medium">FAQ</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({formData.faqItems.length} items)
              </span>
            </div>
            {faqOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {formData.faqItems.map((faq, index) => (
            <div key={index} className="p-4 rounded-lg border bg-background space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-3">
                  <Input
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => updateFaq(index, "question", e.target.value)}
                  />
                  <Textarea
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, "answer", e.target.value)}
                    rows={2}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFaq(index)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFaq}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

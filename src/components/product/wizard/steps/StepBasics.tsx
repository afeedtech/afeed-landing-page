import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, Crown, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WizardFormData } from "../types";
import type { ProductType } from "@/components/profile/types";

interface StepBasicsProps {
  formData: WizardFormData;
  onFormDataChange: (data: Partial<WizardFormData>) => void;
  errors: Record<string, string>;
}

const typeConfig: Record<ProductType, { label: string; icon: typeof BookOpen; color: string }> = {
  course: { label: "Online Course", icon: BookOpen, color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  session: { label: "Live Session", icon: Video, color: "bg-green-500/10 text-green-600 border-green-200" },
  program: { label: "Program", icon: Crown, color: "bg-purple-500/10 text-purple-600 border-purple-200" },
  membership: { label: "Membership", icon: Users, color: "bg-amber-500/10 text-amber-600 border-amber-200" },
};

export function StepBasics({ formData, onFormDataChange, errors }: StepBasicsProps) {
  const config = typeConfig[formData.type];
  const TypeIcon = config.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Product Type Display (Locked) */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">Product Type</Label>
        <div className={cn(
          "flex items-center gap-3 p-4 rounded-lg border",
          config.color
        )}>
          <TypeIcon className="h-5 w-5" />
          <span className="font-medium">{config.label}</span>
          <Badge variant="secondary" className="ml-auto text-xs">
            Locked
          </Badge>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder={`e.g., ${formData.type === "course" ? "Digital Marketing Masterclass" : formData.type === "session" ? "1:1 Business Coaching" : formData.type === "program" ? "Creator Accelerator Program" : "Pro Membership"}`}
          value={formData.title}
          onChange={(e) => onFormDataChange({ title: e.target.value })}
          className={cn(errors.title && "border-destructive")}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title}</p>
        )}
        <p className="text-xs text-muted-foreground">
          This is what your audience will see first
        </p>
      </div>

      {/* Headline / Tagline */}
      <div className="space-y-2">
        <Label htmlFor="headline" className="text-sm font-medium">
          Tagline
        </Label>
        <Input
          id="headline"
          placeholder="A short, compelling subtitle"
          value={formData.headline}
          onChange={(e) => onFormDataChange({ headline: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          Optional. Appears below the title on your page
        </p>
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
        <div className="space-y-0.5">
          <Label htmlFor="featured" className="text-sm font-medium cursor-pointer">
            Feature on My Page
          </Label>
          <p className="text-xs text-muted-foreground">
            Featured products appear prominently at the top
          </p>
        </div>
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => onFormDataChange({ featured: checked })}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { Plus, X, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { WizardFormData, SessionConfig } from "../types";
import type { Lesson, ProgramPhase } from "@/components/profile/types";

interface StepStructureProps {
  formData: WizardFormData;
  onFormDataChange: (data: Partial<WizardFormData>) => void;
  errors: Record<string, string>;
}

export function StepStructure({ formData, onFormDataChange, errors }: StepStructureProps) {
  switch (formData.type) {
    case "course":
      return <CourseStructure formData={formData} onFormDataChange={onFormDataChange} errors={errors} />;
    case "session":
      return <SessionStructure formData={formData} onFormDataChange={onFormDataChange} errors={errors} />;
    case "program":
      return <ProgramStructure formData={formData} onFormDataChange={onFormDataChange} errors={errors} />;
    case "membership":
      return <MembershipStructure formData={formData} onFormDataChange={onFormDataChange} errors={errors} />;
    default:
      return null;
  }
}

// Course Structure - Lessons
function CourseStructure({ formData, onFormDataChange, errors }: StepStructureProps) {
  const lessons = formData.lessons || [];

  const addLesson = () => {
    const newLesson: Lesson = {
      id: lessons.length + 1,
      title: "",
      type: "video",
      duration: "",
      isPreview: false,
    };
    onFormDataChange({ lessons: [...lessons, newLesson] });
  };

  const updateLesson = (index: number, updates: Partial<Lesson>) => {
    const newLessons = lessons.map((lesson, i) => 
      i === index ? { ...lesson, ...updates } : lesson
    );
    onFormDataChange({ lessons: newLessons });
  };

  const removeLesson = (index: number) => {
    const newLessons = lessons.filter((_, i) => i !== index);
    onFormDataChange({ lessons: newLessons });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Course Lessons</h3>
          <p className="text-sm text-muted-foreground">Add lessons to your course curriculum</p>
        </div>
        <Badge variant="secondary">{lessons.length} lessons</Badge>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-background">
            <GripVertical className="h-5 w-5 text-muted-foreground mt-2 cursor-grab" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground w-8">
                  {index + 1}.
                </span>
                <Input
                  placeholder="Lesson title"
                  value={lesson.title}
                  onChange={(e) => updateLesson(index, { title: e.target.value })}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-4 ml-10">
                <Select
                  value={lesson.type}
                  onValueChange={(value: "video" | "text" | "image") => 
                    updateLesson(index, { type: value })
                  }
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Duration"
                  value={lesson.duration || ""}
                  onChange={(e) => updateLesson(index, { duration: e.target.value })}
                  className="w-24"
                />
                <div className="flex items-center gap-2">
                  <Switch
                    id={`preview-${index}`}
                    checked={lesson.isPreview || false}
                    onCheckedChange={(checked) => updateLesson(index, { isPreview: checked })}
                  />
                  <Label htmlFor={`preview-${index}`} className="text-xs text-muted-foreground">
                    Preview
                  </Label>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeLesson(index)}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addLesson} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Lesson
      </Button>
      
      {errors.lessons && (
        <p className="text-xs text-destructive">{errors.lessons}</p>
      )}
    </div>
  );
}

// Session Structure
function SessionStructure({ formData, onFormDataChange, errors }: StepStructureProps) {
  const config = formData.sessionConfig || {
    duration: "60",
    sessionType: "1:1" as const,
    replayEnabled: true,
    resources: [],
  };

  const updateConfig = (updates: Partial<SessionConfig>) => {
    onFormDataChange({ sessionConfig: { ...config, ...updates } });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-medium">Session Details</h3>
        <p className="text-sm text-muted-foreground">Configure your session settings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Duration</Label>
          <Select
            value={config.duration}
            onValueChange={(value) => updateConfig({ duration: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
              <SelectItem value="90">90 minutes</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Session Type</Label>
          <Select
            value={config.sessionType}
            onValueChange={(value: "1:1" | "group") => updateConfig({ sessionType: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">1:1 Session</SelectItem>
              <SelectItem value="group">Group Session</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {config.sessionType === "group" && (
        <div className="space-y-2">
          <Label>Max Capacity</Label>
          <Input
            type="number"
            min="2"
            placeholder="e.g., 20"
            value={config.capacity || ""}
            onChange={(e) => updateConfig({ capacity: parseInt(e.target.value) || undefined })}
          />
        </div>
      )}

      <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
        <div>
          <Label className="text-sm font-medium">Enable Replay</Label>
          <p className="text-xs text-muted-foreground">Allow attendees to access recording after session</p>
        </div>
        <Switch
          checked={config.replayEnabled}
          onCheckedChange={(checked) => updateConfig({ replayEnabled: checked })}
        />
      </div>
    </div>
  );
}

// Program Structure - Phases
function ProgramStructure({ formData, onFormDataChange, errors }: StepStructureProps) {
  const phases = formData.phases || [];

  const addPhase = () => {
    const lastPhase = phases[phases.length - 1];
    const newPhase: ProgramPhase = {
      id: phases.length + 1,
      title: "",
      weekStart: lastPhase ? lastPhase.weekEnd + 1 : 1,
      weekEnd: lastPhase ? lastPhase.weekEnd + 2 : 2,
      description: "",
    };
    onFormDataChange({ phases: [...phases, newPhase] });
  };

  const updatePhase = (index: number, updates: Partial<ProgramPhase>) => {
    const newPhases = phases.map((phase, i) => 
      i === index ? { ...phase, ...updates } : phase
    );
    onFormDataChange({ phases: newPhases });
  };

  const removePhase = (index: number) => {
    const newPhases = phases.filter((_, i) => i !== index);
    onFormDataChange({ phases: newPhases });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Program Phases</h3>
          <p className="text-sm text-muted-foreground">Define the phases of your program</p>
        </div>
        <Badge variant="secondary">{phases.length} phases</Badge>
      </div>

      <div className="space-y-2">
        <Label>Program Duration</Label>
        <Input
          placeholder="e.g., 12 weeks"
          value={formData.programDuration || ""}
          onChange={(e) => onFormDataChange({ programDuration: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        {phases.map((phase, index) => (
          <div key={index} className="p-4 rounded-lg border bg-background space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline">Phase {index + 1}</Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePhase(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Phase title"
              value={phase.title}
              onChange={(e) => updatePhase(index, { title: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Week Start</Label>
                <Input
                  type="number"
                  min="1"
                  value={phase.weekStart}
                  onChange={(e) => updatePhase(index, { weekStart: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Week End</Label>
                <Input
                  type="number"
                  min="1"
                  value={phase.weekEnd}
                  onChange={(e) => updatePhase(index, { weekEnd: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
            <Textarea
              placeholder="Phase description"
              value={phase.description}
              onChange={(e) => updatePhase(index, { description: e.target.value })}
              rows={2}
            />
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addPhase} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Phase
      </Button>

      {errors.phases && (
        <p className="text-xs text-destructive">{errors.phases}</p>
      )}
    </div>
  );
}

// Membership Structure - Benefits
function MembershipStructure({ formData, onFormDataChange, errors }: StepStructureProps) {
  const benefits = formData.benefits || [""];

  const addBenefit = () => {
    onFormDataChange({ benefits: [...benefits, ""] });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = benefits.map((b, i) => i === index ? value : b);
    onFormDataChange({ benefits: newBenefits });
  };

  const removeBenefit = (index: number) => {
    if (benefits.length <= 1) return;
    const newBenefits = benefits.filter((_, i) => i !== index);
    onFormDataChange({ benefits: newBenefits });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-medium">Membership Benefits</h3>
        <p className="text-sm text-muted-foreground">List what members get access to</p>
      </div>

      <div className="space-y-2">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={`Benefit ${index + 1}`}
              value={benefit}
              onChange={(e) => updateBenefit(index, e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeBenefit(index)}
              disabled={benefits.length <= 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addBenefit} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Benefit
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Content Cadence</Label>
        <Input
          placeholder="e.g., New content weekly"
          value={formData.contentCadence || ""}
          onChange={(e) => onFormDataChange({ contentCadence: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          How often do you add new content?
        </p>
      </div>

      {errors.benefits && (
        <p className="text-xs text-destructive">{errors.benefits}</p>
      )}
    </div>
  );
}

import { Play, Lock, Eye, FileText, Image, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lesson } from "@/components/profile/types";

interface CourseLessonListProps {
  lessons: Lesson[];
  hasAccess: boolean;
  className?: string;
}

const lessonTypeIcons = {
  video: Play,
  text: FileText,
  image: Image,
};

export function CourseLessonList({ lessons, hasAccess, className }: CourseLessonListProps) {
  if (!lessons || lessons.length === 0) return null;

  // Mock progress for demo (would come from actual data)
  const completedLessons = hasAccess ? [1] : [];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Course Content</h2>
        <span className="text-sm text-muted-foreground">
          {lessons.length} lessons
        </span>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson, index) => {
          const Icon = lessonTypeIcons[lesson.type];
          const isCompleted = completedLessons.includes(lesson.id);
          const canAccess = hasAccess || lesson.isPreview;

          return (
            <div
              key={lesson.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-lg border transition-colors",
                canAccess
                  ? "bg-card hover:bg-muted/50 cursor-pointer"
                  : "bg-muted/30",
                isCompleted && "border-primary/30"
              )}
            >
              {/* Lesson number or completion */}
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : canAccess
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Lesson info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn("font-medium truncate", !canAccess && "text-muted-foreground")}>
                    {lesson.title}
                  </span>
                  {lesson.isPreview && !hasAccess && (
                    <Badge variant="outline" className="text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Badge>
                  )}
                </div>
                {lesson.duration && (
                  <span className="text-xs text-muted-foreground">
                    {lesson.duration}
                  </span>
                )}
              </div>

              {/* Action icon */}
              <div className="flex-shrink-0">
                {canAccess ? (
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon className="h-4 w-4" />
                  </Button>
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasAccess && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            />
          </div>
          <span className="flex-shrink-0">
            {completedLessons.length}/{lessons.length}
          </span>
        </div>
      )}
    </div>
  );
}

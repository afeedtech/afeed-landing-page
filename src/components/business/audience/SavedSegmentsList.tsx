import { Pencil, Trash2, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SavedSegment } from '@/types/analytics';

interface SavedSegmentsListProps {
  segments: SavedSegment[];
  onLoadSegment: (segment: SavedSegment) => void;
  onRenameSegment: (segment: SavedSegment) => void;
  onDeleteSegment: (segment: SavedSegment) => void;
}

export function SavedSegmentsList({
  segments,
  onLoadSegment,
  onRenameSegment,
  onDeleteSegment,
}: SavedSegmentsListProps) {
  if (segments.length === 0) {
    return (
      <div className="flex items-center gap-2 py-3 px-4 rounded-lg bg-muted/30 border border-border/50">
        <Users className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No saved segments yet. Apply filters and save a segment to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">Saved Segments</p>
      <div className="flex flex-wrap gap-2">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors"
          >
            <button
              onClick={() => onLoadSegment(segment)}
              className="flex items-center gap-2 text-left"
            >
              <span className="text-sm font-medium text-foreground">{segment.name}</span>
              <Badge variant="secondary" className="text-xs">
                {segment.userCount.toLocaleString()}
              </Badge>
            </button>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  onRenameSegment(segment);
                }}
              >
                <Pencil className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSegment(segment);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

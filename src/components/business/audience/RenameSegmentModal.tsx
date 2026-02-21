import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SavedSegment } from '@/types/analytics';

interface RenameSegmentModalProps {
  open: boolean;
  onClose: () => void;
  segment: SavedSegment | null;
  onSave: (id: string, name: string, description?: string) => void;
}

export function RenameSegmentModal({ open, onClose, segment, onSave }: RenameSegmentModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (segment) {
      setName(segment.name);
      setDescription(segment.description || '');
    }
  }, [segment]);

  const handleSave = () => {
    if (!name.trim()) {
      setError('Segment name is required');
      return;
    }
    if (segment) {
      onSave(segment.id, name.trim(), description.trim() || undefined);
    }
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Segment</DialogTitle>
          <DialogDescription>
            Update the name and description for this segment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rename-segment-name">Segment Name *</Label>
            <Input
              id="rename-segment-name"
              placeholder="e.g., High-value customers"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className={error ? 'border-destructive' : ''}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rename-segment-description">Description (optional)</Label>
            <Textarea
              id="rename-segment-description"
              placeholder="Describe what this segment represents..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

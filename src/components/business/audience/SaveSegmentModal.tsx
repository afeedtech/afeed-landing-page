import { useState } from 'react';
import { Users } from 'lucide-react';
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

interface SaveSegmentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, description?: string) => void;
  userCount: number;
}

export function SaveSegmentModal({ open, onClose, onSave, userCount }: SaveSegmentModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('Segment name is required');
      return;
    }
    onSave(name.trim(), description.trim() || undefined);
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
          <DialogTitle>Save Audience Segment</DialogTitle>
          <DialogDescription>
            Save the current filter configuration for quick access later.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              This segment currently includes{' '}
              <span className="font-semibold text-foreground">{userCount.toLocaleString()}</span> users
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="segment-name">Segment Name *</Label>
            <Input
              id="segment-name"
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
            <Label htmlFor="segment-description">Description (optional)</Label>
            <Textarea
              id="segment-description"
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
          <Button onClick={handleSave}>Save Segment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

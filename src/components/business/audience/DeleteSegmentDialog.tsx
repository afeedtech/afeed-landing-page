import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { SavedSegment } from '@/types/analytics';

interface DeleteSegmentDialogProps {
  open: boolean;
  onClose: () => void;
  segment: SavedSegment | null;
  onConfirm: (id: string) => void;
}

export function DeleteSegmentDialog({ open, onClose, segment, onConfirm }: DeleteSegmentDialogProps) {
  const handleConfirm = () => {
    if (segment) {
      onConfirm(segment.id);
    }
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Segment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{segment?.name}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

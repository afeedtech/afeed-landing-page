import { useState, useEffect } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/components/profile/types";

interface DeleteProductModalProps {
  product: Product | null;
  isBlocked?: boolean;
  blockReason?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteProductModal({
  product,
  isBlocked = false,
  blockReason,
  onConfirm,
  onCancel,
}: DeleteProductModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmValid = confirmText === product?.title;

  // Reset confirm text when modal opens/closes
  useEffect(() => {
    if (!product) {
      setConfirmText("");
    }
  }, [product]);

  if (!product) return null;

  return (
    <AlertDialog open={!!product} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            {isBlocked ? "Cannot Delete Product" : "Delete this product permanently?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            {isBlocked ? (
              <p className="text-sm">
                {blockReason || "This product cannot be deleted at this time."}
              </p>
            ) : (
              <>
                <ul className="list-disc list-inside space-y-1.5 text-sm">
                  <li>This action cannot be undone</li>
                  <li>Existing users will lose access</li>
                  <li>Product will be removed from all pages</li>
                  <li>Analytics data will be retained</li>
                </ul>

                <div className="pt-2 space-y-2">
                  <Label htmlFor="confirm-delete" className="text-sm font-medium text-foreground">
                    Type <span className="font-semibold">"{product.title}"</span> to confirm
                  </Label>
                  <Input
                    id="confirm-delete"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Enter product title"
                    className="font-mono"
                  />
                </div>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          {!isBlocked && (
            <AlertDialogAction
              onClick={onConfirm}
              disabled={!isConfirmValid}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Permanently
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
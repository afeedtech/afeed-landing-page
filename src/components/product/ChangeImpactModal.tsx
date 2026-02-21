import { AlertTriangle } from "lucide-react";
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
import type { ProductType } from "@/components/profile/types";

interface ChangeImpactModalProps {
  open: boolean;
  productType: ProductType;
  changes: {
    pricing?: boolean;
    accessRules?: boolean;
    contentRemoval?: boolean;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export function ChangeImpactModal({
  open,
  productType,
  changes,
  onConfirm,
  onCancel,
}: ChangeImpactModalProps) {
  const isMembership = productType === "membership";

  const getImpactDescription = () => {
    const impacts: string[] = [];

    if (changes.pricing) {
      if (isMembership) {
        impacts.push("Price changes will apply to future renewals only");
      } else {
        impacts.push("Price changes will apply to new purchases only");
      }
    }

    if (changes.accessRules) {
      impacts.push("Access rule changes may affect how users interact with content");
    }

    if (changes.contentRemoval) {
      impacts.push("Removed content will no longer be accessible to existing users");
    }

    return impacts;
  };

  const impacts = getImpactDescription();

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-chart-4" />
            These changes may affect existing users
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p className="text-sm">
              You're about to save changes to a published product. Here's what will happen:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              {impacts.map((impact, index) => (
                <li key={index}>{impact}</li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              Existing customers will retain their current access and pricing.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
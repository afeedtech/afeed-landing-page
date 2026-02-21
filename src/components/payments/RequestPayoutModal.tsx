import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RequestPayoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  availableBalance: number;
}

export function RequestPayoutModal({
  open,
  onClose,
  onConfirm,
  availableBalance,
}: RequestPayoutModalProps) {
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  const fee = 1;
  const netPayout = availableBalance - fee;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Request immediate payout?
          </DialogTitle>
          <DialogDescription className="pt-3 space-y-3">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Funds will be paid out immediately</li>
              <li>A <span className="font-medium text-foreground">1 {currencyLabel}</span> processing fee will be deducted</li>
            </ul>
            <div className="rounded-lg border border-border bg-muted/50 p-3 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Available balance</span>
                <span className="font-medium">{availableBalance.toFixed(2)} {currencyLabel}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">Processing fee</span>
                <span className="font-medium text-destructive">-{fee.toFixed(2)} {currencyLabel}</span>
              </div>
              <div className="border-t border-border mt-2 pt-2 flex justify-between items-center">
                <span className="font-medium">Net payout</span>
                <span className="font-bold text-accent">{netPayout.toFixed(2)} {currencyLabel}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="gradient-bg" onClick={onConfirm}>
            Confirm Payout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

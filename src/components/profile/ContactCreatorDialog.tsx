import { useState } from "react";
import { Phone, Copy, Check, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ContactCreatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creatorName: string;
  mobileNumber: string;
}

export function ContactCreatorDialog({
  open,
  onOpenChange,
  creatorName,
  mobileNumber,
}: ContactCreatorDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mobileNumber);
      setCopied(true);
      toast.success("Phone number copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${mobileNumber.replace(/\s/g, "")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {creatorName}</DialogTitle>
          <DialogDescription>
            Reach out directly via phone
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Phone Number Display */}
          <div className="flex items-center justify-center gap-3 p-4 bg-muted rounded-lg">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-xl font-semibold tracking-wide">
              {mobileNumber}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="default"
              className="flex-1 gap-2"
              onClick={handleCall}
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy Number"}
            </Button>
          </div>

          {/* Exclusive Access Note */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Only available to customers</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

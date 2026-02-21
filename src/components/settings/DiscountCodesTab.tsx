import { useState } from "react";
import { CreateDiscountForm } from "./CreateDiscountForm";
import { ActiveDiscountsList } from "./ActiveDiscountsList";
import { ArchivedDiscountsList } from "./ArchivedDiscountsList";
import { DiscountDetailSheet } from "./DiscountDetailSheet";
import { mockDiscountCodes } from "./mockData";
import { DiscountCode } from "./types";

export function DiscountCodesTab() {
  const [selectedCode, setSelectedCode] = useState<DiscountCode | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSelectCode = (code: DiscountCode) => {
    setSelectedCode(code);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">Discount Codes</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Create and manage promotional codes for your products
        </p>

        <div className="space-y-6">
          <CreateDiscountForm />
          
          <ActiveDiscountsList codes={mockDiscountCodes} />
          
          <ArchivedDiscountsList 
            codes={mockDiscountCodes} 
            onSelectCode={handleSelectCode}
          />
        </div>
      </div>

      <DiscountDetailSheet
        code={selectedCode}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}

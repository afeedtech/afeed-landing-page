import { useState } from "react";
import { Building2, User, CreditCard, CheckCircle2, ChevronRight, ChevronLeft, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { menaBanks } from "@/lib/payoutSettings";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UpdateBankDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2 | 3;

const steps = [
  { number: 1, title: "Select Bank", icon: Building2 },
  { number: 2, title: "Account Details", icon: CreditCard },
  { number: 3, title: "Review & Confirm", icon: CheckCircle2 },
];

// Group banks by country for better organization
const banksByCountry = menaBanks.reduce((acc, bank) => {
  if (!acc[bank.country]) {
    acc[bank.country] = [];
  }
  acc[bank.country].push(bank);
  return acc;
}, {} as Record<string, typeof menaBanks>);

// Order countries (Kuwait first, then alphabetical, Other last)
const countryOrder = Object.keys(banksByCountry).sort((a, b) => {
  if (a === 'Kuwait') return -1;
  if (b === 'Kuwait') return 1;
  if (a === 'Other') return 1;
  if (b === 'Other') return -1;
  return a.localeCompare(b);
});

export function UpdateBankDetailsSheet({ open, onOpenChange }: UpdateBankDetailsSheetProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [bankPopoverOpen, setBankPopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    customBankName: "",
    accountHolderName: "",
    iban: "",
    swift: "",
  });

  const selectedBank = menaBanks.find(b => b.value === formData.bankName);
  const isOtherBank = formData.bankName === 'other';
  const displayBankName = isOtherBank ? formData.customBankName : selectedBank?.label || "";

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = () => {
    toast.success("Bank details updated successfully");
    onOpenChange(false);
    setCurrentStep(1);
    setFormData({ bankName: "", customBankName: "", accountHolderName: "", iban: "", swift: "" });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        if (formData.bankName === 'other') {
          return !!formData.customBankName.trim();
        }
        return !!formData.bankName;
      case 2:
        return !!formData.accountHolderName && !!formData.iban;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Update Bank Details</SheetTitle>
          <SheetDescription>
            Update your bank account for receiving payouts
          </SheetDescription>
        </SheetHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                      isActive && "border-primary bg-primary text-primary-foreground",
                      isCompleted && "border-accent bg-accent text-accent-foreground",
                      !isActive && !isCompleted && "border-muted bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "h-0.5 w-12 mx-2 mt-[-1.5rem]",
                    isCompleted ? "bg-accent" : "bg-muted"
                  )} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Bank Selection with Searchable Combobox */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Your Bank</Label>
              <Popover open={bankPopoverOpen} onOpenChange={setBankPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={bankPopoverOpen}
                    className="w-full justify-between font-normal"
                  >
                    {selectedBank ? (
                      <span className="flex items-center gap-2">
                        {selectedBank.label}
                        <span className="text-xs text-muted-foreground">({selectedBank.country})</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Search for your bank...</span>
                    )}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Type to search banks..." />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty>No bank found. Select "Other" to enter manually.</CommandEmpty>
                      {countryOrder.map((country) => (
                        <CommandGroup key={country} heading={country}>
                          {banksByCountry[country].map((bank) => (
                            <CommandItem
                              key={bank.value}
                              value={`${bank.label} ${bank.country}`}
                              onSelect={() => {
                                setFormData({ ...formData, bankName: bank.value, customBankName: "" });
                                setBankPopoverOpen(false);
                              }}
                            >
                              <span className={cn(
                                "mr-2 h-4 w-4",
                                formData.bankName === bank.value ? "opacity-100" : "opacity-0"
                              )}>
                                ✓
                              </span>
                              {bank.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Custom bank name input when "Other" is selected */}
            {isOtherBank && (
              <div className="space-y-2">
                <Label htmlFor="customBankName">Enter Bank Name</Label>
                <Input
                  id="customBankName"
                  value={formData.customBankName}
                  onChange={(e) => setFormData({ ...formData, customBankName: e.target.value })}
                  placeholder="Enter your bank's full name"
                />
              </div>
            )}
            
            {(selectedBank || isOtherBank) && (
              <div className="rounded-lg border border-border p-4 bg-muted/50">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{displayBankName || "Enter bank name above"}</p>
                    <p className="text-sm text-muted-foreground">
                      {isOtherBank ? "Custom bank" : selectedBank?.country}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Account Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                placeholder="Enter full name as shown on account"
              />
              <p className="text-xs text-muted-foreground">
                Must match the name on your bank account exactly
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                value={formData.iban}
                onChange={(e) => setFormData({ ...formData, iban: e.target.value.toUpperCase() })}
                placeholder="e.g., KW81CBKU0000000000001234560101"
              />
              <p className="text-xs text-muted-foreground">
                International Bank Account Number
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="swift">BIC/SWIFT Code (Optional)</Label>
              <Input
                id="swift"
                value={formData.swift}
                onChange={(e) => setFormData({ ...formData, swift: e.target.value.toUpperCase() })}
                placeholder="e.g., NABORUWW"
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4 space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Bank</p>
                  <p className="font-medium">{displayBankName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Account Holder</p>
                  <p className="font-medium">{formData.accountHolderName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">IBAN</p>
                  <p className="font-medium font-mono text-sm">{formData.iban}</p>
                </div>
              </div>
              
              {formData.swift && (
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">BIC/SWIFT</p>
                    <p className="font-medium font-mono text-sm">{formData.swift}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="rounded-lg bg-accent/10 p-4">
              <p className="text-sm text-accent">
                Please verify that all details are correct. Incorrect bank details may cause payout delays.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button 
              onClick={handleNext} 
              disabled={!canProceed()}
              className="flex-1 gradient-bg"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="flex-1 gradient-bg"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Confirm & Save
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
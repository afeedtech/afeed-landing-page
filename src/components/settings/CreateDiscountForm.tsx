import { useState } from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { mockProducts } from "./mockData";
import { toast } from "sonner";

export function CreateDiscountForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "fixed" | "free_trial">("percentage");
  const [value, setValue] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [perCustomerLimit, setPerCustomerLimit] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [applyToAll, setApplyToAll] = useState(true);

  const handleSubmit = () => {
    if (!code || !value || !startDate || !endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Discount code "${code}" created successfully!`);
    
    // Reset form
    setCode("");
    setType("percentage");
    setValue("");
    setMaxUses("");
    setPerCustomerLimit("");
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedProducts([]);
    setApplyToAll(true);
    setIsOpen(false);
  };

  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';

  const getValueLabel = () => {
    switch (type) {
      case "percentage":
        return "Discount (%)";
      case "fixed":
        return `Discount Amount (${currencyLabel})`;
      case "free_trial":
        return "Trial Days";
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="gradient-bg">
        <Plus className="h-4 w-4 mr-2" />
        Create Discount Code
      </Button>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h4 className="font-semibold mb-4">Create New Discount Code</h4>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="code">Code *</Label>
          <Input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g., SUMMER25"
          />
        </div>

        <div className="space-y-2">
          <Label>Discount Type *</Label>
          <Select value={type} onValueChange={(v: typeof type) => setType(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage Off</SelectItem>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
              <SelectItem value="free_trial">Free Trial Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">{getValueLabel()} *</Label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={type === "percentage" ? "25" : type === "fixed" ? "10" : "7"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxUses">Total Uses Allowed</Label>
          <Input
            id="maxUses"
            type="number"
            value={maxUses}
            onChange={(e) => setMaxUses(e.target.value)}
            placeholder="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="perCustomer">Per Customer Limit</Label>
          <Input
            id="perCustomer"
            type="number"
            value={perCustomerLimit}
            onChange={(e) => setPerCustomerLimit(e.target.value)}
            placeholder="1"
          />
        </div>

        <div className="space-y-2">
          <Label>Start Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {startDate ? format(startDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>End Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {endDate ? format(endDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="sm:col-span-2 space-y-3">
          <Label>Product Restrictions</Label>
          <div className="flex items-center gap-2 mb-2">
            <Checkbox
              id="applyToAll"
              checked={applyToAll}
              onCheckedChange={(checked) => {
                setApplyToAll(checked as boolean);
                if (checked) setSelectedProducts([]);
              }}
            />
            <label htmlFor="applyToAll" className="text-sm cursor-pointer">
              Apply to all products
            </label>
          </div>
          
          {!applyToAll && (
            <div className="grid gap-2 sm:grid-cols-2">
              {mockProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-2">
                  <Checkbox
                    id={product.id}
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedProducts([...selectedProducts, product.id]);
                      } else {
                        setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                      }
                    }}
                  />
                  <label htmlFor={product.id} className="text-sm cursor-pointer">
                    {product.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button onClick={handleSubmit} className="gradient-bg">
          Create Code
        </Button>
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

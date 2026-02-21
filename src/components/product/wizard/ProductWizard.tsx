import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Save, AlertCircle, FileEdit, Archive } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { WizardStepIndicator } from "./WizardStepIndicator";
import { StepBasics } from "./steps/StepBasics";
import { StepSalesContent } from "./steps/StepSalesContent";
import { StepStructure } from "./steps/StepStructure";
import { StepReview } from "./steps/StepReview";
import { productToFormData, detectSensitiveChanges, hasSensitiveChanges } from "./formDataConverter";
import { ChangeImpactModal } from "../ChangeImpactModal";
import { 
  WIZARD_STEPS, 
  createInitialFormData,
  type WizardStep, 
  type WizardFormData 
} from "./types";
import type { ProductType, Product, ProductStatus } from "@/components/profile/types";

interface ProductWizardProps {
  open: boolean;
  productType: ProductType;
  onClose: () => void;
  onComplete: (product: Partial<Product>, isDraft: boolean) => void;
  // Edit mode props
  editMode?: boolean;
  existingProduct?: Product;
}

export function ProductWizard({ 
  open, 
  productType, 
  onClose, 
  onComplete,
  editMode = false,
  existingProduct,
}: ProductWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>("basics");
  const [completedSteps, setCompletedSteps] = useState<WizardStep[]>([]);
  const [formData, setFormData] = useState<WizardFormData>(() => 
    editMode && existingProduct 
      ? productToFormData(existingProduct) 
      : createInitialFormData(productType)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [changeImpactOpen, setChangeImpactOpen] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<{ pricing: boolean; accessRules: boolean; contentRemoval: boolean } | null>(null);

  // Get product status for edit mode
  const productStatus: ProductStatus | undefined = existingProduct?.status;

  // Initialize form data when editing
  useEffect(() => {
    if (open && editMode && existingProduct) {
      setFormData(productToFormData(existingProduct));
      // In edit mode, all steps are accessible
      setCompletedSteps(["basics", "sales", "structure"]);
    } else if (open && !editMode) {
      setFormData(createInitialFormData(productType));
      setCompletedSteps([]);
    }
    setCurrentStep("basics");
    setErrors({});
  }, [open, editMode, existingProduct, productType]);

  // Reset wizard
  const resetWizard = useCallback(() => {
    setCurrentStep("basics");
    setCompletedSteps([]);
    setFormData(createInitialFormData(productType));
    setErrors({});
  }, [productType]);

  // Handle form data changes
  const handleFormDataChange = useCallback((updates: Partial<WizardFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    const updatedKeys = Object.keys(updates);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedKeys.forEach(key => delete newErrors[key]);
      return newErrors;
    });
  }, []);

  // Validate current step
  const validateStep = useCallback((step: WizardStep): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case "basics":
        if (!formData.title || formData.title.length < 3) {
          newErrors.title = "Title must be at least 3 characters";
        }
        break;

      case "sales":
        if (!formData.description || formData.description.length < 10) {
          newErrors.description = "Description must be at least 10 characters";
        }
        if (!formData.outcomes.some(o => o.trim())) {
          newErrors.outcomes = "Add at least one outcome";
        }
        if (formData.price < 0) {
          newErrors.price = "Price must be positive";
        }
        break;

      case "structure":
        break;

      case "review":
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Navigate to next step
  const handleNext = useCallback(() => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }

    const currentIndex = WIZARD_STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < WIZARD_STEPS.length - 1) {
      setCurrentStep(WIZARD_STEPS[currentIndex + 1].id);
    }
  }, [currentStep, completedSteps, validateStep]);

  // Navigate to previous step
  const handleBack = useCallback(() => {
    const currentIndex = WIZARD_STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(WIZARD_STEPS[currentIndex - 1].id);
    }
  }, [currentStep]);

  // Jump to a specific step
  const handleStepClick = useCallback((step: WizardStep) => {
    // In edit mode, all steps are accessible
    if (editMode || completedSteps.includes(step) || step === currentStep) {
      setCurrentStep(step);
    }
  }, [editMode, completedSteps, currentStep]);

  // Build product from form data
  const buildProduct = useCallback((): Partial<Product> => {
    return {
      type: formData.type,
      title: formData.title,
      subtitle: formData.headline,
      description: formData.description,
      price: formData.price,
      featured: formData.featured,
      image: formData.heroImage || undefined,
      outcomes: formData.outcomes.filter(o => o.trim()),
      faq: formData.faqItems.filter(f => f.question.trim() && f.answer.trim()),
      billingCycle: formData.billingCycle,
      lessons: formData.lessons,
      duration: formData.sessionConfig?.duration ? `${formData.sessionConfig.duration} min` : undefined,
      sessionType: formData.sessionConfig?.sessionType,
      capacity: formData.sessionConfig?.capacity,
      replayEnabled: formData.sessionConfig?.replayEnabled,
      programDuration: formData.programDuration,
      phases: formData.phases,
      benefits: formData.benefits?.filter(b => b.trim()),
      contentCadence: formData.contentCadence,
    };
  }, [formData]);

  // Handle save changes (edit mode)
  const handleSaveChanges = useCallback(() => {
    if (!validateStep("basics") || !validateStep("sales")) {
      toast.error("Please complete all required fields");
      return;
    }

    // Check for sensitive changes on published products
    if (editMode && existingProduct && productStatus === "published") {
      const changes = detectSensitiveChanges(existingProduct, formData);
      if (hasSensitiveChanges(changes)) {
        setPendingChanges(changes);
        setChangeImpactOpen(true);
        return;
      }
    }

    proceedWithSave(false);
  }, [editMode, existingProduct, productStatus, formData, validateStep]);

  // Proceed with save after confirmation
  const proceedWithSave = useCallback((isDraft: boolean) => {
    const product = buildProduct();
    onComplete(product, isDraft);
    
    if (editMode) {
      toast.success("Changes saved successfully");
    } else {
      toast.success(isDraft ? "Product saved as draft" : "Product published successfully!");
    }
    
    resetWizard();
  }, [buildProduct, onComplete, editMode, resetWizard]);

  // Handle publish (from draft/archived in edit mode, or new product)
  const handlePublish = useCallback(() => {
    if (!validateStep("basics") || !validateStep("sales")) {
      toast.error("Please complete all required fields");
      return;
    }

    const product = buildProduct();
    product.status = "published";
    onComplete(product, false);
    
    if (editMode && productStatus === "archived") {
      toast.success("Product restored and published!");
    } else if (editMode) {
      toast.success("Product published!");
    } else {
      toast.success("Product published successfully!");
    }
    
    resetWizard();
  }, [buildProduct, onComplete, resetWizard, validateStep, editMode, productStatus]);

  // Handle save as draft
  const handleSaveDraft = useCallback(() => {
    proceedWithSave(true);
  }, [proceedWithSave]);

  // Handle dialog close
  const handleClose = useCallback(() => {
    onClose();
    setTimeout(resetWizard, 300);
  }, [onClose, resetWizard]);

  // Handle change impact confirmation
  const handleChangeImpactConfirm = useCallback(() => {
    setChangeImpactOpen(false);
    setPendingChanges(null);
    proceedWithSave(false);
  }, [proceedWithSave]);

  const currentStepIndex = WIZARD_STEPS.findIndex(s => s.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === WIZARD_STEPS.length - 1;

  // Get status banner content
  const getStatusBanner = () => {
    if (!editMode || !productStatus) return null;

    switch (productStatus) {
      case "published":
        return {
          icon: AlertCircle,
          text: "You are editing a published product. Changes will apply once saved.",
          variant: "default" as const,
        };
      case "draft":
        return {
          icon: FileEdit,
          text: "This product is a draft and not visible to users.",
          variant: "secondary" as const,
        };
      case "archived":
        return {
          icon: Archive,
          text: "This product is archived and not visible to new users.",
          variant: "secondary" as const,
        };
      default:
        return null;
    }
  };

  const statusBanner = getStatusBanner();

  return (
    <>
      <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-3xl h-[90vh] max-h-[800px] p-0 gap-0 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/30">
            <div className="flex items-center gap-3">
              <WizardStepIndicator
                currentStep={currentStep}
                completedSteps={editMode ? ["basics", "sales", "structure"] : completedSteps}
                onStepClick={handleStepClick}
              />
              {editMode && productStatus && (
                <Badge 
                  variant={productStatus === "published" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {productStatus}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="shrink-0 ml-4"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Status Banner */}
          {statusBanner && (
            <div className={cn(
              "px-6 py-3 flex items-center gap-2 text-sm border-b",
              productStatus === "published" 
                ? "bg-chart-4/10 text-chart-4 border-chart-4/20" 
                : "bg-muted/50 text-muted-foreground"
            )}>
              <statusBanner.icon className="h-4 w-4 shrink-0" />
              {statusBanner.text}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {currentStep === "basics" && (
              <StepBasics
                formData={formData}
                onFormDataChange={handleFormDataChange}
                errors={errors}
              />
            )}
            {currentStep === "sales" && (
              <StepSalesContent
                formData={formData}
                onFormDataChange={handleFormDataChange}
                errors={errors}
              />
            )}
            {currentStep === "structure" && (
              <StepStructure
                formData={formData}
                onFormDataChange={handleFormDataChange}
                errors={errors}
              />
            )}
            {currentStep === "review" && (
              <StepReview
                formData={formData}
                onEditStep={handleStepClick}
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/30">
            <Button
              variant="ghost"
              onClick={handleSaveDraft}
              className="text-muted-foreground"
            >
              <Save className="h-4 w-4 mr-2" />
              {editMode ? "Save & Exit" : "Save & Exit"}
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isFirstStep}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>

              {isLastStep ? (
                <div className="flex items-center gap-2">
                  {/* Edit mode: Published products only show "Save Changes" */}
                  {editMode && productStatus === "published" ? (
                    <Button onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  ) : editMode ? (
                    // Edit mode: Draft/Archived show "Save" + "Publish"
                    <>
                      <Button variant="outline" onClick={handleSaveDraft}>
                        Save Changes
                      </Button>
                      <Button onClick={handlePublish}>
                        Publish
                      </Button>
                    </>
                  ) : (
                    // Create mode: Show "Save as Draft" + "Publish"
                    <>
                      <Button variant="outline" onClick={handleSaveDraft}>
                        Save as Draft
                      </Button>
                      <Button onClick={handlePublish}>
                        Publish
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Impact Modal */}
      {pendingChanges && (
        <ChangeImpactModal
          open={changeImpactOpen}
          productType={formData.type}
          changes={pendingChanges}
          onConfirm={handleChangeImpactConfirm}
          onCancel={() => {
            setChangeImpactOpen(false);
            setPendingChanges(null);
          }}
        />
      )}
    </>
  );
}
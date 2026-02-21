import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Plus, Eye, Settings2, BookOpen, Video, Users, Crown, Check, X, Palette, Sparkles, User, LayoutList, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Profile components
import { ProfileTemplateAuthority } from "@/components/profile/ProfileTemplateAuthority";
import { ProfileTemplateCreator } from "@/components/profile/ProfileTemplateCreator";
import { ProfileTemplateMinimal } from "@/components/profile/ProfileTemplateMinimal";
import { ProfileEditSheet } from "@/components/profile/ProfileEditSheet";
import { ProductTabs, type ProductTabType } from "@/components/profile/ProductTabs";
import { ProductGrid } from "@/components/profile/ProductGrid";
import { ProductWizard } from "@/components/product/wizard/ProductWizard";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { sampleProducts, type ProfileTemplateType, type Product, type ProductType } from "@/components/profile/types";
import { useProfile } from "@/context/ProfileContext";

const profileTemplates = [{
  id: "authority" as ProfileTemplateType,
  name: "Professional Authority",
  description: "Cover image with overlapping profile, left-aligned. Emphasis on credibility.",
  icon: Sparkles
}, {
  id: "creator" as ProfileTemplateType,
  name: "Creator-First",
  description: "Centered profile, personal and approachable layout.",
  icon: User
}, {
  id: "minimal" as ProfileTemplateType,
  name: "Minimal / Product-Led",
  description: "Compact profile, text-forward, clean layout.",
  icon: LayoutList
}];

export default function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { profile: creatorProfile, updateProfile } = useProfile();
  
  const [selectedTemplate, setSelectedTemplate] = useState<ProfileTemplateType>("authority");
  const [previewMode, setPreviewMode] = useState(false);
  const [previewAsPaidUser, setPreviewAsPaidUser] = useState(true);
  const [editPageOpen, setEditPageOpen] = useState(false);
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [products] = useState<Product[]>(sampleProducts);
  const [activeTab, setActiveTab] = useState<ProductTabType>("all");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardProductType, setWizardProductType] = useState<ProductType>("course");
  const [highlightedProductId, setHighlightedProductId] = useState<number | null>(null);
  
  // Refs for product cards
  const productRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Handle scroll to product from hash
  useEffect(() => {
    const hash = location.hash;
    if (hash && hash.startsWith("#product-")) {
      const productId = parseInt(hash.replace("#product-", ""), 10);
      if (!isNaN(productId)) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const productCard = productRefs.current.get(productId);
          if (productCard) {
            productCard.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightedProductId(productId);
            
            // Remove highlight after animation
            setTimeout(() => {
              setHighlightedProductId(null);
            }, 2000);
          }
        }, 100);
      }
    }
  }, [location.hash]);

  // Register product card ref
  const registerProductRef = (id: number, el: HTMLDivElement | null) => {
    if (el) {
      productRefs.current.set(id, el);
    } else {
      productRefs.current.delete(id);
    }
  };

  const handleViewProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleEditProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  // Calculate product counts for tabs (only published products)
  const publishedProducts = products.filter(p => p.status === "published");
  const productCounts: Record<ProductTabType, number> = {
    all: publishedProducts.length,
    featured: publishedProducts.filter(p => p.featured).length,
    courses: publishedProducts.filter(p => p.type === "course").length,
    sessions: publishedProducts.filter(p => p.type === "session").length,
    programs: publishedProducts.filter(p => p.type === "program").length,
    memberships: publishedProducts.filter(p => p.type === "membership").length
  };

  const handleTemplateChange = (templateId: ProfileTemplateType) => {
    setSelectedTemplate(templateId);
    toast.success(`Template changed to ${profileTemplates.find(t => t.id === templateId)?.name}`);
  };

  const openProductWizard = (type: ProductType) => {
    setWizardProductType(type);
    setWizardOpen(true);
  };

  const handleProductCreated = (productData: Partial<Product>, isDraft: boolean) => {
    setWizardOpen(false);
  };

  // Render appropriate profile template
  const renderProfileTemplate = (isEditMode: boolean, showAsPaidUser: boolean = false) => {
    const props = {
      profile: creatorProfile,
      isEditing: isEditMode && !previewMode,
      onEditClick: () => setProfileEditOpen(true),
      viewerIsPaidUser: showAsPaidUser,
    };
    switch (selectedTemplate) {
      case "authority":
        return <ProfileTemplateAuthority {...props} />;
      case "creator":
        return <ProfileTemplateCreator {...props} />;
      case "minimal":
        return <ProfileTemplateMinimal {...props} />;
      default:
        return <ProfileTemplateAuthority {...props} />;
    }
  };

  // Preview Mode View - Clean, no edit controls
  if (previewMode) {
    return (
      <DashboardLayout>
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Exit Preview Banner with Visitor/Paid User Toggle */}
          <div className="fixed top-20 sm:top-4 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-2 sm:gap-4">
            <Eye className="h-4 w-4 hidden sm:block" />
            
            {/* Visitor / Paid User Toggle */}
            <div className="flex gap-1 bg-background/20 rounded-full p-0.5">
              <button
                onClick={() => setPreviewAsPaidUser(false)}
                className={cn(
                  "px-3 py-1 text-xs rounded-full transition-colors",
                  !previewAsPaidUser ? "bg-background text-foreground" : "text-background/70 hover:text-background"
                )}
              >
                Visitor
              </button>
              <button
                onClick={() => setPreviewAsPaidUser(true)}
                className={cn(
                  "px-3 py-1 text-xs rounded-full transition-colors",
                  previewAsPaidUser ? "bg-background text-foreground" : "text-background/70 hover:text-background"
                )}
              >
                Paid User
              </button>
            </div>
            
            <Button size="sm" variant="secondary" onClick={() => setPreviewMode(false)} className="h-7 text-xs sm:text-sm">
              <X className="h-3 w-3 mr-1" />
              Exit
            </Button>
          </div>

          {/* Clean Page Preview */}
          <div className="max-w-4xl mx-auto pt-8 sm:pt-12 space-y-6 sm:space-y-8 animate-fade-in">
            {/* Hero Section - Profile Template - Show based on preview toggle */}
            {renderProfileTemplate(false, previewAsPaidUser)}

            {/* Product Navigation Tabs */}
            <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} counts={productCounts} className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm py-2 -mx-4 px-4" />

            {/* Product Grid */}
            <ProductGrid 
              products={products} 
              activeTab={activeTab} 
              isEditMode={false}
              highlightedProductId={highlightedProductId}
              onRegisterRef={registerProductRef}
            />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Edit Mode View - With inline controls
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t('myPage.title')}</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {t('myPage.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {/* Add Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-9 sm:h-10 px-3 sm:px-4 rounded-full text-sm">
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline ms-1">{t('common.add')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover">
                <DropdownMenuItem onClick={() => openProductWizard("course")}>
                  <BookOpen className="h-4 w-4 me-2" />
                  {t('myPage.addCourse')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openProductWizard("session")}>
                  <Video className="h-4 w-4 me-2" />
                  {t('myPage.addSession')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openProductWizard("program")}>
                  <Crown className="h-4 w-4 me-2" />
                  {t('myPage.addProgram')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openProductWizard("membership")}>
                  <Users className="h-4 w-4 me-2" />
                  {t('myPage.addMembership')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit Button */}
            <Sheet open={editPageOpen} onOpenChange={setEditPageOpen}>
              <SheetTrigger asChild>
                <Button className="h-9 sm:h-10 px-3 sm:px-4 rounded-full text-sm">
                  <Settings2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline ms-1">{t('common.edit')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:w-[400px] md:w-[540px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{t('myPage.editPageLayout')}</SheetTitle>
                  <SheetDescription>
                    {t('myPage.editPageDescription')}
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {/* Template Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">{t('myPage.profileTemplate')}</Label>
                    <div className="space-y-2">
                      {profileTemplates.map(template => {
                        const IconComponent = template.icon;
                        return (
                          <button 
                            key={template.id} 
                            onClick={() => handleTemplateChange(template.id)} 
                            className={cn(
                              "w-full text-left rounded-lg border p-3 transition-all", 
                              selectedTemplate === template.id 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-sm">{template.name}</span>
                              </div>
                              {selectedTemplate === template.id && <Check className="h-4 w-4 text-primary" />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 ml-6">
                              {template.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manage Products Link */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">{t('sidebar.products')}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t('myPage.manageProductsDescription')}
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/products">
                        <ExternalLink className="h-4 w-4 me-2" />
                        {t('myPage.manageProducts')}
                      </Link>
                    </Button>
                  </div>

                  {/* Theme Colors */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      {t('myPage.themeColors')}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {t('myPage.themeColorsDescription')}
                    </p>
                    <ThemeSelector />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Preview Button */}
            <Button className="h-9 sm:h-10 px-3 sm:px-4 rounded-full text-sm" onClick={() => setPreviewMode(true)}>
              <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline ms-1">{t('common.preview')}</span>
            </Button>
          </div>
        </div>

        {/* Page Preview with Edit Indicators */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up">
          {/* Browser Chrome - Hidden on mobile */}
          <div className="hidden sm:flex bg-muted/50 px-4 py-2 border-b border-border items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">afeed.co/hisham-abdoh</span>
            </div>
            <Badge variant="secondary" className="text-xs">{t('myPage.editMode')}</Badge>
          </div>

          {/* Page Content */}
          <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
            {/* Hero Section - Profile Template */}
            {renderProfileTemplate(true, false)}

            {/* Product Navigation Tabs */}
            <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} counts={productCounts} />

            {/* Product Grid */}
            <ProductGrid 
              products={products} 
              activeTab={activeTab} 
              isEditMode={true} 
              onAddProduct={openProductWizard} 
              onViewProduct={handleViewProduct} 
              onEditProduct={handleEditProduct}
              highlightedProductId={highlightedProductId}
              onRegisterRef={registerProductRef}
            />
          </div>
        </div>

        {/* Product Wizard */}
        <ProductWizard open={wizardOpen} productType={wizardProductType} onClose={() => setWizardOpen(false)} onComplete={handleProductCreated} />

        {/* Profile Edit Sheet */}
        <ProfileEditSheet open={profileEditOpen} onOpenChange={setProfileEditOpen} profile={creatorProfile} onProfileChange={updateProfile} selectedTemplate={selectedTemplate} />
      </div>
    </DashboardLayout>
  );
}
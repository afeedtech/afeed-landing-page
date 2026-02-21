import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";
import { Plus, Search, MoreVertical, Eye, Edit, BookOpen, Video, Crown, Users, Archive, RotateCcw, Globe, AlertTriangle, LayoutGrid, CheckCircle, FileEdit, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ProductWizard } from "@/components/product/wizard/ProductWizard";
import { DeleteProductModal } from "@/components/product/DeleteProductModal";
import { sampleProducts, type Product, type ProductStatus, type ProductType } from "@/components/profile/types";

type StatusTab = "all" | "published" | "draft" | "archived";

const productTypeKeys = [
  { value: "course", key: "course", icon: BookOpen },
  { value: "session", key: "session", icon: Video },
  { value: "program", key: "program", icon: Crown },
  { value: "membership", key: "membership", icon: Users },
];

const statusTabKeys = [
  { id: "all" as StatusTab, key: "all", icon: LayoutGrid },
  { id: "published" as StatusTab, key: "published", icon: CheckCircle },
  { id: "draft" as StatusTab, key: "drafts", icon: FileEdit },
  { id: "archived" as StatusTab, key: "archived", icon: Archive },
];

export default function Products() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  // Build translated arrays
  const productTypes = productTypeKeys.map(type => ({
    ...type,
    label: t(`products.types.${type.key}`),
  }));
  
  const statusTabs = statusTabKeys.map(tab => ({
    ...tab,
    label: t(`products.status.${tab.key}`),
  }));
  
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusTab, setStatusTab] = useState<StatusTab>("all");
  const [typeSelectOpen, setTypeSelectOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardProductType, setWizardProductType] = useState<ProductType>("course");
  const [archiveConfirm, setArchiveConfirm] = useState<Product | null>(null);
  
  // Edit mode state
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  
  // Delete state
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);
  const [deleteBlocked, setDeleteBlocked] = useState(false);
  const [deleteBlockReason, setDeleteBlockReason] = useState("");

  // Filter products by search and status
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusTab === "all" || product.status === statusTab;
    return matchesSearch && matchesStatus;
  });

  // Count products by status
  const statusCounts = {
    all: products.length,
    published: products.filter(p => p.status === "published").length,
    draft: products.filter(p => p.status === "draft").length,
    archived: products.filter(p => p.status === "archived").length,
  };

  const openWizardWithType = (type: ProductType) => {
    setWizardProductType(type);
    setTypeSelectOpen(false);
    setEditProduct(null);
    setWizardOpen(true);
  };

  const handleWizardComplete = (productData: Partial<Product>, isDraft: boolean) => {
    if (editProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editProduct.id 
          ? { 
              ...p, 
              ...productData, 
              status: productData.status || (isDraft ? "draft" : p.status)
            } 
          : p
      ));
      toast.success(t('products.toasts.changesSaved'));
      setEditProduct(null);
    } else {
      // Create new product
      const product: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        title: productData.title || "Untitled",
        description: productData.description || "",
        type: productData.type || "course",
        price: productData.price || 0,
        status: isDraft ? "draft" : "published",
        salesCount: 0,
        revenue: 0,
        activeCustomers: 0,
        image: productData.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
        ...productData,
      };
      setProducts([product, ...products]);
    }
    setWizardOpen(false);
  };

  const handleStatusChange = (productId: number, newStatus: ProductStatus) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, status: newStatus } : p
    ));
    
    const statusMessages: Record<ProductStatus, string> = {
      published: t('products.toasts.published'),
      draft: t('products.toasts.movedToDrafts'),
      archived: t('products.toasts.archived'),
    };
    toast.success(statusMessages[newStatus]);
  };

  const handleArchiveClick = (product: Product) => {
    setArchiveConfirm(product);
  };

  const confirmArchive = () => {
    if (archiveConfirm) {
      handleStatusChange(archiveConfirm.id, "archived");
      setArchiveConfirm(null);
    }
  };

  // Handle Edit Product
  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setWizardProductType(product.type);
    setWizardOpen(true);
  };

  // Handle View on My Page
  const handleViewOnMyPage = (product: Product) => {
    navigate(`/my-page#product-${product.id}`);
  };

  // Handle Delete Click
  const handleDeleteClick = (product: Product) => {
    // Check if product is included in any active membership
    const isInActiveMembership = products.some(
      p => p.type === "membership" && 
      p.status === "published" && 
      p.includedContentIds?.includes(product.id)
    );
    
    if (isInActiveMembership) {
      setDeleteBlocked(true);
      setDeleteBlockReason("This product is part of an active membership and cannot be deleted.");
    } else {
      setDeleteBlocked(false);
      setDeleteBlockReason("");
    }
    
    setDeleteConfirm(product);
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (deleteConfirm) {
      setProducts(products.filter(p => p.id !== deleteConfirm.id));
      toast.success(t('products.toasts.deleted'));
      setDeleteConfirm(null);
    }
  };

  const getTypeIcon = (type: ProductType) => {
    const productType = productTypes.find((t) => t.value === type);
    return productType?.icon || BookOpen;
  };

  const getStatusBadge = (status: ProductStatus) => {
    const styles: Record<ProductStatus, string> = {
      published: "bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white",
      draft: "bg-gradient-to-br from-brand-amber to-brand-amber-dark text-white",
      archived: "bg-gradient-to-br from-brand-gray to-brand-gray-dark text-white",
    };
    return styles[status];
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t('products.title')}</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {t('products.subtitle')}
            </p>
          </div>
          {/* Type Selection Dialog */}
          <Dialog open={typeSelectOpen} onOpenChange={setTypeSelectOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t('products.createNew')}</DialogTitle>
                <DialogDescription>
                  {t('products.createDescription')}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 py-4">
                {productTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => openWizardWithType(type.value as ProductType)}
                    className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Create Product Button */}
          <Button 
            className="gradient-bg hover:opacity-90 transition-opacity"
            onClick={() => setTypeSelectOpen(true)}
          >
            <Plus className="h-4 w-4 me-2" />
            {t('products.createProduct')}
          </Button>
        </div>

        {/* Status Tabs */}
        <div className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "25ms" }}>
          <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {statusTabs.map((tab) => {
              const Icon = tab.icon;
              const count = statusCounts[tab.id];
              const isActive = statusTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <span className={cn(
                    "ml-1 text-xs px-1.5 py-0.5 rounded-full",
                    isActive 
                      ? "bg-primary-foreground/20 text-primary-foreground" 
                      : "bg-muted-foreground/20 text-muted-foreground"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "50ms" }}>
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('products.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-10"
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">
              {searchQuery 
                ? t('products.empty.noResults') 
                : statusTab === "all" 
                  ? t('products.empty.noProducts') 
                  : t('products.empty.noStatusProducts', { status: statusTab })}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">
              {searchQuery 
                ? t('products.empty.tryDifferent') 
                : t('products.empty.createFirst')}
            </p>
            {!searchQuery && statusTab !== "archived" && (
              <Button className="mt-4" onClick={() => setTypeSelectOpen(true)}>
                <Plus className="h-4 w-4 me-2" />
                {t('products.createProduct')}
              </Button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => {
              const TypeIcon = getTypeIcon(product.type);
              return (
                <div
                  key={product.id}
                  className={cn(
                    "group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 animate-slide-up",
                    product.status === "archived" && "opacity-75"
                  )}
                  style={{ animationDelay: `${100 + index * 50}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={product.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"}
                      alt={product.title}
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
                        product.status === "archived" && "grayscale"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge
                      className={cn(
                        "absolute top-3 right-3",
                        getStatusBadge(product.status)
                      )}
                    >
                      {product.status}
                    </Badge>
                    {product.featured && product.status === "published" && (
                      <Badge
                        className="absolute top-3 left-3 bg-gradient-to-br from-brand-purple to-brand-violet text-white border-0"
                      >
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                        <TypeIcon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-white capitalize">
                        {product.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/product/${product.id}`)}>
                            <Eye className="h-4 w-4 me-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                            <Edit className="h-4 w-4 me-2" />
                            Edit
                          </DropdownMenuItem>
                          
                          {product.status === "published" && (
                            <>
                              <DropdownMenuItem onClick={() => handleViewOnMyPage(product)}>
                                <Globe className="h-4 w-4 me-2" />
                                View on My Page
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleArchiveClick(product)}>
                                <Archive className="h-4 w-4 me-2" />
                                Archive
                              </DropdownMenuItem>
                            </>
                          )}
                          
                          {product.status === "draft" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleStatusChange(product.id, "published")}>
                                <Globe className="h-4 w-4 me-2" />
                                Publish
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleArchiveClick(product)}>
                                <Archive className="h-4 w-4 me-2" />
                                Archive
                              </DropdownMenuItem>
                            </>
                          )}
                          
                          {product.status === "archived" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleStatusChange(product.id, "draft")}>
                                <RotateCcw className="h-4 w-4 me-2" />
                                Restore to Draft
                              </DropdownMenuItem>
                            </>
                          )}
                          
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash2 className="h-4 w-4 me-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-2xl font-bold">
                        {product.price === 0 ? "Free" : formatCurrency(product.price, language)}
                      </p>
                      {product.salesCount > 0 && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-accent">
                            {formatCurrency(product.revenue, language)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.salesCount} sales
                          </p>
                        </div>
                      )}
                    </div>
                    {product.activeCustomers > 0 && product.status === "published" && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          {product.activeCustomers} active customer{product.activeCustomers !== 1 ? "s" : ""}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Archive Confirmation Dialog */}
        <AlertDialog open={archiveConfirm !== null} onOpenChange={(open) => !open && setArchiveConfirm(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-muted-foreground" />
                Archive this product?
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <ul className="list-disc list-inside space-y-1.5 text-sm">
                  <li>This product will no longer be visible to new users</li>
                  <li>Existing users will retain access</li>
                  <li>You can restore this product later</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmArchive}>
                Confirm Archive
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Confirmation Modal */}
        <DeleteProductModal
          product={deleteConfirm}
          isBlocked={deleteBlocked}
          blockReason={deleteBlockReason}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />

        {/* Product Wizard */}
        <ProductWizard 
          open={wizardOpen} 
          productType={wizardProductType} 
          onClose={() => {
            setWizardOpen(false);
            setEditProduct(null);
          }} 
          onComplete={handleWizardComplete}
          editMode={!!editProduct}
          existingProduct={editProduct || undefined}
        />
      </div>
    </DashboardLayout>
  );
}
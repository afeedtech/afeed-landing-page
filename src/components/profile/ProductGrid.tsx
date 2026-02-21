import { BookOpen, Video, Crown, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import type { Product, ProductType } from "./types";
import type { ProductTabType } from "./ProductTabs";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  activeTab: ProductTabType;
  isEditMode?: boolean;
  onAddProduct?: (type: ProductType) => void;
  onEditProduct?: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
  highlightedProductId?: number | null;
  onRegisterRef?: (id: number, el: HTMLDivElement | null) => void;
  className?: string;
}

const emptyStates: Record<ProductTabType, { icon: React.ElementType; title: string; description: string }> = {
  all: { icon: BookOpen, title: "No products yet", description: "Start adding courses, sessions, and more to showcase your offerings." },
  featured: { icon: BookOpen, title: "No featured products", description: "Mark products as featured to highlight them here." },
  courses: { icon: BookOpen, title: "No courses yet", description: "Create your first course to share your knowledge." },
  sessions: { icon: Video, title: "No sessions yet", description: "Schedule live sessions to connect with your audience." },
  programs: { icon: Crown, title: "No programs yet", description: "Create a comprehensive program to bundle your offerings." },
  memberships: { icon: Users, title: "No memberships yet", description: "Set up a membership to build a recurring community." },
};

export function ProductGrid({ 
  products, 
  activeTab, 
  isEditMode, 
  onAddProduct, 
  onEditProduct, 
  onViewProduct,
  highlightedProductId,
  onRegisterRef,
  className 
}: ProductGridProps) {
  // Filter products based on active tab
  const filteredProducts = products.filter((product) => {
    // Only show published products
    if (product.status !== "published") return false;
    
    switch (activeTab) {
      case "all":
        return true;
      case "featured":
        return product.featured === true;
      case "courses":
        return product.type === "course";
      case "sessions":
        return product.type === "session";
      case "programs":
        return product.type === "program";
      case "memberships":
        return product.type === "membership";
      default:
        return true;
    }
  });

  const emptyState = emptyStates[activeTab];
  const EmptyIcon = emptyState.icon;

  // Get the product type for "Add" button based on active tab
  const getAddProductType = (): ProductType | null => {
    switch (activeTab) {
      case "courses":
        return "course";
      case "sessions":
        return "session";
      case "programs":
        return "program";
      case "memberships":
        return "membership";
      default:
        return null;
    }
  };

  // Wrapper component for product cards with ref registration
  const ProductCardWrapper = ({ product }: { product: Product }) => {
    const isHighlighted = highlightedProductId === product.id;
    
    return (
      <div
        ref={(el) => onRegisterRef?.(product.id, el)}
        className={cn(
          "transition-all duration-500",
          isHighlighted && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-xl animate-pulse"
        )}
      >
        <ProductCard 
          product={product} 
          isEditMode={isEditMode} 
          onEdit={onEditProduct} 
          onView={onViewProduct} 
        />
      </div>
    );
  };

  if (filteredProducts.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <EmptyIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg">{emptyState.title}</h3>
        <p className="text-muted-foreground text-sm mt-1 max-w-sm">{emptyState.description}</p>
        {isEditMode && getAddProductType() && onAddProduct && (
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => onAddProduct(getAddProductType()!)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab.slice(0, -1)}
          </Button>
        )}
      </div>
    );
  }

  // Group products by type for "all" tab for better organization
  if (activeTab === "all" || activeTab === "featured") {
    // Sort: programs first, then memberships, then courses, then sessions
    const sortOrder: ProductType[] = ["program", "membership", "course", "session"];
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
    });

    return (
      <div className={cn("space-y-4", className)}>
        {/* Programs and memberships - full width */}
        {sortedProducts
          .filter(p => p.type === "program" || p.type === "membership")
          .map((product) => (
            <ProductCardWrapper key={product.id} product={product} />
          ))}
        
        {/* Courses and sessions - grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {sortedProducts
            .filter(p => p.type === "course" || p.type === "session")
            .map((product) => (
              <ProductCardWrapper key={product.id} product={product} />
            ))}
        </div>
      </div>
    );
  }

  // For specific tabs, show in grid (except programs and memberships)
  if (activeTab === "programs" || activeTab === "memberships") {
    return (
      <div className={cn("space-y-4", className)}>
        {filteredProducts.map((product) => (
          <ProductCardWrapper key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {filteredProducts.map((product) => (
        <ProductCardWrapper key={product.id} product={product} />
      ))}
    </div>
  );
}
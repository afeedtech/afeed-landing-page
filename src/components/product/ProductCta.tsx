import { ArrowRight, Play, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/components/profile/types";

interface ProductCtaProps {
  product: Product;
  hasAccess: boolean;
  size?: "default" | "lg" | "sm";
  className?: string;
}

export function ProductCta({ product, hasAccess, size = "default", className }: ProductCtaProps) {
  const getCtaText = () => {
    if (hasAccess) {
      // Post-purchase state
      return product.type === "session" ? "Join Session" : "Continue Learning";
    }
    
    // Pre-purchase state
    if (product.price === 0) {
      return "Get Access";
    }
    return "Buy Now";
  };

  const getCtaIcon = () => {
    if (hasAccess) {
      return <Play className="h-4 w-4 ml-2" />;
    }
    if (product.price === 0) {
      return <ArrowRight className="h-4 w-4 ml-2" />;
    }
    return <ShoppingCart className="h-4 w-4 ml-2" />;
  };

  return (
    <Button
      size={size}
      className={cn(
        "gradient-bg hover:opacity-90 transition-opacity",
        size === "lg" && "px-8 py-6 text-lg",
        className
      )}
    >
      {getCtaText()}
      {getCtaIcon()}
    </Button>
  );
}

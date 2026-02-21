import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Product } from "@/components/profile/types";
import { ProductCta } from "./ProductCta";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";

interface ProductHeroProps {
  product: Product;
  hasAccess: boolean;
  className?: string;
}

export function ProductHero({ product, hasAccess, className }: ProductHeroProps) {
  const { language } = useLanguage();
  const priceDisplay = product.price === 0 ? "Free" : formatCurrency(product.price, language);
  
  return (
    <div className={cn("relative", className)}>
      {/* Background with gradient overlay */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-border">
        {/* Product Image or Video */}
        <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
          {product.promoVideoUrl ? (
            <div className="relative w-full h-full bg-black/90 flex items-center justify-center">
              <video
                src={product.promoVideoUrl}
                className="w-full h-full object-cover"
                controls
                poster={product.image}
              />
            </div>
          ) : product.image ? (
            <>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
          )}
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-2xl space-y-4">
            {/* Product type badge */}
            <Badge variant="secondary" className="capitalize">
              {product.type}
            </Badge>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-foreground">
              {product.title}
            </h1>

            {/* Subtitle */}
            {product.subtitle && (
              <p className="text-lg text-muted-foreground">
                {product.subtitle}
              </p>
            )}

            {/* Price and CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="text-2xl font-bold text-foreground">
                {priceDisplay}
              </div>
              <ProductCta product={product} hasAccess={hasAccess} size="lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Promo video hint for creators (shown in edit mode) */}
      {!product.promoVideoUrl && (
        <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
          <Play className="h-3 w-3" />
          <span>Tip: Short videos (30-90 seconds) help increase conversion.</span>
        </div>
      )}
    </div>
  );
}

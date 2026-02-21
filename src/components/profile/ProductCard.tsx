import { BookOpen, Video, Crown, Users, Sparkles, Clock, User, Calendar, MoreVertical, Eye, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Product, ProductType } from "./types";

interface ProductCardProps {
  product: Product;
  className?: string;
  isEditMode?: boolean;
  onEdit?: (product: Product) => void;
  onView?: (product: Product) => void;
}

const typeConfig: Record<ProductType, { icon: React.ElementType; label: string }> = {
  course: { icon: BookOpen, label: "Course" },
  session: { icon: Video, label: "Session" },
  program: { icon: Crown, label: "Program" },
  membership: { icon: Users, label: "Membership" },
};

export function ProductCard({ product, className, isEditMode, onEdit, onView }: ProductCardProps) {
  const config = typeConfig[product.type];
  const Icon = config.icon;

  // Action menu for edit mode
  const ActionMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background shadow-sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuItem onClick={() => onView?.(product)}>
          <Eye className="h-4 w-4 mr-2" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit?.(product)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const getCtaText = () => {
    switch (product.type) {
      case "course":
        return "Enroll";
      case "session":
        return "Book";
      case "program":
        return "Enroll Now";
      case "membership":
        return "Join";
      default:
        return "Get Started";
    }
  };

  const getPriceDisplay = () => {
    if (product.price === 0) return "Free";
    if (product.type === "membership" && product.billingCycle) {
      return `${product.price} KWD/${product.billingCycle === "monthly" ? "mo" : "yr"}`;
    }
    return `${product.price} KWD`;
  };

  // Membership card - special layout
  if (product.type === "membership") {
    return (
      <div className={cn(
        "relative rounded-xl border-2 border-accent/30 bg-accent/5 p-6 transition-all hover:shadow-elevated",
        className
      )}>
        {isEditMode && (
          <div className="absolute top-3 right-3 z-10">
            <ActionMenu />
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-brand-highlight text-brand-highlight-foreground border-0">
                <Icon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
              {product.featured && (
                <Badge className="text-xs bg-brand-highlight text-brand-highlight-foreground border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <h4 className="text-xl font-bold">{product.title}</h4>
            <p className="text-muted-foreground mt-1">{product.description}</p>
            {product.benefits && product.benefits.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-accent/20 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="text-left md:text-right md:flex md:flex-col md:justify-end">
            <p className="text-3xl font-bold text-primary">{product.price} KWD</p>
            <p className="text-sm text-muted-foreground">/{product.billingCycle || "month"}</p>
            <Button className="mt-4">{getCtaText()}</Button>
          </div>
        </div>
      </div>
    );
  }

  // Program card - highlighted layout
  if (product.type === "program") {
    return (
      <div className={cn(
        "relative rounded-xl border border-primary/20 bg-primary/5 p-6 transition-all hover:shadow-elevated",
        className
      )}>
        {isEditMode && (
          <div className="absolute top-3 right-3 z-10">
            <ActionMenu />
          </div>
        )}
        <div className="flex items-stretch gap-4">
          <div className="w-16 h-16 rounded-lg brand-gradient-primary flex items-center justify-center shrink-0">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className="text-xs bg-brand-highlight text-brand-highlight-foreground border-0">
                <Icon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
              {product.featured && (
                <Badge className="text-xs bg-brand-highlight text-brand-highlight-foreground border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <h4 className="font-semibold">{product.title}</h4>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <p className="text-lg font-bold text-primary mt-1">{getPriceDisplay()}</p>
          </div>
          <div className="flex flex-col justify-end">
            <Button>{getCtaText()}</Button>
          </div>
        </div>
      </div>
    );
  }

  // Session card - Modern design matching course card size
  if (product.type === "session") {
    const isGroupSession = product.capacity && product.capacity > 1;
    const isAvailable = product.status === "published" && 
      (!product.capacity || !product.enrolled || product.enrolled < product.capacity);
    const isSoldOut = product.capacity && product.enrolled && product.enrolled >= product.capacity;
    
    return (
      <div className={cn(
        "rounded-xl border border-border overflow-hidden transition-all hover:shadow-elevated group",
        className
      )}>
        {/* Visual Header - matching course card aspect-video */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-cyan-300/20 blur-2xl" />
          </div>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10" />
          
          {/* Centered icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
              <Video className="h-10 w-10 text-white" />
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge className="text-xs bg-brand-highlight text-brand-highlight-foreground border-0 shadow-sm">
              {isGroupSession ? <Users className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
              {isGroupSession ? "Group Session" : "1:1 Session"}
            </Badge>
            {product.featured && (
              <Badge className="text-xs bg-brand-highlight text-brand-highlight-foreground border-0 shadow-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          
          {/* Availability indicator */}
          <div className="absolute bottom-3 right-3">
            <Badge className={cn(
              "text-xs border-0 shadow-sm text-white",
              isAvailable 
                ? "bg-gradient-to-r from-emerald-500 to-green-600" 
                : "bg-gradient-to-r from-red-500 to-rose-600"
            )}>
              <Calendar className="h-3 w-3 mr-1" />
              {isAvailable ? "Available" : (isSoldOut ? "Sold Out" : "Unavailable")}
            </Badge>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-lg">{product.title}</h4>
            {isEditMode && <ActionMenu />}
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
          
          {/* Session Details Row */}
          <div className="flex items-center gap-4 mt-3">
            {product.duration && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>{product.duration}</span>
              </div>
            )}
            {product.capacity && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>{product.capacity} spots</span>
              </div>
            )}
          </div>
          
          {/* Price and CTA */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-primary">{getPriceDisplay()}</span>
            <Button>{getCtaText()}</Button>
          </div>
        </div>
      </div>
    );
  }

  // Course card - default with image
  return (
    <div className={cn(
      "rounded-xl border border-border overflow-hidden transition-all hover:shadow-elevated group",
      className
    )}>
      {product.image ? (
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge className="text-xs bg-brand-highlight text-brand-highlight-foreground border-0">
              <Icon className="h-3 w-3 mr-1" />
              {config.label}
            </Badge>
            {product.featured && (
              <Badge className="text-xs bg-brand-highlight text-brand-highlight-foreground border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
        </div>
      ) : (
        <div className="relative aspect-video bg-muted flex items-center justify-center">
          <Icon className="h-12 w-12 text-muted-foreground/50" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold">{product.title}</h4>
          {isEditMode && <ActionMenu />}
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-primary">{getPriceDisplay()}</span>
          <Button size="sm" variant="outline">{getCtaText()}</Button>
        </div>
      </div>
    </div>
  );
}

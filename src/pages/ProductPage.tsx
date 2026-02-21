import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Eye, User } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Product components
import { ProductHero } from "@/components/product/ProductHero";
import { ProductOutcomes } from "@/components/product/ProductOutcomes";
import { ProductCreator } from "@/components/product/ProductCreator";
import { ProductFaq } from "@/components/product/ProductFaq";

// Type-specific components
import { CourseLessonList } from "@/components/product/course/CourseLessonList";
import { SessionDetails } from "@/components/product/session/SessionDetails";
import { ProgramTimeline } from "@/components/product/program/ProgramTimeline";
import { MembershipPricing } from "@/components/product/membership/MembershipPricing";

// Types and data
import { sampleProducts, defaultProfile, Product } from "@/components/profile/types";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [hasAccess, setHasAccess] = useState(false);

  // Find product by ID
  const product = sampleProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The product you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Render type-specific content
  const renderTypeSpecificContent = () => {
    switch (product.type) {
      case "course":
        return product.lessons && (
          <CourseLessonList
            lessons={product.lessons}
            hasAccess={hasAccess}
          />
        );
      case "session":
        return (
          <SessionDetails
            product={product}
            hasAccess={hasAccess}
          />
        );
      case "program":
        return product.phases && (
          <ProgramTimeline
            phases={product.phases}
            programDuration={product.programDuration}
            hasAccess={hasAccess}
          />
        );
      case "membership":
        return (
          <MembershipPricing
            product={product}
            hasAccess={hasAccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header with back button and demo toggle */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <Button variant="ghost" asChild>
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>

          {/* Demo Access Toggle */}
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="access-toggle" className="text-sm">
                View as:
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm", !hasAccess && "font-medium")}>Visitor</span>
              <Switch
                id="access-toggle"
                checked={hasAccess}
                onCheckedChange={setHasAccess}
              />
              <span className={cn("text-sm", hasAccess && "font-medium")}>Customer</span>
            </div>
          </div>
        </div>

        {/* Status badge for drafts/archived */}
        {product.status !== "published" && (
          <div className="mb-6 animate-fade-in">
            <Badge
              variant={product.status === "draft" ? "secondary" : "outline"}
              className="text-sm"
            >
              {product.status === "draft" ? "Draft - Not visible to visitors" : "Archived"}
            </Badge>
          </div>
        )}

        {/* Product Page Content */}
        <div className="max-w-4xl mx-auto space-y-12 animate-slide-up">
          {/* A. Hero Section */}
          <ProductHero product={product} hasAccess={hasAccess} />

          {/* B. What You'll Get (Pre-purchase only for sales focus) */}
          {!hasAccess && product.outcomes && (
            <ProductOutcomes outcomes={product.outcomes} />
          )}

          {/* C. Product-Specific Content */}
          {renderTypeSpecificContent()}

          <Separator />

          {/* D. About the Creator (Collapsible in post-purchase) */}
          <ProductCreator
            profile={defaultProfile}
            isCollapsible={hasAccess}
          />

          {/* E. FAQ (Pre-purchase only) */}
          {!hasAccess && product.faq && (
            <ProductFaq faq={product.faq} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

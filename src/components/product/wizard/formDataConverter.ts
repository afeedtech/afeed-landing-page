import type { Product } from "@/components/profile/types";
import type { WizardFormData } from "./types";

/**
 * Converts a Product to WizardFormData for editing
 */
export function productToFormData(product: Product): WizardFormData {
  return {
    type: product.type,
    title: product.title,
    headline: product.subtitle || "",
    featured: product.featured || false,
    heroImage: product.image || null,
    description: product.description,
    outcomes: product.outcomes?.length ? product.outcomes : [""],
    faqItems: product.faq || [],
    price: product.price,
    billingCycle: product.billingCycle as "monthly" | "quarterly" | "yearly" | undefined,
    
    // Course-specific
    lessons: product.lessons || undefined,
    
    // Session-specific
    sessionConfig: product.sessionType ? {
      duration: product.duration?.replace(" min", "") || "60",
      sessionType: product.sessionType,
      capacity: product.capacity,
      replayEnabled: product.replayEnabled ?? true,
      resources: product.resources || [],
    } : undefined,
    
    // Program-specific
    programDuration: product.programDuration || undefined,
    phases: product.phases || undefined,
    
    // Membership-specific
    benefits: product.benefits?.length ? product.benefits : undefined,
    pricingOptions: product.pricingOptions || undefined,
    contentCadence: product.contentCadence || undefined,
  };
}

/**
 * Detects sensitive changes between original product and updated form data
 */
export function detectSensitiveChanges(
  original: Product,
  updated: WizardFormData
): { pricing: boolean; accessRules: boolean; contentRemoval: boolean } {
  const changes = {
    pricing: false,
    accessRules: false,
    contentRemoval: false,
  };

  // Check pricing changes
  if (original.price !== updated.price) {
    changes.pricing = true;
  }

  // Check billing cycle changes for memberships
  if (original.type === "membership" && original.billingCycle !== updated.billingCycle) {
    changes.pricing = true;
  }

  // Check access rule changes (capacity, duration)
  if (original.type === "session") {
    const originalCapacity = original.capacity;
    const updatedCapacity = updated.sessionConfig?.capacity;
    if (originalCapacity !== updatedCapacity) {
      changes.accessRules = true;
    }
  }

  // Check content removal (lessons, phases)
  if (original.type === "course" && original.lessons && updated.lessons) {
    if (original.lessons.length > updated.lessons.length) {
      changes.contentRemoval = true;
    }
  }

  if (original.type === "program" && original.phases && updated.phases) {
    if (original.phases.length > updated.phases.length) {
      changes.contentRemoval = true;
    }
  }

  return changes;
}

/**
 * Checks if any sensitive changes were detected
 */
export function hasSensitiveChanges(
  changes: { pricing: boolean; accessRules: boolean; contentRemoval: boolean }
): boolean {
  return changes.pricing || changes.accessRules || changes.contentRemoval;
}
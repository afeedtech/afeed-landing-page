import { z } from "zod";
import type { ProductType, Lesson, FaqItem, ProgramPhase, PricingOption, SessionResource } from "@/components/profile/types";

export type WizardStep = "basics" | "sales" | "structure" | "review";

export const WIZARD_STEPS: { id: WizardStep; label: string; number: number }[] = [
  { id: "basics", label: "Basics", number: 1 },
  { id: "sales", label: "Sales Content", number: 2 },
  { id: "structure", label: "Structure", number: 3 },
  { id: "review", label: "Review", number: 4 },
];

// Session configuration for step 3
export interface SessionConfig {
  duration: string;
  sessionType: "1:1" | "group";
  capacity?: number;
  replayEnabled: boolean;
  resources: SessionResource[];
}

// Wizard form data structure
export interface WizardFormData {
  // Step 1: Basics
  type: ProductType;
  title: string;
  headline: string; // tagline/subtitle
  featured: boolean;

  // Step 2: Sales Content
  heroImage: string | null;
  description: string;
  outcomes: string[];
  faqItems: FaqItem[];
  price: number;
  billingCycle?: "monthly" | "quarterly" | "yearly";

  // Step 3: Structure (varies by type)
  // Course
  lessons?: Lesson[];
  
  // Session
  sessionConfig?: SessionConfig;
  
  // Program
  programDuration?: string;
  phases?: ProgramPhase[];
  
  // Membership
  benefits?: string[];
  pricingOptions?: PricingOption[];
  contentCadence?: string;
}

// Initial form data factory
export const createInitialFormData = (type: ProductType): WizardFormData => ({
  type,
  title: "",
  headline: "",
  featured: false,
  heroImage: null,
  description: "",
  outcomes: [""],
  faqItems: [],
  price: 0,
  billingCycle: type === "membership" ? "monthly" : undefined,
  
  // Type-specific defaults
  lessons: type === "course" ? [] : undefined,
  sessionConfig: type === "session" ? {
    duration: "60",
    sessionType: "1:1",
    replayEnabled: true,
    resources: [],
  } : undefined,
  programDuration: type === "program" ? "" : undefined,
  phases: type === "program" ? [] : undefined,
  benefits: type === "membership" ? [""] : undefined,
  pricingOptions: type === "membership" ? [
    { id: "monthly", interval: "monthly", price: 0 },
  ] : undefined,
  contentCadence: type === "membership" ? "" : undefined,
});

// Validation schemas for each step
export const stepBasicsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  headline: z.string().optional(),
  featured: z.boolean(),
});

export const stepSalesSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  outcomes: z.array(z.string()).min(1, "Add at least one outcome"),
  price: z.number().min(0, "Price must be positive"),
});

// Type labels for display
export const productTypeLabels: Record<ProductType, { singular: string; icon: string }> = {
  course: { singular: "Course", icon: "BookOpen" },
  session: { singular: "Session", icon: "Video" },
  program: { singular: "Program", icon: "Crown" },
  membership: { singular: "Membership", icon: "Users" },
};

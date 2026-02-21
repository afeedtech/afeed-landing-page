import hishamProfile from '@/assets/hisham-profile.jpg';
import coverFintech from '@/assets/cover-fintech.avif';

export type PageLanguageMode = "en" | "ar" | "bilingual";

export interface CreatorProfile {
  name: string;
  headline: string;
  bio: string;
  email?: string;
  profileImage: string | null;
  coverImage: string | null;
  credentials: string[];
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    website?: string;
  };
  mobileNumber?: string;
  mobileVisible?: boolean;
  // Page language settings
  pageLanguage: PageLanguageMode;
  // Arabic versions for bilingual mode
  nameAr?: string;
  headlineAr?: string;
  bioAr?: string;
  credentialsAr?: string[];
}

export type ProfileTemplateType = "authority" | "creator" | "minimal";

export interface ProfileTemplateProps {
  profile: CreatorProfile;
  isEditing: boolean;
  onEditClick: () => void;
  viewerIsPaidUser?: boolean;
}

export type ProductType = "course" | "session" | "program" | "membership";
export type ProductStatus = "published" | "draft" | "archived";

// Lesson structure for courses
export interface Lesson {
  id: number;
  title: string;
  type: "video" | "text" | "image";
  duration?: string;
  isPreview?: boolean;
  contentUrl?: string;
}

// FAQ item structure
export interface FaqItem {
  question: string;
  answer: string;
}

// Program phase structure
export interface ProgramPhase {
  id: number;
  title: string;
  weekStart: number;
  weekEnd: number;
  description: string;
  includedProductIds?: number[];
}

// Membership pricing option
export interface PricingOption {
  id: string;
  interval: "monthly" | "quarterly" | "annual";
  price: number;
  label?: string;
}

// Session resource
export interface SessionResource {
  name: string;
  url: string;
}

export interface Product {
  id: number;
  type: ProductType;
  title: string;
  description: string;
  price: number;
  image?: string;
  featured?: boolean;
  status: ProductStatus;
  
  // NEW: Shared fields for all products
  subtitle?: string;
  outcomes?: string[];  // "What you'll get" items (3-6 recommended)
  promoVideoUrl?: string;  // Single promo/trailer video
  faq?: FaqItem[];
  
  // Type-specific fields (existing)
  duration?: string;
  capacity?: number;
  enrolled?: number;
  billingCycle?: string;
  benefits?: string[];
  
  // NEW: Course-specific
  lessons?: Lesson[];
  
  // NEW: Session-specific
  sessionDate?: string;  // ISO date
  sessionTime?: string;
  timezone?: string;
  replayEnabled?: boolean;  // Default: true
  sessionType?: "1:1" | "group";
  resources?: SessionResource[];
  
  // NEW: Program-specific
  programDuration?: string;  // e.g., "6 weeks"
  phases?: ProgramPhase[];
  
  // NEW: Membership-specific
  pricingOptions?: PricingOption[];
  includedContentIds?: number[];
  contentCadence?: string;  // e.g., "New content weekly"
  
  // Sales data (retained even when archived)
  salesCount: number;
  revenue: number;
  activeCustomers: number;
}

export const defaultProfile: CreatorProfile = {
  name: "Hisham Abdoh",
  headline: "Fintech Strategist",
  bio: "As a leader in financial technology strategy, I've guided organizations through digital transformations, regulatory challenges, and market expansions across the MENA region. My approach combines deep industry knowledge with practical implementation strategies.",
  profileImage: "",
  coverImage: "",
  credentials: [
    "15+ years in Fintech",
    "Ex-McKinsey",
    "3x Founder",
    "Bestselling Author",
    "MENA Expert"
  ],
  socialLinks: {
    twitter: "https://twitter.com/hishamabdoh",
    linkedin: "https://linkedin.com/in/hishamabdoh",
    youtube: "https://youtube.com/@hishamabdoh",
    website: "https://hishamabdoh.com"
  },
  email: "hisham@afeed.com",
  mobileNumber: "+965 9876 5432",
  mobileVisible: true,
  pageLanguage: "en",
  nameAr: "",
  headlineAr: "",
  bioAr: "",
  credentialsAr: [],
};

// Sample products data with extended fields - Fintech themed
export const sampleProducts: Product[] = [
  // PUBLISHED PRODUCTS (6)
  {
    id: 1,
    type: "course",
    title: "Digital Payments & Open Banking Masterclass",
    subtitle: "Master the future of payments infrastructure in MENA",
    description: "Comprehensive deep-dive into digital payments ecosystems, open banking frameworks, and PSD2/PSD3 regulations tailored for the MENA financial landscape.",
    price: 75,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    featured: true,
    status: "published",
    outcomes: [
      "Understand payment rails and settlement systems",
      "Navigate open banking API frameworks",
      "Implement PSD2/PSD3 compliance strategies",
      "Design customer-centric payment experiences",
      "Evaluate payment gateway partnerships"
    ],
    lessons: [
      { id: 1, title: "The Evolution of Payments in MENA", type: "video", duration: "18 min", isPreview: true },
      { id: 2, title: "Payment Rails & Infrastructure", type: "video", duration: "25 min" },
      { id: 3, title: "Open Banking Fundamentals", type: "video", duration: "22 min" },
      { id: 4, title: "API Integration Best Practices", type: "video", duration: "28 min" },
      { id: 5, title: "Regulatory Compliance Deep-Dive", type: "video", duration: "32 min" },
      { id: 6, title: "Case Studies: MENA Success Stories", type: "video", duration: "24 min" },
    ],
    faq: [
      { question: "Is this course suitable for non-technical professionals?", answer: "Yes, we cover technical concepts in an accessible way for both business and technical audiences." },
      { question: "Do I get access to updated content as regulations change?", answer: "Absolutely. All regulatory updates are added to the course at no extra cost." }
    ],
    salesCount: 420,
    revenue: 31500,
    activeCustomers: 420,
  },
  {
    id: 2,
    type: "course",
    title: "Fintech Partnerships & BaaS Essentials",
    subtitle: "Build winning partnerships in the fintech ecosystem",
    description: "Learn to structure, negotiate, and manage Banking-as-a-Service partnerships and fintech collaborations that drive mutual growth.",
    price: 45,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    featured: false,
    status: "published",
    outcomes: [
      "Evaluate BaaS provider capabilities",
      "Structure partnership agreements",
      "Navigate regulatory requirements for partnerships",
      "Build sustainable revenue-share models"
    ],
    lessons: [
      { id: 1, title: "The BaaS Revolution", type: "video", duration: "15 min", isPreview: true },
      { id: 2, title: "Partnership Due Diligence", type: "video", duration: "20 min" },
      { id: 3, title: "Contract Negotiation Strategies", type: "video", duration: "25 min" },
      { id: 4, title: "Integration & Launch Planning", type: "video", duration: "22 min" },
    ],
    faq: [
      { question: "What types of partnerships are covered?", answer: "We cover bank-fintech, fintech-fintech, and embedded finance partnerships." }
    ],
    salesCount: 285,
    revenue: 12825,
    activeCustomers: 285,
  },
  {
    id: 3,
    type: "session",
    title: "1:1 Fintech Strategy Consultation",
    subtitle: "Personalized strategic guidance for your fintech journey",
    description: "Book a private consultation to discuss your specific fintech challenges, whether launching a new product, navigating regulations, or scaling operations.",
    price: 65,
    duration: "60 min",
    featured: true,
    status: "published",
    sessionType: "1:1",
    replayEnabled: true,
    outcomes: [
      "Get expert analysis of your specific situation",
      "Receive actionable recommendations",
      "Identify quick wins and long-term strategies",
      "Access my network of industry contacts when relevant"
    ],
    faq: [
      { question: "How do I prepare for the session?", answer: "You'll receive a brief questionnaire after booking to help me understand your goals." },
      { question: "Can I bring my team?", answer: "The 1:1 session is for individual consultation. For team sessions, consider the group workshop." }
    ],
    salesCount: 180,
    revenue: 11700,
    activeCustomers: 0,
  },
  {
    id: 4,
    type: "session",
    title: "RegTech Compliance Workshop",
    subtitle: "Hands-on regulatory technology implementation",
    description: "Interactive group workshop covering practical RegTech solutions for AML, KYC, and transaction monitoring in the MENA fintech ecosystem.",
    price: 35,
    duration: "120 min",
    capacity: 25,
    featured: false,
    status: "published",
    sessionType: "group",
    sessionDate: "2025-02-15",
    sessionTime: "10:00",
    timezone: "Asia/Kuwait",
    replayEnabled: true,
    outcomes: [
      "Understand MENA regulatory requirements",
      "Evaluate RegTech vendor solutions",
      "Design compliant onboarding flows",
      "Build ongoing compliance monitoring systems"
    ],
    salesCount: 145,
    revenue: 5075,
    activeCustomers: 0,
  },
  {
    id: 5,
    type: "program",
    title: "Fintech Leadership Accelerator",
    subtitle: "Transform into a fintech industry leader",
    description: "8-week intensive program for banking professionals and entrepreneurs ready to lead fintech initiatives. Includes live sessions, projects, and executive coaching.",
    price: 350,
    featured: true,
    status: "published",
    programDuration: "8 weeks",
    outcomes: [
      "Develop comprehensive fintech strategy skills",
      "Build a professional network of fintech leaders",
      "Complete a capstone project for your organization",
      "Earn certification recognized by MENA institutions",
      "Access exclusive alumni community"
    ],
    phases: [
      { id: 1, title: "Fintech Landscape", weekStart: 1, weekEnd: 2, description: "Map the fintech ecosystem and identify opportunities" },
      { id: 2, title: "Technology Deep-Dive", weekStart: 3, weekEnd: 4, description: "Understand core technologies: APIs, cloud, blockchain, AI" },
      { id: 3, title: "Strategy & Execution", weekStart: 5, weekEnd: 6, description: "Develop go-to-market and partnership strategies" },
      { id: 4, title: "Capstone & Certification", weekStart: 7, weekEnd: 8, description: "Complete your project and present to industry panel" },
    ],
    faq: [
      { question: "What's the time commitment?", answer: "Expect 6-8 hours per week including live sessions, self-study, and project work." },
      { question: "Is this suitable for non-banking professionals?", answer: "Yes, we welcome fintech entrepreneurs, consultants, and corporate innovation teams." },
      { question: "What happens after the program?", answer: "You join our alumni network with ongoing events, job opportunities, and continued learning resources." }
    ],
    salesCount: 95,
    revenue: 33250,
    activeCustomers: 95,
  },
  {
    id: 6,
    type: "membership",
    title: "Fintech Insider Community",
    subtitle: "Your ongoing connection to fintech excellence",
    description: "Join an exclusive community of fintech professionals with monthly masterclasses, industry updates, networking events, and direct access to Hisham.",
    price: 20,
    billingCycle: "monthly",
    benefits: ["Monthly live masterclasses", "Weekly industry briefings", "Private Slack community", "Quarterly networking events"],
    featured: true,
    status: "published",
    contentCadence: "New content weekly",
    outcomes: [
      "Stay current with MENA fintech developments",
      "Connect with peers across the industry",
      "Get your questions answered in live sessions",
      "Access exclusive member-only resources"
    ],
    pricingOptions: [
      { id: "monthly", interval: "monthly", price: 20 },
      { id: "quarterly", interval: "quarterly", price: 55, label: "Save 8%" },
      { id: "annual", interval: "annual", price: 200, label: "Best Value - Save 17%" },
    ],
    includedContentIds: [1, 2],
    salesCount: 320,
    revenue: 6400,
    activeCustomers: 320,
  },
  // DRAFT PRODUCTS (2)
  {
    id: 7,
    type: "course",
    title: "WealthTech & Investment Innovation",
    subtitle: "The future of wealth management technology",
    description: "Explore robo-advisors, digital wealth platforms, and investment technology transforming asset management in the region.",
    price: 85,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    featured: false,
    status: "draft",
    outcomes: [
      "Understand WealthTech ecosystem",
      "Evaluate robo-advisory platforms",
      "Design digital investment products"
    ],
    salesCount: 0,
    revenue: 0,
    activeCustomers: 0,
  },
  {
    id: 8,
    type: "program",
    title: "CBDC Deep Dive",
    subtitle: "Central Bank Digital Currencies in MENA",
    description: "Comprehensive program on CBDC design, implementation, and implications for the MENA financial system. Developed with central bank input.",
    price: 275,
    featured: false,
    status: "draft",
    programDuration: "6 weeks",
    phases: [
      { id: 1, title: "CBDC Fundamentals", weekStart: 1, weekEnd: 2, description: "Understanding digital currency design principles" },
      { id: 2, title: "Technical Architecture", weekStart: 3, weekEnd: 4, description: "Infrastructure and integration considerations" },
      { id: 3, title: "Policy & Implementation", weekStart: 5, weekEnd: 6, description: "Regulatory frameworks and rollout strategies" },
    ],
    salesCount: 0,
    revenue: 0,
    activeCustomers: 0,
  },
  // ARCHIVED PRODUCTS (2)
  {
    id: 9,
    type: "course",
    title: "Blockchain Fundamentals for Bankers",
    subtitle: "Understanding distributed ledger technology",
    description: "Introduction to blockchain technology tailored for banking professionals. Covers use cases, limitations, and practical applications.",
    price: 30,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=300&fit=crop",
    featured: false,
    status: "archived",
    lessons: [
      { id: 1, title: "What is Blockchain?", type: "video", duration: "12 min" },
      { id: 2, title: "Banking Use Cases", type: "video", duration: "18 min" },
      { id: 3, title: "Implementation Considerations", type: "video", duration: "15 min" },
    ],
    salesCount: 125,
    revenue: 3750,
    activeCustomers: 0,
  },
  {
    id: 10,
    type: "session",
    title: "Digital Banking Transformation Bootcamp",
    subtitle: "One-day intensive on digital transformation",
    description: "Full-day workshop on digital banking transformation strategies. Covered core banking modernization, customer experience, and change management.",
    price: 30,
    duration: "8 hours",
    featured: false,
    status: "archived",
    sessionType: "group",
    replayEnabled: false,
    salesCount: 65,
    revenue: 1950,
    activeCustomers: 0,
  },
];

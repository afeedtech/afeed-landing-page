import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  BookOpen, 
  Video, 
  Crown, 
  Users,
  LayoutGrid 
} from "lucide-react";

export type ProductTabType = "all" | "featured" | "courses" | "sessions" | "programs" | "memberships";

interface ProductTabsProps {
  activeTab: ProductTabType;
  onTabChange: (tab: ProductTabType) => void;
  counts?: Record<ProductTabType, number>;
  className?: string;
}

const tabs: { id: ProductTabType; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "featured", label: "Featured", icon: Sparkles },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "sessions", label: "Live Sessions", icon: Video },
  { id: "programs", label: "Programs", icon: Crown },
  { id: "memberships", label: "Memberships", icon: Users },
];

export function ProductTabs({ activeTab, onTabChange, counts, className }: ProductTabsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const count = counts?.[tab.id] ?? 0;
          const isActive = activeTab === tab.id;
          
          // Hide tabs with no products (except "all" and "featured")
          if (tab.id !== "all" && tab.id !== "featured" && counts && count === 0) {
            return null;
          }
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {counts && count > 0 && (
                <span className={cn(
                  "ml-1 text-xs px-1.5 py-0.5 rounded-full",
                  isActive 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-muted-foreground/20 text-muted-foreground"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

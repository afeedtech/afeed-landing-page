import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { MobileHeader } from "./MobileHeader";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardContent({ children }: DashboardLayoutProps) {
  const { isMobile, isCollapsed } = useSidebar();
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <AppSidebar />
      <main
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          isMobile 
            ? "pt-16" 
            : isCollapsed 
              ? (isRTL ? "pr-[72px]" : "pl-[72px]") 
              : (isRTL ? "pr-64" : "pl-64")
        )}
      >
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";
import afeedLogoIcon from "@/assets/afeed-logo-icon.svg";

export function MobileHeader() {
  const { isMobile, openSidebar } = useSidebar();

  if (!isMobile) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={openSidebar}
        className="h-10 w-10"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <img 
        src={afeedLogoIcon} 
        alt="Afeed" 
        className="h-8 w-auto"
      />
      
      <div className="w-10" /> {/* Spacer for centering logo */}
    </header>
  );
}

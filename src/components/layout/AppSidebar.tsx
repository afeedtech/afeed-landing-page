import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  Clapperboard,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Globe,
  Users,
  CreditCard,
  Package,
  X,
  Megaphone,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/context/SidebarContext";
import { useLanguage } from "@/context/LanguageContext";
import afeedLogoEn from "@/assets/afeed-logo-en.svg";
import afeedLogoAr from "@/assets/afeed-logo-ar.svg";
import afeedLogoIcon from "@/assets/afeed-logo-icon.svg";
import { useEffect } from "react";

const navigationKeys = [
  { key: "myPage", href: "/app", icon: Globe },
  { key: "myBusiness", href: "/my-business", icon: BarChart3 },
  { key: "products", href: "/products", icon: Package },
  { key: "audience", href: "/customers", icon: Users },
  { key: "campaigns", href: "/campaigns", icon: Megaphone },
  { key: "contentStudio", href: "/content-studio", icon: Clapperboard },
  { key: "payments", href: "/payments", icon: CreditCard },
];

const secondaryNavKeys = [
  { key: "settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isMobile, isOpen, isCollapsed, closeSidebar, toggleSidebar } = useSidebar();
  const { isRTL, language } = useLanguage();
  
  const logo = language === 'ar' ? afeedLogoAr : afeedLogoEn;

  // Build navigation items with translated names
  const navigation = navigationKeys.map(item => ({
    ...item,
    name: t(`sidebar.${item.key}`),
  }));

  const secondaryNav = secondaryNavKeys.map(item => ({
    ...item,
    name: t(`sidebar.${item.key}`),
  }));

  const handleLogout = () => {
    if (isMobile) {
      closeSidebar();
    }
    navigate("/");
  };

  // Close drawer on route change (mobile)
  useEffect(() => {
    if (isMobile && isOpen) {
      closeSidebar();
    }
  }, [location.pathname]);

  const NavItem = ({ item, isActive, collapsed }: { item: typeof navigation[0]; isActive: boolean; collapsed: boolean }) => {
    const content = (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "brand-gradient-primary text-white shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          collapsed && "justify-center px-2"
        )}
      >
        <item.icon className={cn(
          "h-5 w-5 flex-shrink-0 transition-colors",
          isActive && "text-white"
        )} />
        {!collapsed && <span>{item.name}</span>}
      </Link>
    );

    if (collapsed && !isMobile) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side={isRTL ? "left" : "right"} sideOffset={8}>
            {item.name}
          </TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Header with Logo and Collapse Toggle */}
      <div className={cn(
        "flex items-center border-b border-border h-16",
        collapsed ? "justify-center px-2" : "justify-between px-3"
      )}>
        <Link to="/app" className={cn("flex items-center", collapsed && "justify-center")}>
          <img 
            src={collapsed ? afeedLogoIcon : logo} 
            alt="Afeed" 
            className={cn(
              "object-contain transition-all duration-300",
              collapsed ? "h-10 w-auto" : "h-12"
            )} 
          />
        </Link>
        {!collapsed && !isMobile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <PanelLeftClose className={cn("h-4 w-4", isRTL && "rotate-180")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isRTL ? "left" : "right"}>{t('sidebar.collapse')}</TooltipContent>
          </Tooltip>
        )}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expand button when collapsed (desktop/tablet only) */}
      {collapsed && !isMobile && (
        <div className="px-3 py-2 border-b border-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="w-full h-8 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <PanelLeft className={cn("h-4 w-4", isRTL && "rotate-180")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isRTL ? "left" : "right"}>{t('sidebar.expand')}</TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return <NavItem key={item.name} item={item} isActive={isActive} collapsed={collapsed} />;
        })}
      </nav>

      {/* Secondary Nav */}
      <div className="border-t border-border px-3 py-4">
        {secondaryNav.map((item) => {
          const isActive = location.pathname === item.href;
          return <NavItem key={item.name} item={item} isActive={isActive} collapsed={collapsed} />;
        })}
      </div>

      {/* User Profile with Logout */}
      <div className={cn(
        "border-t border-border p-3",
        collapsed ? "px-2" : ""
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-muted cursor-pointer",
              collapsed && "justify-center px-2"
            )}>
              <div className="h-9 w-9 rounded-full brand-gradient-primary flex items-center justify-center text-white text-sm font-semibold shadow-sm flex-shrink-0">
                HA
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-foreground">Hisham Abdoh</p>
                    <p className="text-xs text-muted-foreground truncate">{t('sidebar.creatorRole')}</p>
                  </div>
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            side={collapsed ? (isRTL ? "left" : "right") : "top"} 
            align="start"
            className="w-48"
          >
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="me-2 h-4 w-4" />
              {t('sidebar.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  // Mobile: Sheet/Drawer
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeSidebar()}>
        <SheetContent 
          side={isRTL ? "right" : "left"} 
          className={cn(
            "w-[280px] p-0 bg-background",
            isRTL ? "border-l border-border" : "border-r border-border"
          )}
        >
          <TooltipProvider delayDuration={100}>
            <SidebarContent collapsed={false} />
          </TooltipProvider>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop/Tablet: Fixed sidebar
  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={cn(
          "fixed top-0 z-40 h-screen transition-all duration-300 ease-in-out",
          "bg-background text-foreground",
          isRTL ? "right-0 border-l border-border" : "left-0 border-r border-border",
          isCollapsed ? "w-[72px]" : "w-64"
        )}
      >
        <SidebarContent collapsed={isCollapsed} />
      </aside>
    </TooltipProvider>
  );
}

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Globe, CreditCard, Bell, Shield, Save, Tag, Phone } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SubscriptionPlans, DiscountCodesTab, UpdateBankDetailsSheet } from "@/components/settings";
import { scheduleOptions, menaCurrencies, defaultPayoutSettings } from "@/lib/payoutSettings";
import { useProfile } from "@/context/ProfileContext";

type TabId = "profile" | "payouts" | "subscription" | "discounts" | "preferences" | "notifications";

const tabKeys: { id: TabId; key: string; icon: React.ElementType }[] = [
  { id: "profile", key: "profile", icon: User },
  { id: "payouts", key: "payouts", icon: CreditCard },
  { id: "subscription", key: "subscription", icon: Shield },
  { id: "discounts", key: "discounts", icon: Tag },
  { id: "preferences", key: "preferences", icon: Globe },
  { id: "notifications", key: "notifications", icon: Bell },
];

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [bankDetailsSheetOpen, setBankDetailsSheetOpen] = useState(false);
  
  // Build translated tabs
  const tabs = tabKeys.map(tab => ({
    ...tab,
    label: t(`settings.tabs.${tab.key}`),
  }));
  
  // Use shared profile context
  const { profile: sharedProfile, updateProfile } = useProfile();
  
  
  // Read tab from URL on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabId | null;
    if (tabParam && tabKeys.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const [payoutSchedule, setPayoutSchedule] = useState(defaultPayoutSettings.schedule);

  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailBookings: true,
    emailPayouts: true,
    pushSales: false,
    pushBookings: true,
  });

  const handleSave = () => {
    toast.success(t('settings.toasts.saved'));
  };

  const selectedSchedule = scheduleOptions.find(s => s.value === payoutSchedule);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('settings.title')}</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {t('settings.subtitle')}
          </p>
        </div>

        {/* Tabs Navigation - Pill Button Style */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 animate-slide-up">
          <div className="flex gap-2 w-max sm:w-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-fade-in">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Profile Information</h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  HA
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={sharedProfile.name?.split(' ')[0] || ''}
                  onChange={(e) =>
                    updateProfile({ name: e.target.value + ' ' + (sharedProfile.name?.split(' ').slice(1).join(' ') || '') })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={sharedProfile.name?.split(' ').slice(1).join(' ') || ''}
                  onChange={(e) =>
                    updateProfile({ name: (sharedProfile.name?.split(' ')[0] || '') + ' ' + e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={sharedProfile.email || ''}
                onChange={(e) =>
                  updateProfile({ email: e.target.value })
                }
              />
            </div>

            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Mobile Number
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={sharedProfile.mobileNumber || ''}
                  onChange={(e) =>
                    updateProfile({ mobileNumber: e.target.value })
                  }
                  placeholder="+965 XXXX XXXX"
                />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Visible to users</p>
                  <p className="text-sm text-muted-foreground">
                    {sharedProfile.mobileVisible 
                      ? "Your mobile number is visible on your public page" 
                      : "Only used for Afeed operations and account support"}
                  </p>
                </div>
                <Switch
                  checked={sharedProfile.mobileVisible || false}
                  onCheckedChange={(checked) =>
                    updateProfile({ mobileVisible: checked })
                  }
                />
              </div>
            </div>

            <Button onClick={handleSave} className="mt-6 gradient-bg">
              <Save className="h-4 w-4 me-2" />
              Save Changes
            </Button>
          </div>
        )}

        {/* Payouts Tab */}
        {activeTab === "payouts" && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in">
            <h3 className="text-lg font-semibold mb-6">Payout Settings</h3>

            <div className="rounded-lg bg-muted/50 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium">Bank Account Connected</p>
                    <p className="text-sm text-muted-foreground">
                      {defaultPayoutSettings.bankDetails.accountNumber} - {defaultPayoutSettings.bankDetails.bankName}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  Verified
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Payout Schedule</Label>
                <Select value={payoutSchedule} onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setPayoutSchedule(value)}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center justify-between gap-4">
                          <span>{option.label}</span>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "ml-2 text-xs",
                              option.fee === 'Free' ? "bg-accent/10 text-accent border-accent/20" : "bg-chart-4/10 text-chart-4 border-chart-4/20"
                            )}
                          >
                            {option.fee}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSchedule && (
                  <p className="text-xs text-muted-foreground">
                    {selectedSchedule.description}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Minimum Payout Amount</Label>
                <Select defaultValue="100">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50 KWD</SelectItem>
                    <SelectItem value="100">100 KWD</SelectItem>
                    <SelectItem value="250">250 KWD</SelectItem>
                    <SelectItem value="500">500 KWD</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Payouts will only process when balance exceeds this amount.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setBankDetailsSheetOpen(true)}>
                Update Bank Details
              </Button>
              <Button onClick={handleSave} className="gradient-bg">
                <Save className="h-4 w-4 me-2" />
                Save Settings
              </Button>
            </div>
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === "subscription" && (
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-fade-in">
            <SubscriptionPlans currentPlanId="growth" />
          </div>
        )}

        {/* Discount Codes Tab */}
        {activeTab === "discounts" && (
          <div className="animate-fade-in">
            <DiscountCodesTab />
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in">
            <h3 className="text-lg font-semibold mb-6">{t('settings.preferences.title')}</h3>

            <div className="space-y-6">
              {/* Page Language Setting */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">{t('settings.pageLanguage.title')}</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('settings.pageLanguage.description')}
                  </p>
                </div>
                <div className="grid gap-3 max-w-md">
                  {(['en', 'ar', 'bilingual'] as const).map((mode) => {
                    const isSelected = sharedProfile.pageLanguage === mode;
                    const labels: Record<typeof mode, { label: string; desc: string }> = {
                      en: { label: t('settings.pageLanguage.optionEn'), desc: t('settings.pageLanguage.optionEnDesc') },
                      ar: { label: t('settings.pageLanguage.optionAr'), desc: t('settings.pageLanguage.optionArDesc') },
                      bilingual: { label: t('settings.pageLanguage.optionBoth'), desc: t('settings.pageLanguage.optionBothDesc') },
                    };
                    return (
                      <button
                        key={mode}
                        onClick={() => updateProfile({ pageLanguage: mode })}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border-2 text-start transition-all",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                          )}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{labels[mode].label}</p>
                          <p className="text-sm text-muted-foreground">{labels[mode].desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-border pt-6 space-y-2">
                <Label>{t('settings.preferences.timezone')}</Label>
                <Select defaultValue="gmt+3">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmt+3">GMT+3 (Arabia Standard)</SelectItem>
                    <SelectItem value="gmt+4">GMT+4 (Gulf Standard)</SelectItem>
                    <SelectItem value="gmt+2">GMT+2 (Eastern European)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('settings.preferences.currency')}</Label>
                <Select defaultValue="kwd">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {menaCurrencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label} ({currency.symbol}) - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSave} className="mt-6 gradient-bg">
              <Save className="h-4 w-4 me-2" />
              {t('settings.preferences.save')}
            </Button>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-fade-in">
            <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Sales</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone purchases your product
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailSales}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailSales: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Bookings</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone books a session
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailBookings}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailBookings: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payout Updates</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when payouts are processed
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailPayouts}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailPayouts: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-medium mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Sales</p>
                      <p className="text-sm text-muted-foreground">
                        Real-time push notifications for sales
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushSales}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, pushSales: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Reminders</p>
                      <p className="text-sm text-muted-foreground">
                        Get reminded before your scheduled sessions
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushBookings}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, pushBookings: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="mt-6 gradient-bg">
              <Save className="h-4 w-4 me-2" />
              Save Notification Settings
            </Button>
          </div>
        )}
      </div>

      {/* Bank Details Sheet */}
      <UpdateBankDetailsSheet
        open={bankDetailsSheetOpen}
        onOpenChange={setBankDetailsSheetOpen}
      />
    </DashboardLayout>
  );
}
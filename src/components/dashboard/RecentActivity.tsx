import { Package, Video, Users, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";

const getActivities = (language: string) => [
  {
    id: 1,
    type: "sale",
    title: "New course purchase",
    description: "Digital Marketing Masterclass",
    amount: formatCurrency(60, language),
    time: "2 hours ago",
    icon: Package,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: 2,
    type: "session",
    title: "Session booked",
    description: "1:1 Strategy Call with Ahmed",
    amount: formatCurrency(45, language),
    time: "4 hours ago",
    icon: Video,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    id: 3,
    type: "customer",
    title: "New subscriber",
    description: "fatima@example.com joined",
    time: "5 hours ago",
    icon: Users,
    iconBg: "bg-chart-3/10",
    iconColor: "text-chart-3",
  },
  {
    id: 4,
    type: "payout",
    title: "Payout processed",
    description: "Weekly payout to bank",
    amount: formatCurrency(750, language),
    time: "1 day ago",
    icon: CreditCard,
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
  },
  {
    id: 5,
    type: "sale",
    title: "New course purchase",
    description: "Content Creation Bundle",
    amount: formatCurrency(90, language),
    time: "1 day ago",
    icon: Package,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export function RecentActivity() {
  const { language } = useLanguage();
  const activities = getActivities(language);
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest updates from your store</p>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-4 pb-4",
              index !== activities.length - 1 && "border-b border-border"
            )}
          >
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", activity.iconBg)}>
              <activity.icon className={cn("h-5 w-5", activity.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
            </div>
            <div className="text-right">
              {activity.amount && (
                <p className="text-sm font-semibold text-brand-primary">{activity.amount}</p>
              )}
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

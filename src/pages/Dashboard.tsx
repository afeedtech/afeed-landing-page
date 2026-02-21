import { DollarSign, Package, Users, Video } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingSessions } from "@/components/dashboard/UpcomingSessions";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";

export default function Dashboard() {
  const { language } = useLanguage();
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Your business metrics at a glance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Total Revenue"
            value={formatCurrency(3820, language)}
            change={{ value: 12.5, trend: "up" }}
            icon={<DollarSign className="h-6 w-6 text-primary" />}
            delay={0}
          />
          <StatsCard
            title="Active Products"
            value="8"
            change={{ value: 2, trend: "up" }}
            icon={<Package className="h-6 w-6 text-primary" />}
            delay={50}
          />
          <StatsCard
            title="Total Customers"
            value="324"
            change={{ value: 8.2, trend: "up" }}
            icon={<Users className="h-6 w-6 text-primary" />}
            delay={100}
          />
          <StatsCard
            title="Upcoming Sessions"
            value="5"
            icon={<Video className="h-6 w-6 text-primary" />}
            delay={150}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>

        {/* Upcoming Sessions */}
        <UpcomingSessions />
      </div>
    </DashboardLayout>
  );
}

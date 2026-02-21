import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Download, Mail, MoreVertical, User, Package, Calendar } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserProfileDrawer, UserProfileData } from "@/components/audience";
import { generateMockUserProfile } from "@/components/audience/mockUserData";

const customers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    products: ["Digital Marketing Masterclass", "Content Creation Blueprint"],
    totalSpent: 248,
    joinDate: "Dec 15, 2024",
    lastPurchase: "Dec 20, 2024",
  },
  {
    id: 2,
    name: "Fatima Al-Rashid",
    email: "fatima@example.com",
    products: ["Digital Marketing Masterclass"],
    totalSpent: 199,
    joinDate: "Dec 10, 2024",
    lastPurchase: "Dec 10, 2024",
  },
  {
    id: 3,
    name: "Omar Khalil",
    email: "omar.k@example.com",
    products: ["Social Media Strategy Guide", "1:1 Business Coaching"],
    totalSpent: 179,
    joinDate: "Nov 28, 2024",
    lastPurchase: "Dec 18, 2024",
  },
  {
    id: 4,
    name: "Layla Mohammed",
    email: "layla.m@example.com",
    products: ["Content Creation Blueprint", "Social Media Strategy Guide"],
    totalSpent: 78,
    joinDate: "Nov 15, 2024",
    lastPurchase: "Dec 5, 2024",
  },
  {
    id: 5,
    name: "Youssef Nasser",
    email: "youssef.n@example.com",
    products: ["Digital Marketing Masterclass", "Content Strategy Workshop"],
    totalSpent: 278,
    joinDate: "Oct 22, 2024",
    lastPurchase: "Dec 12, 2024",
  },
  {
    id: 6,
    name: "Sara Ibrahim",
    email: "sara.i@example.com",
    products: ["Brand Building Masterclass"],
    totalSpent: 99,
    joinDate: "Dec 1, 2024",
    lastPurchase: "Dec 1, 2024",
  },
  {
    id: 7,
    name: "Karim Mahmoud",
    email: "karim.m@example.com",
    products: ["1:1 Business Coaching", "1:1 Business Coaching"],
    totalSpent: 300,
    joinDate: "Sep 15, 2024",
    lastPurchase: "Dec 19, 2024",
  },
  {
    id: 8,
    name: "Nour Ahmed",
    email: "nour.a@example.com",
    products: ["Content Creation Blueprint"],
    totalSpent: 49,
    joinDate: "Dec 22, 2024",
    lastPurchase: "Dec 22, 2024",
  },
];

export default function Customers() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfileData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleUserClick = (customer: typeof customers[0]) => {
    const profileData = generateMockUserProfile(
      String(customer.id),
      customer.name,
      customer.email,
      customer.totalSpent,
      customer.products
    );
    setSelectedUser(profileData);
    setDrawerOpen(true);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t('customers.title')}</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {t('customers.subtitle')}
            </p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 me-2" />
            {t('customers.exportCsv')}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6 sm:mb-8">
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">{customers.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('customers.stats.totalCustomers')}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-slide-up" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">
                  {customers.reduce((acc, c) => acc + c.products.length, 0)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('customers.stats.totalPurchases')}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/10">
                <Calendar className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">
                  ${customers.reduce((acc, c) => acc + c.totalSpent, 0).toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('customers.stats.totalRevenue')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('customers.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-10"
            />
          </div>
        </div>

        {/* Mobile Card List */}
        <div className="mobile-card-list animate-slide-up" style={{ animationDelay: "200ms" }}>
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="mobile-card cursor-pointer active:bg-muted/50 transition-colors"
              onClick={() => handleUserClick(customer)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{customer.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-accent">${customer.totalSpent}</p>
                  <p className="text-xs text-muted-foreground">{customer.lastPurchase}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {customer.products.slice(0, 2).map((product, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {product.length > 15 ? product.slice(0, 15) + "..." : product}
                  </Badge>
                ))}
                {customer.products.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{customer.products.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="desktop-table-only rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>{t('customers.table.customer')}</TableHead>
                <TableHead>{t('customers.table.productsPurchased')}</TableHead>
                <TableHead>{t('customers.table.totalSpent')}</TableHead>
                <TableHead>{t('customers.table.joined')}</TableHead>
                <TableHead>{t('customers.table.lastPurchase')}</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleUserClick(customer)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.products.slice(0, 2).map((product, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {product.length > 20 ? product.slice(0, 20) + "..." : product}
                        </Badge>
                      ))}
                      {customer.products.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{customer.products.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-accent">
                      ${customer.totalSpent}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.joinDate}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.lastPurchase}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUserClick(customer)}>
                          <User className="h-4 w-4 me-2" />
                          {t('customers.actions.viewProfile')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 me-2" />
                          {t('customers.actions.sendEmail')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>

        <UserProfileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          user={selectedUser}
        />
      </div>
    </DashboardLayout>
  );
}

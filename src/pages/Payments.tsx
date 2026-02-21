import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download,
  Wallet,
  CalendarClock,
  Building2,
  BadgeCheck,
  Info,
  AlertTriangle,
  RotateCcw,
  Pencil
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { RequestPayoutModal } from "@/components/payments/RequestPayoutModal";
import { DateRangePicker } from "@/components/payments/DateRangePicker";
import { toast } from "sonner";
import { defaultPayoutSettings, scheduleOptions } from "@/lib/payoutSettings";

// Balance breakdown data
const balanceBreakdown = {
  availableForPayout: 990.45,
  pending: 125.00,
  scheduledForPayout: 575.00,
  paidOutLifetime: 12450.00,
};

// Use shared payout settings
const payoutSettings = defaultPayoutSettings;

// Enhanced transactions with type
const transactions = [
  {
    id: "TXN-001",
    description: "Digital Marketing Masterclass",
    customer: "Ahmed Hassan",
    amount: 60,
    fee: 1.80,
    net: 58.20,
    status: "completed",
    date: "Dec 22, 2024",
    type: "sale" as const,
  },
  {
    id: "TXN-002",
    description: "1:1 Business Coaching",
    customer: "Omar Khalil",
    amount: 45,
    fee: 1.35,
    net: 43.65,
    status: "completed",
    date: "Dec 21, 2024",
    type: "sale" as const,
  },
  {
    id: "TXN-003",
    description: "Weekly Payout",
    customer: "—",
    amount: 750,
    fee: 0,
    net: 750,
    status: "completed",
    date: "Dec 20, 2024",
    type: "payout" as const,
  },
  {
    id: "TXN-004",
    description: "Content Creation Blueprint",
    customer: "Fatima Al-Rashid",
    amount: 15,
    fee: 0.45,
    net: 14.55,
    status: "completed",
    date: "Dec 19, 2024",
    type: "sale" as const,
  },
  {
    id: "TXN-005",
    description: "Refund - Brand Building Masterclass",
    customer: "Sara Ibrahim",
    amount: 30,
    fee: 0,
    net: -30,
    status: "completed",
    date: "Dec 18, 2024",
    type: "refund" as const,
  },
  {
    id: "TXN-006",
    description: "Social Media Strategy Guide",
    customer: "Layla Mohammed",
    amount: 9,
    fee: 0.27,
    net: 8.73,
    status: "completed",
    date: "Dec 17, 2024",
    type: "sale" as const,
  },
  {
    id: "TXN-007",
    description: "Content Strategy Workshop",
    customer: "Youssef Nasser",
    amount: 25,
    fee: 0.75,
    net: 24.25,
    status: "pending",
    date: "Dec 16, 2024",
    type: "sale" as const,
  },
  {
    id: "TXN-008",
    description: "Balance Adjustment",
    customer: "—",
    amount: 5,
    fee: 0,
    net: 5,
    status: "completed",
    date: "Dec 15, 2024",
    type: "adjustment" as const,
  },
];

// Enhanced upcoming payouts
const upcomingPayouts = [
  { 
    id: 'PAY-003',
    type: 'weekly' as const,
    amount: 575, 
    status: 'scheduled' as const,
    expectedDate: 'Jan 9, 2025'
  },
  { 
    id: 'PAY-002',
    type: 'weekly' as const,
    amount: 380, 
    status: 'completed' as const,
    expectedDate: 'Jan 2, 2025'
  },
];

// Payout history
const payoutHistory = [
  { id: 'PAY-002', date: 'Jan 2, 2025', amount: 380, type: 'weekly' as const, status: 'completed' as const, referenceId: 'REF-ABC123' },
  { id: 'PAY-001', date: 'Dec 26, 2024', amount: 750, type: 'weekly' as const, status: 'completed' as const, referenceId: 'REF-DEF456' },
  { id: 'PAY-000', date: 'Dec 19, 2024', amount: 620, type: 'monthly' as const, status: 'completed' as const, referenceId: 'REF-GHI789' },
  { id: 'PAY-F01', date: 'Dec 12, 2024', amount: 450, type: 'immediate' as const, status: 'failed' as const, referenceId: 'REF-XYZ000' },
];

const getTransactionTypeConfig = (type: string) => {
  switch (type) {
    case 'sale':
      return { label: 'Sale', className: 'bg-accent/10 text-accent' };
    case 'refund':
      return { label: 'Refund', className: 'bg-destructive/10 text-destructive' };
    case 'payout':
      return { label: 'Payout', className: 'bg-muted text-muted-foreground' };
    case 'adjustment':
      return { label: 'Adjustment', className: 'bg-chart-4/10 text-chart-4' };
    default:
      return { label: type, className: 'bg-muted text-muted-foreground' };
  }
};

const getPayoutTypeLabel = (type: string) => {
  switch (type) {
    case 'weekly': return 'Weekly';
    case 'monthly': return 'Monthly';
    case 'immediate': return 'Immediate';
    default: return type;
  }
};

export default function Payments() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const currencyLabel = language === 'ar' ? 'د.ك' : 'KWD';
  const [requestPayoutOpen, setRequestPayoutOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleRequestPayout = () => {
    setRequestPayoutOpen(false);
    toast.success(t('payments.toasts.payoutRequested'), {
      description: t('payments.toasts.payoutProcessing'),
    });
  };

  const handleDownloadReport = () => {
    toast.success(t('payments.toasts.reportDownloaded'), {
      description: dateRange?.from 
        ? `${t('payments.toasts.reportFor')} ${dateRange.from.toLocaleDateString()} - ${dateRange.to?.toLocaleDateString() || 'now'}`
        : t('payments.toasts.fullReportDownloaded'),
    });
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t('payments.title')}</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {t('payments.subtitle')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <DateRangePicker 
              dateRange={dateRange} 
              onDateRangeChange={setDateRange}
              className="w-full sm:w-auto"
            />
            <Button variant="outline" className="w-full sm:w-auto" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 me-2" />
              {t('payments.downloadReport')}
            </Button>
          </div>
        </div>

        {/* Balance Breakdown - 4 Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          {/* Available for Payout */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-slide-up">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Available for Payout</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">{balanceBreakdown.availableForPayout.toLocaleString()} {currencyLabel}</p>
                <p className="text-xs text-muted-foreground mt-1">Ready to withdraw now</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Wallet className="h-5 w-5 text-accent" />
              </div>
            </div>
            <Button 
              className="w-full mt-4 gradient-bg"
              onClick={() => setRequestPayoutOpen(true)}
              disabled={balanceBreakdown.availableForPayout <= 0}
            >
              Request Payout
            </Button>
          </div>

          {/* Pending */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-slide-up" style={{ animationDelay: "50ms" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">{balanceBreakdown.pending.toLocaleString()} {currencyLabel}</p>
                <p className="text-xs text-muted-foreground mt-1">Recent sales still clearing</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                <Clock className="h-5 w-5 text-chart-4" />
              </div>
            </div>
          </div>

          {/* Scheduled for Payout */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Scheduled for Payout</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">{balanceBreakdown.scheduledForPayout.toLocaleString()} {currencyLabel}</p>
                <p className="text-xs text-muted-foreground mt-1">Included in next payout</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CalendarClock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Paid Out Lifetime */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card animate-slide-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Paid Out (Lifetime)</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2">{balanceBreakdown.paidOutLifetime.toLocaleString()} {currencyLabel}</p>
                <p className="text-xs text-muted-foreground mt-1">Total paid to date</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <CheckCircle2 className="h-5 w-5 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Payout Schedule & Method Section */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Payout Schedule & Method</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/settings?tab=payouts')}
              className="gap-2"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            {/* Schedule Info */}
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current Schedule</p>
                  <p className="font-semibold mt-1">
                    {payoutSettings.schedule === 'weekly' ? 'Weekly (Every Thursday)' : 
                     payoutSettings.schedule === 'monthly' ? 'Monthly (Last working day)' : 
                     'Daily (Immediate)'}
                  </p>
                </div>
                <Badge variant="secondary" className={cn(
                  "text-xs",
                  payoutSettings.schedule === 'daily' 
                    ? "bg-chart-4/10 text-chart-4" 
                    : "bg-accent/10 text-accent"
                )}>
                  {payoutSettings.schedule === 'daily' ? `${currencyLabel} 1` : 'Free'}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                <span>Next payout: <span className="text-foreground font-medium">{payoutSettings.nextPayoutDate}</span></span>
              </div>
            </div>

            {/* Method Info */}
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payout Method</p>
                  <p className="font-semibold mt-1">{payoutSettings.method}</p>
                  <p className="text-sm text-muted-foreground">
                    {payoutSettings.bankDetails.accountNumber} - {payoutSettings.bankDetails.bankName}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {payoutSettings.status === 'verified' ? (
                  <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs">
                    Needs action
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">Updated {payoutSettings.lastUpdated}</span>
              </div>
            </div>
          </div>
          
          {/* Helper Text */}
          <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-muted/50">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Weekly and monthly payouts are free. You can request an immediate payout for a 1 {currencyLabel} fee.
            </p>
          </div>
        </div>

        {/* Upcoming Payouts */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-card mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: "250ms" }}>
          <h3 className="text-base sm:text-lg font-semibold mb-4">Upcoming Payouts</h3>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            {upcomingPayouts.map((payout) => (
              <div
                key={payout.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-4",
                  payout.status === "completed" ? "border-accent/20 bg-accent/5" : "border-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    payout.status === "completed" ? "bg-accent/10" : "bg-muted"
                  )}>
                    {payout.status === "completed" ? (
                      <ArrowUpRight className="h-5 w-5 text-accent" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{getPayoutTypeLabel(payout.type)} Payout</p>
                      <Badge variant="outline" className="text-xs">
                        {getPayoutTypeLabel(payout.type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{payout.expectedDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{payout.amount.toLocaleString()} {currencyLabel}</p>
                  <Badge
                    variant={payout.status === "completed" ? "default" : "secondary"}
                    className={cn(
                      "text-xs",
                      payout.status === "completed" && "bg-accent"
                    )}
                  >
                    {payout.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            These payouts are scheduled based on your selected payout option.
          </p>
        </div>

        {/* Payout History */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="p-4 sm:p-6 border-b border-border">
            <h3 className="text-base sm:text-lg font-semibold">Payout History</h3>
          </div>
          
          {/* Mobile Cards */}
          <div className="mobile-card-list p-4">
            {payoutHistory.map((payout) => (
              <div key={payout.id} className="mobile-card">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {getPayoutTypeLabel(payout.type)}
                      </Badge>
                      {payout.status === 'failed' ? (
                        <Badge variant="destructive" className="text-xs">Failed</Badge>
                      ) : (
                        <Badge variant="default" className="text-xs bg-accent">{payout.status}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{payout.date}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{payout.referenceId}</p>
                  </div>
                  <p className="font-semibold text-lg">{payout.amount.toLocaleString()} {currencyLabel}</p>
                </div>
                {payout.status === 'failed' && (
                  <p className="text-xs text-destructive flex items-center gap-1 mt-2">
                    <RotateCcw className="h-3 w-3" />
                    Returned to balance
                  </p>
                )}
              </div>
            ))}
          </div>
          
          {/* Desktop Table */}
          <div className="desktop-table-only">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((payout) => (
                  <TableRow key={payout.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{payout.date}</TableCell>
                    <TableCell className="font-semibold">{payout.amount.toLocaleString()} {currencyLabel}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {getPayoutTypeLabel(payout.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payout.status === 'failed' ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            Failed
                          </Badge>
                          <span className="text-xs text-destructive flex items-center gap-1">
                            <RotateCcw className="h-3 w-3" />
                            Returned to balance
                          </span>
                        </div>
                      ) : (
                        <Badge
                          variant="default"
                          className="text-xs bg-accent"
                        >
                          {payout.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {payout.referenceId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden animate-slide-up" style={{ animationDelay: "350ms" }}>
          <div className="p-4 sm:p-6 border-b border-border">
            <h3 className="text-base sm:text-lg font-semibold">Recent Transactions</h3>
          </div>
          
          {/* Mobile Cards */}
          <div className="mobile-card-list p-4">
            {transactions.map((transaction) => {
              const typeConfig = getTransactionTypeConfig(transaction.type);
              const isNegative = transaction.type === 'refund' || transaction.type === 'payout';
              
              return (
                <div key={transaction.id} className="mobile-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className={cn("text-xs", typeConfig.className)}>
                          {typeConfig.label}
                        </Badge>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className={cn("text-xs", transaction.status === "completed" && "bg-accent")}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{transaction.customer} • {transaction.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={cn("font-semibold", transaction.net < 0 ? "text-destructive" : "text-accent")}>
                        {transaction.net < 0 ? "" : "+"}{transaction.net.toFixed(2)} {currencyLabel}
                      </p>
                      {transaction.fee > 0 && (
                        <p className="text-xs text-muted-foreground">-{transaction.fee.toFixed(2)} fee</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Desktop Table */}
          <div className="desktop-table-only">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Net</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => {
                  const typeConfig = getTransactionTypeConfig(transaction.type);
                  const isNegative = transaction.type === 'refund' || transaction.type === 'payout';
                  
                  return (
                    <TableRow key={transaction.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-xs", typeConfig.className)}>
                          {typeConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {transaction.customer}
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-medium",
                          isNegative ? "text-destructive" : "text-accent"
                        )}>
                          {isNegative ? "-" : "+"}{transaction.amount.toLocaleString()} {currencyLabel}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {transaction.fee > 0 ? `-${transaction.fee.toFixed(2)} ${currencyLabel}` : "—"}
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "font-semibold",
                          transaction.net < 0 ? "text-destructive" : "text-accent"
                        )}>
                          {transaction.net < 0 ? "" : "+"}{transaction.net.toFixed(2)} {currencyLabel}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className={cn(
                            "text-xs",
                            transaction.status === "completed" && "bg-accent"
                          )}
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {transaction.date}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Mobile Sticky Request Payout Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border z-40 md:hidden">
          <Button 
            className="w-full h-12 gradient-bg text-base font-medium"
            onClick={() => setRequestPayoutOpen(true)}
            disabled={balanceBreakdown.availableForPayout <= 0}
          >
            Request Payout • {balanceBreakdown.availableForPayout.toLocaleString()} {currencyLabel}
          </Button>
        </div>
        
        {/* Spacer for mobile sticky button */}
        <div className="h-20 md:hidden" />
      </div>

      {/* Request Payout Modal */}
      <RequestPayoutModal
        open={requestPayoutOpen}
        onClose={() => setRequestPayoutOpen(false)}
        onConfirm={handleRequestPayout}
        availableBalance={balanceBreakdown.availableForPayout}
      />
    </DashboardLayout>
  );
}

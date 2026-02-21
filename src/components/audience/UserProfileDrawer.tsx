import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Smartphone, 
  Calendar,
  ShoppingBag,
  CreditCard,
  Clock,
  Package,
  Play,
  Video,
  UserPlus,
  Eye,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

export interface UserProduct {
  id: string;
  name: string;
  type: 'course' | 'session' | 'program' | 'membership';
  status: 'active' | 'completed' | 'expired' | 'refunded' | 'deleted';
  purchaseDate: string;
}

export interface UserTimelineEvent {
  id: string;
  date: string;
  action: string;
  productName?: string;
  type: 'account' | 'view' | 'purchase' | 'enrollment' | 'membership' | 'session' | 'refund';
}

export interface UserProfileData {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  country?: string;
  avatarUrl?: string;
  signupMethod: 'google' | 'apple' | 'email';
  status: 'registered' | 'paying_customer' | 'active_member';
  firstSignupDate: string;
  lastActivityDate: string;
  lastDevice?: string;
  
  // Relationship summary
  lifetimeSpend: number;
  purchaseCount: number;
  productsCount: number;
  firstPurchaseDate?: string;
  lastPurchaseDate?: string;
  membershipStatus: 'active' | 'past' | 'never';
  
  // Products
  products: UserProduct[];
  
  // Timeline
  timeline: UserTimelineEvent[];
  
  // Engagement
  avgCourseCompletion?: number;
  liveSessionsAttended?: number;
  lastContentInteraction?: string;
}

interface UserProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  user: UserProfileData | null;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getSignupMethodLabel(method: 'google' | 'apple' | 'email'): string {
  switch (method) {
    case 'google': return 'Google';
    case 'apple': return 'Apple';
    case 'email': return 'Email';
  }
}

function getStatusBadge(status: 'registered' | 'paying_customer' | 'active_member') {
  switch (status) {
    case 'active_member':
      return <Badge className="bg-primary text-primary-foreground border-0">Active Member</Badge>;
    case 'paying_customer':
      return <Badge className="bg-primary text-primary-foreground border-0">Paying Customer</Badge>;
    case 'registered':
      return <Badge variant="secondary">Registered</Badge>;
  }
}

function getProductStatusBadge(status: UserProduct['status']) {
  switch (status) {
    case 'active':
      return <Badge className="bg-primary text-primary-foreground border-0 text-xs">Active</Badge>;
    case 'completed':
      return <Badge className="bg-primary text-primary-foreground border-0 text-xs">Completed</Badge>;
    case 'expired':
      return <Badge variant="secondary" className="text-xs">Expired</Badge>;
    case 'refunded':
      return <Badge className="bg-destructive/10 text-destructive border-0 text-xs">Refunded</Badge>;
    case 'deleted':
      return <Badge variant="outline" className="text-muted-foreground text-xs">Deleted</Badge>;
  }
}

function getProductTypeLabel(type: UserProduct['type']) {
  switch (type) {
    case 'course': return 'Course';
    case 'session': return 'Session';
    case 'program': return 'Program';
    case 'membership': return 'Membership';
  }
}

function getTimelineIcon(type: UserTimelineEvent['type']) {
  switch (type) {
    case 'account': return <UserPlus className="h-5 w-5" />;
    case 'view': return <Eye className="h-5 w-5" />;
    case 'purchase': return <ShoppingBag className="h-5 w-5" />;
    case 'enrollment': return <Play className="h-5 w-5" />;
    case 'membership': return <CreditCard className="h-5 w-5" />;
    case 'session': return <Video className="h-5 w-5" />;
    case 'refund': return <RotateCcw className="h-5 w-5" />;
  }
}

function getMembershipStatusLabel(status: 'active' | 'past' | 'never') {
  switch (status) {
    case 'active': return 'Active';
    case 'past': return 'Past Member';
    case 'never': return 'Never';
  }
}

export function UserProfileDrawer({ open, onClose, user }: UserProfileDrawerProps) {
  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            {/* 1. User Header */}
            <SheetHeader className="text-left pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-xl truncate">{user.name}</SheetTitle>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {getStatusBadge(user.status)}
                    <Badge variant="outline" className="text-xs">
                      {getSignupMethodLabel(user.signupMethod)}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Joined {user.firstSignupDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Last active {user.lastActivityDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetHeader>

            <Separator className="my-4" />

            {/* 2. Contact & Account Information */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Contact & Account</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className={user.email ? '' : 'text-muted-foreground'}>
                    {user.email || 'Not provided'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className={user.phone ? '' : 'text-muted-foreground'}>
                    {user.phone || 'Not provided'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className={user.country ? '' : 'text-muted-foreground'}>
                    {user.country || 'Not provided'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span className={user.lastDevice ? '' : 'text-muted-foreground'}>
                    {user.lastDevice || 'Not provided'}
                  </span>
                </div>
              </div>
            </section>

            <Separator className="my-4" />

            {/* 3. Relationship Summary */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Relationship Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-lg font-bold text-primary">{user.lifetimeSpend} KWD</p>
                  <p className="text-xs text-muted-foreground">Lifetime Spend</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-lg font-bold">{user.purchaseCount}</p>
                  <p className="text-xs text-muted-foreground">Purchases</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-lg font-bold">{user.productsCount}</p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="text-lg font-bold">{getMembershipStatusLabel(user.membershipStatus)}</p>
                  <p className="text-xs text-muted-foreground">Membership</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>First purchase: {user.firstPurchaseDate || 'None'}</p>
                <p>Most recent: {user.lastPurchaseDate || 'None'}</p>
              </div>
            </section>

            <Separator className="my-4" />

            {/* 4. Products & Access */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Products & Access</h3>
              {user.products.length === 0 ? (
                <p className="text-sm text-muted-foreground">No products purchased.</p>
              ) : (
                <div className="space-y-2">
                  {user.products.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium truncate ${product.status === 'deleted' ? 'text-muted-foreground italic' : ''}`}>
                          {product.status === 'deleted' ? 'Deleted product' : product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getProductTypeLabel(product.type)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{product.purchaseDate}</span>
                        </div>
                      </div>
                      {getProductStatusBadge(product.status)}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <Separator className="my-4" />

            {/* 5. Interaction Timeline */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Interaction Timeline</h3>
              {user.timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground">No interactions recorded.</p>
              ) : (
                <div className="relative space-y-4 pl-12">
                  <div className="absolute left-[16px] top-2 bottom-2 w-px bg-border" />
                  {user.timeline.map((event) => (
                    <div key={event.id} className="relative flex gap-4">
                      <div className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0 pl-3">
                        <p className="text-sm font-medium">{event.action}</p>
                        {event.productName && (
                          <p className="text-xs text-muted-foreground truncate">{event.productName}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 6. Engagement Summary (Optional) */}
            {(user.avgCourseCompletion !== undefined || user.liveSessionsAttended !== undefined || user.lastContentInteraction) && (
              <>
                <Separator className="my-4" />
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Engagement Summary</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {user.avgCourseCompletion !== undefined && (
                      <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                        <p className="text-lg font-bold text-primary">{user.avgCourseCompletion}%</p>
                        <p className="text-xs text-muted-foreground">Avg Completion</p>
                      </div>
                    )}
                    {user.liveSessionsAttended !== undefined && (
                      <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                        <p className="text-lg font-bold text-primary">{user.liveSessionsAttended}</p>
                        <p className="text-xs text-muted-foreground">Sessions</p>
                      </div>
                    )}
                    {user.lastContentInteraction && (
                      <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                        <p className="text-sm font-bold truncate">{user.lastContentInteraction}</p>
                        <p className="text-xs text-muted-foreground">Last Interaction</p>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

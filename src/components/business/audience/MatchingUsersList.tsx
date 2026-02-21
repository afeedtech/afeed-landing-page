import { useState } from 'react';
import { Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SegmentedUser } from '@/types/analytics';
import { cn } from '@/lib/utils';
import { UserProfileDrawer, UserProfileData } from '@/components/audience';
import { generateMockUserProfile } from '@/components/audience/mockUserData';

interface MatchingUsersListProps {
  users: SegmentedUser[];
  totalMatching: number;
  onSaveSegment?: () => void;
}

const engagementColors: Record<string, string> = {
  Low: 'bg-destructive/10 text-destructive',
  Medium: 'bg-amber-500/10 text-amber-600',
  High: 'bg-brand-accent/10 text-brand-accent',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function MatchingUsersList({ users, totalMatching, onSaveSegment }: MatchingUsersListProps) {
  const { language } = useLanguage();
  const [selectedUser, setSelectedUser] = useState<UserProfileData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleUserClick = (user: SegmentedUser) => {
    const profileData = generateMockUserProfile(
      user.id,
      user.name,
      user.email,
      user.totalSpend,
      user.productsInteracted
    );
    setSelectedUser(profileData);
    setDrawerOpen(true);
  };

  if (users.length === 0) {
    return (
      <Card className="rounded-xl border border-border bg-card shadow-card">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No users match the selected filters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border border-border bg-card shadow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Matching Users</CardTitle>
            <p className="text-sm text-muted-foreground">
              Showing {users.length} of {totalMatching.toLocaleString()} users
            </p>
          </div>
          {onSaveSegment && (
            <Button onClick={onSaveSegment} size="sm">
              <Save className="h-4 w-4" />
              Save Segment
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Total Spend</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user.id} 
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        {user.email && (
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-accent">
                      {user.totalSpend} {language === 'ar' ? 'د.ك' : 'KWD'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn('text-xs border-0', engagementColors[user.engagementLevel])}
                    >
                      {user.engagementLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.lastActivity}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.productsInteracted.slice(0, 2).map((product, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {product.length > 15 ? product.slice(0, 15) + '...' : product}
                        </Badge>
                      ))}
                      {user.productsInteracted.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.productsInteracted.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <UserProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={selectedUser}
      />
    </Card>
  );
}

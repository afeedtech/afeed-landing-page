import { MoreHorizontal, Mail, MessageCircle, Send, Eye, Copy, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Campaign, ChannelType } from '@/types/marketing';
import { SavedSegment } from '@/types/analytics';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface CampaignsListProps {
  campaigns: Campaign[];
  segments: SavedSegment[];
  onView: (campaign: Campaign) => void;
  onDuplicate: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}

const channelIcons: Record<ChannelType, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Mail,
  sms: Mail,
  push: Mail,
};

const statusColors: Record<Campaign['status'], string> = {
  draft: 'bg-muted text-muted-foreground',
  scheduled: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  sent: 'bg-brand-primary/10 text-brand-primary',
};

export function CampaignsList({ campaigns, segments, onView, onDuplicate, onDelete }: CampaignsListProps) {
  const getSegmentNames = (segmentIds: string[]) => {
    return segmentIds
      .map(id => segments.find(s => s.id === id)?.name || 'Unknown')
      .join(', ');
  };

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <Mail className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">No campaigns yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Create your first campaign to start reaching your audience.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Campaign</TableHead>
            <TableHead>Segment(s)</TableHead>
            <TableHead>Channel(s)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id} className="hover:bg-muted/30">
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{campaign.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {campaign.recipientCount.toLocaleString()} recipients
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {getSegmentNames(campaign.segmentIds)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {campaign.channelIds.map((channelId) => {
                    const Icon = channelIcons[channelId];
                    return (
                      <div
                        key={channelId}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-muted"
                        title={channelId}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn('capitalize text-xs', statusColors[campaign.status])}
                >
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(campaign.updatedAt), 'MMM d, yyyy')}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(campaign)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate(campaign)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(campaign)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { Mail, MessageCircle, Send, Users, Calendar, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Campaign, ChannelType } from '@/types/marketing';
import { SavedSegment } from '@/types/analytics';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ViewCampaignModalProps {
  open: boolean;
  onClose: () => void;
  campaign: Campaign | null;
  segments: SavedSegment[];
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

export function ViewCampaignModal({ open, onClose, campaign, segments }: ViewCampaignModalProps) {
  if (!campaign) return null;

  const getSegmentNames = (segmentIds: string[]) => {
    return segmentIds
      .map(id => segments.find(s => s.id === id)?.name || 'Unknown')
      .join(', ');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{campaign.name}</DialogTitle>
            <Badge
              variant="secondary"
              className={cn('capitalize', statusColors[campaign.status])}
            >
              {campaign.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Meta info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Recipients</p>
                <p className="font-medium">{campaign.recipientCount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                {campaign.status === 'scheduled' ? (
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Clock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {campaign.status === 'sent' ? 'Sent' : campaign.status === 'scheduled' ? 'Scheduled' : 'Created'}
                </p>
                <p className="font-medium">
                  {campaign.sentAt
                    ? format(new Date(campaign.sentAt), 'MMM d, yyyy h:mm a')
                    : campaign.scheduledAt
                    ? format(new Date(campaign.scheduledAt), 'MMM d, yyyy h:mm a')
                    : format(new Date(campaign.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Segments */}
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Target Segments</p>
            <p className="text-sm text-muted-foreground">
              {getSegmentNames(campaign.segmentIds)}
            </p>
          </div>

          {/* Channels */}
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Channels</p>
            <div className="flex gap-2">
              {campaign.channelIds.map((channelId) => {
                const Icon = channelIcons[channelId];
                return (
                  <div
                    key={channelId}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm capitalize">{channelId}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message */}
          {campaign.message && (
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Message</p>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                {campaign.message.subject && (
                  <p className="font-medium text-foreground mb-2">
                    {campaign.message.subject}
                  </p>
                )}
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {campaign.message.body}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

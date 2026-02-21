import { Mail, MessageCircle, Send, Instagram, MessageSquare, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Channel, ChannelType } from '@/types/marketing';
import { cn } from '@/lib/utils';

interface ChannelCardProps {
  channel: Channel;
  onConnect: (channel: Channel) => void;
  onManage: (channel: Channel) => void;
}

const channelIcons: Record<ChannelType, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Instagram,
  sms: MessageSquare,
  push: Bell,
};

export function ChannelCard({ channel, onConnect, onManage }: ChannelCardProps) {
  const Icon = channelIcons[channel.id];
  const isConnected = channel.status === 'connected';
  const isComingSoon = channel.status === 'coming_soon';

  return (
    <Card className={cn(
      "rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-elevated",
      isComingSoon && "opacity-60"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              isConnected ? "bg-brand-primary/10 text-brand-primary" : "bg-muted text-muted-foreground"
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-foreground">{channel.name}</p>
              {isConnected && channel.optInCount !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {channel.optInCount.toLocaleString()} opted-in users
                </p>
              )}
              {!isConnected && !isComingSoon && (
                <p className="text-xs text-muted-foreground">Not connected</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {isConnected && (
              <Badge variant="outline" className="border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-xs">
                Connected
              </Badge>
            )}
            {isComingSoon && (
              <Badge variant="secondary" className="text-xs">
                Coming soon
              </Badge>
            )}
            {!isComingSoon && (
              <Button
                variant={isConnected ? "outline" : "default"}
                size="sm"
                onClick={() => isConnected ? onManage(channel) : onConnect(channel)}
                className={!isConnected ? "brand-gradient-primary text-primary-foreground" : ""}
              >
                {isConnected ? "Manage" : "Connect"}
              </Button>
            )}
          </div>
        </div>
        
        {isConnected && (
          <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
            Only users who explicitly opted in can be contacted.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

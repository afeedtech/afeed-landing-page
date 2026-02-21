import { useState } from 'react';
import { Mail, MessageCircle, Send, Instagram, MessageSquare, Bell, CheckCircle2, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Channel, ChannelType } from '@/types/marketing';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ManageChannelModalProps {
  open: boolean;
  onClose: () => void;
  channel: Channel | null;
  onDisconnect: (channelId: ChannelType) => void;
  onTestSuccess: (channelId: ChannelType) => void;
}

const channelIcons: Record<ChannelType, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Instagram,
  sms: MessageSquare,
  push: Bell,
};

const testInputLabels: Record<ChannelType, { label: string; placeholder: string }> = {
  email: { label: 'Test email address', placeholder: 'your@email.com' },
  whatsapp: { label: 'Test phone number', placeholder: '+1 234 567 8900' },
  telegram: { label: 'Test Telegram username', placeholder: '@username' },
  instagram: { label: 'Test Instagram handle', placeholder: '@username' },
  sms: { label: 'Test phone number', placeholder: '+1 234 567 8900' },
  push: { label: 'Test device ID', placeholder: 'device-token' },
};

export function ManageChannelModal({
  open,
  onClose,
  channel,
  onDisconnect,
  onTestSuccess,
}: ManageChannelModalProps) {
  const [testRecipient, setTestRecipient] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);

  if (!channel) return null;

  const Icon = channelIcons[channel.id];
  const inputConfig = testInputLabels[channel.id];

  const handleTest = async () => {
    if (!testRecipient.trim()) return;
    
    setIsTesting(true);
    setTestResult(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success (90% success rate for demo)
    const success = Math.random() > 0.1;
    setTestResult(success ? 'success' : 'error');
    setIsTesting(false);
    
    if (success) {
      onTestSuccess(channel.id);
    }
  };

  const handleDisconnect = () => {
    onDisconnect(channel.id);
    setDisconnectDialogOpen(false);
    onClose();
  };

  const handleClose = () => {
    setTestRecipient('');
    setTestResult(null);
    onClose();
  };

  const getSenderInfoDisplay = () => {
    if (!channel.senderInfo) return null;
    
    switch (channel.id) {
      case 'email':
        return channel.senderInfo.email ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">From address</span>
            <span className="text-sm font-medium text-foreground">{channel.senderInfo.email}</span>
          </div>
        ) : null;
      case 'whatsapp':
      case 'sms':
        return channel.senderInfo.phoneNumber ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Phone number</span>
            <span className="text-sm font-medium text-foreground">{channel.senderInfo.phoneNumber}</span>
          </div>
        ) : null;
      case 'telegram':
        return channel.senderInfo.botName ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Bot name</span>
            <span className="text-sm font-medium text-foreground">@{channel.senderInfo.botName}</span>
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle>Manage {channel.name}</DialogTitle>
                <DialogDescription>
                  {channel.connectedAt
                    ? `Connected since ${format(new Date(channel.connectedAt), 'MMM d, yyyy')}`
                    : 'Connection settings'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Connection Status */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Connection Status</h4>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-foreground">Connected</span>
                </div>
                {channel.optInCount !== undefined && (
                  <p className="text-sm text-muted-foreground">
                    {channel.optInCount.toLocaleString()} opted-in users
                  </p>
                )}
              </div>
            </div>

            {/* Sender Information */}
            {channel.senderInfo && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Sender Information</h4>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  {getSenderInfoDisplay()}
                </div>
              </div>
            )}

            {/* Test Connection */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Test Connection</h4>
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Send a test message to verify your connection is working.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="test-recipient" className="text-sm">
                    {inputConfig.label}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="test-recipient"
                      placeholder={inputConfig.placeholder}
                      value={testRecipient}
                      onChange={(e) => setTestRecipient(e.target.value)}
                      disabled={isTesting}
                    />
                    <Button
                      onClick={handleTest}
                      disabled={!testRecipient.trim() || isTesting}
                      className="shrink-0"
                    >
                      {isTesting ? 'Sending...' : 'Send Test'}
                    </Button>
                  </div>
                </div>
                
                {testResult && (
                  <div className={cn(
                    "flex items-center gap-2 p-2 rounded-md text-sm",
                    testResult === 'success' 
                      ? "bg-green-500/10 text-green-600" 
                      : "bg-destructive/10 text-destructive"
                  )}>
                    {testResult === 'success' ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Test message sent successfully!
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4" />
                        Failed to send test message. Please try again.
                      </>
                    )}
                  </div>
                )}
                
                {channel.lastTestedAt && (
                  <p className="text-xs text-muted-foreground">
                    Last tested: {format(new Date(channel.lastTestedAt), 'MMM d, yyyy \'at\' h:mm a')}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-destructive">Danger Zone</h4>
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Disconnect this channel</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You will need to reconnect to send campaigns through this channel.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDisconnectDialogOpen(true)}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disconnect Confirmation Dialog */}
      <AlertDialog open={disconnectDialogOpen} onOpenChange={setDisconnectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {channel.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              You will no longer be able to send campaigns through this channel. 
              You'll need to reconnect and re-authorize to use it again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisconnect}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

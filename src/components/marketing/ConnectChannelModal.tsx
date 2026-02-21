import { useState } from 'react';
import { Mail, MessageCircle, Send, Instagram, MessageSquare, Bell, Check, Loader2, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Channel, ChannelType } from '@/types/marketing';
import { cn } from '@/lib/utils';

interface ConnectChannelModalProps {
  open: boolean;
  onClose: () => void;
  channel: Channel | null;
  onSuccess: (channelId: ChannelType) => void;
}

type Step = 'intro' | 'auth' | 'loading' | 'success';

const channelIcons: Record<ChannelType, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Instagram,
  sms: MessageSquare,
  push: Bell,
};

const channelAuthInfo: Record<ChannelType, { label: string; placeholder: string; helpText: string }> = {
  email: {
    label: 'SMTP API Key',
    placeholder: 'Enter your email service API key',
    helpText: 'Connect your email service provider (SendGrid, Mailgun, etc.)',
  },
  whatsapp: {
    label: 'WhatsApp Business API Token',
    placeholder: 'Enter your WhatsApp API token',
    helpText: 'Connect your WhatsApp Business account',
  },
  telegram: {
    label: 'Telegram Bot Token',
    placeholder: 'Enter your bot token from @BotFather',
    helpText: 'Create a bot with @BotFather to get your token',
  },
  instagram: {
    label: 'Instagram Access Token',
    placeholder: 'Enter your Instagram API token',
    helpText: 'Connect your Instagram Business account',
  },
  sms: {
    label: 'SMS API Key',
    placeholder: 'Enter your SMS provider API key',
    helpText: 'Connect your SMS provider (Twilio, etc.)',
  },
  push: {
    label: 'Push Service Key',
    placeholder: 'Enter your push notification service key',
    helpText: 'Connect your push notification service',
  },
};

export function ConnectChannelModal({ open, onClose, channel, onSuccess }: ConnectChannelModalProps) {
  const [step, setStep] = useState<Step>('intro');
  const [apiKey, setApiKey] = useState('');

  if (!channel) return null;

  const Icon = channelIcons[channel.id];
  const authInfo = channelAuthInfo[channel.id];

  const handleAuthorize = () => {
    setStep('auth');
  };

  const handleSubmit = () => {
    if (!apiKey.trim()) return;
    setStep('loading');
    
    // Simulate API connection
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleComplete = () => {
    onSuccess(channel.id);
    handleClose();
  };

  const handleClose = () => {
    setStep('intro');
    setApiKey('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
              <Icon className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <DialogTitle>Connect {channel.name}</DialogTitle>
              <DialogDescription className="mt-0.5">
                {step === 'intro' && 'Set up your channel connection'}
                {step === 'auth' && 'Enter your credentials'}
                {step === 'loading' && 'Connecting...'}
                {step === 'success' && 'Successfully connected!'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {step === 'intro' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-sm mb-2">What you'll need:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• API credentials from your {channel.name} provider</li>
                  <li>• Access to your {channel.name} dashboard</li>
                  <li>• Proper opt-in from your contacts</li>
                </ul>
              </div>
              <Button 
                onClick={handleAuthorize} 
                className="w-full brand-gradient-primary text-primary-foreground"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Authorize with {channel.name}
              </Button>
            </div>
          )}

          {step === 'auth' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">{authInfo.label}</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder={authInfo.placeholder}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">{authInfo.helpText}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('intro')} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!apiKey.trim()}
                  className="flex-1 brand-gradient-primary text-primary-foreground"
                >
                  Connect
                </Button>
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-primary mb-4" />
              <p className="text-sm text-muted-foreground">Verifying connection...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 mb-4">
                  <Check className="h-8 w-8 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{channel.name} Connected!</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  You can now send campaigns through {channel.name}.
                </p>
              </div>
              <Button 
                onClick={handleComplete} 
                className="w-full brand-gradient-primary text-primary-foreground"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

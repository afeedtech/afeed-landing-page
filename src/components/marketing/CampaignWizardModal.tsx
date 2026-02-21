import { useState, useEffect } from 'react';
import { 
  Users, 
  Radio, 
  MessageSquare, 
  Send as SendIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertCircle,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Channel, ChannelType, ReachUsage, Campaign } from '@/types/marketing';
import { SavedSegment } from '@/types/analytics';
import { cn } from '@/lib/utils';

interface CampaignWizardModalProps {
  open: boolean;
  onClose: () => void;
  segments: SavedSegment[];
  channels: Channel[];
  reachUsage: ReachUsage;
  initialSegmentId?: string | null;
  onCreateCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

type Step = 1 | 2 | 3 | 4;

const stepInfo = [
  { step: 1, title: 'Select Audience', icon: Users },
  { step: 2, title: 'Select Channels', icon: Radio },
  { step: 3, title: 'Write Message', icon: MessageSquare },
  { step: 4, title: 'Send or Schedule', icon: SendIcon },
];

const channelIcons: Record<ChannelType, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  whatsapp: MessageCircle,
  telegram: Send,
  instagram: Mail,
  sms: Mail,
  push: Mail,
};

export function CampaignWizardModal({
  open,
  onClose,
  segments,
  channels,
  reachUsage,
  initialSegmentId,
  onCreateCampaign,
}: CampaignWizardModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [campaignName, setCampaignName] = useState('');
  const [selectedSegmentIds, setSelectedSegmentIds] = useState<string[]>([]);
  const [selectedChannelIds, setSelectedChannelIds] = useState<ChannelType[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sendOption, setSendOption] = useState<'now' | 'schedule' | 'draft'>('now');
  const [scheduledDate, setScheduledDate] = useState('');

  // Reset on open and set initial segment
  useEffect(() => {
    if (open) {
      setStep(1);
      setCampaignName('');
      setSelectedSegmentIds(initialSegmentId ? [initialSegmentId] : []);
      setSelectedChannelIds([]);
      setSubject('');
      setBody('');
      setSendOption('now');
      setScheduledDate('');
    }
  }, [open, initialSegmentId]);

  const connectedChannels = channels.filter(c => c.status === 'connected');
  const totalUsers = selectedSegmentIds.reduce((sum, id) => {
    const segment = segments.find(s => s.id === id);
    return sum + (segment?.userCount || 0);
  }, 0);

  const remainingReach = reachUsage.limit - reachUsage.used;
  const wouldExceedLimit = sendOption === 'now' && totalUsers > remainingReach;

  const handleSegmentToggle = (segmentId: string) => {
    setSelectedSegmentIds(prev =>
      prev.includes(segmentId)
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleChannelToggle = (channelId: ChannelType) => {
    setSelectedChannelIds(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedSegmentIds.length > 0;
      case 2:
        return selectedChannelIds.length > 0;
      case 3:
        return body.trim().length > 0 && (selectedChannelIds.includes('email') ? subject.trim().length > 0 : true);
      case 4:
        return campaignName.trim().length > 0 && !wouldExceedLimit;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = () => {
    const campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'> = {
      name: campaignName,
      segmentIds: selectedSegmentIds,
      channelIds: selectedChannelIds,
      status: sendOption === 'draft' ? 'draft' : sendOption === 'schedule' ? 'scheduled' : 'sent',
      recipientCount: totalUsers,
      message: {
        subject: selectedChannelIds.includes('email') ? subject : undefined,
        body,
      },
      ...(sendOption === 'schedule' && { scheduledAt: scheduledDate }),
      ...(sendOption === 'now' && { sentAt: new Date().toISOString() }),
    };
    onCreateCampaign(campaign);
    onClose();
  };

  const replaceVariables = (text: string) => {
    return text
      .replace(/\{\{first_name\}\}/g, 'Ahmed')
      .replace(/\{\{creator_name\}\}/g, 'Hisham Abdoh')
      .replace(/\{\{product_name\}\}/g, 'Marketing Masterclass');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] sm:h-auto sm:max-h-[90vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>New Campaign</DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2 py-4 border-b border-border">
          {stepInfo.map((s, index) => (
            <div key={s.step} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    step >= s.step
                      ? "bg-brand-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s.step ? <Check className="h-4 w-4" /> : s.step}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium hidden sm:block",
                    step >= s.step ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.title}
                </span>
              </div>
              {index < stepInfo.length - 1 && (
                <div
                  className={cn(
                    "h-px w-8 mx-2",
                    step > s.step ? "bg-brand-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="py-4 min-h-[300px]">
          {/* Step 1: Select Audience */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-1">Select one or more segments</h3>
                <p className="text-sm text-muted-foreground">
                  Choose the audience segments you want to reach with this campaign.
                </p>
              </div>

              {segments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No saved segments yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create segments in the Audience tab first.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {segments.map((segment) => (
                    <Card
                      key={segment.id}
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedSegmentIds.includes(segment.id)
                          ? "border-brand-primary bg-brand-primary/5"
                          : "hover:border-muted-foreground/30"
                      )}
                      onClick={() => handleSegmentToggle(segment.id)}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Checkbox
                          checked={selectedSegmentIds.includes(segment.id)}
                          onCheckedChange={() => handleSegmentToggle(segment.id)}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{segment.name}</p>
                          {segment.description && (
                            <p className="text-xs text-muted-foreground">{segment.description}</p>
                          )}
                        </div>
                        <Badge variant="secondary">{segment.userCount.toLocaleString()} users</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {selectedSegmentIds.length > 0 && (
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total recipients:</span>
                    <span className="text-lg font-bold text-brand-primary">
                      {totalUsers.toLocaleString()} users
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Channels */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-1">Select channels</h3>
                <p className="text-sm text-muted-foreground">
                  Choose the channels to send your campaign through.
                </p>
              </div>

              {connectedChannels.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No connected channels yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect at least one channel to send campaigns.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {channels.map((channel) => {
                    const Icon = channelIcons[channel.id];
                    const isConnected = channel.status === 'connected';
                    const isSelected = selectedChannelIds.includes(channel.id);
                    const isDisabled = !isConnected;

                    return (
                      <Card
                        key={channel.id}
                        className={cn(
                          "transition-all",
                          isDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer",
                          isSelected && !isDisabled
                            ? "border-brand-primary bg-brand-primary/5"
                            : !isDisabled && "hover:border-muted-foreground/30"
                        )}
                        onClick={() => !isDisabled && handleChannelToggle(channel.id)}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          {isConnected && (
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleChannelToggle(channel.id)}
                              disabled={isDisabled}
                            />
                          )}
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{channel.name}</p>
                            {isConnected && channel.optInCount && (
                              <p className="text-xs text-muted-foreground">
                                {channel.optInCount.toLocaleString()} opted-in
                              </p>
                            )}
                            {!isConnected && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                {channel.status === 'coming_soon' ? 'Coming soon' : 'Not connected'}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Write Message */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-1">Compose your message</h3>
                <p className="text-sm text-muted-foreground">
                  Use variables like {'{{first_name}}'}, {'{{creator_name}}'}, {'{{product_name}}'}.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                  {selectedChannelIds.includes('email') && (
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject Line</Label>
                      <Input
                        id="subject"
                        placeholder="Enter email subject..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="body">Message Body</Label>
                    <Textarea
                      id="body"
                      placeholder="Write your message here..."
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={8}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 min-h-[200px]">
                    {selectedChannelIds.includes('email') && subject && (
                      <p className="font-medium text-foreground mb-2">
                        {replaceVariables(subject)}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {body ? replaceVariables(body) : 'Your message preview will appear here...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Send or Schedule */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="Enter a name for this campaign..."
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>When to send</Label>
                <RadioGroup value={sendOption} onValueChange={(v) => setSendOption(v as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now" className="font-normal cursor-pointer">
                      Send now
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="schedule" id="schedule" />
                    <Label htmlFor="schedule" className="font-normal cursor-pointer">
                      Schedule for later
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draft" id="draft" />
                    <Label htmlFor="draft" className="font-normal cursor-pointer">
                      Save as draft
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {sendOption === 'schedule' && (
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Schedule Date & Time</Label>
                  <Input
                    id="scheduleDate"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
              )}

              {/* Confirmation Summary */}
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
                <h4 className="font-medium text-foreground">Campaign Summary</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recipients:</span>
                    <span className="font-medium">{totalUsers.toLocaleString()} users</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Channels:</span>
                    <span className="font-medium">{selectedChannelIds.join(', ')}</span>
                  </div>
                  {sendOption === 'now' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reach after send:</span>
                      <span className="font-medium">
                        {Math.max(0, remainingReach - totalUsers).toLocaleString()} remaining
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground border-t border-border pt-3">
                  Only users who opted in to receive messages will be contacted.
                </p>
              </div>

              {/* Reach limit warning */}
              {wouldExceedLimit && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-destructive">
                        Not enough reach remaining
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        You have {remainingReach.toLocaleString()} reach remaining but need {totalUsers.toLocaleString()}.
                        Upgrade your plan or save as draft.
                      </p>
                      <Button size="sm" className="mt-2 brand-gradient-primary text-primary-foreground">
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handleBack}
          >
            {step === 1 ? 'Cancel' : (
              <>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </>
            )}
          </Button>

          {step < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="brand-gradient-primary text-primary-foreground"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="brand-gradient-primary text-primary-foreground"
            >
              {sendOption === 'now' && 'Send Campaign'}
              {sendOption === 'schedule' && 'Schedule Campaign'}
              {sendOption === 'draft' && 'Save Draft'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

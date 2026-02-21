import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Megaphone, Link as LinkIcon, Users } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSegments } from '@/context/SegmentsContext';
import { Channel, ChannelType, Campaign, ReachUsage } from '@/types/marketing';
import {
  ReachUsageCard,
  ChannelCard,
  ConnectChannelModal,
  ManageChannelModal,
  SegmentCard,
  CampaignsList,
  CampaignWizardModal,
  ViewCampaignModal,
  DeleteCampaignDialog,
} from '@/components/marketing';
import { toast } from '@/hooks/use-toast';

// Mock data
const initialChannels: Channel[] = [
  { 
    id: 'email', 
    name: 'Email', 
    status: 'connected', 
    optInCount: 1250,
    connectedAt: '2024-01-05T10:30:00Z',
    lastTestedAt: '2024-01-10T15:45:00Z',
    senderInfo: { email: 'noreply@creator.com' }
  },
  { id: 'whatsapp', name: 'WhatsApp', status: 'not_connected' },
  { id: 'telegram', name: 'Telegram', status: 'not_connected' },
  { id: 'instagram', name: 'Instagram DMs', status: 'coming_soon' },
  { id: 'sms', name: 'SMS', status: 'coming_soon' },
  { id: 'push', name: 'Push Notifications', status: 'coming_soon' },
];

const initialCampaigns: Campaign[] = [
  {
    id: 'camp_1',
    name: 'Summer Sale Announcement',
    segmentIds: ['seg_1'],
    channelIds: ['email'],
    status: 'sent',
    recipientCount: 247,
    sentAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    createdAt: '2024-01-09T15:00:00Z',
    message: {
      subject: 'Exclusive Summer Sale Just for You!',
      body: 'Hi {{first_name}},\n\nAs one of our valued high spenders, you get early access to our summer sale!\n\nBest,\n{{creator_name}}',
    },
  },
  {
    id: 'camp_2',
    name: 'Course Completion Reward',
    segmentIds: ['seg_2'],
    channelIds: ['email'],
    status: 'scheduled',
    scheduledAt: '2024-01-20T09:00:00Z',
    recipientCount: 512,
    updatedAt: '2024-01-12T14:30:00Z',
    createdAt: '2024-01-12T14:30:00Z',
    message: {
      subject: 'Congratulations on completing your course!',
      body: 'Hi {{first_name}},\n\nYou\'ve completed {{product_name}}! Here\'s a special offer for your next course.\n\nKeep learning,\n{{creator_name}}',
    },
  },
  {
    id: 'camp_3',
    name: 'Re-engagement Campaign',
    segmentIds: ['seg_3'],
    channelIds: ['email'],
    status: 'draft',
    recipientCount: 189,
    updatedAt: '2024-01-11T09:15:00Z',
    createdAt: '2024-01-11T09:15:00Z',
    message: {
      subject: 'We miss you!',
      body: 'Hi {{first_name}},\n\nIt\'s been a while! Come back and see what\'s new.\n\n{{creator_name}}',
    },
  },
];

export default function MarketingCampaigns() {
  const { t } = useTranslation();
  const { savedSegments } = useSegments();
  
  // State
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  // Current plan determines reach limit: Basic=500, Growth=5000, Pro=50000
  const currentPlanId = 'growth'; // This would come from user context in a real app
  const [reachUsage] = useState<ReachUsage>({ used: 320, limit: 5000 });
  
  // Modal states
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardInitialSegment, setWizardInitialSegment] = useState<string | null>(null);
  const [viewCampaign, setViewCampaign] = useState<Campaign | null>(null);
  const [deleteCampaign, setDeleteCampaign] = useState<Campaign | null>(null);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const [managingChannel, setManagingChannel] = useState<Channel | null>(null);

  // Handlers
  const handleConnectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    setConnectModalOpen(true);
  };

  const handleManageChannel = (channel: Channel) => {
    setManagingChannel(channel);
    setManageModalOpen(true);
  };

  const handleDisconnectChannel = (channelId: ChannelType) => {
    setChannels(prev =>
      prev.map(c =>
        c.id === channelId
          ? { ...c, status: 'not_connected' as const, optInCount: undefined, connectedAt: undefined, lastTestedAt: undefined, senderInfo: undefined }
          : c
      )
    );
    toast({
      title: 'Channel Disconnected',
      description: `The channel has been disconnected.`,
      variant: 'destructive',
    });
  };

  const handleTestSuccess = (channelId: ChannelType) => {
    setChannels(prev =>
      prev.map(c =>
        c.id === channelId
          ? { ...c, lastTestedAt: new Date().toISOString() }
          : c
      )
    );
  };

  const handleChannelConnected = (channelId: ChannelType) => {
    const senderInfo = channelId === 'email' 
      ? { email: 'noreply@creator.com' }
      : channelId === 'whatsapp' || channelId === 'sms'
        ? { phoneNumber: '+1 555 123 4567' }
        : channelId === 'telegram'
          ? { botName: 'MyCreatorBot' }
          : undefined;

    setChannels(prev =>
      prev.map(c =>
        c.id === channelId
          ? { 
              ...c, 
              status: 'connected' as const, 
              optInCount: Math.floor(Math.random() * 500) + 100,
              connectedAt: new Date().toISOString(),
              senderInfo,
            }
          : c
      )
    );
    toast({
      title: 'Channel Connected',
      description: `Successfully connected ${channelId}.`,
    });
  };

  const handleUseSegmentInCampaign = (segmentId: string) => {
    setWizardInitialSegment(segmentId);
    setWizardOpen(true);
  };

  const handleNewCampaign = () => {
    setWizardInitialSegment(null);
    setWizardOpen(true);
  };

  const handleCreateCampaign = (campaignData: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: `camp_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    toast({
      title: campaignData.status === 'sent' ? 'Campaign Sent!' : campaignData.status === 'scheduled' ? 'Campaign Scheduled' : 'Draft Saved',
      description: `"${campaignData.name}" has been ${campaignData.status === 'sent' ? 'sent' : campaignData.status === 'scheduled' ? 'scheduled' : 'saved'}.`,
    });
  };

  const handleDuplicateCampaign = (campaign: Campaign) => {
    const duplicate: Campaign = {
      ...campaign,
      id: `camp_${Date.now()}`,
      name: `${campaign.name} (Copy)`,
      status: 'draft',
      sentAt: undefined,
      scheduledAt: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCampaigns(prev => [duplicate, ...prev]);
    toast({
      title: 'Campaign Duplicated',
      description: `Created a copy of "${campaign.name}".`,
    });
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    toast({
      title: 'Campaign Deleted',
      description: 'The campaign has been deleted.',
    });
  };

  const isReachExceeded = reachUsage.used >= reachUsage.limit;

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
              <Megaphone className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('marketing.title')}</h1>
              <p className="text-sm text-muted-foreground">
                {t('marketing.subtitle')}
              </p>
            </div>
          </div>
          <Button
            onClick={handleNewCampaign}
            disabled={isReachExceeded}
            className="brand-gradient-primary text-primary-foreground"
          >
            <Plus className="me-2 h-4 w-4" />
            {t('marketing.newCampaign')}
          </Button>
        </div>

        {/* Reach Usage */}
        <ReachUsageCard usage={reachUsage} currentPlanId={currentPlanId} />

        {/* Connected Channels */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-brand-primary" />
            <h2 className="text-lg font-semibold text-foreground">Connected Channels</h2>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map(channel => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                onConnect={handleConnectChannel}
                onManage={handleManageChannel}
              />
            ))}
          </div>
        </section>

        {/* Saved Segments */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-brand-primary" />
            <h2 className="text-lg font-semibold text-foreground">Saved Segments</h2>
          </div>
          {savedSegments.length === 0 ? (
            <Card className="rounded-xl border border-border bg-card">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No saved segments yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                  Create segments in the Audience tab to target specific groups of users.
                </p>
                <Button variant="outline" asChild>
                  <a href="/customers">Go to Audience</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {savedSegments.map(segment => (
                <SegmentCard
                  key={segment.id}
                  segment={segment}
                  onUseInCampaign={() => handleUseSegmentInCampaign(segment.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Campaigns List */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-brand-primary" />
            <h2 className="text-lg font-semibold text-foreground">Campaigns</h2>
          </div>
          <CampaignsList
            campaigns={campaigns}
            segments={savedSegments}
            onView={setViewCampaign}
            onDuplicate={handleDuplicateCampaign}
            onDelete={setDeleteCampaign}
          />
        </section>
        </div>
      </div>

      {/* Modals */}
      <ConnectChannelModal
        open={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        channel={selectedChannel}
        onSuccess={handleChannelConnected}
      />

      <CampaignWizardModal
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        segments={savedSegments}
        channels={channels}
        reachUsage={reachUsage}
        initialSegmentId={wizardInitialSegment}
        onCreateCampaign={handleCreateCampaign}
      />

      <ViewCampaignModal
        open={!!viewCampaign}
        onClose={() => setViewCampaign(null)}
        campaign={viewCampaign}
        segments={savedSegments}
      />

      <DeleteCampaignDialog
        open={!!deleteCampaign}
        onClose={() => setDeleteCampaign(null)}
        campaign={deleteCampaign}
        onConfirm={handleDeleteCampaign}
      />

      <ManageChannelModal
        open={manageModalOpen}
        onClose={() => setManageModalOpen(false)}
        channel={managingChannel}
        onDisconnect={handleDisconnectChannel}
        onTestSuccess={handleTestSuccess}
      />
    </DashboardLayout>
  );
}

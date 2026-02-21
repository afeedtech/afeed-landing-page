// Channel types
export type ChannelType = 'email' | 'whatsapp' | 'telegram' | 'instagram' | 'sms' | 'push';
export type ChannelStatus = 'connected' | 'not_connected' | 'coming_soon';

export interface ChannelSenderInfo {
  email?: string;
  phoneNumber?: string;
  botName?: string;
}

export interface Channel {
  id: ChannelType;
  name: string;
  status: ChannelStatus;
  optInCount?: number;
  connectedAt?: string;
  lastTestedAt?: string;
  senderInfo?: ChannelSenderInfo;
}

// Campaign types
export type CampaignStatus = 'draft' | 'scheduled' | 'sent';

export interface Campaign {
  id: string;
  name: string;
  segmentIds: string[];
  channelIds: ChannelType[];
  status: CampaignStatus;
  scheduledAt?: string;
  sentAt?: string;
  recipientCount: number;
  updatedAt: string;
  createdAt: string;
  message?: {
    subject?: string;
    body: string;
  };
}

// Reach usage
export interface ReachUsage {
  used: number;
  limit: number;
}

// Campaign creation wizard state
export interface CampaignWizardState {
  step: 1 | 2 | 3 | 4;
  selectedSegmentIds: string[];
  selectedChannelIds: ChannelType[];
  message: {
    subject?: string;
    body: string;
  };
  sendOption: 'now' | 'schedule' | 'draft';
  scheduledDate?: string;
}

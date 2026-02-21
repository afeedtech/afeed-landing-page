export type GoalType = 'grow' | 'sell' | 'educate' | 'reengage';
export type EmotionalTrigger = 'authority' | 'curiosity' | 'pain-relief' | 'storytelling';
export type FormatType = 'hook-first' | 'story' | 'problem-solution' | 'myth-busting' | 'callout';
export type Platform = 'tiktok' | 'instagram' | 'youtube';

export interface ScriptTemplate {
  id: string;
  name: string;
  description: string;
  goal: GoalType;
  emotionalTrigger: EmotionalTrigger;
  format: FormatType;
  exampleHook: string;
  recommended?: boolean;
}

export interface ScheduledPost {
  id: string;
  scriptName: string;
  platform: Platform;
  scheduledDate: string;
  status: 'scheduled' | 'draft';
  hookPreview: string;
}

export interface GeneratedScript {
  hook: string;
  body: string[];
  cta: string;
  hookTiming: string;
  bodyTiming: string;
  ctaTiming: string;
}

export const scriptTemplates: ScriptTemplate[] = [
  {
    id: '1',
    name: 'Authority Hook Framework',
    description: 'Lead with credibility to instantly capture attention and build trust.',
    goal: 'grow',
    emotionalTrigger: 'authority',
    format: 'hook-first',
    exampleHook: 'After 10 years in this industry, here\'s what no one tells you...',
    recommended: true,
  },
  {
    id: '2',
    name: 'Problem to Relief Reel',
    description: 'Identify a pain point and guide viewers to your solution.',
    goal: 'sell',
    emotionalTrigger: 'pain-relief',
    format: 'problem-solution',
    exampleHook: 'Struggling with [X]? You\'re not alone...',
    recommended: true,
  },
  {
    id: '3',
    name: 'Curiosity-Driven Opener',
    description: 'Create an irresistible urge to watch until the end.',
    goal: 'grow',
    emotionalTrigger: 'curiosity',
    format: 'hook-first',
    exampleHook: 'This one trick changed everything for me...',
    recommended: true,
  },
  {
    id: '4',
    name: 'Personal Story Arc',
    description: 'Share a transformative journey that resonates deeply.',
    goal: 'educate',
    emotionalTrigger: 'storytelling',
    format: 'story',
    exampleHook: 'Three years ago, I was exactly where you are now...',
  },
  {
    id: '5',
    name: 'Myth Buster Script',
    description: 'Challenge common beliefs to position yourself as an expert.',
    goal: 'educate',
    emotionalTrigger: 'authority',
    format: 'myth-busting',
    exampleHook: 'Everything you\'ve been told about [X] is wrong...',
  },
  {
    id: '6',
    name: 'Audience Callout',
    description: 'Speak directly to a specific group to boost engagement.',
    goal: 'reengage',
    emotionalTrigger: 'curiosity',
    format: 'callout',
    exampleHook: 'This is for everyone who\'s ever felt like giving up...',
  },
  {
    id: '7',
    name: 'Transformation Reveal',
    description: 'Show before and after to demonstrate real results.',
    goal: 'sell',
    emotionalTrigger: 'pain-relief',
    format: 'story',
    exampleHook: 'Watch what happened after just 30 days...',
  },
  {
    id: '8',
    name: 'Educational Breakdown',
    description: 'Break down complex topics into digestible insights.',
    goal: 'educate',
    emotionalTrigger: 'authority',
    format: 'problem-solution',
    exampleHook: 'Let me explain this in 60 seconds...',
  },
];

export const scheduledPosts: ScheduledPost[] = [
  {
    id: '1',
    scriptName: 'Authority Hook Framework',
    platform: 'tiktok',
    scheduledDate: '2026-01-05T14:00:00',
    status: 'scheduled',
    hookPreview: 'After 10 years in this industry...',
  },
  {
    id: '2',
    scriptName: 'Problem to Relief Reel',
    platform: 'instagram',
    scheduledDate: '2026-01-06T10:00:00',
    status: 'scheduled',
    hookPreview: 'Struggling with growing your audience?',
  },
  {
    id: '3',
    scriptName: 'Curiosity-Driven Opener',
    platform: 'tiktok',
    scheduledDate: '2026-01-07T18:00:00',
    status: 'draft',
    hookPreview: 'This one trick changed everything...',
  },
];

export const audienceOptions = [
  { value: 'beginners', label: 'Beginners' },
  { value: 'professionals', label: 'Professionals' },
  { value: 'parents', label: 'Parents' },
  { value: 'entrepreneurs', label: 'Entrepreneurs' },
  { value: 'students', label: 'Students' },
  { value: 'creatives', label: 'Creatives' },
];

export const outcomeOptions = [
  { value: 'engagement', label: 'Engagement' },
  { value: 'sales', label: 'Sales' },
  { value: 'awareness', label: 'Awareness' },
  { value: 'trust', label: 'Trust' },
];

export const goalLabels: Record<GoalType, { label: string; description: string; recommended?: boolean }> = {
  grow: { label: 'Grow audience', description: 'Attract new followers', recommended: true },
  sell: { label: 'Sell a product', description: 'Drive purchases' },
  educate: { label: 'Educate', description: 'Share valuable insights' },
  reengage: { label: 'Re-engage followers', description: 'Reconnect with your audience' },
};

export const formatLabels: Record<FormatType, { label: string; description: string; recommended?: boolean }> = {
  'hook-first': { label: 'Hook-first', description: 'Lead with a powerful opening', recommended: true },
  'story': { label: 'Story-based', description: 'Connect through narrative' },
  'problem-solution': { label: 'Problem-solution', description: 'Address pain, offer relief', recommended: true },
  'myth-busting': { label: 'Myth-busting', description: 'Challenge common beliefs' },
  'callout': { label: 'Callout', description: 'Speak directly to your audience' },
};

export const triggerLabels: Record<EmotionalTrigger, string> = {
  authority: 'Authority',
  curiosity: 'Curiosity',
  'pain-relief': 'Pain → Relief',
  storytelling: 'Storytelling',
};

export const generateMockScript = (
  goal: GoalType,
  format: FormatType,
  audience: string,
  pain: string,
  outcome: string
): GeneratedScript => {
  const hooks: Record<FormatType, string> = {
    'hook-first': `Stop scrolling if you're ${audience === 'beginners' ? 'just starting out' : 'ready to level up'}...`,
    'story': `Three months ago, I was exactly where you are now...`,
    'problem-solution': `If you're struggling with ${pain || 'this'}, you're not alone.`,
    'myth-busting': `Everything you've been told about ${pain || 'this'} is wrong.`,
    'callout': `This is for every ${audience || 'person'} who's ever felt stuck...`,
  };

  const bodies: Record<FormatType, string[]> = {
    'hook-first': [
      `Here's what most ${audience || 'people'} don't realize...`,
      `The key to ${outcome === 'sales' ? 'converting' : 'growing'} is simpler than you think.`,
      `I learned this the hard way so you don't have to.`,
    ],
    'story': [
      `I was dealing with the same ${pain || 'challenges'} you face today.`,
      `Then I discovered something that changed everything.`,
      `And now I'm sharing it with you because everyone deserves this.`,
    ],
    'problem-solution': [
      `Most people try to solve ${pain || 'this problem'} the wrong way.`,
      `They focus on the symptoms, not the root cause.`,
      `Here's the simple shift that makes all the difference...`,
    ],
    'myth-busting': [
      `The "experts" have been saying the same thing for years.`,
      `But the data tells a completely different story.`,
      `Here's what actually works in the real world...`,
    ],
    'callout': [
      `I see you. I know what you're going through.`,
      `You've tried everything and nothing seems to stick.`,
      `But today, that changes. Here's why...`,
    ],
  };

  const ctas: Record<GoalType, string> = {
    grow: 'Follow for more insights like this.',
    sell: 'Link in bio to get started today.',
    educate: 'Save this for later and share with someone who needs it.',
    reengage: 'Comment below if this resonated with you.',
  };

  return {
    hook: hooks[format],
    body: bodies[format],
    cta: ctas[goal],
    hookTiming: '3s',
    bodyTiming: '25s',
    ctaTiming: '5s',
  };
};

export type CreatorTemplate = 'authority' | 'creator' | 'minimal';

export interface MockProduct {
  id: string;
  title: string;
  type: 'course' | 'session' | 'membership' | 'program';
  price: number;
  currency: string;
  billingCycle?: 'monthly' | 'quarterly' | 'yearly';
  description: string;
  featured?: boolean;
}

export interface MockCreator {
  slug: string;
  name: string;
  handle: string;
  headline: string;
  bio: string;
  image: string;
  coverImage: string;
  template: CreatorTemplate;
  rating: number;
  reviewCount: number;
  credentials: string[];
  earnings: string;
  verified: boolean;
  products: MockProduct[];
}

export const mockCreators: MockCreator[] = [
  {
    slug: 'noura-khalid',
    name: 'Noura Khalid',
    handle: 'noura-khalid',
    headline: 'Digital Marketing Expert & Brand Strategist',
    bio: 'Helping businesses grow through strategic digital marketing. Former Head of Marketing at a Fortune 500 company with 10+ years of experience building brands across the MENA region.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
    template: 'authority',
    rating: 4.9,
    reviewCount: 187,
    credentials: ['10+ Years Experience', 'Fortune 500 Background', '500+ Students'],
    earnings: '8K+ KWD',
    verified: true,
    products: [
      {
        id: 'nk-1',
        title: 'Complete Digital Marketing Masterclass',
        type: 'course',
        price: 85,
        currency: 'KWD',
        description: 'Learn everything from SEO to paid ads',
        featured: true,
      },
      {
        id: 'nk-2',
        title: '1:1 Brand Strategy Session',
        type: 'session',
        price: 45,
        currency: 'KWD',
        description: '45-minute personalized consultation',
      },
      {
        id: 'nk-3',
        title: 'Marketing Insiders Club',
        type: 'membership',
        price: 15,
        currency: 'KWD',
        billingCycle: 'monthly',
        description: 'Weekly tips and exclusive resources',
      },
    ],
  },
  {
    slug: 'ahmed-hassan',
    name: 'Ahmed Hassan',
    handle: 'ahmed-hassan',
    headline: 'Fitness Coach & Nutrition Specialist',
    bio: 'Certified personal trainer helping busy professionals get fit without spending hours at the gym. Science-based approach to sustainable health and fitness.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=400&fit=crop',
    template: 'creator',
    rating: 4.8,
    reviewCount: 324,
    credentials: ['Certified PT', 'Nutrition Coach', '1000+ Clients'],
    earnings: '12K+ KWD',
    verified: true,
    products: [
      {
        id: 'ah-1',
        title: '12-Week Body Transformation',
        type: 'program',
        price: 120,
        currency: 'KWD',
        description: 'Complete fitness and nutrition program',
        featured: true,
      },
      {
        id: 'ah-2',
        title: 'Personal Training Session',
        type: 'session',
        price: 35,
        currency: 'KWD',
        description: '60-minute online training session',
      },
      {
        id: 'ah-3',
        title: 'Fit Life Community',
        type: 'membership',
        price: 10,
        currency: 'KWD',
        billingCycle: 'monthly',
        description: 'Workout plans and accountability',
      },
    ],
  },
  {
    slug: 'sara-almutairi',
    name: 'Sara Al-Mutairi',
    handle: 'sara-almutairi',
    headline: 'Business Coach for Women Entrepreneurs',
    bio: 'Empowering women to build profitable businesses. Featured in Forbes Middle East. Helped 200+ women launch their dream businesses.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop',
    template: 'minimal',
    rating: 5.0,
    reviewCount: 156,
    credentials: ['Forbes Featured', '200+ Mentees', 'Serial Entrepreneur'],
    earnings: '15K+ KWD',
    verified: true,
    products: [
      {
        id: 'sa-1',
        title: 'Launch Your Business Bootcamp',
        type: 'program',
        price: 150,
        currency: 'KWD',
        description: '8-week intensive business building program',
        featured: true,
      },
      {
        id: 'sa-2',
        title: 'Strategy Deep Dive Call',
        type: 'session',
        price: 75,
        currency: 'KWD',
        description: '90-minute business strategy session',
      },
      {
        id: 'sa-3',
        title: 'Entrepreneur Circle',
        type: 'membership',
        price: 25,
        currency: 'KWD',
        billingCycle: 'monthly',
        description: 'Networking and mastermind community',
      },
    ],
  },
  {
    slug: 'omar-qasim',
    name: 'Omar Qasim',
    handle: 'omar-qasim',
    headline: 'Photography & Visual Storytelling',
    bio: 'Award-winning photographer teaching the art and business of photography. From hobbyist to professional in 6 months.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=400&fit=crop',
    template: 'creator',
    rating: 4.7,
    reviewCount: 98,
    credentials: ['Award Winner', '15 Years Pro', 'Magazine Published'],
    earnings: '6K+ KWD',
    verified: true,
    products: [
      {
        id: 'oq-1',
        title: 'Photography Fundamentals Course',
        type: 'course',
        price: 55,
        currency: 'KWD',
        description: 'Master your camera in 30 days',
        featured: true,
      },
      {
        id: 'oq-2',
        title: 'Portfolio Review Session',
        type: 'session',
        price: 40,
        currency: 'KWD',
        description: 'Get expert feedback on your work',
      },
    ],
  },
  {
    slug: 'layla-ibrahim',
    name: 'Layla Ibrahim',
    handle: 'layla-ibrahim',
    headline: 'Arabic Calligraphy Artist & Teacher',
    bio: 'Preserving the art of Arabic calligraphy through modern teaching. Featured at Art Dubai and regional exhibitions.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=400&fit=crop',
    template: 'authority',
    rating: 4.9,
    reviewCount: 203,
    credentials: ['Art Dubai Featured', 'Master Calligrapher', '20+ Years'],
    earnings: '9K+ KWD',
    verified: true,
    products: [
      {
        id: 'li-1',
        title: 'Arabic Calligraphy Masterclass',
        type: 'course',
        price: 95,
        currency: 'KWD',
        description: 'From basics to advanced techniques',
        featured: true,
      },
      {
        id: 'li-2',
        title: 'Private Calligraphy Lesson',
        type: 'session',
        price: 50,
        currency: 'KWD',
        description: 'One-on-one instruction',
      },
      {
        id: 'li-3',
        title: 'Calligraphy Art Circle',
        type: 'membership',
        price: 18,
        currency: 'KWD',
        billingCycle: 'monthly',
        description: 'Monthly projects and community',
      },
    ],
  },
  {
    slug: 'khalid-nasser',
    name: 'Khalid Nasser',
    handle: 'khalid-nasser',
    headline: 'Investment & Personal Finance Educator',
    bio: 'Making finance accessible for everyone. Former investment banker turned educator. Helping you build wealth the smart way.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=400&fit=crop',
    template: 'minimal',
    rating: 4.8,
    reviewCount: 412,
    credentials: ['Ex-Investment Banker', 'CFA Charterholder', '5K+ Students'],
    earnings: '20K+ KWD',
    verified: true,
    products: [
      {
        id: 'kn-1',
        title: 'Smart Investing 101',
        type: 'course',
        price: 65,
        currency: 'KWD',
        description: 'Build your investment portfolio',
        featured: true,
      },
      {
        id: 'kn-2',
        title: 'Financial Planning Session',
        type: 'session',
        price: 80,
        currency: 'KWD',
        description: 'Personalized financial roadmap',
      },
      {
        id: 'kn-3',
        title: 'Wealth Builders Club',
        type: 'membership',
        price: 30,
        currency: 'KWD',
        billingCycle: 'monthly',
        description: 'Market analysis and investment tips',
      },
    ],
  },
];

export function getCreatorBySlug(slug: string): MockCreator | undefined {
  return mockCreators.find(c => c.slug === slug);
}

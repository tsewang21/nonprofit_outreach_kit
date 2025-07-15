export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super-admin' | 'campaign-manager' | 'volunteer-coordinator' | 'outreach-rep';
  avatar?: string;
  permissions: string[];
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  targetAmount?: number;
  currentAmount?: number;
  participantCount: number;
  templates: Template[];
  sequences: Sequence[];
  createdBy: string;
  createdAt: string;
  type?: string;
}

export interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'social' | 'petition' | 'donation' | 'event';
  subject?: string;
  content: string;
  variables: string[];
  status: 'draft' | 'approved' | 'archived';
  createdBy: string;
  createdAt: string;
}

export interface Supporter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  organization?: string;
  urls?: string[];
  enrichmentData?: any;
  segmentScore: number;
  segment: 'major-donor' | 'active-volunteer' | 'lapsed' | 'new' | 'engaged';
  tags: string[];
  lastContact?: string;
  totalDonations?: number;
  eventAttendance?: number;
  petitionsSigned?: number;
}

export interface Sequence {
  id: string;
  name: string;
  campaignId: string;
  steps: SequenceStep[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  targetSegments: string[];
  analytics: SequenceAnalytics;
  createdAt: string;
}

export interface SequenceStep {
  id: string;
  type: 'email' | 'sms' | 'social' | 'phone' | 'petition' | 'donation' | 'event';
  templateId?: string;
  delay: number; // days
  conditions?: any;
  abTest?: {
    variants: any[];
    winner?: string;
  };
}

export interface SequenceAnalytics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  converted: number;
  unsubscribed: number;
}

export interface AnalyticsData {
  overview: {
    totalSupporters: number;
    totalDonations: number;
    totalCampaigns: number;
    activeVolunteers: number;
  };
  recentActivity: any[];
  campaignMetrics: any[];
  segmentDistribution: any[];
}
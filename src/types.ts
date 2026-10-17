import { Product, GalleryItem, TeamMember, FaqItem } from './data/orchafreshData';

export interface InquiryItem {
  id: string;
  name: string;
  quantity: number;
  unit: 'kg' | 'metric_ton' | 'cartons' | 'crates';
  targetSpecs?: string;
}

export interface InquiryFormData {
  name: string;
  company: string;
  country: string;
  portOrCity: string;
  email: string;
  phone: string;
  incoTerm: 'FOB Dhaka (DAC)' | 'FOB Chattogram' | 'CFR' | 'CIF' | 'EXW' | 'Not sure yet';
  shippingMode: 'Air freight' | 'Sea freight' | 'Not sure yet';
  targetDate?: string;
  notes: string;
}

export interface AdminInquiry {
  id: string;
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  product: string;
  quantity: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface VisitorLogEntry {
  id: string;
  timestamp: string;
  country: string;
  city?: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  browser: string;
  page: string;
  referrer: string;
  durationSeconds?: number;
}

export interface VisitorStats {
  totalVisitors: number;
  uniqueVisitors: number;
  todayVisitors: number;
  thisWeekVisitors: number;
  thisMonthVisitors: number;
  activeNow: number;
  countryBreakdown: { country: string; code: string; count: number; percentage: number }[];
  deviceBreakdown: { device: string; count: number; percentage: number }[];
  weeklyTrend: { day: string; date: string; visits: number; uniques: number }[];
  recentLogs: VisitorLogEntry[];
  settings: {
    showPublicCounter: boolean;
    displayLocation: 'footer' | 'navbar' | 'both';
    counterStyle: 'compact' | 'badge' | 'full';
    customBaseline: number;
    lastUpdated: string;
  };
}

export type Language = 'en' | 'bn';

export { type Product, type GalleryItem, type TeamMember, type FaqItem };

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Supporter, AnalyticsData } from '../types';

interface DataContextType {
  supporters: Supporter[];
  analytics: AnalyticsData;
  importSupporters: (data: any[]) => void;
  updateSupporter: (id: string, updates: Partial<Supporter>) => void;
  deleteSupporter: (id: string) => void;
  refreshAnalytics: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Placeholder supporters - will be populated from CSV imports
const placeholderSupporters: Supporter[] = [];

// Placeholder analytics - replace with your analytics data
const placeholderAnalytics: AnalyticsData = {
  overview: {
    totalSupporters: 0,
    totalDonations: 0,
    totalCampaigns: 0,
    activeVolunteers: 0
  },
  recentActivity: [],
  campaignMetrics: [],
  segmentDistribution: []
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [supporters, setSupporters] = useState<Supporter[]>(placeholderSupporters);
  const [analytics, setAnalytics] = useState<AnalyticsData>(placeholderAnalytics);

  const importSupporters = (data: any[]) => {
    // Process CSV data and convert to supporter format
    const newSupporters = data.map((row, index) => ({
      id: (supporters.length + index + 1).toString(),
      firstName: row.firstName || row.first_name || '',
      lastName: row.lastName || row.last_name || '',
      email: row.email || '',
      phone: row.phone || '',
      location: row.location || row.city || '',
      organization: row.organization || row.company || '',
      urls: row.urls ? row.urls.split(',').map((url: string) => url.trim()) : [],
      segmentScore: Math.floor(Math.random() * 100),
      segment: ['new', 'engaged', 'lapsed'][Math.floor(Math.random() * 3)] as any,
      tags: [],
      totalDonations: 0,
      eventAttendance: 0,
      petitionsSigned: 0
    }));
    
    setSupporters(prev => [...prev, ...newSupporters]);
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      overview: {
        ...prev.overview,
        totalSupporters: supporters.length + newSupporters.length
      }
    }));
  };

  const updateSupporter = (id: string, updates: Partial<Supporter>) => {
    setSupporters(prev => prev.map(supporter => 
      supporter.id === id ? { ...supporter, ...updates } : supporter
    ));
  };

  const deleteSupporter = (id: string) => {
    setSupporters(prev => prev.filter(supporter => supporter.id !== id));
  };

  const refreshAnalytics = () => {
    // Refresh analytics data - replace with your analytics logic
    setAnalytics(prev => ({
      ...prev,
      overview: {
        ...prev.overview,
        totalSupporters: supporters.length
      }
    }));
  };

  return (
    <DataContext.Provider value={{
      supporters,
      analytics,
      importSupporters,
      updateSupporter,
      deleteSupporter,
      refreshAnalytics
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
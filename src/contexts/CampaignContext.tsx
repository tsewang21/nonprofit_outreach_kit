import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Campaign, Template, Sequence } from '../types';

interface CampaignContextType {
  campaigns: Campaign[];
  templates: Template[];
  sequences: Sequence[];
  activeCampaign: Campaign | null;
  setActiveCampaign: (campaign: Campaign | null) => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  createTemplate: (template: Omit<Template, 'id' | 'createdAt'>) => void;
  createSequence: (sequence: Omit<Sequence, 'id' | 'createdAt'>) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Placeholder campaigns - replace with your data
const placeholderCampaigns: Campaign[] = [];

// Placeholder templates - replace with your templates
const placeholderTemplates: Template[] = [];

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(placeholderCampaigns);
  const [templates, setTemplates] = useState<Template[]>(placeholderTemplates);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);

  const createCampaign = (campaignData: Omit<Campaign, 'id' | 'createdAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const createTemplate = (templateData: Omit<Template, 'id' | 'createdAt'>) => {
    const newTemplate: Template = {
      ...templateData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const createSequence = (sequenceData: Omit<Sequence, 'id' | 'createdAt'>) => {
    const newSequence: Sequence = {
      ...sequenceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSequences(prev => [...prev, newSequence]);
  };

  return (
    <CampaignContext.Provider value={{
      campaigns,
      templates,
      sequences,
      activeCampaign,
      setActiveCampaign,
      createCampaign,
      updateCampaign,
      deleteCampaign,
      createTemplate,
      createSequence
    }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
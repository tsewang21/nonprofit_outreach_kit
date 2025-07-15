import React, { useState } from 'react';
import { useCampaign } from '../contexts/CampaignContext';
import { 
  Plus, 
  Mail, 
  MessageSquare, 
  Phone, 
  DollarSign, 
  Calendar, 
  Share2,
  Play,
  Pause,
  Settings,
  BarChart3,
  Clock,
  Target,
  Users
} from 'lucide-react';

const SequenceBuilder: React.FC = () => {
  const { sequences, campaigns } = useCampaign();
  const [selectedSequence, setSelectedSequence] = useState<string | null>(null);

  const stepTypes = [
    { id: 'email', label: 'Email', icon: Mail, color: 'blue' },
    { id: 'sms', label: 'SMS', icon: MessageSquare, color: 'green' },
    { id: 'phone', label: 'Phone Call', icon: Phone, color: 'purple' },
    { id: 'donation', label: 'Donation Ask', icon: DollarSign, color: 'orange' },
    { id: 'event', label: 'Event Invite', icon: Calendar, color: 'pink' },
    { id: 'social', label: 'Social Media', icon: Share2, color: 'indigo' }
  ];

  const mockSequences = [
    {
      id: '1',
      name: 'New Supporter Welcome Series',
      campaignId: '1',
      status: 'active',
      targetSegments: ['new'],
      steps: [
        { id: '1', type: 'email', delay: 0, templateId: '1' },
        { id: '2', type: 'email', delay: 3, templateId: '2' },
        { id: '3', type: 'donation', delay: 7, templateId: '3' }
      ],
      analytics: {
        sent: 1247,
        delivered: 1205,
        opened: 723,
        clicked: 156,
        replied: 43,
        converted: 89,
        unsubscribed: 12
      },
      createdAt: '2024-12-15'
    },
    {
      id: '2',
      name: 'Major Donor Cultivation',
      campaignId: '1',
      status: 'draft',
      targetSegments: ['major-donor'],
      steps: [
        { id: '1', type: 'email', delay: 0, templateId: '1' },
        { id: '2', type: 'phone', delay: 2, templateId: null },
        { id: '3', type: 'event', delay: 5, templateId: '4' }
      ],
      analytics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        converted: 0,
        unsubscribed: 0
      },
      createdAt: '2024-12-20'
    }
  ];

  const SequenceCard: React.FC<{ sequence: any }> = ({ sequence }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{sequence.name}</h3>
          <p className="text-sm text-gray-500">
            {campaigns.find(c => c.id === sequence.campaignId)?.name || 'Unknown Campaign'}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          sequence.status === 'active' ? 'bg-green-100 text-green-800' :
          sequence.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {sequence.status}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Target className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {sequence.targetSegments.join(', ')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {sequence.steps.length} steps
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        {sequence.steps.map((step: any, index: number) => {
          const stepType = stepTypes.find(type => type.id === step.type);
          return (
            <div key={step.id} className="flex items-center">
              <div className={`p-2 rounded-full ${
                stepType?.color === 'blue' ? 'bg-blue-100' :
                stepType?.color === 'green' ? 'bg-green-100' :
                stepType?.color === 'purple' ? 'bg-purple-100' :
                stepType?.color === 'orange' ? 'bg-orange-100' :
                stepType?.color === 'pink' ? 'bg-pink-100' :
                'bg-indigo-100'
              }`}>
                {stepType?.icon && (
                  <stepType.icon className={`h-4 w-4 ${
                    stepType?.color === 'blue' ? 'text-blue-600' :
                    stepType?.color === 'green' ? 'text-green-600' :
                    stepType?.color === 'purple' ? 'text-purple-600' :
                    stepType?.color === 'orange' ? 'text-orange-600' :
                    stepType?.color === 'pink' ? 'text-pink-600' :
                    'text-indigo-600'
                  }`} />
                )}
              </div>
              {index < sequence.steps.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
              )}
            </div>
          );
        })}
      </div>

      {sequence.status === 'active' && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{sequence.analytics.sent}</p>
            <p className="text-xs text-gray-500">Sent</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{sequence.analytics.opened}</p>
            <p className="text-xs text-gray-500">Opened</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{sequence.analytics.converted}</p>
            <p className="text-xs text-gray-500">Converted</p>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
          Edit
        </button>
        <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
          {sequence.status === 'active' ? 'Pause' : 'Activate'}
        </button>
        <button className="bg-green-50 text-green-600 py-2 px-3 rounded-md hover:bg-green-100 transition-colors text-sm font-medium">
          <BarChart3 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sequence Builder</h1>
          <p className="text-gray-600 mt-1">Create and manage multichannel outreach sequences</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Create Sequence</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Play className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Sequences</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSequences.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Messages Sent</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSequences.reduce((sum, seq) => sum + seq.analytics.sent, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-full">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockSequences.reduce((sum, seq) => sum + seq.analytics.converted, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">58%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sequence Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sequence Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Welcome Series',
              description: 'Onboard new supporters with a 3-step email sequence',
              steps: ['email', 'email', 'donation'],
              category: 'Onboarding'
            },
            {
              name: 'Re-engagement',
              description: 'Re-activate lapsed supporters with targeted messaging',
              steps: ['email', 'sms', 'phone'],
              category: 'Retention'
            },
            {
              name: 'Event Promotion',
              description: 'Multi-channel event invitation and follow-up',
              steps: ['email', 'social', 'event'],
              category: 'Events'
            }
          ].map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {template.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex items-center space-x-2">
                {template.steps.map((step, stepIndex) => {
                  const stepType = stepTypes.find(type => type.id === step);
                  return (
                    <div key={stepIndex} className="flex items-center">
                      <div className={`p-1 rounded-full ${
                        stepType?.color === 'blue' ? 'bg-blue-100' :
                        stepType?.color === 'green' ? 'bg-green-100' :
                        stepType?.color === 'purple' ? 'bg-purple-100' :
                        stepType?.color === 'orange' ? 'bg-orange-100' :
                        stepType?.color === 'pink' ? 'bg-pink-100' :
                        'bg-indigo-100'
                      }`}>
                        {stepType?.icon && (
                          <stepType.icon className={`h-3 w-3 ${
                            stepType?.color === 'blue' ? 'text-blue-600' :
                            stepType?.color === 'green' ? 'text-green-600' :
                            stepType?.color === 'purple' ? 'text-purple-600' :
                            stepType?.color === 'orange' ? 'text-orange-600' :
                            stepType?.color === 'pink' ? 'text-pink-600' :
                            'text-indigo-600'
                          }`} />
                        )}
                      </div>
                      {stepIndex < template.steps.length - 1 && (
                        <div className="w-4 h-0.5 bg-gray-300 mx-1"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequences List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Sequences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSequences.map(sequence => (
            <SequenceCard key={sequence.id} sequence={sequence} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SequenceBuilder;
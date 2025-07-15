import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCampaign } from '../contexts/CampaignContext';
import { useData } from '../contexts/DataContext';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Mail,
  Heart,
  Globe,
  GraduationCap,
  Building
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { campaigns } = useCampaign();
  const { analytics, supporters } = useData();

  const statsCards = [
    {
      title: 'Network Members',
      value: analytics.overview.totalSupporters.toLocaleString(),
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: 'Tibetan professionals in network'
    },
    {
      title: 'Directory Members',
      value: analytics.overview.activeVolunteers.toString(),
      change: '+8',
      trend: 'up',
      icon: Users,
      color: 'indigo',
      description: 'GTPN professionals in directory'
    },
    {
      title: 'Total Donations',
      value: `$${analytics.overview.totalDonations.toLocaleString()}`,
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      description: 'Supporting GTPN mission'
    },
    {
      title: 'Active Campaigns',
      value: analytics.overview.totalCampaigns.toString(),
      change: '+2',
      trend: 'up',
      icon: Target,
      color: 'slate',
      description: 'Outreach initiatives running'
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'plan-event':
        navigate('/events');
        break;
      case 'find-members':
        navigate('/directory');
        break;
      case 'fundraise':
        navigate('/playbook?tab=campaigns&quickstart=fundraising');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div 
        className="rounded-xl p-6"
        style={{
          background: 'linear-gradient(to right, #1e40af, #1e3a8a)',
          color: 'white'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'white' }}>
              {getGreeting()}, {user?.name}!
            </h1>
            <p className="mt-2" style={{ color: 'white', opacity: 0.9 }}>
              Welcome to the Global Tibetan Professionals Network outreach platform
            </p>
          </div>
          <div className="hidden md:block">
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' }} className="rounded-lg p-4">
              <Globe className="h-8 w-8" style={{ color: 'white' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'indigo' ? 'bg-indigo-100' :
                stat.color === 'green' ? 'bg-green-100' :
                'bg-slate-100'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'indigo' ? 'text-indigo-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  'text-slate-600'
                }`} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">{stat.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* GTPN-Specific Campaign Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">GTPN Campaigns</h3>
          {campaigns.length > 0 ? (
            <div className="space-y-4">
              {campaigns.slice(0, 3).map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{campaign.participantCount} participants</p>
                    {campaign.targetAmount && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>${campaign.currentAmount?.toLocaleString() || 0}</span>
                          <span>${campaign.targetAmount.toLocaleString()}</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                            style={{ width: `${((campaign.currentAmount || 0) / campaign.targetAmount) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Sample GTPN Campaigns */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900">NYC Tibetan Professionals Happy Hour</h4>
                <p className="text-sm text-blue-700 mt-1">Event promotion campaign • 45 participants</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Sample Campaign</span>
                </div>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h4 className="font-medium text-indigo-900">Directory Expansion Drive</h4>
                <p className="text-sm text-indigo-700 mt-1">Growing our professional network • 28 new members</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">Sample Campaign</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900">Support Tibetan Professional Growth</h4>
                <p className="text-sm text-green-700 mt-1">Donation appeal • $2,850 raised</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Sample Campaign</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Activity</h3>
          {analytics.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'donation' ? 'bg-green-100' :
                    activity.type === 'signup' ? 'bg-blue-100' :
                    activity.type === 'directory' ? 'bg-indigo-100' :
                    'bg-slate-100'
                  }`}>
                    {activity.type === 'donation' ? (
                      <DollarSign className="h-4 w-4 text-green-600" />
                    ) : activity.type === 'signup' ? (
                      <Users className="h-4 w-4 text-blue-600" />
                    ) : activity.type === 'directory' ? (
                      <Users className="h-4 w-4 text-indigo-600" />
                    ) : (
                      <Mail className="h-4 w-4 text-slate-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.supporter} {
                        activity.type === 'donation' ? `donated $${activity.amount}` :
                        activity.type === 'signup' ? 'joined the network' :
                        activity.type === 'directory' ? 'joined directory' :
                        'joined directory opt-in'
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Sample Activity */}
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Smith donated $150</p>
                  <p className="text-xs text-gray-500">Supporting professional growth initiatives</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-indigo-100">
                  <Users className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Jane Doe joined the directory</p>
                  <p className="text-xs text-gray-500">Available for networking and professional connections</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Globe className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Alex Johnson joined directory</p>
                  <p className="text-xs text-gray-500">Available for networking and professional connections</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Getting Started for GTPN */}
      {supporters.length === 0 && campaigns.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to GTPN Outreach Platform</h3>
          <p className="text-gray-600 mb-6">
            Start building stronger connections within the Tibetan professional community worldwide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-blue-900 mb-1">Import Network</h4>
              <p className="text-sm text-blue-700">Add Tibetan professionals to your database</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <h4 className="font-medium text-indigo-900 mb-1">Manage Directory</h4>
              <p className="text-sm text-indigo-700">Organize professional networks and connections</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-green-900 mb-1">Create Campaigns</h4>
              <p className="text-sm text-green-700">Design outreach for events and donations</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => handleQuickAction('plan-event')}
            className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
          >
            <Calendar className="h-6 w-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-blue-900">Plan Event</p>
              <p className="text-sm text-blue-700">Happy hour, hackathon, mixer</p>
            </div>
          </button>
          <button 
            onClick={() => handleQuickAction('find-members')}
            className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-100"
          >
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <div className="text-left">
              <p className="font-medium text-indigo-900">Directory Members</p>
              <p className="text-sm text-indigo-700">Recruit experienced professionals</p>
            </div>
          </button>
          <button 
            onClick={() => handleQuickAction('fundraise')}
            className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-100"
          >
            <DollarSign className="h-6 w-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-green-900">Fundraise</p>
              <p className="text-sm text-green-700">Support GTPN programs</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
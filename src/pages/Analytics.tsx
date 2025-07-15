import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useCampaign } from '../contexts/CampaignContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Mail, 
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const Analytics: React.FC = () => {
  const { analytics } = useData();
  const { campaigns } = useCampaign();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCampaign, setSelectedCampaign] = useState('all');

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const campaignPerformanceData = [
    { name: 'Jan', donations: 4000, supporters: 240, events: 24 },
    { name: 'Feb', donations: 3000, supporters: 139, events: 22 },
    { name: 'Mar', donations: 2000, supporters: 280, events: 29 },
    { name: 'Apr', donations: 2780, supporters: 390, events: 20 },
    { name: 'May', donations: 1890, supporters: 480, events: 21 },
    { name: 'Jun', donations: 2390, supporters: 380, events: 25 },
    { name: 'Jul', donations: 3490, supporters: 430, events: 18 }
  ];

  const engagementData = [
    { name: 'Email Opens', value: 65, color: '#3B82F6' },
    { name: 'Link Clicks', value: 42, color: '#10B981' },
    { name: 'Donations', value: 18, color: '#F59E0B' },
    { name: 'Event RSVPs', value: 12, color: '#EF4444' },
    { name: 'Petition Signs', value: 28, color: '#8B5CF6' }
  ];

  const donationTrendData = [
    { date: '2024-01', amount: 12000, donors: 45 },
    { date: '2024-02', amount: 15000, donors: 52 },
    { date: '2024-03', amount: 18000, donors: 61 },
    { date: '2024-04', amount: 22000, donors: 73 },
    { date: '2024-05', amount: 25000, donors: 89 },
    { date: '2024-06', amount: 23500, donors: 82 }
  ];

  const StatCard: React.FC<{ title: string; value: string; change: string; trend: 'up' | 'down'; icon: any; color: string }> = 
    ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'orange' ? 'bg-orange-100' : 'bg-purple-100'}`}>
          <Icon className={`h-6 w-6 ${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'orange' ? 'text-orange-600' : 'text-purple-600'}`} />
        </div>
      </div>
      <div className="flex items-center mt-4">
        <TrendingUp className={`h-4 w-4 mr-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">from last period</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your campaign performance and supporter engagement</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Campaigns</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Supporters"
          value={analytics.overview.totalSupporters.toLocaleString()}
          change="+12%"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Donations"
          value={`$${analytics.overview.totalDonations.toLocaleString()}`}
          change="+8%"
          trend="up"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Email Open Rate"
          value="58.3%"
          change="+2.1%"
          trend="up"
          icon={Mail}
          color="orange"
        />
        <StatCard
          title="Event Attendance"
          value="234"
          change="+15%"
          trend="up"
          icon={Calendar}
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="donations" fill="#3B82F6" />
              <Bar dataKey="supporters" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Breakdown</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donation Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Donation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={donationTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Supporter Segments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Supporter Segments</h3>
          <div className="space-y-4">
            {analytics.segmentDistribution.map((segment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{segment.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{segment.count}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${segment.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{segment.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Metrics Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Campaign</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Supporters</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Donations</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Conversion Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {analytics.campaignMetrics.map((metric, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{metric.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{metric.supporters}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">${metric.donations.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{metric.conversion}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      metric.donations > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {metric.donations > 0 ? 'Active' : 'Planning'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
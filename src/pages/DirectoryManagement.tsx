import React, { useState } from 'react';
import { 
  Globe, 
  Users, 
  Mail, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Eye,
  Edit,
  Shield,
  MapPin,
  Briefcase,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  X,
  Save,
  AlertCircle
} from 'lucide-react';

interface DirectoryMember {
  id: number;
  name: string;
  email: string;
  linkedin: string;
  company: string;
  title: string;
  industry: string;
  location: string;
  consentStatus: 'granted' | 'pending' | 'declined';
  consentDate: string | null;
  lastUpdated: string;
  consentMethod: string | null;
  notes: string;
  skills: string[];
}

const DirectoryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'consent' | 'export' | 'privacy'>('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showConsentRequestModal, setShowConsentRequestModal] = useState(false);

  // Sample directory data with placeholder information
  const [directoryMembers, setDirectoryMembers] = useState<DirectoryMember[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      linkedin: 'https://linkedin.com/in/john-smith',
      company: 'Tech Corp',
      title: 'Senior Software Engineer',
      industry: 'Technology',
      location: 'San Francisco, CA',
      consentStatus: 'granted',
      consentDate: '2024-01-15',
      lastUpdated: '2024-01-15',
      consentMethod: 'Email response',
      notes: 'Active community member',
      skills: ['Python', 'React', 'Machine Learning']
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@email.com',
      linkedin: 'https://linkedin.com/in/jane-doe',
      company: 'Finance Solutions Inc',
      title: 'Investment Banking VP',
      industry: 'Finance',
      location: 'New York, NY',
      consentStatus: 'granted',
      consentDate: '2024-01-20',
      lastUpdated: '2024-01-20',
      consentMethod: 'Email response',
      notes: 'Finance professional with 10+ years experience',
      skills: ['Financial Analysis', 'Investment Banking', 'Leadership']
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      linkedin: 'https://linkedin.com/in/alex-johnson',
      company: 'Marketing Pro LLC',
      title: 'Marketing Director',
      industry: 'Marketing',
      location: 'Portland, OR',
      consentStatus: 'pending',
      consentDate: null,
      lastUpdated: '2024-01-25',
      consentMethod: null,
      notes: 'Sent email request on 2024-01-25',
      skills: ['Digital Marketing', 'Brand Strategy', 'Team Management']
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      linkedin: 'https://linkedin.com/in/sarah-wilson',
      company: 'Consulting Group',
      title: 'Senior Consultant',
      industry: 'Consulting',
      location: 'Boston, MA',
      consentStatus: 'declined',
      consentDate: '2024-01-18',
      lastUpdated: '2024-01-18',
      consentMethod: 'Email response',
      notes: 'Prefers to keep profile private',
      skills: ['Strategy Consulting', 'Business Analysis', 'Problem Solving']
    },
    {
      id: 5,
      name: 'Mike Brown',
      email: 'mike.brown@email.com',
      linkedin: 'https://linkedin.com/in/mike-brown',
      company: 'Software Solutions',
      title: 'Product Manager',
      industry: 'Technology',
      location: 'Seattle, WA',
      consentStatus: 'pending',
      consentDate: null,
      lastUpdated: '2024-01-28',
      consentMethod: null,
      notes: 'Awaiting response to follow-up email',
      skills: ['Product Management', 'Strategy', 'User Research']
    }
  ]);

  const stats = [
    {
      title: 'Total Directory Members',
      value: directoryMembers.filter(m => m.consentStatus === 'granted').length,
      change: '+12 this month',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Pending Consent',
      value: directoryMembers.filter(m => m.consentStatus === 'pending').length,
      change: 'Awaiting response',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Active Members',
      value: directoryMembers.filter(m => m.consentStatus === 'granted').length,
      change: '+3 this week',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Privacy Compliant',
      value: '100%',
      change: 'GDPR & CCPA',
      icon: Shield,
      color: 'purple'
    }
  ];

  const filteredMembers = directoryMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || member.consentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleConsentUpdate = (memberId: number, newStatus: 'granted' | 'pending' | 'declined', notes?: string) => {
    setDirectoryMembers(prev => prev.map(member => 
      member.id === memberId 
        ? {
            ...member,
            consentStatus: newStatus,
            consentDate: newStatus !== 'pending' ? new Date().toISOString().split('T')[0] : null,
            lastUpdated: new Date().toISOString().split('T')[0],
            consentMethod: newStatus !== 'pending' ? 'Manual update' : null,
            notes: notes || member.notes
          }
        : member
    ));
  };

  const openConsentModal = (member: any) => {
    setSelectedMember(member);
    setShowConsentModal(true);
  };

  const ConsentUpdateModal = () => {
    const [newStatus, setNewStatus] = useState(selectedMember?.consentStatus || 'pending');
    const [notes, setNotes] = useState(selectedMember?.notes || '');

    if (!selectedMember) return null;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleConsentUpdate(selectedMember.id, newStatus as any, notes);
      
      setShowConsentModal(false);
      setSelectedMember(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Update Consent Status</h3>
            <button
              onClick={() => setShowConsentModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">{selectedMember.name}</h4>
            <p className="text-sm text-gray-600">{selectedMember.email}</p>
            <p className="text-sm text-gray-600">{selectedMember.company} • {selectedMember.title}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consent Status</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="granted"
                      checked={newStatus === 'granted'}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="mr-3 text-green-600"
                    />
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Granted - Include in directory</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="pending"
                      checked={newStatus === 'pending'}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="mr-3 text-yellow-600"
                    />
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                      <span className="text-sm">Pending - Awaiting response</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="declined"
                      checked={newStatus === 'declined'}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="mr-3 text-red-600"
                    />
                    <div className="flex items-center">
                      <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm">Declined - Do not include</span>
                    </div>
                  </label>
                </div>
              </div>
              

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Record details about the consent decision..."
                />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    This action will be logged for compliance purposes. Ensure you have received explicit consent before marking as "Granted".
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowConsentModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Update Consent</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ConsentRequestModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Send Directory Consent Request</h3>
          <button
            onClick={() => setShowConsentRequestModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          // Handle sending consent requests
          console.log('Sending consent requests...');
          setShowConsentRequestModal(false);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>GTPN Directory Opt-In Request</option>
                <option>Follow-up Directory Request</option>
                <option>Custom Template</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Select members or enter email addresses..."
              />
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Privacy Notice</h4>
              <p className="text-sm text-purple-800">
                This request will include clear information about data usage, member rights, and opt-out options as required by privacy regulations.
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowConsentRequestModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GTPN Directory Management</h1>
          <p className="text-gray-600 mt-1">Private member directory for networking and professional connections</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowConsentRequestModal(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>Request Consent</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>Export Directory</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'yellow' ? 'bg-yellow-100' :
                stat.color === 'green' ? 'bg-green-100' :
                'bg-purple-100'
              }`}>
                <stat.icon className={`h-6 w-6 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'yellow' ? 'text-yellow-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  'text-purple-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'directory', label: 'Directory Members', icon: Users },
            { id: 'consent', label: 'Consent Management', icon: Shield },
            { id: 'export', label: 'Export & Sharing', icon: Download },
            { id: 'privacy', label: 'Privacy Settings', icon: Eye }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Directory Tab */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search directory members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Members</option>
                <option value="granted">Consent Granted</option>
                <option value="pending">Pending Consent</option>
                <option value="declined">Consent Declined</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              {filteredMembers.length} of {directoryMembers.length} members
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map(member => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    member.consentStatus === 'granted' ? 'bg-green-100 text-green-800' :
                    member.consentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {member.consentStatus === 'granted' ? (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Consented</span>
                      </div>
                    ) : member.consentStatus === 'pending' ? (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Pending</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <XCircle className="h-3 w-3" />
                        <span>Declined</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">{member.title}</p>
                  <p className="text-sm font-medium text-gray-700">{member.company}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {member.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {member.industry}
                  </div>
                </div>

                {member.consentStatus === 'granted' && (
                  <>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Contact Info:</p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                          <a href={member.linkedin} className="text-sm text-blue-600 hover:underline">LinkedIn Profile</a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>


                  </>
                )}
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-purple-50 text-purple-600 py-2 px-3 rounded-md hover:bg-purple-100 transition-colors text-sm font-medium">
                    <Eye className="h-4 w-4 inline mr-1" />
                    View Full Profile
                  </button>
                  <button 
                    onClick={() => openConsentModal(member)}
                    className="bg-gray-50 text-gray-600 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
                    title="Update Consent Status"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consent Management Tab */}
      {activeTab === 'consent' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">Consent Management</h3>
            <p className="text-purple-800 mb-4">
              Manage directory consent in compliance with privacy regulations. All consent requests include clear opt-out options and data usage explanations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                <h4 className="font-medium text-gray-900">Granted Consent</h4>
                <p className="text-2xl font-bold text-green-600">{directoryMembers.filter(m => m.consentStatus === 'granted').length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <Clock className="h-8 w-8 text-yellow-600 mb-2" />
                <h4 className="font-medium text-gray-900">Pending Response</h4>
                <p className="text-2xl font-bold text-yellow-600">{directoryMembers.filter(m => m.consentStatus === 'pending').length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <XCircle className="h-8 w-8 text-red-600 mb-2" />
                <h4 className="font-medium text-gray-900">Declined</h4>
                <p className="text-2xl font-bold text-red-600">{directoryMembers.filter(m => m.consentStatus === 'declined').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Consent Activity</h3>
            <div className="space-y-4">
              {directoryMembers.filter(m => m.consentDate).map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      member.consentStatus === 'granted' ? 'bg-green-100' :
                      'bg-red-100'
                    }`}>
                      {member.consentStatus === 'granted' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">
                        {member.consentStatus === 'granted' ? 'Granted' : 'Declined'} directory consent
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {member.consentDate ? new Date(member.consentDate).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export & Sharing Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Directory</h3>
            <p className="text-gray-600 mb-6">
              Export directory data for approved members only. All exports include consent verification and comply with privacy regulations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
              <button className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-blue-900">Member List (CSV)</h4>
                <p className="text-sm text-blue-700">Basic contact information</p>
              </button>
              <button className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors">
                <Briefcase className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-900">Professional Directory</h4>
                <p className="text-sm text-green-700">Detailed professional profiles</p>
              </button>
              <button className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition-colors">
                <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-medium text-orange-900">Mentor Network</h4>
                <p className="text-sm text-orange-700">Available mentors only</p>
              </button>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <Shield className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-yellow-800">
                All exports are logged and include only members who have granted explicit consent for directory inclusion.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings Tab */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Data Protection</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                  <h4 className="font-medium text-green-900 mb-2">GDPR Compliant</h4>
                  <p className="text-sm text-green-700">
                    All data collection includes clear consent mechanisms and opt-out options.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Shield className="h-8 w-8 text-blue-600 mb-3" />
                  <h4 className="font-medium text-blue-900 mb-2">CCPA Compliant</h4>
                  <p className="text-sm text-blue-700">
                    California residents can request data deletion and access rights.
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Directory Visibility Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="radio" name="visibility" className="mr-3" defaultChecked />
                    <span className="text-sm">Members only (requires GTPN login)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="visibility" className="mr-3" />
                    <span className="text-sm">Board members only</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="visibility" className="mr-3" />
                    <span className="text-sm">Directory coordinators only</span>
                  </label>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Data Retention Policy</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Directory data is retained only while consent is active. Members can withdraw consent at any time.
                </p>
                <div className="flex items-center space-x-4">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm">
                    Process Deletion Requests
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm">
                    Export Consent Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConsentModal && <ConsentUpdateModal />}
      {showConsentRequestModal && <ConsentRequestModal />}
    </div>
  );
};

export default DirectoryManagement; 
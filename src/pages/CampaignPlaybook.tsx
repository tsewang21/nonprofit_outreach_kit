import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCampaign } from '../contexts/CampaignContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  BookOpen, 
  Mail, 
  MessageSquare, 
  Share2, 
  DollarSign, 
  Calendar,
  Search,
  Filter,
  Eye,
  Edit,
  Archive,
  Globe,
  GraduationCap,
  Users,
  Target,
  X,
  Copy,
  Save
} from 'lucide-react';

const CampaignPlaybook: React.FC = () => {
  const { campaigns, templates, createCampaign, createTemplate } = useCampaign();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'knowledge'>('campaigns');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Handle URL parameters for direct linking
  useEffect(() => {
    const tab = searchParams.get('tab');
    const quickstart = searchParams.get('quickstart');
    
    if (tab === 'campaigns') {
      setActiveTab('campaigns');
    }
    
    if (quickstart === 'fundraising') {
      setActiveTab('campaigns');
      // Auto-trigger fundraising quick start after a short delay
      setTimeout(() => {
        handleQuickStart('fundraising');
      }, 100);
    }
  }, [searchParams]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [quickStartType, setQuickStartType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const templateTypes = [
    { id: 'email', label: 'Email', icon: Mail, color: 'blue' },
    { id: 'directory', label: 'Directory', icon: Globe, color: 'purple' },
    { id: 'donation', label: 'Donation', icon: DollarSign, color: 'green' },
    { id: 'event', label: 'Event', icon: Calendar, color: 'red' },
    { id: 'petition', label: 'Petition', icon: BookOpen, color: 'indigo' }
  ];

  // Sample GTPN templates
  const gtpnTemplates = [

    {
      id: 'directory-opt-in',
      name: 'GTPN Directory Opt-In Request',
      type: 'directory',
      subject: 'Help GTPN Build a Stronger Directory – Can We Include You?',
      content: `Dear {FIRST_NAME},

GTPN is building a private, member-only directory to help Tibetan students and junior professionals connect with experienced mentors and industry contacts.

We'd love to include your information in this directory:
• Name: {FULL_NAME}
• Email: {EMAIL}
• LinkedIn: {LINKEDIN_URL}
• Industry: {INDUSTRY}

This directory will only be accessible to GTPN members and will help students and professionals connect for guidance, networking opportunities, and career development.

Would you be comfortable having your information included? Simply reply "Yes" to this email and we'll add you to our directory.

If you have any questions or concerns, please don't hesitate to reach out.

Best regards,
The GTPN Team`,
      variables: ['{FIRST_NAME}', '{FULL_NAME}', '{EMAIL}', '{LINKEDIN_URL}', '{INDUSTRY}'],
      status: 'approved'
    },
    {
      id: 'donation-appeal',
      name: 'Support Tibetan Professional Growth',
      type: 'donation',
      subject: 'Support Tibetan Professional Growth – Donate Today',
      content: `Dear {FIRST_NAME},

The Global Tibetan Professionals Network is making a real impact in our community. Over the past year, we've:

• Connected 150+ students with professional mentors
• Hosted 12 networking events across major cities
• Provided career guidance to 200+ young professionals
• Built a directory of 500+ Tibetan professionals

But we need your help to continue this important work.

Your donation will support:
• Professional networking coordination
• Professional development workshops
• Networking events and mixers
• Scholarship opportunities for students

Every contribution, no matter the size, helps strengthen our professional community and creates opportunities for the next generation of Tibetan leaders.

[DONATE $25] [DONATE $50] [DONATE $100] [DONATE OTHER]

Thank you for investing in our community's future.

With gratitude,
The GTPN Team`,
      variables: ['{FIRST_NAME}'],
      status: 'approved'
    },
    {
      id: 'event-promotion',
      name: 'NYC Tibetan Professionals Happy Hour',
      type: 'event',
      subject: 'Join Us at the NYC Tibetan Professionals Happy Hour!',
      content: `Dear {FIRST_NAME},

You're invited to join fellow Tibetan professionals for an evening of networking and community building!

🗓 Date: {EVENT_DATE}
🕕 Time: {EVENT_TIME}
📍 Location: {EVENT_LOCATION}
🎯 Who: Tibetan professionals in the NYC area

This is a perfect opportunity to:
• Meet other Tibetan professionals in your area
• Share experiences and insights
• Build meaningful connections
• Discuss community initiatives and opportunities

Light refreshments will be provided. Please RSVP by {RSVP_DATE} so we can plan accordingly.

[RSVP YES] [RSVP NO] [MAYBE]

Looking forward to seeing you there!

Best regards,
The GTPN NYC Chapter`,
      variables: ['{FIRST_NAME}', '{EVENT_DATE}', '{EVENT_TIME}', '{EVENT_LOCATION}', '{RSVP_DATE}'],
      status: 'approved'
    }
  ];

  const filteredTemplates = [...templates, ...gtpnTemplates].filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleQuickStart = (type: string) => {
    setQuickStartType(type);
    setShowCreateModal(true);
  };

  const handlePreviewTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowEditModal(true);
  };

  const QuickStartCampaignModal = () => {
    const getDefaultValues = () => {
      switch (quickStartType) {
        case 'networking':
          return {
            name: 'Fall 2024 Networking Initiative',
            description: 'Build connections between Tibetan professionals and students for career development and community building.',
            targetAmount: undefined
          };
        case 'event':
          return {
            name: 'Spring Professional Networking Event',
            description: 'Host networking events across major cities to connect Tibetan professionals and foster community building.',
            targetAmount: undefined
          };
        case 'fundraising':
          return {
            name: 'Annual GTPN Fundraising Campaign',
            description: 'Raise funds to support professional development workshops, networking events, and community initiatives.',
            targetAmount: 10000
          };
        case 'directory':
          return {
            name: 'Directory Expansion Campaign',
            description: 'Encourage more Tibetan professionals to join our private directory to strengthen our professional network.',
            targetAmount: undefined
          };
        default:
          return {
            name: '',
            description: '',
            targetAmount: undefined
          };
      }
    };

    const defaults = getDefaultValues();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            Create {quickStartType === 'networking' ? 'Networking Initiative' : 
                   quickStartType === 'event' ? 'Event Promotion' :
                   quickStartType === 'fundraising' ? 'Fundraising' : 'Directory Growth'} Campaign
          </h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            createCampaign({
              name: formData.get('name') as string,
              description: formData.get('description') as string,
              status: 'draft',
              startDate: formData.get('startDate') as string,
              endDate: formData.get('endDate') as string,
              targetAmount: parseInt(formData.get('targetAmount') as string) || undefined,
              participantCount: 0,
              templates: [],
              sequences: [],
              createdBy: user?.id || '',
              type: quickStartType || 'general'
            });
            setShowCreateModal(false);
            setQuickStartType(null);
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={defaults.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={defaults.description}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    name="startDate"
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    name="endDate"
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {quickStartType === 'fundraising' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount ($)</label>
                  <input
                    name="targetAmount"
                    type="number"
                    min="0"
                    step="100"
                    defaultValue={defaults.targetAmount}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  setQuickStartType(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const TemplatePreviewModal = () => {
    if (!selectedTemplate) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Template Preview</h3>
            <button
              onClick={() => setShowPreviewModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template Info */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Template Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Name:</span>
                    <p className="text-sm text-gray-900">{selectedTemplate.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Type:</span>
                    <p className="text-sm text-gray-900 capitalize">{selectedTemplate.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                      selectedTemplate.status === 'approved' ? 'bg-green-100 text-green-800' :
                      selectedTemplate.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedTemplate.status}
                    </span>
                  </div>
                  {selectedTemplate.variables && selectedTemplate.variables.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Variables:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTemplate.variables.map((variable: string) => (
                          <span key={variable} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => navigator.clipboard.writeText(`Subject: ${selectedTemplate.subject}\n\n${selectedTemplate.content}`)}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Template</span>
                </button>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleEditTemplate(selectedTemplate);
                  }}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Template</span>
                </button>
              </div>
            </div>
            
            {/* Email Preview */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Email Preview</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 p-3">
                  <div className="text-sm text-gray-600">
                    <strong>Subject:</strong> {selectedTemplate.subject}
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="whitespace-pre-wrap text-sm text-gray-900 font-mono">
                    {selectedTemplate.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TemplateEditModal = () => {
    if (!selectedTemplate) return null;

    const [editedTemplate, setEditedTemplate] = useState({
      name: selectedTemplate.name,
      subject: selectedTemplate.subject || '',
      content: selectedTemplate.content,
      variables: selectedTemplate.variables || []
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Edit Template</h3>
            <button
              onClick={() => setShowEditModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            // Here you would save the edited template
            console.log('Saving edited template:', editedTemplate);
            setShowEditModal(false);
          }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Edit Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={editedTemplate.name}
                    onChange={(e) => setEditedTemplate({...editedTemplate, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={editedTemplate.subject}
                    onChange={(e) => setEditedTemplate({...editedTemplate, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
                  <textarea
                    value={editedTemplate.content}
                    onChange={(e) => setEditedTemplate({...editedTemplate, content: e.target.value})}
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Variables (comma-separated)</label>
                  <input
                    type="text"
                    value={editedTemplate.variables.join(', ')}
                    onChange={(e) => setEditedTemplate({
                      ...editedTemplate, 
                      variables: e.target.value.split(',').map(v => v.trim()).filter(v => v)
                    })}
                    placeholder="{FIRST_NAME}, {INDUSTRY}, {EVENT_DATE}"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Live Preview */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Live Preview</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 p-3">
                    <div className="text-sm text-gray-600">
                      <strong>Subject:</strong> {editedTemplate.subject}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="whitespace-pre-wrap text-sm text-gray-900 font-mono max-h-96 overflow-y-auto">
                      {editedTemplate.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const NewTemplateModal = () => {
    const [newTemplate, setNewTemplate] = useState({
      name: '',
      type: 'email',
      subject: '',
      content: '',
      variables: [] as string[]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Here you would save the new template
      console.log('Creating new template:', newTemplate);
      setShowNewTemplateModal(false);
      setNewTemplate({
        name: '',
        type: 'email',
        subject: '',
        content: '',
        variables: []
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Create New Template</h3>
            <button
              onClick={() => setShowNewTemplateModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
                  <input
                    type="text"
                    required
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Welcome New Members"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Type *</label>
                  <select
                    required
                    value={newTemplate.type}
                    onChange={(e) => setNewTemplate({...newTemplate, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {templateTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Email subject line (for email templates)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Content *</label>
                  <textarea
                    required
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    rows={15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
                    placeholder="Write your template content here...

Use variables like {FIRST_NAME} for personalization."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Variables (comma-separated)</label>
                  <input
                    type="text"
                    value={newTemplate.variables.join(', ')}
                    onChange={(e) => setNewTemplate({
                      ...newTemplate, 
                      variables: e.target.value.split(',').map(v => v.trim()).filter(v => v)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="{FIRST_NAME}, {COMPANY}, {EVENT_DATE}"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    List variables that can be personalized in this template
                  </p>
                </div>
              </div>
              
              {/* Live Preview */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Live Preview</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {newTemplate.subject && (
                    <div className="bg-gray-50 border-b border-gray-200 p-3">
                      <div className="text-sm text-gray-600">
                        <strong>Subject:</strong> {newTemplate.subject}
                      </div>
                    </div>
                  )}
                  <div className="p-4 bg-white">
                    <div className="whitespace-pre-wrap text-sm text-gray-900 font-mono max-h-96 overflow-y-auto">
                      {newTemplate.content || 'Start typing to see preview...'}
                    </div>
                  </div>
                </div>
                
                {newTemplate.variables.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Variables</h5>
                    <div className="flex flex-wrap gap-2">
                      {newTemplate.variables.map((variable, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {variable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowNewTemplateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Create Template</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const CreateCampaignModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Create New GTPN Campaign</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          createCampaign({
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            status: 'draft',
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string,
            targetAmount: parseInt(formData.get('targetAmount') as string) || undefined,
            participantCount: 0,
            templates: [],
            sequences: [],
            createdBy: user?.id || ''
          });
          setShowCreateModal(false);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Winter Networking Initiative 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your GTPN campaign goals"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount ($) - Optional</label>
              <input
                name="targetAmount"
                type="number"
                min="0"
                step="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="For fundraising campaigns"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Campaign
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
          <h1 className="text-2xl font-bold text-gray-900">GTPN Campaign Playbook</h1>
          <p className="text-gray-600 mt-1">Manage outreach campaigns for the Tibetan professional community</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'campaigns', label: 'Campaigns', icon: BookOpen },
            { id: 'templates', label: 'Email Templates', icon: Mail },
            { id: 'knowledge', label: 'GTPN Knowledge Base', icon: Archive }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Quick Campaign Templates */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Start GTPN Campaigns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => handleQuickStart('networking')}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <Users className="h-8 w-8 text-orange-600 mb-2" />
                <h4 className="font-medium text-gray-900">Networking Initiative</h4>
                <p className="text-sm text-gray-600">Build professional connections</p>
              </button>
              <button 
                onClick={() => handleQuickStart('event')}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <Calendar className="h-8 w-8 text-red-600 mb-2" />
                <h4 className="font-medium text-gray-900">Event Promotion</h4>
                <p className="text-sm text-gray-600">Happy hours, hackathons, mixers</p>
              </button>
              <button 
                onClick={() => handleQuickStart('fundraising')}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <h4 className="font-medium text-gray-900">Fundraising</h4>
                <p className="text-sm text-gray-600">Support GTPN programs</p>
              </button>
              <button 
                onClick={() => handleQuickStart('directory')}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <Globe className="h-8 w-8 text-purple-600 mb-2" />
                <h4 className="font-medium text-gray-900">Directory Growth</h4>
                <p className="text-sm text-gray-600">Expand member database</p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Participants</span>
                    <span className="font-medium">{campaign.participantCount}</span>
                  </div>
                  
                  {campaign.targetAmount && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">
                          ${campaign.currentAmount?.toLocaleString() || 0} / ${campaign.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full"
                          style={{ width: `${((campaign.currentAmount || 0) / campaign.targetAmount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">
                      {new Date(campaign.startDate).toLocaleDateString()} - {
                        campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'Ongoing'
                      }
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-6">
                  <button className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-md hover:bg-red-100 transition-colors text-sm font-medium">
                    View Details
                  </button>
                  <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search GTPN templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Types</option>
                {templateTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={() => setShowNewTemplateModal(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>New Template</span>
            </button>
          </div>

          {/* Template Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {templateTypes.map(type => (
              <div key={type.id} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className={`p-3 rounded-full mx-auto mb-2 ${
                  type.color === 'blue' ? 'bg-blue-100' :
                  type.color === 'green' ? 'bg-green-100' :
                  type.color === 'orange' ? 'bg-orange-100' :
                  type.color === 'purple' ? 'bg-purple-100' :
                  type.color === 'red' ? 'bg-red-100' :
                  'bg-indigo-100'
                } w-fit`}>
                  <type.icon className={`h-6 w-6 ${
                    type.color === 'blue' ? 'text-blue-600' :
                    type.color === 'green' ? 'text-green-600' :
                    type.color === 'orange' ? 'text-orange-600' :
                    type.color === 'purple' ? 'text-purple-600' :
                    type.color === 'red' ? 'text-red-600' :
                    'text-indigo-600'
                  }`} />
                </div>
                <p className="text-sm font-medium text-gray-900">{type.label}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {filteredTemplates.filter(t => t.type === type.id).length} templates
                </p>
              </div>
            ))}
          </div>

          {/* Templates List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTemplates.map(template => (
              <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      template.type === 'email' ? 'bg-blue-100' :
                      template.type === 'directory' ? 'bg-purple-100' :
                      template.type === 'donation' ? 'bg-green-100' :
                      template.type === 'event' ? 'bg-red-100' :
                      'bg-indigo-100'
                    }`}>
                      {templateTypes.find(type => type.id === template.type)?.icon && (
                        (() => {
                          const IconComponent = templateTypes.find(type => type.id === template.type)!.icon;
                          return (
                            <IconComponent className={`h-4 w-4 ${
                              template.type === 'email' ? 'text-blue-600' :
                              template.type === 'directory' ? 'text-purple-600' :
                              template.type === 'donation' ? 'text-green-600' :
                              template.type === 'event' ? 'text-red-600' :
                              'text-indigo-600'
                            }`} />
                          );
                        })()
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{template.type}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    template.status === 'approved' ? 'bg-green-100 text-green-800' :
                    template.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {template.status}
                  </div>
                </div>
                
                {template.subject && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">Subject:</p>
                    <p className="text-sm text-gray-600">{template.subject}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Content Preview:</p>
                  <p className="text-sm text-gray-600 line-clamp-3">{template.content}</p>
                </div>
                
                {template.variables && template.variables.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Variables:</p>
                    <div className="flex flex-wrap gap-2">
                      {template.variables.map(variable => (
                        <span key={variable} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                          {variable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handlePreviewTemplate(template)}
                    className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors text-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                  <button 
                    onClick={() => handleEditTemplate(template)}
                    className="flex items-center space-x-1 bg-gray-50 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors text-sm"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Knowledge Base Tab */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <Archive className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">GTPN Knowledge Base</h3>
            <p className="text-gray-600 mb-6">
              Centralized repository of GTPN's mission, impact statements, and outreach best practices.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <BookOpen className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-medium text-red-900">Mission & Values</h4>
                <p className="text-sm text-red-700">GTPN's core mission and organizational values</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-medium text-orange-900">Impact Stories</h4>
                <p className="text-sm text-orange-700">Success stories and testimonials from community</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-green-900">Best Practices</h4>
                <p className="text-sm text-green-700">Proven outreach strategies and templates</p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
              Build Knowledge Base
            </button>
          </div>
        </div>
      )}

      {showCreateModal && <CreateCampaignModal />}
      {quickStartType && <QuickStartCampaignModal />}
      {showPreviewModal && selectedTemplate && <TemplatePreviewModal />}
      {showEditModal && selectedTemplate && <TemplateEditModal />}
      {showNewTemplateModal && <NewTemplateModal />}
    </div>
  );
};

export default CampaignPlaybook;
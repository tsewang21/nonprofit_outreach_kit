import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  DollarSign,
  Coffee,
  TreePine,
  Code,
  Music,
  Briefcase,
  GraduationCap,
  Heart,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

interface Event {
  id: string;
  name: string;
  type: 'happy-hour' | 'picnic' | 'hackathon' | 'mixer' | 'workshop' | 'conference' | 'charity';
  date: string;
  time: string;
  location: string;
  capacity: number;
  registrations: number;
  description: string;
  status: 'draft' | 'published' | 'completed';
  organizer: string;
}

const EventPlanning: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'create' | 'templates'>('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Sample events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'GTPN Winter Happy Hour',
      type: 'happy-hour',
      date: '2024-12-15',
      time: '18:00',
      location: 'The Rooftop Bar, San Francisco',
      capacity: 50,
      registrations: 32,
      description: 'Join fellow Tibetan professionals for drinks, networking, and great conversations in the heart of San Francisco.',
      status: 'published',
      organizer: 'Jane Doe'
    },
    {
      id: '2',
      name: 'GTPN Tech Hackathon 2024',
      type: 'hackathon',
      date: '2024-12-20',
      time: '09:00',
      location: 'Tech Hub, Palo Alto',
      capacity: 100,
      registrations: 78,
      description: 'A 48-hour hackathon focused on solutions for Tibetan community challenges and professional development.',
      status: 'published',
      organizer: 'Alex Johnson'
    },
    {
      id: '3',
      name: 'Spring Community Picnic',
      type: 'picnic',
      date: '2025-04-15',
      time: '11:00',
      location: 'Golden Gate Park, San Francisco',
      capacity: 200,
      registrations: 15,
      description: 'Family-friendly outdoor gathering with traditional games, food, and networking opportunities.',
      status: 'draft',
      organizer: 'Sarah Wilson'
    }
  ]);

  const eventTemplates = [
    {
      id: 'happy-hour',
      name: 'Happy Hour',
      icon: Coffee,
      color: 'orange',
      description: 'Casual networking event at local venues',
      defaultDuration: '2 hours',
      suggestedCapacity: '30-50 people',
      tips: 'Book venues with good acoustics for networking. Consider appetizers and drink specials.'
    },
    {
      id: 'picnic',
      name: 'Community Picnic',
      icon: TreePine,
      color: 'green',
      description: 'Family-friendly outdoor gathering',
      defaultDuration: '4-6 hours',
      suggestedCapacity: '100-200 people',
      tips: 'Plan for weather contingencies. Include activities for all ages. Organize potluck-style food.'
    },
    {
      id: 'hackathon',
      name: 'Hackathon',
      icon: Code,
      color: 'blue',
      description: 'Technical innovation and problem-solving event',
      defaultDuration: '24-48 hours',
      suggestedCapacity: '50-100 people',
      tips: 'Secure reliable WiFi and power outlets. Provide meals and snacks. Have mentors available.'
    },
    {
      id: 'mixer',
      name: 'Professional Mixer',
      icon: Briefcase,
      color: 'purple',
      description: 'Structured networking with industry focus',
      defaultDuration: '3 hours',
      suggestedCapacity: '40-80 people',
      tips: 'Create name tags with companies/industries. Plan ice-breaker activities.'
    },
    {
      id: 'workshop',
      name: 'Workshop/Seminar',
      icon: GraduationCap,
      color: 'indigo',
      description: 'Educational sessions and skill-building',
      defaultDuration: '2-4 hours',
      suggestedCapacity: '20-50 people',
      tips: 'Prepare materials in advance. Ensure interactive components. Follow up with resources.'
    },
    {
      id: 'charity',
      name: 'Charity Event',
      icon: Heart,
      color: 'pink',
      description: 'Fundraising and community service events',
      defaultDuration: '3-5 hours',
      suggestedCapacity: '50-150 people',
      tips: 'Set clear fundraising goals. Partner with local charities. Document impact for donors.'
    }
  ];

  const getEventIcon = (type: string) => {
    const template = eventTemplates.find(t => t.id === type);
    return template?.icon || Calendar;
  };

  const getEventColor = (type: string) => {
    const template = eventTemplates.find(t => t.id === type);
    return template?.color || 'gray';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'green';
      case 'draft': return 'yellow';
      case 'completed': return 'gray';
      default: return 'gray';
    }
  };

  const createEventFromTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowCreateModal(true);
  };

  const CreateEventModal = () => {
    const template = eventTemplates.find(t => t.id === selectedTemplate);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            Create {template?.name || 'New Event'}
          </h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newEvent: Event = {
              id: Date.now().toString(),
              name: formData.get('name') as string,
              type: selectedTemplate as Event['type'],
              date: formData.get('date') as string,
              time: formData.get('time') as string,
              location: formData.get('location') as string,
              capacity: parseInt(formData.get('capacity') as string),
              registrations: 0,
              description: formData.get('description') as string,
              status: 'draft',
              organizer: user?.name || 'Unknown'
            };
            setEvents([...events, newEvent]);
            setShowCreateModal(false);
            setSelectedTemplate(null);
          }}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`GTPN ${template?.name || 'Event'}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    name="capacity"
                    type="number"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={template?.suggestedCapacity || '50'}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    name="time"
                    type="time"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  name="location"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Venue name and address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the event, what attendees can expect, and any special requirements..."
                />
              </div>
              
              {template && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Planning Tips for {template.name}:</h4>
                  <p className="text-sm text-blue-800">{template.tips}</p>
                  <p className="text-sm text-blue-700 mt-1">
                    <strong>Suggested Duration:</strong> {template.defaultDuration}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Planning</h1>
          <p className="text-gray-600">Plan and manage GTPN community events</p>
        </div>
        <button
          onClick={() => setActiveTab('templates')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'upcoming', label: 'Upcoming Events' },
            { id: 'templates', label: 'Event Templates' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Upcoming Events */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {events.map((event) => {
            const EventIcon = getEventIcon(event.type);
            const eventColor = getEventColor(event.type);
            const statusColor = getStatusColor(event.status);
            
            return (
              <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-${eventColor}-100`}>
                      <EventIcon className={`h-6 w-6 text-${eventColor}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${statusColor}-100 text-${statusColor}-800`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{event.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{event.registrations}/{event.capacity} registered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Choose an Event Type</h3>
            <p className="text-blue-800">Select a template to get started with planning your GTPN community event.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => createEventFromTemplate(template.id)}
                  className={`text-left p-6 rounded-lg border-2 border-${template.color}-200 bg-${template.color}-50 hover:bg-${template.color}-100 transition-colors`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <IconComponent className={`h-8 w-8 text-${template.color}-600`} />
                    <h3 className={`text-lg font-semibold text-${template.color}-900`}>{template.name}</h3>
                  </div>
                  <p className={`text-${template.color}-800 mb-3`}>{template.description}</p>
                  <div className={`text-sm text-${template.color}-700`}>
                    <p><strong>Duration:</strong> {template.defaultDuration}</p>
                    <p><strong>Capacity:</strong> {template.suggestedCapacity}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && <CreateEventModal />}
    </div>
  );
};

export default EventPlanning; 
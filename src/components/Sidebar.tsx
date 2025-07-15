import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar,
  Upload, 
  Workflow, 
  BarChart3, 
  Settings, 
  Heart,
  Users,
  Target,
  Globe
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, permission: 'all' },
    { name: 'Campaign Playbook', href: '/playbook', icon: BookOpen, permission: 'campaigns' },
    { name: 'Event Planning', href: '/events', icon: Calendar, permission: 'events' },
    { name: 'Directory Management', href: '/directory', icon: Globe, permission: 'directory' },
    { name: 'Import Supporters', href: '/import', icon: Upload, permission: 'supporters' },
    { name: 'Sequence Builder', href: '/sequences', icon: Workflow, permission: 'sequences' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, permission: 'analytics' },
    { name: 'Settings', href: '/settings', icon: Settings, permission: 'settings' },
  ];

  const hasPermission = (permission: string) => {
    if (!user) return false;
    if (user.role === 'super-admin') return true;
    if (permission === 'all') return true;
    return user.permissions.some(p => p.startsWith(permission) || p === 'all');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">GTPN</h2>
            <p className="text-sm text-gray-500">Outreach Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          if (!hasPermission(item.permission)) return null;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 text-center border border-blue-100">
          <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Strengthen Our Network</p>
          <p className="text-xs text-gray-500 mt-1">Connect Tibetan professionals worldwide</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
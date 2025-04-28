import React, { ReactNode } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  User,
  DollarSign,
  Bell,
  Menu,
  X,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'student' | 'employer' | 'admin';
  user: {
    _id: string;
    name?: string;
    fullName?: string;
    email: string;
    role: string;
    profile?: {
      avatar?: string;
    };
  };
}

const DashboardLayout = ({ children, role, user }: DashboardLayoutProps) => {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Helper to get user's display name
  const getUserDisplayName = () => {
    return user.fullName || user.name || user.email.split('@')[0];
  };

  // Helper to get user initials for avatar fallback
  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const navigationLinks = {
    student: [
      { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/student/dashboard' },
      { name: 'Find Tasks', icon: <Search className="w-5 h-5" />, path: '/student/task-search' },
      { name: 'My Applications', icon: <FileText className="w-5 h-5" />, path: '/student/applications' },
      { name: 'My Tasks', icon: <FileText className="w-5 h-5" />, path: '/student/tasks' },
      { name: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/student/chat' },
      { name: 'Payments', icon: <DollarSign className="w-5 h-5" />, path: '/student/payments' },
      { name: 'Profile', icon: <User className="w-5 h-5" />, path: '/student/profile' },
    ],
    employer: [
      { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/employer/dashboard' },
      { name: 'Post a Task', icon: <PlusCircle className="w-5 h-5" />, path: '/employer/post-task' },
      { name: 'My Tasks', icon: <FileText className="w-5 h-5" />, path: '/employer/tasks' },
      { name: 'Applications', icon: <Users className="w-5 h-5" />, path: '/employer/applicants' },
      { name: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/employer/chat' },
      { name: 'Payments', icon: <DollarSign className="w-5 h-5" />, path: '/employer/payments' },
      { name: 'Profile', icon: <User className="w-5 h-5" />, path: '/employer/profile' },
    ],
    admin: [
      { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/admin/dashboard' },
      { name: 'Users', icon: <Users className="w-5 h-5" />, path: '/admin/users' },
      { name: 'Tasks', icon: <FileText className="w-5 h-5" />, path: '/admin/tasks' },
      { name: 'Disputes', icon: <Bell className="w-5 h-5" />, path: '/admin/disputes' },
      { name: 'Analytics', icon: <DollarSign className="w-5 h-5" />, path: '/admin/analytics' },
    ],
  };

  const links = navigationLinks[role];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-20 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out 
          md:relative md:translate-x-0 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* App Logo */}
          <div className="p-4">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-green-600">Pay4Skill</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `
                      flex items-center px-4 py-2 rounded-md transition-colors 
                      ${isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'text-gray-700 hover:bg-gray-100'}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-3">{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profile?.avatar} alt={getUserDisplayName()} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Home,
  User,
  Briefcase,
  MessageSquare,
  DollarSign,
  Settings,
  Menu,
} from 'lucide-react';

interface SidebarProps {
  role: 'student' | 'employer' | 'admin';
}

const studentMenuItems = [
  { icon: Home, label: 'Home', path: '/student/dashboard' },
  { icon: User, label: 'Profile', path: '/student/profile' },
  { icon: Briefcase, label: 'Browse Tasks', path: '/student/tasks' },
  { icon: MessageSquare, label: 'Applications', path: '/student/applications' },
  { icon: MessageSquare, label: 'Chat', path: '/student/chat' },
  { icon: DollarSign, label: 'Earnings', path: '/student/earnings' },
];

const employerMenuItems = [
  { icon: Home, label: 'Home', path: '/employer/dashboard' },
  { icon: User, label: 'Profile', path: '/employer/profile' },
  { icon: Briefcase, label: 'Post Task', path: '/employer/post-task' },
  { icon: MessageSquare, label: 'My Tasks', path: '/employer/tasks' },
  { icon: MessageSquare, label: 'Chat', path: '/employer/chat' },
  { icon: DollarSign, label: 'Analytics', path: '/employer/analytics' },
];

const adminMenuItems = [
  { icon: Home, label: 'Home', path: '/admin/dashboard' },
  { icon: User, label: 'Users', path: '/admin/users' },
  { icon: Briefcase, label: 'Tasks', path: '/admin/tasks' },
  { icon: MessageSquare, label: 'Disputes', path: '/admin/disputes' },
  { icon: DollarSign, label: 'Analytics', path: '/admin/analytics' },
];

export default function Sidebar({ role }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = {
    student: studentMenuItems,
    employer: employerMenuItems,
    admin: adminMenuItems,
  }[role];

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && <h1 className="text-xl font-semibold">Pay4Skill</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900',
                location.pathname === item.path && 'bg-gray-100 text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  Settings,
  BarChart2,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'Tasks Management', icon: FileText, path: '/admin/tasks' },
    { name: 'Disputes', icon: AlertTriangle, path: '/admin/disputes' },
    { name: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
    { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside 
      className={cn(
        "bg-white border-r border-neutral-200 transition-all duration-300 flex flex-col", 
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className={cn(
        "h-16 border-b border-neutral-200 flex items-center px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 flex items-center justify-center">
              <span className="text-white font-bold">P4S</span>
            </div>
            <span className="font-heading font-bold text-xl">Pay4Skill</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mint-500 to-mint-400 flex items-center justify-center">
            <span className="text-white font-bold">P4S</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", collapsed && "absolute right-0 -mr-3 bg-white border border-neutral-200")}
          onClick={toggleSidebar}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      {/* Sidebar Navigation */}
      <div className="flex-grow py-4">
        <nav className="px-2 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors hover:bg-neutral-100",
                isActive(item.path) ? "bg-mint-50 text-mint-600" : "text-neutral-700",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-neutral-200">
        <Link to="/login">
          <Button 
            variant="ghost" 
            className={cn(
              "text-red-500 hover:bg-red-50 hover:text-red-600 w-full",
              collapsed ? "justify-center px-2" : "justify-start"
            )}
          >
            <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;

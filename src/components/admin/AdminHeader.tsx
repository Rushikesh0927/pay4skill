
import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminHeaderProps {
  onLogout?: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="h-16 border-b border-neutral-200 bg-white flex items-center px-4 justify-between">
      {/* Left Side: Page Title */}
      <div>
        <h2 className="font-semibold">Pay4Skill Admin</h2>
      </div>
      
      {/* Center: Search */}
      <div className="max-w-md w-full hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
          <Input 
            type="search"
            placeholder="Search users, tasks, or reports..."
            className="pl-9 rounded-full bg-neutral-50 border-neutral-200 focus-visible:ring-mint-500"
          />
        </div>
      </div>
      
      {/* Right Side: Actions */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <User size={18} className="text-neutral-600" />
          </div>
          
          {onLogout && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  fullName: string;
  email: string;
  avatar?: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'student' | 'employer' | 'admin';
  user: User;
}

export default function DashboardLayout({ children, role, user }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster />
      <Sonner />
      
      <Sidebar role={role} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar user={user} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

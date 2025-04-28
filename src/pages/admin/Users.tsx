
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, User, UserCheck, UserX } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from '@/components/ui/input';

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', joinDate: '2023-09-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'student', status: 'active', joinDate: '2023-08-22' },
  { id: 3, name: 'Bob Johnson', email: 'bob@company.com', role: 'employer', status: 'active', joinDate: '2023-10-05' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'student', status: 'blocked', joinDate: '2023-07-30' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@company.com', role: 'employer', status: 'active', joinDate: '2023-09-01' },
  { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'student', status: 'active', joinDate: '2023-10-15' },
  { id: 7, name: 'David Wilson', email: 'david@company.com', role: 'employer', status: 'active', joinDate: '2023-08-10' },
];

const UsersManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'employer'>('all');

  const showNotification = (message: string) => {
    toast({
      title: "Notification",
      description: message,
    });
  };

  const toggleUserStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    showNotification(`User #${userId} ${newStatus === 'active' ? 'unblocked' : 'blocked'} successfully`);
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        
        <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0 w-full md:w-auto">
          <Input 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Filter: {filterRole === 'all' ? 'All Users' : filterRole === 'student' ? 'Students' : 'Employers'}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1 p-2 w-[200px]">
                    <Button
                      variant="ghost"
                      onClick={() => setFilterRole('all')}
                      className={filterRole === 'all' ? 'bg-accent' : ''}
                    >
                      All Users
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setFilterRole('student')}
                      className={filterRole === 'student' ? 'bg-accent' : ''}
                    >
                      Students
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setFilterRole('employer')}
                      className={filterRole === 'employer' ? 'bg-accent' : ''}
                    >
                      Employers
                    </Button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <span>All Users ({filteredUsers.length})</span>
              <Button variant="outline" onClick={() => showNotification("This would export user data")}>
                Export Data
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left p-3 font-medium text-sm">Name</th>
                  <th className="text-left p-3 font-medium text-sm">Email</th>
                  <th className="text-left p-3 font-medium text-sm">Role</th>
                  <th className="text-left p-3 font-medium text-sm">Status</th>
                  <th className="text-left p-3 font-medium text-sm">Join Date</th>
                  <th className="text-right p-3 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-neutral-500" />
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="p-3 text-sm">{user.email}</td>
                    <td className="p-3">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        user.role === 'student' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {user.role === 'student' ? 'Student' : 'Employer'}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status === 'active' ? 'Active' : 'Blocked'}
                      </div>
                    </td>
                    <td className="p-3 text-sm">{new Date(user.joinDate).toLocaleDateString()}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => showNotification(`Viewing ${user.name}'s profile`)}
                        >
                          <UserCheck className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        
                        <Button 
                          variant={user.status === 'active' ? "destructive" : "outline"} 
                          size="sm"
                          onClick={() => toggleUserStatus(user.id, user.status)}
                        >
                          {user.status === 'active' ? (
                            <>
                              <UserX className="h-4 w-4 mr-1" />
                              Block
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4 mr-1" />
                              Unblock
                            </>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default UsersManagement;

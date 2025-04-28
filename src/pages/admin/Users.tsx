import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  User, 
  MoreHorizontal, 
  Search, 
  Filter, 
  UserPlus, 
  Check, 
  Ban 
} from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'employer' | 'admin';
  createdAt: string;
  status: 'active' | 'inactive' | 'suspended';
  profile?: {
    avatar?: string;
    location?: string;
  }
}

const UsersPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // User detail/edit dialog state
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Redirect to login if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user && user.role !== 'admin') {
      navigate(`/${user.role}/dashboard`);
    }
  }, [isAuthenticated, user, navigate]);
  
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await api.users.getAll();
        
        // Transform the data to include status (in a real app, this would come from the API)
        const transformedUsers = response.map((user: any) => ({
          ...user,
          status: user.status || 'active', // Default to active if status not provided
        }));
        
        setUsers(transformedUsers);
        setFilteredUsers(transformedUsers);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('Failed to load users data');
        
        // Fallback mock data in case of error
        const mockUsers = [
          {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'student' as const,
            createdAt: new Date().toISOString(),
            status: 'active' as const,
            profile: { location: 'New York' }
          },
          {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'employer' as const,
            createdAt: new Date().toISOString(),
            status: 'active' as const,
            profile: { location: 'San Francisco' }
          },
          {
            _id: '3',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin' as const,
            createdAt: new Date().toISOString(),
            status: 'active' as const,
            profile: { location: 'Chicago' }
          }
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let result = [...users];
    
    // Apply search term
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter, statusFilter]);
  
  // Handle user status change
  const handleStatusChange = async (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    try {
      // In a real app, make API call to update user status
      // await api.users.updateStatus(userId, newStatus);
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error('Failed to update user status:', err);
      setError('Failed to update user status');
    }
  };
  
  // Handle view user details
  const handleViewUser = (user: UserType) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };
  
  // Show loading state while checking authentication
  if (!user || isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name or email"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="employer">Employers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === 'admin' ? 'destructive' : 
                          user.role === 'employer' ? 'default' : 
                          'secondary'
                        }>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.profile?.location || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={
                          user.status === 'active' ? 'outline' : 
                          user.status === 'inactive' ? 'secondary' : 
                          'destructive'
                        }>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewUser(user)}>
                              View Details
                            </DropdownMenuItem>
                            
                            {user.status !== 'active' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'active')}>
                                <Check className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            
                            {user.status !== 'suspended' && (
                              <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'suspended')}>
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* User details dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                View and manage user information
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <div className="py-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    {selectedUser.profile?.avatar ? (
                      <img 
                        src={selectedUser.profile.avatar} 
                        alt={selectedUser.name} 
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Role:</span>
                    <span className="text-sm">
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Status:</span>
                    <span className="text-sm">
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">{selectedUser.profile?.location || 'N/A'}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Joined:</span>
                    <span className="text-sm">
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              {selectedUser && (
                <div className="flex gap-2">
                  {selectedUser.status !== 'active' && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleStatusChange(selectedUser._id, 'active');
                        setIsDialogOpen(false);
                      }}
                    >
                      Activate
                    </Button>
                  )}
                  
                  {selectedUser.status !== 'suspended' && (
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        handleStatusChange(selectedUser._id, 'suspended');
                        setIsDialogOpen(false);
                      }}
                    >
                      Suspend
                    </Button>
                  )}
                </div>
              )}
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user && user.role !== 'admin') {
      // Redirect non-admin users to appropriate dashboard
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user.role === 'employer') {
        navigate('/employer/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);
  
  // Show loading state while checking authentication
  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Sample data - would be fetched from API in production
  const stats = {
    users: {
      total: 1250,
      students: 850,
      employers: 350,
      admins: 50,
      newThisMonth: 120,
    },
    tasks: {
      total: 450,
      open: 180,
      inProgress: 150,
      completed: 100,
      cancelled: 20,
      newThisMonth: 45,
    },
    payments: {
      total: 125000,
      pending: 15000,
      completed: 105000,
      failed: 5000,
      thisMonth: 25000,
    },
    reports: {
      total: 25,
      pending: 10,
      resolved: 12,
      dismissed: 3,
    },
  };

  return (
    <DashboardLayout role="admin" user={user}>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.users.total}</div>
                  <p className="text-xs text-muted-foreground">
                    +{stats.users.newThisMonth} this month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.tasks.open + stats.tasks.inProgress}</div>
                  <p className="text-xs text-muted-foreground">
                    +{stats.tasks.newThisMonth} new this month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.payments.total.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    ${stats.payments.thisMonth.toLocaleString()} this month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.reports.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.reports.resolved} resolved
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Students</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{stats.users.students}</span>
                        <Badge variant="outline">{Math.round(stats.users.students / stats.users.total * 100)}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>Employers</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{stats.users.employers}</span>
                        <Badge variant="outline">{Math.round(stats.users.employers / stats.users.total * 100)}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Admins</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{stats.users.admins}</span>
                        <Badge variant="outline">{Math.round(stats.users.admins / stats.users.total * 100)}%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Task Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Open</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{stats.tasks.open}</span>
                        <Badge variant="outline">{Math.round(stats.tasks.open / stats.tasks.total * 100)}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>In Progress</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{stats.tasks.inProgress}</span>
                        <Badge variant="outline">{Math.round(stats.tasks.inProgress / stats.tasks.total * 100)}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Completed</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{stats.tasks.completed}</span>
                        <Badge variant="outline">{Math.round(stats.tasks.completed / stats.tasks.total * 100)}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        <span>Cancelled</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">{stats.tasks.cancelled}</span>
                        <Badge variant="outline">{Math.round(stats.tasks.cancelled / stats.tasks.total * 100)}%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button>Generate Report</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>User management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Task management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Payment management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Report Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Report management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

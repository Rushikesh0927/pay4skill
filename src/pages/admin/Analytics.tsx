import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Users, FileText, AlertTriangle, Wallet } from 'lucide-react';

// Mock data for charts
const userGrowthData = [
  { month: 'Jan', students: 120, employers: 30 },
  { month: 'Feb', students: 150, employers: 40 },
  { month: 'Mar', students: 200, employers: 45 },
  { month: 'Apr', students: 250, employers: 55 },
  { month: 'May', students: 300, employers: 65 },
  { month: 'Jun', students: 380, employers: 70 },
  { month: 'Jul', students: 450, employers: 80 },
  { month: 'Aug', students: 520, employers: 90 },
  { month: 'Sep', students: 580, employers: 100 },
  { month: 'Oct', students: 620, employers: 110 },
];

const taskActivityData = [
  { month: 'Jan', posted: 20, completed: 15, disputed: 2 },
  { month: 'Feb', posted: 30, completed: 22, disputed: 3 },
  { month: 'Mar', posted: 40, completed: 30, disputed: 4 },
  { month: 'Apr', posted: 45, completed: 35, disputed: 3 },
  { month: 'May', posted: 50, completed: 42, disputed: 5 },
  { month: 'Jun', posted: 60, completed: 48, disputed: 4 },
  { month: 'Jul', posted: 65, completed: 55, disputed: 6 },
  { month: 'Aug', posted: 70, completed: 60, disputed: 5 },
  { month: 'Sep', posted: 75, completed: 65, disputed: 7 },
  { month: 'Oct', posted: 80, completed: 68, disputed: 6 },
];

const revenueData = [
  { month: 'Jan', revenue: 50000 },
  { month: 'Feb', revenue: 65000 },
  { month: 'Mar', revenue: 75000 },
  { month: 'Apr', revenue: 90000 },
  { month: 'May', revenue: 105000 },
  { month: 'Jun', revenue: 120000 },
  { month: 'Jul', revenue: 135000 },
  { month: 'Aug', revenue: 150000 },
  { month: 'Sep', revenue: 170000 },
  { month: 'Oct', revenue: 185000 },
];

const skillsData = [
  { name: 'Web Development', value: 250 },
  { name: 'Design', value: 180 },
  { name: 'Content Writing', value: 150 },
  { name: 'Marketing', value: 120 },
  { name: 'Mobile Development', value: 110 },
  { name: 'Data Analysis', value: 90 },
];

const AnalyticsPage = () => {
  return (
    <DashboardLayout userRole="admin">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Platform Analytics</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">2,456</p>
              <Users className="h-8 w-8 text-mint-500" />
            </div>
            <p className="text-xs text-neutral-500 mt-2">+15% growth rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">450</p>
              <FileText className="h-8 w-8 text-mint-500" />
            </div>
            <p className="text-xs text-neutral-500 mt-2">85% completion rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Dispute Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">4.2%</p>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-xs text-neutral-500 mt-2">-1.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">₹18.5L</p>
              <Wallet className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-neutral-500 mt-2">+22% vs. previous quarter</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="tasks">Task Activity</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="skills">Popular Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly growth of students and employers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={userGrowthData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="students" stroke="#3b82f6" fill="#93c5fd" />
                    <Area type="monotone" dataKey="employers" stroke="#10b981" fill="#6ee7b7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Task Activity</CardTitle>
              <CardDescription>Posted vs Completed vs Disputed Tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={taskActivityData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="posted" fill="#3b82f6" />
                    <Bar dataKey="completed" fill="#10b981" />
                    <Bar dataKey="disputed" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Growth</CardTitle>
              <CardDescription>Monthly revenue in INR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Popular Skills</CardTitle>
              <CardDescription>Most in-demand skills by task count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={skillsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 100,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AnalyticsPage;

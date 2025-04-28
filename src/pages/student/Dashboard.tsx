import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, DollarSign, Star, CheckCircle } from 'lucide-react';

const mockData = {
  tasksCompleted: [
    { month: 'Jan', count: 4 },
    { month: 'Feb', count: 6 },
    { month: 'Mar', count: 8 },
    { month: 'Apr', count: 5 },
    { month: 'May', count: 7 },
    { month: 'Jun', count: 9 },
  ],
  stats: {
    tasksApplied: 15,
    tasksInProgress: 3,
    earnings: 1250,
    rating: 4.8,
  },
};

const StudentDashboard = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
  };

  return (
    <DashboardLayout role="student" user={user}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back, {user.name}! 👋</h1>
          <p className="mt-2 text-blue-100">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.tasksApplied}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.tasksInProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockData.stats.earnings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.rating}/5.0</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Graph */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks Completed Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.tasksCompleted}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Task #{i} completed</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;

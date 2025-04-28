import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, DollarSign, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

interface DashboardStats {
  tasksApplied: number;
  tasksInProgress: number;
  earnings: number;
  rating: number;
  tasksCompleted: Array<{ month: string; count: number }>;
  recentActivity: Array<{ id: string; title: string; time: string }>;
}

const StudentDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Helper to get user's display name
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.fullName || user.name || 'Student';
  };
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch applications
        const applications = await api.applications.getByStudent(user._id);
        
        // Fetch payments
        const payments = await api.payments.getByStudent(user._id);
        
        // Fetch reviews (for rating)
        const reviews = await api.reviews.getByUser(user._id);
        
        // Calculate stats
        const tasksApplied = applications.length;
        const tasksInProgress = applications.filter(app => app.status === 'accepted').length;
        const earnings = payments.reduce((total, payment) => total + payment.amount, 0);
        
        // Calculate average rating
        let rating = 0;
        if (reviews.length > 0) {
          rating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        }
        
        // Generate tasks completed by month
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        
        // Get the last 6 months
        const last6Months = Array(6).fill(0).map((_, index) => {
          const monthIndex = (currentMonth - 5 + index + 12) % 12;
          return monthNames[monthIndex];
        });
        
        // Count completed tasks by month
        const tasksCompletedByMonth = last6Months.map(month => {
          const monthIndex = monthNames.indexOf(month);
          const count = applications.filter(app => {
            if (app.status !== 'completed') return false;
            const completedDate = new Date(app.updatedAt);
            return completedDate.getMonth() === monthIndex;
          }).length;
          
          return { month, count };
        });
        
        // Get recent activity (simplified)
        const recentActivity = applications
          .filter(app => app.updatedAt)
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 3)
          .map(app => ({
            id: app._id,
            title: `${app.status.charAt(0).toUpperCase() + app.status.slice(1)} - ${app.task.title}`,
            time: new Date(app.updatedAt).toLocaleDateString()
          }));
        
        setStats({
          tasksApplied,
          tasksInProgress,
          earnings,
          rating: parseFloat(rating.toFixed(1)),
          tasksCompleted: tasksCompletedByMonth,
          recentActivity
        });
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        
        // Fallback to mock data in case of error
        setStats({
          tasksApplied: 15,
          tasksInProgress: 3,
          earnings: 1250,
          rating: 4.8,
          tasksCompleted: [
            { month: 'Jan', count: 4 },
            { month: 'Feb', count: 6 },
            { month: 'Mar', count: 8 },
            { month: 'Apr', count: 5 },
            { month: 'May', count: 7 },
            { month: 'Jun', count: 9 },
          ],
          recentActivity: [
            { id: '1', title: 'Task #1 completed', time: '2 hours ago' },
            { id: '2', title: 'Task #2 completed', time: '1 day ago' },
            { id: '3', title: 'Task #3 completed', time: '3 days ago' },
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchDashboardData();
    }
  }, [user]);
  
  // Show loading state
  if (!user || isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <DashboardLayout role="student" user={user}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back, {getUserDisplayName()}! 👋</h1>
          <p className="mt-2 text-blue-100">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Applied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.tasksApplied || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.tasksInProgress || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats?.earnings || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.rating || 0}/5.0</div>
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
                <LineChart data={stats?.tasksCompleted}>
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
              {stats?.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
              {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                <p className="text-sm text-gray-500">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;

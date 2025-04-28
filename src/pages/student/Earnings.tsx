
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp } from 'lucide-react';

const StudentEarnings = () => {
  const earningsData = [
    { month: 'Jan', amount: 500 },
    { month: 'Feb', amount: 800 },
    { month: 'Mar', amount: 1200 },
    { month: 'Apr', amount: 900 },
    { month: 'May', amount: 1500 },
  ];

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Earnings</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">₹4,900</p>
                <DollarSign className="w-8 h-8 text-mint-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">₹980</p>
                <TrendingUp className="w-8 h-8 text-mint-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Earnings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentEarnings;

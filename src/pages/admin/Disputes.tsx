
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, X, Eye } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock dispute data
const mockDisputes = [
  { 
    id: 1, 
    student: 'John Doe', 
    employer: 'Tech Solutions', 
    taskTitle: 'Website Frontend Development',
    amount: 12000, 
    dateSubmitted: '2023-10-15',
    reason: 'Payment screenshot shows wrong amount',
    status: 'pending' 
  },
  { 
    id: 2, 
    student: 'Alice Williams', 
    employer: 'Creative Agency', 
    taskTitle: 'Logo Design Project',
    amount: 5000, 
    dateSubmitted: '2023-10-12',
    reason: 'Payment never received despite screenshot',
    status: 'pending' 
  },
  { 
    id: 3, 
    student: 'Bob Smith', 
    employer: 'Digital Marketing Co', 
    taskTitle: 'Social Media Campaign',
    amount: 8500, 
    dateSubmitted: '2023-10-10',
    reason: 'Received partial payment only',
    status: 'resolved' 
  },
  { 
    id: 4, 
    student: 'Emily Davis', 
    employer: 'Education Platform', 
    taskTitle: 'Course Content Creation',
    amount: 15000, 
    dateSubmitted: '2023-10-05',
    reason: 'Payment screenshot is from a different project',
    status: 'rejected' 
  },
];

// Mock reports data
const mockReports = [
  {
    id: 1,
    reportedBy: 'John Doe',
    reportedUser: 'Tech Solutions',
    reason: 'Inappropriate behavior in chat',
    dateSubmitted: '2023-10-16',
    status: 'pending'
  },
  {
    id: 2,
    reportedBy: 'Tech Solutions',
    reportedUser: 'Alice Williams',
    reason: 'Plagiarized work submission',
    dateSubmitted: '2023-10-14',
    status: 'pending'
  },
  {
    id: 3,
    reportedBy: 'Emily Davis',
    reportedUser: 'Digital Marketing Co',
    reason: 'Unreasonable task requirements',
    dateSubmitted: '2023-10-11',
    status: 'resolved'
  }
];

const DisputesPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("disputes");

  const showNotification = (message: string) => {
    toast({
      title: "Notification",
      description: message,
    });
  };

  const handleResolveDispute = (id: number) => {
    showNotification(`Dispute #${id} has been approved and resolved`);
  };

  const handleRejectDispute = (id: number) => {
    showNotification(`Dispute #${id} has been rejected`);
  };

  const handleResolveReport = (id: number) => {
    showNotification(`Report #${id} has been resolved`);
  };

  return (
    <DashboardLayout userRole="admin">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Disputes & Reports</h1>
      
      <Tabs defaultValue="disputes" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="disputes">Payment Disputes</TabsTrigger>
          <TabsTrigger value="reports">User Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="disputes">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                  <span>Payment Disputes</span>
                  <div className="text-sm text-neutral-500 font-normal">
                    {mockDisputes.filter(d => d.status === 'pending').length} pending disputes
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDisputes.map((dispute) => (
                  <div 
                    key={dispute.id}
                    className={`rounded-lg border p-4 ${
                      dispute.status === 'pending' ? 'border-yellow-300 bg-yellow-50' :
                      dispute.status === 'resolved' ? 'border-green-300 bg-green-50' :
                      'border-red-300 bg-red-50'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-medium">Dispute #{dispute.id}</h3>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Task:</span> {dispute.taskTitle}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Student:</span> {dispute.student} | 
                          <span className="font-medium"> Employer:</span> {dispute.employer}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Amount:</span> ₹{dispute.amount.toLocaleString()}
                        </p>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Reason:</span> {dispute.reason}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            dispute.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                            dispute.status === 'resolved' ? 'bg-green-200 text-green-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {dispute.status === 'pending' ? 'Pending' : 
                             dispute.status === 'resolved' ? 'Resolved' : 'Rejected'}
                          </span>
                        </div>
                      </div>
                      
                      {dispute.status === 'pending' && (
                        <div className="flex items-start space-x-2 mt-4 md:mt-0">
                          <Button 
                            onClick={() => showNotification(`Viewing evidence for dispute #${dispute.id}`)}
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Evidence
                          </Button>
                          <Button 
                            onClick={() => handleResolveDispute(dispute.id)}
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handleRejectDispute(dispute.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                  <span>User Reports</span>
                  <div className="text-sm text-neutral-500 font-normal">
                    {mockReports.filter(r => r.status === 'pending').length} pending reports
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <div 
                    key={report.id}
                    className={`rounded-lg border p-4 ${
                      report.status === 'pending' ? 'border-yellow-300 bg-yellow-50' : 'border-green-300 bg-green-50'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-medium">Report #{report.id}</h3>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Reported by:</span> {report.reportedBy}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Reported user:</span> {report.reportedUser}
                        </p>
                        <p className="text-sm mt-2">
                          <span className="font-medium">Reason:</span> {report.reason}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            report.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                          }`}>
                            {report.status === 'pending' ? 'Pending' : 'Resolved'}
                          </span>
                        </div>
                      </div>
                      
                      {report.status === 'pending' && (
                        <div className="flex items-start space-x-2 mt-4 md:mt-0">
                          <Button 
                            onClick={() => showNotification(`Warning sent to ${report.reportedUser}`)}
                            variant="outline"
                            size="sm"
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Send Warning
                          </Button>
                          <Button 
                            onClick={() => handleResolveReport(report.id)}
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                          <Button 
                            onClick={() => showNotification(`User ${report.reportedUser} has been temporarily blocked`)}
                            variant="destructive"
                            size="sm"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Block User
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DisputesPage;

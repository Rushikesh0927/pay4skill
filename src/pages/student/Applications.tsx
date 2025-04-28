import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface Application {
  id: string;
  taskTitle: string;
  employerName: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
  taskBudget: number;
}

export default function Applications() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      taskTitle: 'Build a React E-commerce Website',
      employerName: 'Tech Solutions Inc.',
      status: 'pending',
      appliedDate: '2024-03-15',
      taskBudget: 500,
    },
    {
      id: '2',
      taskTitle: 'Create a Mobile App UI Design',
      employerName: 'Design Studio',
      status: 'accepted',
      appliedDate: '2024-03-10',
      taskBudget: 300,
    },
    {
      id: '3',
      taskTitle: 'Develop a REST API',
      employerName: 'Software Corp',
      status: 'rejected',
      appliedDate: '2024-03-05',
      taskBudget: 400,
    },
  ]);

  const handleWithdrawApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
    toast({
      title: "Application withdrawn",
      description: "Your application has been successfully withdrawn.",
    });
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'accepted':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" /> Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
    }
  };

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
  };

  return (
    <DashboardLayout role="student" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Applications</h1>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{application.taskTitle}</h3>
                        <p className="text-sm text-gray-500">Employer: {application.employerName}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm">Applied on: {application.appliedDate}</p>
                        <p className="text-sm">Budget: ${application.taskBudget}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        {application.status === 'pending' && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleWithdrawApplication(application.id)}
                          >
                            Withdraw
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {applications
              .filter(app => app.status === 'pending')
              .map((application) => (
                <Card key={application.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{application.taskTitle}</h3>
                          <p className="text-sm text-gray-500">Employer: {application.employerName}</p>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">Applied on: {application.appliedDate}</p>
                          <p className="text-sm">Budget: ${application.taskBudget}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleWithdrawApplication(application.id)}
                          >
                            Withdraw
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {applications
              .filter(app => app.status === 'accepted')
              .map((application) => (
                <Card key={application.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{application.taskTitle}</h3>
                          <p className="text-sm text-gray-500">Employer: {application.employerName}</p>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm">Applied on: {application.appliedDate}</p>
                          <p className="text-sm">Budget: ${application.taskBudget}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

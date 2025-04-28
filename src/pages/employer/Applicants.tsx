import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  avatar?: string;
  taskTitle: string;
  appliedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  skills: string[];
  experience: string;
  proposal: string;
}

export default function Applicants() {
  const { toast } = useToast();
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1',
      name: 'John Doe',
      taskTitle: 'Build a React E-commerce Website',
      appliedDate: '2024-03-15',
      status: 'pending',
      skills: ['React', 'TypeScript', 'Node.js'],
      experience: '3 years',
      proposal: 'I have extensive experience in building e-commerce websites using React and Node.js. I can start working on this project immediately.',
    },
    {
      id: '2',
      name: 'Jane Smith',
      taskTitle: 'Create a Mobile App UI Design',
      appliedDate: '2024-03-14',
      status: 'accepted',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
      experience: '5 years',
      proposal: 'I specialize in mobile app UI design and have worked with several startups. I can deliver high-quality designs within the deadline.',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      taskTitle: 'Develop a REST API',
      appliedDate: '2024-03-13',
      status: 'rejected',
      skills: ['Node.js', 'Express', 'MongoDB'],
      experience: '2 years',
      proposal: 'I have experience in building REST APIs using Node.js and Express. I can help you create a scalable and secure API.',
    },
  ]);

  const handleAcceptApplicant = (id: string) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === id ? { ...applicant, status: 'accepted' as const } : applicant
    ));
    toast({
      title: 'Applicant accepted',
      description: 'The applicant has been notified of your decision.',
    });
  };

  const handleRejectApplicant = (id: string) => {
    setApplicants(applicants.map(applicant => 
      applicant.id === id ? { ...applicant, status: 'rejected' as const } : applicant
    ));
    toast({
      title: 'Applicant rejected',
      description: 'The applicant has been notified of your decision.',
    });
  };

  const getStatusBadge = (status: Applicant['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'accepted':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" /> Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
    }
  };

  const user = {
    name: 'Tech Solutions Inc.',
    email: 'contact@techsolutions.com',
    avatar: undefined,
  };

  return (
    <DashboardLayout role="employer" user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Applicants</h1>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Applicants</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {applicants.map((applicant) => (
              <Card key={applicant.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={applicant.avatar} />
                          <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{applicant.name}</h3>
                          <p className="text-sm text-gray-500">{applicant.taskTitle}</p>
                        </div>
                      </div>
                      {getStatusBadge(applicant.status)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        Experience: {applicant.experience}
                      </p>
                      <p className="text-sm">{applicant.proposal}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Applied on: {applicant.appliedDate}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        {applicant.status === 'pending' && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleAcceptApplicant(applicant.id)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRejectApplicant(applicant.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {applicants
              .filter(app => app.status === 'pending')
              .map((applicant) => (
                <Card key={applicant.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={applicant.avatar} />
                            <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{applicant.name}</h3>
                            <p className="text-sm text-gray-500">{applicant.taskTitle}</p>
                          </div>
                        </div>
                        {getStatusBadge(applicant.status)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {applicant.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">
                          Experience: {applicant.experience}
                        </p>
                        <p className="text-sm">{applicant.proposal}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Applied on: {applicant.appliedDate}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleAcceptApplicant(applicant.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejectApplicant(applicant.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {applicants
              .filter(app => app.status === 'accepted')
              .map((applicant) => (
                <Card key={applicant.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={applicant.avatar} />
                            <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{applicant.name}</h3>
                            <p className="text-sm text-gray-500">{applicant.taskTitle}</p>
                          </div>
                        </div>
                        {getStatusBadge(applicant.status)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {applicant.skills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500">
                          Experience: {applicant.experience}
                        </p>
                        <p className="text-sm">{applicant.proposal}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Applied on: {applicant.appliedDate}
                        </p>
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